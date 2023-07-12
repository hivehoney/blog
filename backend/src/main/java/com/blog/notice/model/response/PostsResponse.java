package com.blog.notice.model.response;

import com.blog.notice.domain.Posts;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class PostsResponse {

    private long id;

    @ApiModelProperty(notes = "게시판 코드")
    private String postCode;

    @ApiModelProperty(notes = "게시판명")
    private String name;

    @ApiModelProperty(notes = "게시판 유형")
    private int postsType;

    @ApiModelProperty(notes = "내용")
    private String contents;

    @ApiModelProperty(notes = "작성자")
    private String userId;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime postsDate;

    public PostsResponse(long id, String postCode, String name, int postsType, String contents,
                         String userId, LocalDateTime postsDate) {
        this.id = id;
        this.postCode = postCode;
        this.name = name;
        this.postsType = postsType;
        this.contents = contents;
        this.userId = userId;
        this.postsDate = postsDate;
    }

    public static PostsResponse from(Posts posts) {
        return new PostsResponse(posts.getId(), posts.getPostCode(), posts.getName(), posts.getPostsType(), posts.getContents(),
                posts.getUserId(), posts.getCreatedAt());
    }
}
