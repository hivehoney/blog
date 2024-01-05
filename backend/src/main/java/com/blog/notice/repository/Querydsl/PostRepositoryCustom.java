package com.blog.notice.repository.Querydsl;

import com.blog.notice.domain.Post;
import com.blog.notice.model.response.PostItemResponse;
import com.blog.notice.model.response.PostsResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface PostRepositoryCustom {
    PostsResponse searchByCode(String id);

    Slice<PostItemResponse> findBySearchOption(String keyword, String date, Pageable pageable);

    Long countPostsByCode(String code);

    void updatePost(Post post);
}
