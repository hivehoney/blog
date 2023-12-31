import {axiosAPI, axiosAuthAPI} from "./api";
import {API} from "../config";

export async function getPost(code) {
    const response = await axiosAPI.get(`${API.POST}?code=${code.postCode}`)
    return response
}

export async function getPostList(data) {
    const response = await axiosAPI.post(`${API.POSTS}`, data)
    return response.data
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

