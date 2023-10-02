package com.blog.notice.controller;

import com.blog.common.controller.ApiController;
import com.blog.notice.model.request.ContentRequest;
import com.blog.notice.model.request.PostItemRequest;
import com.blog.notice.model.request.PostsRequest;
import com.blog.notice.model.response.PostItemResponse;
import com.blog.notice.model.response.PostsResponse;
import com.blog.notice.service.NoticeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.ApiOperation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController extends ApiController {

    private final NoticeService noticeService;

    @ApiOperation(value = "post 목록 조회", notes = "Post 목록을 조회 합니다.")
    @RequestMapping(value = "/getPostsList",  consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<PostItemResponse> getPostsList(HttpServletRequest request,
                                               @RequestBody PostItemRequest postItemRequest) {
        return noticeService.getPostList(postItemRequest);
    }

    @ApiOperation(value = "post 조회", notes = "작성된 Post를 조회 합니다.")
    @RequestMapping(value = "/getPost/{code}", method = RequestMethod.GET)
    public PostsResponse getPost(@PathVariable("code") String code) {
        return noticeService.getPost(code);
    }

    @ApiOperation(value = "post 수정", notes = "작성한 post 수정 합니다.")
    @RequestMapping(value = "/updatePost", method = RequestMethod.PATCH)
    public String updatePost(@RequestBody HashMap<String, Object> postParams) throws IOException {
        //객체 생성
        ObjectMapper objectMapper = new ObjectMapper();
        PostItemRequest postItemRequest = objectMapper.convertValue(postParams.get("postItemRequest"), PostItemRequest.class);
        ContentRequest contentRequest = objectMapper.convertValue(postParams.get("contentRequest"), ContentRequest.class);

        PostsRequest postsRequest = PostsRequest.builder()
                .postItemRequest(postItemRequest)
                .contentRequest(contentRequest)
                .build();

        List<String> imgFiles = (List<String>) postParams.get("imgFile");

        //본문 등록
        noticeService.clearImages(imgFiles, noticeService.updatePost(postsRequest));

        return "저장 되었습니다.";
    }

    @ApiOperation(value = "post 등록", notes = "post를 등록 합니다.")
    @RequestMapping(value = "/registerPost")
    public String registerPost() { return noticeService.registerPost(); }

    @ApiOperation(value = "IMG Upload", notes = "IMG를 업로드 합니다.")
    @PostMapping(value = "/imgUpload",  consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam(value = "upload", required = false) MultipartFile request,
                                                           @RequestParam(value = "postCode") String postCode) throws IOException {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("url", "C:\\Users\\Administrator\\IdeaProjects\\blog\\backend\\"+noticeService.saveImages(request, postCode));

        return ResponseEntity.ok(paramMap);
    }
}

