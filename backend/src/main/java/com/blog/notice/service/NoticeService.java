package com.blog.notice.service;

import com.blog.common.domain.UserAccount;
import com.blog.notice.model.request.ContentsRequest;
import com.blog.notice.model.request.PostItemRequest;
import com.blog.notice.model.response.PostItemResponse;
import com.blog.notice.model.response.PostsResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface NoticeService {
    void updatePost(PostItemRequest postItemRequest);
    void updateBannerImage(String postCode, String bannerImage);
    String updateContents(ContentsRequest contentsRequest);

    String registerPost(UserAccount userAccount);

    String saveImages(MultipartFile file, String postCode, int type) throws IOException;

    void clearImages(List<String> imgFiles, String postCode) throws IOException;

    String deletePost(String postCode);

    Slice<PostItemResponse> getPostList(String keyword, String date, Pageable pageable);

    PostsResponse getPost(String postCode);
}
