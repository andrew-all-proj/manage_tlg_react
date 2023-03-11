import axios from "axios";
import { useLocation, Navigate } from 'react-router-dom'

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
            error_response(err)
        });
}


// SET LIST MEDIA TO POST
export const set_media_to_post = async (idMedia, idPost) => {
    const media = [idMedia]
    const data = { "media": media }

    return axios.put(`${BASE_URL}posts/${idPost}/setmedia`, data, headers())
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            error_response(err)
        });
}


// UNSET LIST MEDIA TO POST
export const unset_media_to_post = async (idMedia, idPost) => {
    const media = [idMedia]
    const data = { "media": media }
    return axios.delete(`${BASE_URL}posts/${idPost}/setmedia`, {
        headers: {
            Authorization: headers().headers.Authorization
        },
        data
    })
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            error_response(err)
        });
}


// UPLOAD MEDIA
export const post_media = async (selectedImage) => {
    let formData = new FormData();
    formData.append("file", selectedImage);
    let Newheaders = headers()
    Newheaders.headers["Content-Type"] = 'multipart/form-data'
    return await axios.post(`${BASE_URL}media`, formData, {
        headers: {
            'Authorization': Newheaders.headers.Authorization,
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Credentials': "true"
        }})
        .then(function (res) {
            const data = res.data;
            return data
        })
        .catch(function (err) {
            error_response(err)
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


export const delete_post = async (id) => {
    return await axios.delete(`${BASE_URL}posts/${id}`, headers() ) //{}
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            error_response(err)
        });
}

