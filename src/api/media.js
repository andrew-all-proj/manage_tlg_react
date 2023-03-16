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
            return error_response(err)
        });
}