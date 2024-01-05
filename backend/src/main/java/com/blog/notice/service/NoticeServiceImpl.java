package com.blog.notice.service;

import com.blog.common.constants.Const;
import com.blog.common.util.FileUploadUtils;
import com.blog.notice.domain.Contents;
import com.blog.notice.domain.Post;
import com.blog.notice.model.request.PostsRequest;
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

import static com.blog.common.util.StringUtils.usingTernaryOperator;

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
     * @param postsRequest 업데이트할 게시물 및 내용 요청 정보
     * @return 업데이트 완료 메시지
     */
    @Transactional
    @Override
    public String updatePost(PostsRequest postsRequest) {
        // 업데이트할 게시물의 코드
        String postCode = postsRequest.getPostItemRequest().getPostCode();

        // 게시물 코드가 비어 있으면 예외
        Objects.requireNonNull(postCode, "Post code cannot be empty");

        // 게시물이 존재여부
        Long postCount = postRepository.countPostsByCode(postCode);

        if (usingTernaryOperator(postCount)) {
            throw new IllegalStateException("Post not found for code: " + postCode);
        }

        Post post = Post.from(postsRequest.getPostItemRequest());
        postRepository.updatePost(post);

        Contents contents = Contents.from(postsRequest.getContentsRequest());
        contentsRepository.save(contents);

        return postCode;
    }

    /**
     * 임시 게시물을 생성하고 해당 게시물의 코드를 반환합니다.
     *
     * @param 'boardId' 게시물이 속한 게시판 ID
     * @param 'author'  작성자 이름
     * @return 생성된 게시물의 코드
     */
    @Transactional
    @Override
    public String registerPost() {
        //임시 저장물
        Post post = postRepository.findTopByStatus(2);

        if (post == null) {
            post = Post.of("hive");
            Contents content = Contents.of(post.getPostCode());

            postRepository.save(post);
            contentsRepository.save(content);
        }

        return post.getPostCode();
    }

    @Override
    public String saveImages(MultipartFile file, String postCode) throws IOException {
        // 게시물이 존재여부
        Long postCount = postRepository.countPostsByCode(postCode);

        if (usingTernaryOperator(postCount)) {
            throw new IllegalStateException("Post not found for code: " + postCode);
        }

        String fileName = System.currentTimeMillis()+ StringUtils.cleanPath(file.getOriginalFilename());
        Path uploadDir = Paths.get(Const.devImg, postCode);

        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        return FileUploadUtils.saveFile(uploadDir, fileName, file);
    }

    @Override
    public void clearImages(List<String> imgFiles, String postCode) {
        Path postDir = Paths.get(Const.devImg, postCode);

        if (Files.exists(postDir) || !imgFiles.isEmpty()) {
            FileUploadUtils.cleanDir(postDir, imgFiles);
        }
    }

    @Transactional
    @Override
    public String deletePost(String postCode) {
        Post post = postRepository.findByPostCode(postCode);
        Objects.requireNonNull(post, "Post code cannot be empty");

        post.setStatus(0);
        postRepository.save(post);
        return "삭제 되었습니다.";
    }

    @Transactional(readOnly = true)
    @Override
    public PostsResponse getPost(String postCode) {
        return postRepository.searchByCode(postCode);
    }

    @Transactional(readOnly = true)
    @Override
    public Slice<PostItemResponse> getPostList(String keyword, String date, Pageable pageable) {
        Slice<PostItemResponse> response = postRepository.findBySearchOption(keyword, date, pageable);

        return response;
    }
}
