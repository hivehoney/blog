package com.blog.notice.model.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ContentRequest {

    @ApiModelProperty(notes = "post ID")
    private String code;
    @ApiModelProperty(notes = "내용")
    private String content;

    @Builder
    public ContentRequest(String code, String content) {
        this.code = code;
        this.content = content;
    }
}
