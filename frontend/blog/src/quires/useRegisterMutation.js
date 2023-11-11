import {useMutation, useQueryClient} from 'react-query';
import {API} from "../config";
import {alterMessgae} from "../common/utils/StringUtil";
import {USER_REG_FAILURE, USER_REG_SUCCESS} from "../common/utils/constant";

async function patchUser(request) {
    const response  = await fetch(`${API.USERREGISTER}`, {
            method: "PATCH",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
                // 'Accept': 'application/json',
                // 'Authorization': 'my-access-token'
            },
        },
    );

    const responseData = await response.json();
    if (!response.ok) {
        throw Error(responseData.message);
    }

    return responseData.data;
}

export function useRegisterMutation() {
    const queryClient = useQueryClient();

    return useMutation((request) =>
        patchUser(request), {
        onSuccess: (response) => {
        },
        onError: (error) => {
            console.log(error)
        }
    });
}
