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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseEntity {

    @Setter
    private long boardId;
    @Column(unique = true, nullable = false)
    private String code;
    private String title;
    private String subTitle;
    private String author;
    private String modifier;
    private int status;
    private int views;
    private String tag;

    public Post(long boardId, String code, String title, String subTitle, String author, String modifier
            , int status, int views, String tag) {
        this.boardId = boardId;
        this.code = code;
        this.title = title;
        this.subTitle = subTitle;
        this.author = author;
        this.modifier = modifier;
        this.status = status;
        this.views = views;
        this.tag = tag;
    }

    public static Post of(PostItemRequest request) {
        return new Post(request.getBoardId(), CodeGenerator.generateWithPrefix("POST"), request.getTitle(), request.getSubTitle(),
                request.getAuthor(), null, request.getStatus(), 0, request.getTag());
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
