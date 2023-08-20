package com.blog.notice.service;

import com.blog.notice.domain.Content;
import com.blog.notice.domain.Post;
import com.blog.notice.model.request.PostsRequest;
import com.blog.notice.repository.ContentRepository;
import com.blog.notice.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final PostRepository postRepository;
    private final ContentRepository contentRepository;

    @Transactional
    @Override
    public void registerPost(PostsRequest postsRequest) {
        Post post = Post.of(postsRequest.getPostItemRequest());
        Content content = Content.of(post.getCode(), postsRequest.getContentRequest());

        postRepository.save(post);
        contentRepository.save(content);
    }
}
