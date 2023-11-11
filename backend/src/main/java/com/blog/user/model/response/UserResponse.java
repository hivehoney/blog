package com.blog.user.model.response;

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
public class UserResponse {

    @ApiModelProperty(notes = "post code")
    private String postCode;

    @ApiModelProperty(notes = "게시물 제목")
    private String title;

    @ApiModelProperty(notes = "게시물 부제목")
    private String subTitle;

    @ApiModelProperty(notes = "내용")
    private String contents;

    @ApiModelProperty(notes = "작성자")
    private String authorId;

    @ApiModelProperty(notes = "태그")
    private String tag;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime postsDate;

    public UserResponse(String postCode, String title, String subTitle, String contents,
                        String authorId, String tag, LocalDateTime postsDate) {
        this.postCode = postCode;
        this.title = title;
        this.subTitle = subTitle;
        this.contents = contents;
        this.authorId = authorId;
        this.tag = tag;
        this.postsDate = postsDate;
    }

//    public static UserResponse from(Post post, String contents) {
//        return new UserResponse(post.getPostCode(), post.getTitle(), post.getSubTitle(), contents,
//                post.getAuthorId(), post.getTag(), post.getCreatedAt());
//    }
}
