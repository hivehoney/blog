package com.blog.notice.domain;

import com.blog.notice.model.request.ContentsRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

/**
 * 게시판 정보 Entity
 */
@Entity
@Getter
@Table(name = "blog_contents")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
public class Contents {
    @Id
    @Column(unique = true, nullable = false)
    private String postCode;

    @Column(columnDefinition = "TEXT")
    private String contents;

    @Builder
    public Contents(String postCode, String contents) {
        this.postCode = postCode;
        this.contents = contents;
    }

    public static Contents from(ContentsRequest contentsRequest) {
        return new Contents(contentsRequest.getPostCode(), contentsRequest.getContents());
    }

    public static Contents of(String postCode) {
        return new Contents(postCode, "임시 저장된 문서입니다.");
    }

    public void updateContents(String contents){
        this.contents = contents;
    }
}
