package com.blog.notice.repository.Querydsl;

import lombok.RequiredArgsConstructor;
import com.blog.notice.domain.Post;
import com.blog.notice.domain.QContents;
import com.blog.notice.domain.QPost;
import com.blog.notice.model.response.PostItemResponse;
import com.blog.notice.model.response.PostsResponse;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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
                                qpost.postCode, qpost.title, qpost.subTitle, qpost.authorId, qpost.bannerImage,
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

    private BooleanExpression eqCursorDate(String date) {
        if (!StringUtils.isEmpty(date)) {
            return qpost.updatedAt.lt(LocalDateTime.parse(date));
        }
        return null;
    }

    public Slice<PostItemResponse> findBySearchOption(String keyword, String date, Pageable pageable) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        booleanBuilder.and(qpost.status.eq(1));
//        booleanBuilder.and(qpost.boardId.eq(request.getBoardId()));

        // 이전 페이지의 마지막 항목의 위치 정보를 가져옴
        int pageSize = pageable.getPageSize();

        List<Post> result = jpaQueryFactory
                .selectFrom(qpost)
                .where(booleanBuilder, eqCursorDate(date))
                .limit(pageSize+ 1)
                .orderBy(postSort(pageable))
                .fetch();

        boolean hasNext = false;

        List<PostItemResponse> post = result.stream().map(val -> new PostItemResponse(val)).collect(Collectors.toList());

        if (post.size() > pageable.getPageSize()) {
            post.remove(pageable.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(post, pageable, hasNext);
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
                .set(qpost.status, post.getStatus())
                .where(qpost.postCode.eq(post.getPostCode()));

                if (hasText(post.getTitle())) clause.set(qpost.title, post.getTitle());
                if (hasText(post.getBannerImage())) clause.set(qpost.bannerImage, post.getBannerImage());
                if (hasText(post.getSubTitle())) clause.set(qpost.subTitle, post.getSubTitle());
                if (hasText(post.getTag())) clause.set(qpost.tag, post.getTag());

                clause.execute();
    }

    /**
     * OrderSpecifier 를 쿼리로 반환하여 정렬조건을 맞춰준다.
     * 리스트 정렬
     * @param page
     * @return
     */
    private OrderSpecifier<?> postSort(Pageable page) {
        if (!page.getSort().isEmpty()) {
            for (Sort.Order order : page.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()){
                    case "title":
                        return new OrderSpecifier(direction, qpost.title);
                    case "updateDate":
                        return new OrderSpecifier(direction, qpost.updatedAt);
                    case "views":
                        return new OrderSpecifier(direction, qpost.views);
                }
            }
        }
        return null;
    }
}
