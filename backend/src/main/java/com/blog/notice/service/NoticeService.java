package com.blog.notice.service;

import com.blog.notice.domain.Post;
import com.blog.notice.model.request.PostItemRequest;
import com.blog.notice.model.request.PostsRequest;
import com.blog.notice.model.response.PostsResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface NoticeService {
    String updatePost(PostsRequest postsRequest);

    PostsResponse registerPost();

    String saveImages(MultipartFile file);

    List<Post> getPostList(PostItemRequest request);

    PostsResponse getPost(String postCode);
}
