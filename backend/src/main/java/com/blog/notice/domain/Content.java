package com.blog.notice.domain;

import com.blog.notice.model.request.ContentRequest;
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

    public static Content of(ContentRequest contentRequest) {
        return new Content(contentRequest.getCode(), contentRequest.getContent());
    }
}
