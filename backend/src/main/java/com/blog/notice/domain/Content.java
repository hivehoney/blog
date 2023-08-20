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
    @Lob
    private String content;

    @Builder
    public Content(String code, String content) {
        this.code = code;
        this.content = content;
    }

    public static Content of(String code, ContentRequest request) {
        return new Content(code, request.getContent());
    }
}
