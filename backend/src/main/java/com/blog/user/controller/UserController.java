package com.blog.user.controller;

import com.blog.common.controller.ApiController;
import com.blog.notice.service.NoticeService;
import com.blog.user.model.request.UserRequest;
import com.blog.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController extends ApiController {
    private final Logger logger = LogManager.getLogger(UserController.class);

    private final UserService userService;

    @ApiOperation(value = "사용자 등록", notes = "사용자를 등록 합니다.")
    @RequestMapping(value = "/register", method = RequestMethod.PATCH)
    public ResponseEntity.BodyBuilder registerUser(@RequestBody UserRequest userRequest) {
        userService.registerUser(userRequest);
        return ResponseEntity.ok();
    }
}

