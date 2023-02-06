import axios from "axios";
import { useLocation, Navigate } from 'react-router-dom'

export const BASE_URL = "http://127.0.0.1:5000/api/v1/"

const token = localStorage.getItem('manage_jwt')

const ErrorAuth = () => {
    console.log("ERROR AUTH")
    localStorage.setItem('manage_jwt', '')
}


const config = {
    headers: { Authorization: `Bearer ${token}` }
};


// GET LIST POSTS
export const get_list_posts = async (page, per_page = 3) => {
    console.log(config)
    return await axios
        .get(`${BASE_URL}posts/?page=${page}&per_page=${per_page}`, config)
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
    return await axios.get(`${BASE_URL}posts/${id}`, config)
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
    return await axios.put(`${BASE_URL}posts/${id}`, data, config)
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

    return axios.put(`${BASE_URL}posts/${idPost}/setmedia`, data, config)
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
            Authorization: `Bearer ${token}`,
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
    return await axios.post(`${BASE_URL}media`, formData, {
        headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": `Bearer ${token}`
        }
    })
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
    return axios.post(`${BASE_URL}posts`, data, config)
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
    return await axios.delete(`${BASE_URL}posts/${id}`, config)
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

