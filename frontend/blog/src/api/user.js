import {axiosAPI, axiosAuthAPI} from "./api";
import {API} from "../config";

export async function userLogin(data) {
    try {
        const response = await axiosAPI.post(`${API.LOGIN}`, data, {withCredentials: true})
        return response
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function addUser(data) {
    const response = await axiosAPI.patch(`${API.USERREGISTER}`, data)
    return response.data
}

export async function userLogout() {
    const response = await axiosAuthAPI.post(`${API.LOGOUT}`)
    return response
}