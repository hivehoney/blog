package com.blog.notice.repository.Querydsl;

import com.blog.notice.domain.QContents;
import com.blog.notice.domain.QPost;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ContentsRepositoryImpl implements ContentsRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;
    private static final QPost qpost = QPost.post;
    private static final QContents qcontents = QContents.contents1;
}
