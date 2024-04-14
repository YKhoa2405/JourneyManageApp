import axios from "axios";

const Host = 'https://hieuecourse.pythonanywhere.com'

export const  endpoints = {
    'user'  : '/user/',
    'login' : '/o/token'
}

export function authApi(){
    return axios.create({
        baseURL:Host,
        headers:{
            'Authorization': `Bearer ...`
        }
    })
}

export default axios.create({
    baseURL: Host
})
