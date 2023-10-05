package com.blog.notice.service;

import com.blog.common.util.FileUploadUtils;
import com.blog.notice.domain.Contents;
import com.blog.notice.domain.Post;
import com.blog.notice.model.request.PostItemRequest;
import com.blog.notice.model.request.PostsRequest;
import com.blog.notice.model.response.PostItemResponse;
import com.blog.notice.model.response.PostsResponse;
import com.blog.notice.repository.ContentsRepository;
import com.blog.notice.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

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
        if (!StringUtils.hasText(postCode)) {
            throw new IllegalStateException("Post code cannot be empty");
        }

        // 게시물이 존재여부
        Long postCount = postRepository.countPostsByCode(postCode);

        if (postCount <= 0) {
            throw new IllegalStateException("Post not found for code: " + postCode);
        }

        Post post = Post.from(postsRequest.getPostItemRequest());
        postRepository.updatePost(post);//수정필요

        Contents contents = Contents.of(postCode);
        contents.updateContents(postsRequest.getContentsRequest().getContents());
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
        //기존 생성된 post가 있으면 해당 코드
        Post post = postRepository.findTopByTitleAndAuthor("Temp Title", "TAEUK");
        if (post == null) {
            post = Post.of("TAEUK");
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

        if (postCount <= 0) {
            throw new IllegalStateException("Post not found for code: " + postCode);
        }

        String fileName = System.currentTimeMillis()+ StringUtils.cleanPath(file.getOriginalFilename());
        Path uploadDir = Paths.get("imgUpload", postCode);

        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        return FileUploadUtils.saveFile(uploadDir, fileName, file);
    }

    @Override
    public void clearImages(List<String> imgFiles, String postCode) {

        Path postDir = Paths.get("imgUpload", postCode);

        if (Files.exists(postDir)) {
            FileUploadUtils.cleanDir(postDir, imgFiles);
        }
    }

    @Transactional(readOnly = true)
    @Override
    public PostsResponse getPost(String postCode) {
        return postRepository.searchByCode(postCode);
    }

    @Transactional(readOnly = true)
    @Override
    public List<PostItemResponse> getPostList(PostItemRequest request) {
        List<Post> postList = postRepository.findBySearchOption(request);
        List<PostItemResponse> response = postList.stream().map(val -> new PostItemResponse(val)).collect(Collectors.toList());

        return response;
    }
}
