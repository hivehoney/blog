package com.blog.notice.repository.Querydsl;

import com.blog.notice.domain.Post;
import com.blog.notice.model.request.PostItemRequest;
import com.blog.notice.model.response.PostsResponse;

import java.util.List;

public interface PostRepositoryCustom {
    PostsResponse searchByCode(String id);

    List<Post> findBySearchOption(PostItemRequest request);

    Long countPostsByCode(String code);

    void updatePost(Post post);
}
