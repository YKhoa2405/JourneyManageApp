import axios from "axios";

const HOST ="https://hieuecourse.pythonanywhere.com";

export const  endpoints = {
    'user'  : '/user/',
    login: "/o/token/",
}

export function authApi(){
    return axios.create({
        baseURL:HOST,
        headers:{
            Authorization: `Bearer ${accessToken}`,
        }
    })
}

export default axios.create({
    baseURL: HOST
})
