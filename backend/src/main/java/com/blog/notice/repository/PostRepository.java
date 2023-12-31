package com.blog.notice.repository;

import com.blog.notice.domain.Post;
import com.blog.notice.model.response.PostItemResponse;
import com.blog.notice.model.response.PostsResponse;
import com.blog.notice.repository.Querydsl.PostRepositoryCustom;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, String>, PostRepositoryCustom {
    PostsResponse searchByCode(String code);

    Slice<PostItemResponse> findBySearchOption(String keyword, String date, Pageable pageable);

    Long countPostsByCode(String code);

    void updatePost(Post post);

    Post findTopByStatus(int status);

    Post findByPostCode(String postCode);
}
