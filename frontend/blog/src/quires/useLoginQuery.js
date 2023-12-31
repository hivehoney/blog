import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {API} from "../config";
import {axiosAPI} from "../api/api";

const QUERY_KEY = "USERINFO";

function getQueryKey(response) {
    return response === undefined ? [QUERY_KEY] : [QUERY_KEY, response];
}

const userInfo = async (data) => {
    try {
        const response = await axiosAPI.post(`${API.LOGIN}`, data, {withCredentials:true})
        return response
    } catch (error) {
        return Promise.reject(error);
    }
}

export const useUserInfo = () => {
    const queryClient = useQueryClient();

    // login
    const loginUser = useMutation({
        mutationFn: userInfo,
    });


    return {
        loginUser,
        // addComment: addCommentMutation.mutate,
        // updateComment: updateCommentMutation.mutate,
        // deleteComment: deleteCommentMutation.mutate
    };
}