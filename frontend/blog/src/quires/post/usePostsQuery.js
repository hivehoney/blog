import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {addPost, deletePost, getPost, updatePost} from "../../api/blog";

const QUERY_KEY = "POSTCODE";

export const usePostsQuery = (postCode) => {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: [QUERY_KEY, postCode],
        queryFn: async () => await getPost(postCode),
        config: {staleTime: 60000, keepPreviousData: true},
        enabled: !postCode
    });

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

    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: function () {
                queryClient.invalidateQueries(['POSTLIST'], { exact: true });
            }
    });

    const updatePostMutation = useMutation({
        mutationFn: updatePost,
        onSuccess: function (data) {
            queryClient.invalidateQueries(["POSTCODE", data], { exact: true });
        }
    });

    const addPostMutation = useMutation({
        mutationFn: addPost,
        onSuccess: function (data) {
            queryClient.invalidateQueries(["POSTCODE", data], { exact: true });
        }
    });

    return {
        data: JSON.parse(data.data).data,
        deletePost: deletePostMutation.mutate,
        updatePost: updatePostMutation.mutate,
        addPost: addPostMutation.mutate,
    };
}