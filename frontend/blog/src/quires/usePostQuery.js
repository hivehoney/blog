import {useQuery} from 'react-query';
import axios from 'axios';
import useApiError from "../common/useApiError";

const fetcher = async (url, code) => await axios.post(url+code).then(({ data }) => JSON.parse(data));

const usePostQuery = (queryKey, url, code) => {
    const { handleError } = useApiError();

    return useQuery(queryKey, () => fetcher(url, code), {
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
