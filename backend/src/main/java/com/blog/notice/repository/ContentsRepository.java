package com.blog.notice.repository;

import com.blog.notice.domain.Contents;
import com.blog.notice.repository.Querydsl.ContentsRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentsRepository extends JpaRepository<Contents, String>, ContentsRepositoryCustom {
    Contents findByPostCode(String postCode);
}
