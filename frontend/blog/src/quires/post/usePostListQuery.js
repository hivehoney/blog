import {useInfiniteQuery, useQuery, useQueryClient} from "@tanstack/react-query";
import {getPostList} from "../../api/blog";
import {useState} from "react";

const QUERY_KEY = "POSTLIST";

export const usePostListQuery = (keyword) => {
    const queryClient = useQueryClient();

    const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery({
        queryKey: [QUERY_KEY],
        queryFn: ({pageParam}) => getPostList({pageParam, keyword}),
        getNextPageParam: (lastPage) => {
            return lastPage.last ? undefined : lastPage.data[lastPage.size-1].postsDate;
        },
        initialPageParam: "",
    });

    const moreDataHandler = () => {
        if (hasNextPage) {
            return fetchNextPage();
        }
    };

    var allPageData = data.pages.map((page) =>page.data);

    return {
        data: [].concat(...allPageData),
        moreDataHandler,
        hasNextPage
    };
}