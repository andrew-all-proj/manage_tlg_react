import axios from "axios";

import { headers, no_auth_rederect, error_response } from "./api";
import { BASE_URL } from "./api";



// SET LIST MEDIA TO POST
export const set_media_to_post = async (idMedia, idPost) => {
    const media = [idMedia]
    const data = { "media": media }

    return axios.put(`${BASE_URL}posts/${idPost}/setmedia`, data, headers())
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            return error_response(err)
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
            return error_response(err)
        });
}


// UPLOAD MEDIA
export const post_media = async (selectedFile) => {
    console.log(selectedFile)
    let formData = new FormData();
    formData.append("file", selectedFile);
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
            return error_response(err)
        });
}


// GET MEDIA INFO BY ID MEDIA
export const get_media_by_id = async (id_media) => {
    return axios.get(`${BASE_URL}media/${id_media}`, headers())
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}

//media?published=${published}&id_channel=${id_chanel}&last_time_used=${last_time_used} events/channels/${id_channel}?page=${page}&per_page=${per_page}
// GET ALL MEDIA FILTER
export const get_media = async (page=1, per_page=100, published, id_chanel, limit=100, last_time_used) => {
    let str_query = '?'
    if(page) { str_query = str_query + '&page=' + page };
    if(per_page) { str_query = str_query + '&per_page=' + per_page };
    if(id_chanel) { str_query = str_query + '&id_chanel=' + id_chanel };
    if(published) { str_query = str_query + '&published=' + published };
    if(last_time_used) { str_query = str_query + '&last_time_used=' + last_time_used };
    if(limit) { str_query = str_query + '&limit=' + limit };
    return axios.get(`${BASE_URL}media${str_query}`, headers())
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}