import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import useApiError from "../common/useApiError";
import {API} from "../config";

const fetcher = (data) => axios.post(`${API.ADDPOST}`, data,
    {
        headers: {
            'Content-Type': 'application/json',
        }
    });


const usePostMutation = (data) => {
    const queryClient = useQueryClient();
    const { handleError } = useApiError();

    return useMutation(fetcher(data), {
        onError: function(error) {
            handleError(error); // 에러가 발생할 때 useApiError를 이용해 처리.
        },
        onSuccess: function() {
            document.querySelector('[role="toolbar"]').remove();
            window.history.back();
        },
        onSettled: () => {
            queryClient.invalidateQueries("data");
        }
    });
};

export default usePostMutation;