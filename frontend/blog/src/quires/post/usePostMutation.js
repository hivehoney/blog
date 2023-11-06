import axios from 'axios';
import {useMutation, useQueryClient} from 'react-query';
import {API} from "../../config";

async function patchPost(req) {
    const  response  = await fetch(`${API.POSTUPDATE}`, {
            method: "PATCH",
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
                // 'Accept': 'application/json',
                // 'Authorization': 'my-access-token'
            },
        },
    );
    const responseData = await response.json();

    return responseData.data;
}

export function usePostMutation() {
    const queryClient = useQueryClient();

    return useMutation((req) =>
        patchPost(req), {
            onMutate: async (data) => {
                console.log("onMutate")
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(["POSTCODE", data], { exact: true });
            },
    });
}
