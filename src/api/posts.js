import axios from "axios";
import { useLocation, Navigate } from 'react-router-dom'

import { headers } from "./api";
import { BASE_URL } from "./api";



// GET LIST POSTS
export const get_list_posts = async (page, per_page = 3) => {
    return await axios
        .get(`${BASE_URL}posts/?page=${page}&per_page=${per_page}`, headers)
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            if (err.response.status === 401) {
                console.log("ERROR AUTH")
            }
            console.log(err)
        });
}


// GET POST BY ID
export const get_post = async (id) => {
    return await axios.get(`${BASE_URL}posts/${id}`, headers)
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            if (err.response.status === 401) {
                console.log("ERROR AUTH")
            }
            console.log(err)
        });
}


// UPDATE POST BY ID
export const update_post = async (id, textPost) => {
    const data = {
        "text": textPost
    }
    return await axios.put(`${BASE_URL}posts/${id}`, data, headers)
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            if (err.response.status === 401) {
                console.log("ERROR AUTH")
            }
            console.log(err)
        });
}


// SET LIST MEDIA TO POST
export const set_media_to_post = async (idMedia, idPost) => {
    const media = [idMedia]
    const data = { "media": media }

    return axios.put(`${BASE_URL}posts/${idPost}/setmedia`, data, headers)
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            console.log(err)
        });
}


// UNSET LIST MEDIA TO POST
export const unset_media_to_post = async (idMedia, idPost) => {
    const media = [idMedia]
    const data = { "media": media }
    return axios.delete(`${BASE_URL}posts/${idPost}/setmedia`, {
        headers: {
            Authorization: headers.headers.Authorization
        },
        data
    })
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            console.log(err)
        });
}


// UPLOAD MEDIA
export const post_media = async (selectedImage) => {
    let formData = new FormData();
    formData.append("file", selectedImage);
    headers["Content-Type"] = 'multipart/form-data'
    return await axios.post(`${BASE_URL}media`, formData, headers)
        .then(function (res) {
            const data = res.data;
            return data
        })
        .catch(function (err) {
            console.log(err)
        });
}


// CREATE POST 
export const post_create = async (textPost) => {
    const data = {
        "text": textPost
    }
    return axios.post(`${BASE_URL}posts`, data, headers)
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            if (err.response.status === 401) {
                console.log("ERROR AUTH")
            }
            console.log(err)
        });
}


export const delete_post = async (id) => {
    return await axios.delete(`${BASE_URL}posts/${id}`, { headers })
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            if (err.response.status === 401) {
                console.log("ERROR AUTH")
            }
            console.log(err)
        });
}

