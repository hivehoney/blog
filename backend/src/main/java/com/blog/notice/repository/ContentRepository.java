package com.blog.notice.repository;

import com.blog.notice.domain.Content;
import com.blog.notice.repository.Querydsl.ContentRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, String>, ContentRepositoryCustom {
    Content findTopByContents(String contents);
}
