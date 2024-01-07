import {axiosAPI, axiosAuthAPI} from "./api";
import {API} from "../config";
import * as constant from "../common/utils/constant";

export async function getPost(code) {
    const response = await axiosAPI.get(`${API.POST}?code=${code.postCode}`)
    return response
}

export async function getPostList({pageParam, keyword}) {
    const response = await axiosAPI.get(`${API.POSTS}?type=1&keyword=${keyword}&last=${pageParam}&size=${constant.size}&sort=updateDate,desc`);
    const result = JSON.parse(response.data).data

    return {
        data: result.content,
        last: result.last,
        size: result.size
    }
}

export async function deletePost(postCode) {
    const response = await axiosAuthAPI.patch(`${API.POSTDELETE}`, postCode)
    return response
}

export async function updatePost(data) {
    const response = await axiosAuthAPI.patch(`${API.POSTUPDATE}`, data)
    return response
}

export async function addPost() {
    const response = await axiosAuthAPI.patch(`${API.POSTADD}`)
    return response.data
}

