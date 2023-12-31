import {API} from "../../config";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const QUERY_KEY = "POSTLIST";

async function getPostList(data, options) {
    const res = await fetch(`${API.POSTS}`, {
        method: "POST",
        body: JSON.stringify(data),
        signal: options?.signal,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${getCookie("accessToken")}`,
        },
    });
    const responseData = await res.json(); // JSON 파싱

    return JSON.parse(responseData).data;
}

export function usePostListQuery(data) {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: [QUERY_KEY, data],
        queryFn: ({ signal }) => getPostList(data, { signal }),
        config: { staleTime: 60000, keepPreviousData: true },
    });

    return query;
}