package com.blog.notice.repository.Querydsl;

import com.blog.notice.domain.Post;
import com.blog.notice.domain.QContents;
import com.blog.notice.domain.QPost;
import com.blog.notice.model.request.PostItemRequest;
import com.blog.notice.model.response.PostsResponse;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.util.StringUtils.hasText;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;
    private static final QPost qpost = QPost.post;
    private static final QContents qcontents = QContents.contents1;

    public PostsResponse searchByCode(String code) {

        return jpaQueryFactory
                .select(
                        Projections.fields(PostsResponse.class,
                                qpost.postCode, qpost.title, qpost.subTitle, qpost.authorId,
                                qpost.updatedAt.as("postsDate"), qpost.tag, qcontents.contents
                                )
                )
                .from(qpost)
                .leftJoin(qcontents).on(qpost.postCode.eq(qcontents.postCode))
                .where(codeEq(code))
                .fetchOne();
    }

    private BooleanExpression codeEq(String postCode) {
        return hasText(postCode) ? qpost.postCode.eq(postCode) : null;
    }

    public List<Post> findBySearchOption(PostItemRequest request) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        booleanBuilder.and(qpost.status.eq(request.getStatus()));
//        booleanBuilder.and(qpost.boardId.eq(request.getBoardId()));

        return jpaQueryFactory
                .selectFrom(qpost)
                .where(booleanBuilder)
                .orderBy(qpost.updatedAt.desc())
                .fetch();
    }

    public Long countPostsByCode(String code) {
        return jpaQueryFactory
                .select(qpost)
                .from(qpost)
                .where(codeEq(code))
                .fetchCount();
    }

    public void updatePost(Post post) {

        JPAUpdateClause clause = jpaQueryFactory
                .update(qpost)
                .set(qpost.updatedAt, Expressions.constant(LocalDateTime.now()))
                .where(qpost.postCode.eq(post.getPostCode()));

                if (hasText(post.getTitle())) clause.set(qpost.title, post.getTitle());
                if (hasText(post.getSubTitle())) clause.set(qpost.subTitle, post.getSubTitle());
                if (hasText(post.getTag())) clause.set(qpost.tag, post.getTag());

                clause.execute();
    }

    private BooleanExpression titleEq(String title) {
        return hasText(title) ? qpost.title.eq(title) : null;
    }
}
