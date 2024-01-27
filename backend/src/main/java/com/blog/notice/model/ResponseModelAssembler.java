package com.blog.notice.model;

import com.blog.notice.model.response.PostItemResponse;
import org.springframework.data.domain.Slice;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;

import java.util.List;
import java.util.stream.Collectors;

public class ResponseModelAssembler {
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

/*
    public static <T> List<EntityModel<T>> addSelfLinks(List<T> contentList) {
        return contentList.stream()
                .map(ResponseModelAssembler::addSelfLink)
                .collect(Collectors.toList());
    }
*/

    public static <T> CollectionModel<EntityModel<T>> addSelfLinks(Slice<T> contentSlice) {
        List<EntityModel<T>> contentList = contentSlice.getContent().stream()
                .map(ResponseModelAssembler::addSelfLink)
                .collect(Collectors.toList());
        return CollectionModel.of(contentList);
    }

/*    public static <T> PagedModel<EntityModel<T>> addSelfLinks(Slice<T> contentSlice, String keyword, String date, Pageable pageable) {
        List<EntityModel<T>> contentList = contentSlice.getContent().stream()
                .map(ResponseModelAssembler::addSelfLink)
                .collect(Collectors.toList());

        PagedModel.PageMetadata pageMetadata = PagedModel.PageMetadata.of(contentSlice.getSize(), contentSlice.getNumber(), contentSlice.getTotalElements(), contentSlice.getTotalPages());
        
        return PagedModel.of(contentList, PagedModel.PageMetadata.of(contentSlice.getSize(), contentSlice.getNumber()));
    }*/
}