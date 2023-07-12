package com.blog.notice.controller;

import com.blog.notice.service.NoticeService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {

    private final NoticeService noticeService;

    @ApiOperation(value = "게시판 목록 조회", notes = "게시판 목록을 조회 합니다.")
    @GetMapping(value = "/board")
    public String list() {

        return noticeService.getNoticeList();
    }
}

