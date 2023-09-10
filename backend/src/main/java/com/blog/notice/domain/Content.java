package com.blog.notice.domain;

import com.blog.common.domain.BaseEntity;
import com.blog.common.util.CodeGenerator;
import com.blog.notice.model.request.ContentRequest;
import com.blog.notice.model.request.PostItemRequest;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 게시판 정보 Entity
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Content {
    @Id
    @Column(unique = true, nullable = false)
    private String code;

    @Column(columnDefinition = "TEXT")
    private String contents;

    @Builder
    public Content(String code, String contents) {
        this.code = code;
        this.contents = contents;
    }

    public static Content of(String code, String contents) {
        return new Content(code, contents);
    }
}
