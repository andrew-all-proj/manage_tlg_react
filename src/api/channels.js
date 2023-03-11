import axios from "axios";
import { headers, error_response } from "./api";

import { BASE_URL } from "./api";


// GET LIST CHANNELS
export const get_list_channels = async () => {
    return await axios
        .get(`${BASE_URL}channels`, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            error_response(err)
        });
}

// GET CHANNEL
export const get_channel_by_id = async (id) => {
    return await axios
        .get(`${BASE_URL}channels/${id}`, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            error_response(err)
        });
}



export const put_channel_by_id = async (inputID, inputLink, inputName, id) => {
    const data = {
        "id_telegram": inputID,
        "link_channel": inputLink,
        "name_channel": inputName
    }
    return await axios
        .put(`${BASE_URL}channels/${id}`, data, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            error_response(err)
        });
}

//CREATE NEW CHANNEL
export const post_new_channel = async (idChanel, linkChanel, nameChanel) => {
    const data = {
        "id_telegram": idChanel,
        "link_channel": linkChanel,
        "name_channel": nameChanel
    }
    return await axios
        .post(`${BASE_URL}channels`, data, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            error_response(err)
        });
}