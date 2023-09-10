package com.blog.notice.service;

import com.blog.common.util.FileUploadUtils;
import com.blog.notice.domain.Content;
import com.blog.notice.domain.Post;
import com.blog.notice.model.request.PostsRequest;
import com.blog.notice.repository.ContentRepository;
import com.blog.notice.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final PostRepository postRepository;
    private final ContentRepository contentRepository;

    @Transactional
    @Override
    public String registerPost(PostsRequest postsRequest) {
        Post post = Post.of(postsRequest.getPostItemRequest());
        post.setBoardId(2);//임시
        Content content = Content.of(post.getCode(), postsRequest.getContentRequest().getContent());

        postRepository.save(post);
        contentRepository.save(content);

        return "저장이 완료되었습니다";
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
}
