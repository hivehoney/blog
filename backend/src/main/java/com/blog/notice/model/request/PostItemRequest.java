package com.blog.notice.model.request;

import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostItemRequest {

    @ApiModelProperty(notes = "게시판 ID")
    private int boardId;

    @Column(unique = true, nullable = false)
    private String code;
    
    @ApiModelProperty(notes = "제목")
    private String title;

    @ApiModelProperty(notes = "부제목")
    private String subTitle;

    @ApiModelProperty(notes = "작성자")
    private String author;

    @ApiModelProperty(notes = "수정자")
    private String modifier;

    @ApiModelProperty(notes = "상태값 (0:취소,1:정상)", value = "1")
    private int status;

    @ApiModelProperty(notes = "태그")
    private String tag;

    @Builder
    public PostItemRequest(int boardId, String code, String title, String subTitle, String author, String modifier, int status, String tag) {
        this.boardId = boardId;
        this.code = code;
        this.title = title;
        this.subTitle = subTitle;
        this.author = author;
        this.modifier = modifier;
        this.status = status;
        this.tag = tag;
    }
}
