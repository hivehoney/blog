package com.blog.notice.service;

import com.blog.common.util.CodeGenerator;
import com.blog.common.util.FileUploadUtils;
import com.blog.notice.domain.Content;
import com.blog.notice.domain.Post;
import com.blog.notice.model.request.PostItemRequest;
import com.blog.notice.model.request.PostsRequest;
import com.blog.notice.model.response.PostsResponse;
import com.blog.notice.repository.ContentRepository;
import com.blog.notice.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final PostRepository postRepository;
    private final ContentRepository contentRepository;

    /**
     * 게시물을 업데이트하고 해당 내용을 저장합니다.
     *
     * @param postsRequest 업데이트할 게시물 및 내용 요청 정보
     * @return 업데이트 완료 메시지
     */
    @Transactional
    @Override
    public String updatePost(PostsRequest postsRequest) {
        Post post = Post.from(postsRequest.getPostItemRequest());
        Content content = Content.of(postsRequest.getContentRequest());

        postRepository.save(post);
        contentRepository.save(content);

        return "저장이 완료되었습니다";
    }

    /**
     * 임시 게시물을 만들어 저장하고 해당 게시물의 코드를 반환합니다.
     * @param boardId 게시물이 속한 게시판 ID
     * @param author 작성자 이름
     * @return 생성된 게시물의 코드
     */
    @Transactional
    @Override
    public PostsResponse registerPost() {
        Post post = Post.of(2, "TAEUK");postRepository.save(post);

        return PostsResponse.from(post, "");
    }

    @Override
    public String saveImages(MultipartFile file) {
        String fileName = System.currentTimeMillis()+ StringUtils.cleanPath(file.getOriginalFilename());

        try {
            return FileUploadUtils.saveFile("imgUpload", fileName, file);
        } catch (IOException e) {
            throw new RuntimeException("Could not save file: " + file.getOriginalFilename(), e);
        }
    }

    @Override
    public List<Post> getPostList(PostItemRequest request) {
        return postRepository.findBySearchOption(request);
    }

    @Override
    public PostsResponse getPost(String postCode) {
        return postRepository.searchById(postCode);
    }
}
