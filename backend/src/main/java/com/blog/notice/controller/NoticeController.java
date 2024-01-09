package com.blog.notice.controller;

import com.blog.common.constants.Const;
import com.blog.common.controller.ApiController;
import com.blog.common.domain.UserAccount;
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
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    @RequestMapping(value = "/getPostsList", method = RequestMethod.GET)
    public Slice<PostItemResponse> getPostsList(@RequestParam(value="keyword", required=false) String keyword,
                                                @RequestParam(value="last", required=false) String date, Pageable pageable) {
        return noticeService.getPostList(keyword, date, pageable);
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
        List<String> imgFiles = (List<String>) map.get("imgFile");

        noticeService.updatePost(postItemRequest);
        //본문 등록
        String postCode = noticeService.updateContents(contentsRequest);
        noticeService.clearImages(imgFiles, postCode);

        return postCode;
    }

    @ApiOperation(value = "post 등록", notes = "post를 등록 합니다.")
    @RequestMapping(value = "/registerPost", method = RequestMethod.PATCH)
    public String registerPost(@AuthenticationPrincipal UserAccount userAccount) {
        return noticeService.registerPost(userAccount);
    }

    @ApiOperation(value = "IMG Upload", notes = "IMG를 업로드 합니다.")
    @PostMapping(value = "/imgUpload",  consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam(value = "upload") MultipartFile request, @RequestParam(value = "postCode") String postCode,
                                                           @RequestParam(value = "type", required = false, defaultValue = "0") int type) throws IOException {

        String imgURL = Const.baseImgURL + noticeService.saveImages(request, postCode, type);

        if (type == 1) {
            noticeService.updateBannerImage(postCode, imgURL);
        }

        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("url", imgURL);
        logger.info(paramMap);

         return ResponseEntity.ok(paramMap);
    }
}

