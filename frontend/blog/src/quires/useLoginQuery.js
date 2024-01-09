import {useMutation, useQueryClient} from '@tanstack/react-query';
import {addUser, userLogin, userLogout} from "../api/user";

const QUERY_KEY = "USERINFO";

function getQueryKey(response) {
    return response === undefined ? [QUERY_KEY] : [QUERY_KEY, response];
}

export const useUserInfo = () => {
    const queryClient = useQueryClient();

    // login
    const loginUser = useMutation({
        mutationFn: userLogin,
    });

    // logout
    const logoutUser = useMutation({
        mutationFn: userLogout,
    });

    const addUserMutation = useMutation({
        mutationFn: addUser,
        onSuccess: function (data) {
        }
    });


    return {
        loginUser,
        logoutUser: logoutUser.mutate,
        addUser: addUserMutation.mutate,
        // updateComment: updateCommentMutation.mutate,
        // deleteComment: deleteCommentMutation.mutate
    };
}