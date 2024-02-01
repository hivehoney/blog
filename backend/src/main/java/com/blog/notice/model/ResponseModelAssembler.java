package com.blog.notice.model;

import com.blog.notice.model.response.PostItemResponse;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.SlicedResourcesAssembler;
import org.springframework.hateoas.*;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;

import java.util.List;
import java.util.stream.Collectors;

public class ResponseModelAssembler {
    public static class CustomSlicedModel<T> extends SlicedModel<EntityModel<T>> {
        private final boolean hasNext;

        public CustomSlicedModel(SlicedModel<EntityModel<T>> content, boolean hasNext) {
            super(content.getContent(), content.getMetadata());
            this.hasNext = hasNext;
        }

        public boolean isHasNext() {
            return hasNext;
        }
    }

    public static <T> EntityModel<T> addSelfLink(T content) {
        Class<?> contentClass = content.getClass();
        List<Link> links;

        if (contentClass == PostItemResponse.class) {
            // 형변환을 통해 getCode 메서드 호출
            String code = ((PostItemResponse) content).getPostCode();
            links = List.of(
                    WebMvcLinkBuilder.linkTo(contentClass).slash("/posts/"+code).withSelfRel().withType("GET"),
                    WebMvcLinkBuilder.linkTo(contentClass).slash("/posts/delete/"+code).withRel("delete").withType("POST"),
                    WebMvcLinkBuilder.linkTo(contentClass).slash("/posts/update").withRel("update").withType("POST")
            );
        } else {
            links = List.of(WebMvcLinkBuilder.linkTo(contentClass).slash("getSelfLink").withSelfRel());
        }

        return EntityModel.of(content, links);
    }

    public static <T> List<EntityModel<T>> addSelfLinks(List<T> contentList) {
        return contentList.stream()
                .map(ResponseModelAssembler::addSelfLink)
                .collect(Collectors.toList());
    }

    public static <T> CustomSlicedModel<T> addSelfLinks(Slice<T> contentSlice, SlicedResourcesAssembler<T> assembler) {
        SlicedModel<EntityModel<T>> contentSliceModel = assembler.toModel(contentSlice, ResponseModelAssembler::addSelfLink);
        boolean hasNext = contentSlice.hasNext();
        return new CustomSlicedModel<>(contentSliceModel, hasNext);
    }
}