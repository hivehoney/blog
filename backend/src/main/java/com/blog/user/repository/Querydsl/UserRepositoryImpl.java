package com.blog.user.repository.Querydsl;

import com.blog.notice.domain.QContents;
import com.blog.notice.domain.QPost;
import com.blog.user.model.response.UserResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;
    private static final QPost qpost = QPost.post;
    private static final QContents qcontents = QContents.contents1;

    public UserResponse searchByCode(String code) {

        return jpaQueryFactory
                .select(
                        Projections.fields(UserResponse.class,
                                qpost.postCode, qpost.title, qpost.subTitle, qpost.authorId,
                                qpost.updatedAt.as("postsDate"), qpost.tag, qcontents.contents
                                )
                )
                .from(qpost)
                .leftJoin(qcontents).on(qpost.postCode.eq(qcontents.postCode))
//                .where(codeEq(code))
                .fetchOne();
    }

}
