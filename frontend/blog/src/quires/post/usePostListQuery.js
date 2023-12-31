import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getPostList} from "../../api/blog";

const QUERY_KEY = "POSTLIST";

export const usePostListQuery = (postItemRequest) => {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: [QUERY_KEY],
        queryFn: () => getPostList(postItemRequest),
        config: {staleTime: 60000, keepPreviousData: true},
    });

    return {
        data: JSON.parse(data).data,
        isLoading,
        error
    };
}