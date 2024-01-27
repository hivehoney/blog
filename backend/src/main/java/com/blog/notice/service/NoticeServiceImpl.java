package com.blog.notice.service;

import com.blog.common.constants.Const;
import com.blog.common.domain.UserAccount;
import com.blog.common.util.FileUploadUtils;
import com.blog.notice.domain.Contents;
import com.blog.notice.domain.Post;
import com.blog.notice.model.request.ContentsRequest;
import com.blog.notice.model.request.PostItemRequest;
import com.blog.notice.model.response.PostItemResponse;
import com.blog.notice.model.response.PostsResponse;
import com.blog.notice.repository.ContentsRepository;
import com.blog.notice.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

import static com.blog.common.util.StringUtil.usingTernaryOperator;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final Logger logger = LogManager.getLogger(NoticeServiceImpl.class);

    private final PostRepository postRepository;
    private final ContentsRepository contentsRepository;

    /**
     * 게시물을 업데이트하고 해당 내용을 저장합니다.
     *
     * @param updatedPost 업데이트할 게시물 요청 정보
     */
    private void updatePost(Post updatedPost) {
        // 업데이트할 게시물의 코드
        String postCode = updatedPost.getPostCode();

        // 게시물 코드가 비어 있으면 예외
        Objects.requireNonNull(postCode, "Post code cannot be empty");

        // 게시물이 존재여부
        Long postCount = postRepository.countPostsByCode(postCode);

        if (usingTernaryOperator(postCount)) {
            throw new IllegalStateException("Post not found for code: " + postCode);
        }

        postRepository.updatePost(updatedPost);
    }

    /**
     * PostItemRequest를 사용하여 게시물을 업데이트합니다.
     *
     * @param postItemRequest 업데이트할 게시물 요청 정보
     */
    @Transactional
    @Override
    public void updatePost(PostItemRequest postItemRequest) {
        updatePost(Post.from(postItemRequest));
    }

    /**
     * 게시물의 배너 이미지를 설정합니다.
     *
     * @param postCode    업데이트할 게시물의 코드
     * @param bannerImage 배너 이미지 경로
     */
    @Transactional
    @Override
    public void updateBannerImage(String postCode, String bannerImage) {
        updatePost(new Post(postCode, null, bannerImage, null, null, 0, null));
    }

    /**
     * 게시물을 업데이트하고 해당 내용을 저장합니다.
     *
     * @param contentsRequest 업데이트할 게시물 내용 요청 정보
     * @return 게시물 코드
     */
    @Transactional
    @Override
    public String updateContents(ContentsRequest contentsRequest) {
        // 업데이트할 게시물의 코드
        String postCode = contentsRequest.getPostCode();

        // 게시물 코드가 비어 있으면 예외
        Objects.requireNonNull(postCode, "Contents code cannot be empty");

        // 게시물이 존재여부
        Long contentsCount = contentsRepository.countByPostCode(postCode);

        if (usingTernaryOperator(contentsCount)) {
            throw new IllegalStateException("contentsCount not found for code: " + postCode);
        }

        Contents contents = Contents.from(contentsRequest);
        contentsRepository.save(contents);

        return postCode;
    }

    /**
     * 임시 게시물을 생성하고 해당 게시물의 코드를 반환합니다.
     *
     * @param userAccount 인증 정보
     * @return 생성된 게시물의 코드
     */
    @Transactional
    @Override
    public String registerPost(UserAccount userAccount) {
        //임시 저장물
        Post post = postRepository.findTopByStatus(2);

        if (post == null) {
            post = Post.of(userAccount.getUsername());
            Contents content = Contents.of(post.getPostCode());

            postRepository.save(post);
            contentsRepository.save(content);
        }

        return post.getPostCode();
    }

    /**
     * 이미지를 저장합니다.
     *
     * @param file      저장할 이미지 파일
     * @param postCode  이미지가 속한 포스트의 코드
     * @param type      이미지의 유형 (1은 배너 이미지, 0은 일반 이미지)
     * @return 이미지가 저장된 경로
     * @throws IOException 파일 저장 중 I/O 오류가 발생한 경우
     */
    @Override
    public String saveImages(MultipartFile file, String postCode, int type) throws IOException {
        // 게시물이 존재여부
        Long postCount = postRepository.countPostsByCode(postCode);

        if (usingTernaryOperator(postCount)) {
            throw new IllegalStateException("Post not found for code: " + postCode);
        }

        String fileName = System.currentTimeMillis() + StringUtils.cleanPath(file.getOriginalFilename());

        String subPath = (type == 1) ? "/bannerImage" : "";
        Path uploadDir = Paths.get(Const.proImg, postCode + subPath);

        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        return postCode + subPath + "/" + FileUploadUtils.saveFile(uploadDir, fileName, file);
    }

    /**
     * 포스트와 연관된 특정 이미지를 지웁니다.
     *
     * @param imgFiles  이미지 파일 목록
     * @param postCode  게시물 코드
     */
    @Override
    public void clearImages(List<String> imgFiles, String postCode) {
        Path postDir = Paths.get(Const.proImg, postCode);

        if (Files.exists(postDir) || !imgFiles.isEmpty()) {
            FileUploadUtils.cleanDir(postDir, imgFiles);
        }
    }

    /**
     * 포스트를 삭제하고 상태를 0으로 변경합니다.
     *
     * @param postCode  삭제할 게시물 코드
     * @return 삭제 성공 메시지
     */
    @Transactional
    @Override
    public String deletePost(String postCode) {
        Post post = postRepository.findByPostCode(postCode);
        Objects.requireNonNull(post, "Post code cannot be empty");

        post.setStatus(0);
        postRepository.save(post);
        return "삭제 되었습니다.";
    }

    /**
     * 코드로 포스트를 조회하고 포스트 세부 정보를 담은 응답을 반환합니다.
     *
     * @param postCode  조회할 포스트의 코드
     * @return 포스트 세부 정보를 담은 응답
     */
    @Transactional(readOnly = true)
    @Override
    public PostsResponse getPost(String postCode) {
        return postRepository.searchByCode(postCode);
    }

    /**
     * 검색 기준에 따라 포스트 리스트를 조회하고 슬라이스된 응답을 반환합니다.
     *
     * @param keyword   포스트 내용 또는 제목에서 검색할 키워드
     * @param date      포스트를 필터링할 날짜 ("yyyy-MM-dd" 형식)
     * @param pageable  페이지네이션 정보
     * @return 포스트 아이템 목록을 담은 슬라이스 응답
     */
    @Transactional(readOnly = true)
    @Override
    public Slice<PostItemResponse> getPostList(String keyword, String date, Pageable pageable) {
        Slice<PostItemResponse> response = postRepository.findBySearchOption(keyword, date, pageable);

        return response;
    }
}
