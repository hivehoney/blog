package com.blog.notice.model.request;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostItemRequest {

    @Id
    @Column(unique = true, nullable = false)
    private String postCode;
    
    @ApiModelProperty(notes = "제목")
    private String title;

    @ApiModelProperty(notes = "부제목")
    private String subTitle;

    @ApiModelProperty(notes = "작성자")
    private String authorId;

    @ApiModelProperty(notes = "상태값 (0:취소,1:정상)", value = "1")
    private int status;

    @ApiModelProperty(notes = "태그")
    private String tag;

    @Builder
    public PostItemRequest(String postCode, String title, String subTitle, String authorId, int status, String tag) {
        this.postCode = postCode;
        this.title = title;
        this.subTitle = subTitle;
        this.authorId = authorId;
        this.status = status;
        this.tag = tag;
    }
}
