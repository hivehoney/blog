package com.blog.notice.model.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsRequest {

    @ApiModelProperty(notes = "post -> post 테이블에 저장")
    private PostItemRequest postItemRequest;

    @ApiModelProperty(notes = "contents -> post와 연관된 content 테이블에 저장")
    private ContentsRequest contentsRequest;

    @Builder
    public PostsRequest(PostItemRequest postItemRequest, ContentsRequest contentsRequest) {
        this.postItemRequest = postItemRequest;
        this.contentsRequest = contentsRequest;
    }
}
