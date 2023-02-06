import axios from "axios";
import { useLocation, Navigate } from 'react-router-dom'

import { headers } from "./api";
import { BASE_URL } from "./api";


// GET LIST CHANNELS
export const get_list_channels = async () => {
    return await axios
        .get(`${BASE_URL}channels`, headers)
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