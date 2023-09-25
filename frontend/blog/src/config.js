const BASE_URL = "http://localhost:8080";

export const API = {
    LOGIN: `${BASE_URL}/user/signin`,
    IMGUPLOAD: `${BASE_URL}/notice/imgUpload`,
    POSTS: `${BASE_URL}/notice/getPostsList`,
    ADDPOST: `${BASE_URL}/notice/registerPost`,
    POST: `${BASE_URL}/notice/getPost`,
    MAIN: `${BASE_URL}`,
    MYPAGE: `${BASE_URL}/mypage`,
    WISHLIST: `${BASE_URL}`,
    HEADER: `${BASE_URL}`,
};