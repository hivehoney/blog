package com.blog.notice.controller;

import com.blog.common.controller.ApiController;
import com.blog.notice.model.request.PostsRequest;
import com.blog.notice.service.NoticeService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController extends ApiController {

    private final NoticeService noticeService;

    @ApiOperation(value = "content 등록", notes = "작성한 content를 등록 합니다.")
    @PostMapping(value = "/registerPost",  consumes = MediaType.APPLICATION_JSON_VALUE)
    public String registerPost(@RequestBody PostsRequest postsRequest) {

        noticeService.registerPost(postsRequest);
        return "check";
    }
}

