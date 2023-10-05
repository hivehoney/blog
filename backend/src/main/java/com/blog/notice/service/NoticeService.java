package com.blog.notice.service;

import com.blog.notice.model.request.PostItemRequest;
import com.blog.notice.model.request.PostsRequest;
import com.blog.notice.model.response.PostItemResponse;
import com.blog.notice.model.response.PostsResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface NoticeService {
    String updatePost(PostsRequest postsRequest);

    String registerPost();

    String saveImages(MultipartFile file, String postCode) throws IOException;

    void clearImages(List<String> imgFiles, String postCode) throws IOException;

    List<PostItemResponse> getPostList(PostItemRequest request);

    PostsResponse getPost(String postCode);
}
