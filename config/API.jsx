import axios from "axios";

const HOST = "https://hieujourneyy.pythonanywhere.com";

export const endpoints = {
    'user': '/user/',
    'login': "/o/token/",
    'current_user': '/user/current_user/',
    'update_user': '/user/current_user/',
    'get_journey': '/journey/',
    'del_journey': (journeyId) => `/journey/${journeyId}/`,
    'post': (journeyId) => `/journey/${journeyId}/posts/`

}

export const authApi = (accessToken) => {
    return axios.create({
        baseURL: HOST,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
}

export default axios.create({
    baseURL: HOST
})
