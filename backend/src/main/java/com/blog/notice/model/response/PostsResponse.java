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
public class PostsResponse {

    @ApiModelProperty(notes = "post code")
    private String code;

    @ApiModelProperty(notes = "게시판 코드")
    private long boardId;

    @ApiModelProperty(notes = "게시물 제목")
    private String title;

    @ApiModelProperty(notes = "게시물 부제목")
    private String subTitle;

    @ApiModelProperty(notes = "내용")
    private String contents;

    @ApiModelProperty(notes = "작성자")
    private String author;

    @ApiModelProperty(notes = "태그")
    private String tag;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime postsDate;


    public PostsResponse(String code, long boardId, String title, String subTitle, String contents,
                         String author, String tag, LocalDateTime postsDate) {
        this.code = code;
        this.boardId = boardId;
        this.title = title;
        this.subTitle = subTitle;
        this.contents = contents;
        this.author = author;
        this.tag = tag;
        this.postsDate = postsDate;
    }

    public static PostsResponse from(Post post, String contents) {
        return new PostsResponse(post.getCode(), post.getBoardId(), post.getTitle(), post.getSubTitle(), contents,
                post.getAuthor(), post.getTag(), post.getCreatedAt());
    }
}
