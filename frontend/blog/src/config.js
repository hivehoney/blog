import Axios from "axios";
import assert from "assert";

assert(
    "http://localhost:8080",
    "env variable not set: NEXT_PUBLIC_API_BASE_URL"
);

export const axios = Axios.create({
    baseURL: "http://localhost:8080",
});

export const API = {
    LOGIN: `/user/signin`,
    IMGUPLOAD: `/notice/imgUpload`,
    POSTS: `/notice/getPostsList`,
    POSTADD: `/notice/registerPost`,
    POSTUPDATE: `/notice/updatePost`,
    POST: `/notice/getPost`,
    MYPAGE: `/mypage`,
};