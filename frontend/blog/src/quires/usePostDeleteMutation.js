import axios from 'axios';
import {useMutation, useQueryClient} from 'react-query';
import {API} from "../config";

async function patchPost(data) {
    const { res } = await axios.patch(`${API.POSTDELETE}`, data,
        // { headers: { Authorization: "my-access-token" } }
    );
    return res;
}

export function usePostDeleteMutation() {
    const queryClient = useQueryClient();

    return useMutation((data) =>
        patchPost(data), {
        onMutate: async (data) => {
            // use the query key generator from useGetIssues
        },
        onSuccess: function () {
            queryClient.invalidateQueries(['POSTLIST'], { exact: true });
        },
    });
}
