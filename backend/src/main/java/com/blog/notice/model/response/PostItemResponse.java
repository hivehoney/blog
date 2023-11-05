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
    private String postCode;

    @ApiModelProperty(notes = "게시물 제목")
    private String title;

    @ApiModelProperty(notes = "배너 이미지")
    private String bannerImage;

    @ApiModelProperty(notes = "게시물 부제목")
    private String subTitle;

    @ApiModelProperty(notes = "작성자")
    private String authorId;

    @ApiModelProperty(notes = "태그")
    private String tag;

    @ApiModelProperty(notes = "조회수")
    private int view;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime postsDate;

    public PostItemResponse(String postCode, String title, String bannerImage, String subTitle,
                            String authorId, String tag, int view, LocalDateTime postsDate) {
        this.postCode = postCode;
        this.title = title;
        this.bannerImage = bannerImage;
        this.subTitle = subTitle;
        this.authorId = authorId;
        this.tag = tag;
        this.view = view;
        this.postsDate = postsDate;
    }

    public static PostItemResponse from(Post post) {
        return new PostItemResponse(post.getPostCode(), post.getTitle(), post.getBannerImage(), post.getSubTitle(),
                post.getAuthorId(), post.getTag(), post.getViews(), post.getCreatedAt());
    }

    public PostItemResponse(Post val) {
        this.postCode = val.getPostCode();
        this.title = val.getTitle();
        this.bannerImage = val.getBannerImage();
        this.subTitle = val.getSubTitle();
        this.authorId = val.getAuthorId();
        this.tag = val.getTag();
        this.view = val.getViews();
        this.postsDate = val.getCreatedAt();
    }
}
