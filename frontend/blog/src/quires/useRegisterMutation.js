import {useMutation, useQueryClient} from '@tanstack/react-query';
import {API} from "../config";

async function patchUser(request) {
    const response = await fetch(`${API.USERREGISTER}`, {
        method: "PATCH",
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const responseData = await response.json();

    if (responseData.code !== 200) {
        throw new Error(responseData.message);
    }
    return responseData.data;
}

export function useRegisterMutation() {
    const queryClient = useQueryClient();

    return useMutation(
        async (request) => patchUser(request), {
            throwOnError: true,
            onError: (error) => {
                // handleError(error);
            },
        }
    );
}