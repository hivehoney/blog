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
    private int boardId;
    @Column(unique = true, nullable = false)
    private String code;
    private String title;
    private String subTitle;
    private String author;
    private String modifier;
    private int status;
    private int views;
    private String tag;

    public Post(int boardId, String code, String title, String subTitle, String author, String modifier
            , int status, String tag) {
        this.boardId = boardId;
        this.code = code;
        this.title = title;
        this.subTitle = subTitle;
        this.author = author;
        this.modifier = modifier;
        this.status = status;
        this.tag = tag;
    }

    public Post(int boardId, String code, String title, String author, int status) {
        this.boardId = boardId;
        this.code = code;
        this.title = title;
        this.author = author;
        this.status = status;
    }

    public static Post from(PostItemRequest request) {
        return new Post(request.getBoardId(), request.getCode(), request.getTitle(), request.getSubTitle(),
                request.getAuthor(), request.getModifier(), request.getStatus(), request.getTag());
    }

    public static Post of(int boardId, String author) {
        return new Post(boardId, CodeGenerator.generateWithPrefix("POST"), "Temp Title", author, 1);
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
