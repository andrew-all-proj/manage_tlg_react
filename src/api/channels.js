import axios from "axios";
import { headers, no_auth_rederect } from "./api";

import { BASE_URL } from "./api";


// GET LIST CHANNELS
export const get_list_channels = async () => {
    return await axios
        .get(`${BASE_URL}channels`, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            if (err.response.status === 401) {
                no_auth_rederect()
            }
            console.log(err)
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
            if (err.response.status === 401) {
                no_auth_rederect()
            }
            console.log(err)
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
            if (err.response.status === 401) {
                no_auth_rederect()
            }
            console.log(err)
        });
}