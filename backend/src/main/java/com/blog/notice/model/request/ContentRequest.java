package com.blog.notice.model.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContentRequest {

    @ApiModelProperty(notes = "postCode")
    private String code;
    @ApiModelProperty(notes = "내용")
    private String content;

    @Builder
    public ContentRequest(String code, String content) {
        this.code = code;
        this.content = content;
    }
}
