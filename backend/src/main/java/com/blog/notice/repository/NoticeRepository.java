package com.blog.notice.repository;


import com.blog.notice.domain.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Posts, Long> {
}
