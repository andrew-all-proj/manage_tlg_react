import axios from "axios";
import { BASE_URL, headers, error_response } from "./api";

export interface IListTags {
    id_channel: number;
    id_tag: number;
    tag_name: string;
    }

// GET LIST TAG FOR CHANNEL 
export const get_list_tags = async (id_channel: number) => {
    return await axios
        .get(`${BASE_URL}tags/channel/${id_channel}`, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}

//(POST)  ADD NEW TAG 
export const add_tag = async (id_channel: number, tag_name: string) => {
    const data = {
        "id_channel": id_channel,
        "tag_name": tag_name
    }
    return await axios
        .post(`${BASE_URL}tags`, data, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}

//(DELETE)  REMOVE TAG
export const remove_tag = async (id_tag: number) => {
    return await axios
        .delete(`${BASE_URL}tags/${id_tag}`, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}


//(PUT)  UPDATE TAG
export const update_tag = async (id_tag: number, tag_name: string) => {
    const data = {
        "tag_name": tag_name
    }
    return await axios
        .put(`${BASE_URL}tags/${id_tag}`, data, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}


//(PUT)  SET TAG TO MEDIA
export const set_tags_to_media = async (id_media: number, list_tag: []) => {
    const data ={
        "tags": list_tag
    }
    return await axios
        .put(`${BASE_URL}media/${id_media}/settags`, data, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}


//(PUT)  SET TAG TO MEDIA
export const unset_tags_to_media = async (id_media: number, list_tag: []) => {
    const data ={
        "tags": list_tag
    }
    return await axios
        .delete(`${BASE_URL}media/${id_media}/settags`, {
            headers: {
                Authorization: headers().headers.Authorization
            },
            data})
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}