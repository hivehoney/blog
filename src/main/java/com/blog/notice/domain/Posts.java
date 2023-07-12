package com.blog.notice.domain;

import com.blog.common.domain.BaseEntity;
import com.blog.common.util.CodeGenerator;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * 게시판 정보 Entity
 */
@Entity
@Getter
@Table(name = "Posts")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Posts extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String postCode;

    private String name;

    private int postsType;

    @Lob
    private String contents;

    private String userId;

    @Enumerated(EnumType.STRING)
    private PostsStatus postsStatus;

    public Posts(Builder builder) {
        this.postCode = builder.postCode;
        this.name = builder.name;
        this.postsType = builder.postsType;
        this.contents = builder.contents;
        this.userId = builder.userId;
        this.postsStatus = builder.postsStatus;
    }

    public static class Builder {
        private final String postCode;
        private final String name;
        private final int postsType;
        private final String contents;
        private final String userId;
        private final PostsStatus postsStatus;

        public Builder(String name, int postsType, String contents, String userId, PostsStatus postsStatus) {
            this.postCode = CodeGenerator.generateWithPrefix("ORDER");
            this.name = name;
            this.postsType = postsType;
            this.contents = contents;
            this.userId = userId;
            this.postsStatus = postsStatus;
        }

        public Posts build() {
            return new Posts(this);
        }
    }

    @Getter
    public enum PostsStatus {
        WAIT("작성중"),
        COMPLETE("작성 완료"),
        CANCEL("작성 취소");

        private final String name;

        PostsStatus(String name) {
            this.name = name;
        }
    }
}
