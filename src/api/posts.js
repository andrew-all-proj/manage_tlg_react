import axios from "axios";

import { headers, no_auth_rederect, error_response } from "./api";
import { BASE_URL } from "./api";
import { offsetTimeTOUTC } from "../componets/service/localDateTime"


// GET LIST POSTS
export const get_list_posts = async (page, per_page = 3, reverse_sort, date_time_start, date_time_stop) => {
    let str_query = '?'
    if(page) { str_query = str_query + '&page=' + page };
    if(per_page) { str_query = str_query + '&per_page=' + per_page }; 
    if(reverse_sort) { str_query = str_query + '&reverse_sort=' + reverse_sort };
    if(date_time_start) { str_query = str_query + '&date_time_start=' + offsetTimeTOUTC(date_time_start) };
    if(date_time_stop) { str_query = str_query + '&date_time_stop=' + offsetTimeTOUTC(date_time_stop) };
    return await axios
        .get(`${BASE_URL}posts/${str_query}`, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return  error_response(err)
        });
}


// GET POST BY ID
export const get_post = async (id) => {
    return await axios.get(`${BASE_URL}posts/${id}`, headers())
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            return error_response(err)
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
            return  error_response(err)
        });
}

// DELETE POST
export const delete_post = async (id) => {
    return await axios.delete(`${BASE_URL}posts/${id}`, headers() ) //{}
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            return  error_response(err)
        });
}

