package com.blog.notice.model.response;

import com.blog.notice.domain.Post;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class PostsResponse {

    @ApiModelProperty(notes = "post ID")
    private long id;

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

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime postsDate;

    public PostsResponse(long id, long boardId, String title, String subTitle, String contents,
                         String author, LocalDateTime postsDate) {
        this.id = id;
        this.boardId = boardId;
        this.title = title;
        this.subTitle = subTitle;
        this.contents = contents;
        this.author = author;
        this.postsDate = postsDate;
    }

    public static PostsResponse from(Post post, String contents) {
        return new PostsResponse(post.getId(), post.getBoardId(), post.getTitle(), post.getSubTitle(), contents,
                post.getAuthor(), post.getCreatedAt());
    }
}
