package com.blog.notice.controller;

import com.blog.common.controller.ApiController;
import com.blog.notice.domain.Post;
import com.blog.notice.model.request.PostItemRequest;
import com.blog.notice.model.request.PostsRequest;
import com.blog.notice.model.response.PostsResponse;
import com.blog.notice.service.NoticeService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController extends ApiController {

    private final NoticeService noticeService;

    @ApiOperation(value = "post 목록 조회", notes = "Post 목록을 조회 합니다.")
    @PostMapping(value = "/getPostsList",  consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<Post> getPostsList(@RequestBody PostItemRequest postItemRequest) {
        return noticeService.getPostList(postItemRequest);
    }

    @ApiOperation(value = "post 조회", notes = "작성된 Post를 조회 합니다.")
    @RequestMapping(value = "/getPost/{code}", method = RequestMethod.POST)
    public PostsResponse getPost(@PathVariable("code") String code) {
        return noticeService.getPost(code);
    }

    @ApiOperation(value = "post 수정", notes = "작성한 post 수정 합니다.")
    @PostMapping(value = "/updatePost",  consumes = MediaType.APPLICATION_JSON_VALUE)
    public String updatePost(@RequestBody PostsRequest postsRequest) {
        return noticeService.updatePost(postsRequest);
    }

    @ApiOperation(value = "post 등록", notes = "post를 등록 합니다.")
    @RequestMapping(value = "/registerPost")
    public PostsResponse registerPost() {  return noticeService.registerPost(); }

    @ApiOperation(value = "IMG Upload", notes = "IMG를 업로드 합니다.")
    @PostMapping(value = "/imgUpload",  consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam(value="upload", required = false) MultipartFile request) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("url", "C:\\Users\\Administrator\\IdeaProjects\\blog\\backend\\"+noticeService.saveImages(request));

        return ResponseEntity.ok(paramMap);
    }
}

