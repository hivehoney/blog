import {useQuery, useQueryClient} from 'react-query';
import {API} from "../config";

const QUERY_KEY = "POSTLIST";

async function getPostList(data, options) {
    try {
        const res = await fetch(`${API.POSTS}`, {
            method: "POST",
            body: JSON.stringify(data),
            signal: options?.signal,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'my-access-token'
            },
        });

        const responseData = await res.json(); // JSON 파싱

        return JSON.parse(responseData).data;
    } catch (error) {
        throw error;
    }
}

// const usePostListQuery = ({ data }) => {
//     const { handleError } = useApiError();
//
//     return useQuery( "POSTS", () => getPostList(data), {
//         onError: (error) => {
//             handleError(error);
//         },
//         select: (data) => {
//             if (data && data.status === 200) {
//                 return data.data;
//             } else {
//                 const error = {
//                     status: "404",
//                     message: '세션 정보가 없습니다.',
//                     code: data,
//                 };
//                 handleError(error);
//             }
//         },
//     });
// };

export function usePostListQuery(data) {
    const queryClient = useQueryClient();

    const query = useQuery(
        QUERY_KEY,
        ({ signal }) => getPostList(data, { signal }),
        { staleTime: 60000, keepPreviousData: true }
    );

    return query;
};

