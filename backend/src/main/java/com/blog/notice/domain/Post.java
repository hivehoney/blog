package com.blog.notice.domain;

import com.blog.common.domain.BaseEntity;
import com.blog.common.util.CodeGenerator;
import com.blog.notice.model.request.PostItemRequest;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * 게시물 정보 Entity
 */
@Entity
@Getter
@Table(name = "blog_post")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseEntity {

    @Id
    @Column(unique = true, nullable = false)
    private String postCode;
    private String title;
    private String subTitle;
    private String authorId;
    private int status;
    private int views;
    private String bannerImage;
    private String tag;

    public Post(String postCode, String title, String subTitle, String authorId, int status, String tag) {
        this.postCode = postCode;
        this.title = title;
        this.subTitle = subTitle;
        this.authorId = authorId;
        this.status = status;
        this.tag = tag;
    }

    public Post(String postCode, String title, String authorId, int status) {
        this.postCode = postCode;
        this.title = title;
        this.authorId = authorId;
        this.status = status;
    }

    public static Post from(PostItemRequest request) {
        return new Post(request.getPostCode(), request.getTitle(), request.getSubTitle(),
                request.getAuthorId(), request.getStatus(), request.getTag());
    }

    public static Post of(String author) {
        return new Post(CodeGenerator.generateWithPrefix("POST"), "Temp Title", author, 1);
    }

    @Getter
    public enum PostStatus {
        WAIT("작성중"),
        COMPLETE("작성 완료"),
        CANCEL("작성 취소");

        private final String name;

        PostStatus(String name) {
            this.name = name;
        }
    }
}
