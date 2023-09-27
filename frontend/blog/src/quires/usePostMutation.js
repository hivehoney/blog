import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import useApiError from "../common/useApiError";
import {API} from "../config";
import {Posts} from "../common/types/post";

const patchPost = async (post) => await axios.post(API.ADDPOST, post), usePostMutation = () => {
    const queryClient = useQueryClient();
    const {handleError} = useApiError();

    return useMutation(patchPost, {
        onError: function (error) {
            handleError(error); // 에러가 발생할 때 useApiError를 이용해 처리.
        },
        onSuccess: function () {
            document.querySelector('[role="toolbar"]').remove();
            window.history.back();
        },
        onSettled: () => {
            queryClient.invalidateQueries("data");
        }
        // mutate 요청이 성공한 후 queryClient.invalidateQueries 함수를 통해
        // useTodosQuery에서 불러온 API Response의 Cache를 초기화
        // onSuccess: () => queryClient.invalidateQueries(""),
    });
};

export default usePostMutation;