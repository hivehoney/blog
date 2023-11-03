package com.blog.notice.repository;

import com.blog.notice.domain.Post;
import com.blog.notice.model.request.PostItemRequest;
import com.blog.notice.model.response.PostsResponse;
import com.blog.notice.repository.Querydsl.PostRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, String>, PostRepositoryCustom {
    PostsResponse searchByCode(String code);

    List<Post> findBySearchOption(PostItemRequest request);

    Long countPostsByCode(String code);

    void updatePost(Post post);

    Post findTopByStatus(int status);

    Post findByPostCode(String postCode);
}
