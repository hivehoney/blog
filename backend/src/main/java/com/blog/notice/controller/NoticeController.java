package com.blog.notice.controller;

import com.blog.common.controller.ApiController;
import com.blog.notice.model.request.ContentsRequest;
import com.blog.notice.model.request.PostItemRequest;
import com.blog.notice.model.request.PostsRequest;
import com.blog.notice.model.response.PostItemResponse;
import com.blog.notice.model.response.PostsResponse;
import com.blog.notice.service.NoticeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeController extends ApiController {

    private final Logger logger = LogManager.getLogger(NoticeController.class);

    private final NoticeService noticeService;

    @ApiOperation(value = "post 목록 조회", notes = "Post 목록을 조회 합니다.")
    @RequestMapping(value = "/getPostsList", method = RequestMethod.POST)
    public List<PostItemResponse> getPostsList(@RequestBody PostItemRequest postItemRequest) {
        return noticeService.getPostList(postItemRequest);
    }

    @ApiOperation(value = "post 조회", notes = "작성된 Post를 조회 합니다.")
    @RequestMapping(value = "/getPost", method = RequestMethod.GET)
    public PostsResponse getPost(@RequestParam(value = "code") String postCode) {
        return noticeService.getPost(postCode);
    }

    @ApiOperation(value = "post 삭제", notes = "작성한 Post를 삭제 합니다.")
    @RequestMapping(value = "/deletePost", method = RequestMethod.PATCH)
    public String deletePost(@RequestBody PostItemRequest request) {
        return noticeService.deletePost(request.getPostCode());
    }

    @ApiOperation(value = "post 수정", notes = "작성한 post 수정 합니다.")
    @RequestMapping(value = "/updatePost", method = RequestMethod.PATCH)
    public String updatePost(@RequestBody HashMap<String, Object> map) throws IOException {
        //객체 생성
        ObjectMapper objectMapper = new ObjectMapper();
        PostItemRequest postItemRequest = objectMapper.convertValue(map.get("postInfo"), PostItemRequest.class);
        ContentsRequest contentsRequest = objectMapper.convertValue(map.get("content"), ContentsRequest.class);

        PostsRequest postsRequest = PostsRequest.builder()
                .postItemRequest(postItemRequest)
                .contentsRequest(contentsRequest)
                .build();

        List<String> imgFiles = (List<String>) map.get("imgFile");

        String postCode = noticeService.updatePost(postsRequest);
        //본문 등록
        noticeService.clearImages(imgFiles, postCode);

        return postCode;
    }

    @ApiOperation(value = "post 등록", notes = "post를 등록 합니다.")
    @RequestMapping(value = "/registerPost", method = RequestMethod.PATCH)
    public String registerPost() {
        return noticeService.registerPost();
    }

    @ApiOperation(value = "IMG Upload", notes = "IMG를 업로드 합니다.")
    @PostMapping(value = "/imgUpload",  consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam(value = "upload", required = false) MultipartFile request,
                                                           @RequestParam(value = "postCode") String postCode) throws IOException {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("url", "/" + postCode + "/" + noticeService.saveImages(request, postCode));
        logger.info(paramMap);
        return ResponseEntity.ok(paramMap);
    }
}

