import axios from 'axios';
import {getCookie, setCookie} from '../common/utils/Cookies';

const BASE_URL = 'http://localhost:8080/';

const axiosApi = (url, options) => {
    const instance = axios.create({ baseURL: url, ...options });
    return instance
};

const axiosAuthApi = (url, options) => {
    const instance = axios.create({ baseURL: url, withCredentials: true, ...options });
    return interceptors(instance);
};

const redirectToLoginPage = () => {
    const isDev = window.location.hostname === 'localhost';
    window.location.href = isDev ? 'http://localhost:3000/login' : 'http://hive.com/login';
};

const interceptors = (instance) => {
    instance.interceptors.request.use(
        async (config) => {
            try {
                const accessToken = getCookie('accessToken');

                if (!accessToken) {
                    throw new Error('Unauthorized: Access token not found.');
                }

                config.headers['Content-Type'] = 'application/json';
                config.headers['Authorization'] = `Bearer ${accessToken}`;

                return config;
            } catch (error) {
                // Handle errors here, e.g., log or redirect to an error page
                console.error('Interceptor error:', error);
                redirectToLoginPage();
                return Promise.reject(error.response);
            }
        },
        (error) => Promise.reject(error.response)
    );
    return instance;
};

//2. 응답 인터셉터
axios.interceptors.response.use(
    response => response.data,
    async function (error) {
        if (error?.status === 401) {
            try {
                const { data: { refreshToken } } = await axios.post('/api/user/reissue', getCookie('refreshToken'));
                //refresh 유효한 경우 새롭게 accesstoken 설정
                const accessToken = refreshToken.headers.authorization.replace('Bearer ', '');

                if(accessToken){
                    setCookie('accessToken', accessToken, {
                        path: '/',
                        expires: new Date(Date.now() + 2 * 60 * 60 * 1000)
                    });
                    // 중단된 요청 새로운 토큰으로 재전송
                    const originalResponse = await axios.request(error.config);
                    return originalResponse.data.data;
                }
            } catch (err) {
                redirectToLoginPage();
            }
        } else {
            throw error;
        }
    }
);

export const axiosAPI = axiosApi(BASE_URL);
export const axiosAuthAPI = axiosAuthApi(BASE_URL);
