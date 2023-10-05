import axios from 'axios';
import {useMutation, useQueryClient} from 'react-query';
import useApiError from "../common/useApiError";
import {API} from "../config";

async function patchPost(data) {
    const { res } = await axios.patch(API.POSTUPDATE, data,
        // { headers: { Authorization: "my-access-token" } }
    );
    return res;
}

export function usePostMutation() {
    const queryClient = useQueryClient();

    return useMutation((data) =>
        patchPost(data), {
        onMutate: async (data) => {
            // use the query key generator from useGetIssues
            console.log("onMutate")
        },
        onSuccess: function () {

        },
    });
}
