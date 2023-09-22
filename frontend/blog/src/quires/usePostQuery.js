import {useQuery} from 'react-query';
import axios from 'axios';
import useApiError from "../common/useApiError";
import {API} from "../config";

const fetcher = (data) => axios.post(`${API.POSTS}`, data).then(({ data }) => JSON.parse(data));

const usePostQuery = ({ data }) => {
    const { handleError } = useApiError();

    return useQuery( "POSTS", () => fetcher(data), {
        onError: (error) => {
            handleError(error);
        },
        select: (data) => {
            if (data && data.status === 200) {
                return data.data;
            } else {
                const error = {
                    status: "404",
                    message: '세션 정보가 없습니다.',
                    code: data,
                };
                handleError(error);
            }
        },
    });
};

export default usePostQuery;