import {useQuery, useQueryClient} from 'react-query';
import {API} from "../../config";

const QUERY_KEY = "POSTCODE";

export function getQueryKey(response) {
    return response === undefined ? [QUERY_KEY] : [QUERY_KEY, response];
}

async function getPost(code, options) {
    const response = await fetch(`${API.POST}?code=${code}`, {
        method: "GET",
        signal: options?.signal,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    const responseData = await response.json();

    return JSON.parse(responseData).data;
}

export function usePostQuery(code) {
    const queryClient = useQueryClient();

    const query = useQuery(
        [QUERY_KEY, code],
        ({ signal }) => getPost(code, { signal }),
        { staleTime: 60000, keepPreviousData: true }
    );

    //다음 데이터 로딩
   /* useEffect(() => {
        if (query.data && query.data.meta) {
            queryClient.prefetchQuery(
                QUERY_KEY,
                ({ signal }) => getPost(code, { signal }),
                { staleTime: 60000 },
            );
        }
    }, [query.data, queryClient]);*/

    return query;
};

