package com.blog.notice.service;

import com.blog.notice.model.request.PostsRequest;

import java.util.List;

public interface NoticeService {
    void registerPost(PostsRequest postsRequest);
}
