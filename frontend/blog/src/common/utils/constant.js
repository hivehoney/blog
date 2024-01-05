export const USER_REG_SUCCESS = "회원가입 되었습니다.";
export const USER_TYPE_SUCCESS = "가입조건이 맞지 않습니다.";
export const USER_REG_FAILURE = "이미 가입된 사용자 입니다.";
export const GET_POST_SUCCESS = "POST/GET_POST_SUCCESS";
export const GET_POST_FAILURE = "POST/GET_POST_FAILURE";
export const ADD_POST_REQUEST = "POST/ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "POST/ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "POST/ADD_POST_FAILURE";
export const ADD_IMG_REQUEST = "POST/ADD_IMG_REQUEST";
export const ADD_IMG_SUCCESS = "POST/ADD_IMG_SUCCESS";
export const ADD_IMG_FAILURE = "POST/ADD_IMG_FAILURE";
export const FETCH_POSTS_REQUEST = "POST/FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "POST/FETCH_POSTS_SUCCESS";
export const FETCH_POST_FAILURE = "POST/FETCH_POST_FAILURE";
export function getErrorMessage(status) {
    switch (status) {
        case 401:
        case 402:
            return {
                title: '접근 권한이 없습니다.',
                content: '로그인을 해주세요.',
            };
        case 409:
        case 500:
        default:
            return {
                title: '서비스에 접속할 수 없습니다.',
                content: '새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.',
            };
    }
};

export const  page = 3;
export const  size = 3;
export const  sort = "DESC";