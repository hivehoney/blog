package com.blog.notice.model.request;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Getter;

@Getter
public class PostsRequest {

    @ApiModelProperty(notes = "게시판 코드")
    private String postCode;

    @ApiModelProperty(notes = "게시판명")
    private String name;

    @ApiModelProperty(notes = "게시판 유형")
    private int noticeType;

    @Builder
    public PostsRequest(String postCode, String name, int noticeType) {
        this.postCode = postCode;
        this.name = name;
        this.noticeType = noticeType;
    }
}
