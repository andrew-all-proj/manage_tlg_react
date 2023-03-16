import axios from "axios";

import { headers, no_auth_rederect, error_response } from "./api";
import { BASE_URL } from "./api";



// GET LIST POSTS
export const get_list_posts = async (page, per_page = 3) => {
    return await axios
        .get(`${BASE_URL}posts/?page=${page}&per_page=${per_page}`, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            error_response(err)
        });
}


// GET POST BY ID
export const get_post = async (id) => {
    return await axios.get(`${BASE_URL}posts/${id}`, headers())
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            error_response(err)
        });
}


// UPDATE POST BY ID
export const update_post = async (id, textPost) => {
    const data = {
        "text": textPost
    }
    return await axios.put(`${BASE_URL}posts/${id}`, data, headers())
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}


// CREATE POST 
export const post_create = async (textPost) => {
    const data = {
        "text": textPost
    }
    return axios.post(`${BASE_URL}posts`, data, headers())
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            error_response(err)
        });
}

// DELETE POST
export const delete_post = async (id) => {
    return await axios.delete(`${BASE_URL}posts/${id}`, headers() ) //{}
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            error_response(err)
        });
}

