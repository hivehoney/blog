package com.blog.notice.repository.Querydsl;

import com.blog.notice.domain.Post;
import com.blog.notice.domain.QContent;
import com.blog.notice.domain.QPost;
import com.blog.notice.model.request.PostItemRequest;
import com.blog.notice.model.response.PostsResponse;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;
    private static final QPost post = QPost.post;
    private static final QContent content = QContent.content;

    @Override
    public PostsResponse searchById(String id) {

        return jpaQueryFactory
                .select(
                        Projections.fields(PostsResponse.class,
                                post.code, post.title, post.subTitle, post.author,
                                post.createdAt.as("postsDate"), post.tag, content.contents
                                )
                )
                .from(post)
                .leftJoin(content).on(post.code.eq(content.code))
                .where(post.code.eq(id))
                .fetchOne();
    }

    @Override
    public List<Post> findBySearchOption(PostItemRequest request) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        booleanBuilder.and(post.status.eq(1)  );
        booleanBuilder.or(post.boardId.eq(request.getBoardId()));

        return jpaQueryFactory
                .selectFrom(post)
                .where(booleanBuilder)
                .orderBy(post.createdAt.desc())
                .fetch();
    }
}
