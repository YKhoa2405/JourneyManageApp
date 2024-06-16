import axios from "axios";

const HOST = "https://hieujourneyy.pythonanywhere.com";

export const endpoints = {
    // user
    'user': '/user/',
    'login': "/o/token/",
    'current_user': '/user/current_user/',
    'update_user': '/user/current_user/',
    'delete_user': '/user/current_user/',
    'user_profile': (userId) => `/user/${userId}/`,
    'report_user': `/Report/report_user/`,
    'follow':(userId) => `/user/${userId}/follow/`,
    'followers':(userId) => `/user/${userId}/followers/`,
    'following':(userId) => `/user/${userId}/following/`,

    // Journey
    'search_journey': (searchQuery) => `journey/?q=${encodeURIComponent(searchQuery)}`,
    'get_journey': '/journey/',
    'post_journey': '/journey/',
    'del_journey': (journeyId) => `/journey/${journeyId}/`,
    'edit_journey': (journeyId) => `/journey/${journeyId}/`,
    'add_comment_journey': (journeyID) => `/journey/${journeyID}/add_comment/`,
    'get_comment_journey': (journeyID) => `/journey/${journeyID}/comments/`,
    'delete_comment_journey': (journeyID, commentID) => `/journey/${journeyID}/delete_comment/${commentID}/`,
    'lock_comment': (journeyID) => `/journey/${journeyID}/lock_comment/`,
    'like_journey': (journeyID) => `/journey/${journeyID}/like/`,
    'approve_comment': (journeyID) => `/journey/${journeyID}/approve_comment/`,
    'complete_journey': (journeyID) => `/journey/${journeyID}/complete_journey/`,
    'reply_comment': (journeyID) => `/journey/${journeyID}/comment_reply/`,
    'user_journeys': `/user_journeys/`,
    'detail_journey': (journeyID) => `/journey/${journeyID}/`,
    'rating_journey':(journeyID)=>`/journey/${journeyID}/rate_journey/`,


    // post
    'post': (postId) => `/post/`,
    'post': (journeyId) => `/journey/${journeyId}/posts/`,
    'del_post': (postId) => `/post/${postId}/`,
    'add_post': '/post/',
    'like_post': (postId) => `/post/${postId}/like/`,
    'edit_post': (postId) => `/post/${postId}/`,
    // commentPost
    'add_comment': (postId) => `/post/${postId}/add_comment/`,
    'get_comment': (postId) => `/post/${postId}/comments/`,
    'like_count': (postId) => `/post/${postId}/likes_count/`,
    'delete_comment_post': (postId, commentID) => `/post/${postId}/delete_comment/${commentID}/`,

    //member
    'member_journey': (journeyID) => `/journey/${journeyID}/members/`,
    'member_delete': (journeyID) => `/journey/${journeyID}//delete_participant/`,



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
