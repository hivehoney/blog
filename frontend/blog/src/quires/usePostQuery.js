import {useQuery, useQueryClient} from 'react-query';
import axios from 'axios';
import {API} from "../config";

const QUERY_KEY = "POST";

export function getQueryKey(response) {
    return response === undefined ? [QUERY_KEY] : [QUERY_KEY, response];
}

async function getPost(code, options) {
    const { data } = await axios.get(`${API.POST}`, {
        params: { code },
        signal: options?.signal,
        headers: { Authorization: "my-access-token" },
    });
    return JSON.parse(data).data;
}

export function usePostQuery(code) {
    const queryClient = useQueryClient();

    const query = useQuery(
        QUERY_KEY,
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

