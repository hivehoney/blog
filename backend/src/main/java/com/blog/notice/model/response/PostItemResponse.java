package com.blog.notice.model.response;

import com.blog.notice.domain.Post;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class PostItemResponse {

    @ApiModelProperty(notes = "post code")
    private String code;

    @ApiModelProperty(notes = "게시판 코드")
    private int boardId;

    @ApiModelProperty(notes = "게시물 제목")
    private String title;

    @ApiModelProperty(notes = "게시물 부제목")
    private String subTitle;

    @ApiModelProperty(notes = "작성자")
    private String author;

    @ApiModelProperty(notes = "태그")
    private String tag;

    @ApiModelProperty(notes = "조회수")
    private int view;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime postsDate;

    public PostItemResponse(String code, int boardId, String title, String subTitle,
                            String author, String tag, int view, LocalDateTime postsDate) {
        this.code = code;
        this.boardId = boardId;
        this.title = title;
        this.subTitle = subTitle;
        this.author = author;
        this.tag = tag;
        this.view = view;
        this.postsDate = postsDate;
    }

    public static PostItemResponse from(Post post) {
        return new PostItemResponse(post.getCode(), post.getBoardId(), post.getTitle(), post.getSubTitle(),
                post.getAuthor(), post.getTag(), post.getViews(), post.getCreatedAt());
    }

    public PostItemResponse(Post val) {
        this.code = val.getCode();
        this.boardId = val.getBoardId();
        this.title = val.getTitle();
        this.subTitle = val.getSubTitle();
        this.author = val.getAuthor();
        this.tag = val.getTag();
        this.view = val.getViews();
        this.postsDate = val.getCreatedAt();
    }
}
