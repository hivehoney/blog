package com.blog.notice.service;

import com.blog.notice.model.request.PostsRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface NoticeService {
    String registerPost(PostsRequest postsRequest);

    String saveImages(MultipartFile file);
}
