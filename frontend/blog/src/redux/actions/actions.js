import {
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
} from "../../common/utils/constant";


export function addPostRequest(payload) { return {type: ADD_POST_REQUEST, payload}; }
export function addPostSuccess(payload) { return {type: ADD_POST_SUCCESS, payload}; }
export function addPostFailure(payload) { return {type: ADD_POST_FAILURE, payload}; }