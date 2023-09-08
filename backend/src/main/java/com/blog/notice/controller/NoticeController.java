package com.blog.notice.controller;

import com.blog.common.controller.ApiController;
import com.blog.notice.model.request.PostsRequest;
import com.blog.notice.service.NoticeService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeController extends ApiController {

    private final NoticeService noticeService;

    @ApiOperation(value = "content 등록", notes = "작성한 content를 등록 합니다.")
    @PostMapping(value = "/registerPost",  consumes = MediaType.APPLICATION_JSON_VALUE)
    public String registerPost(@RequestBody PostsRequest postsRequest) {
        noticeService.registerPost(postsRequest);
        return "check";
    }

    @ApiOperation(value = "IMG Upload", notes = "IMG를 업로드 합니다.")
    @PostMapping(value = "/imgUpload",  consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String, Object> uploadImage(@RequestParam(value="upload", required = false) MultipartFile request) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("url", noticeService.saveImages(request));

        return paramMap;
    }
}

