package com.blog.notice.model.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContentsRequest {

    @ApiModelProperty(notes = "postCode")
    private String postCode;
    @ApiModelProperty(notes = "내용")
    private String contents;

    @Builder
    public ContentsRequest(String postCode, String contents) {
        this.postCode = postCode;
        this.contents = contents;
    }
}
