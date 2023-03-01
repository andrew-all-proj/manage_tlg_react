import axios from "axios";
import { useLocation, Navigate } from 'react-router-dom'

import { headers, no_auth_rederect } from "./api";
import { BASE_URL } from "./api";



// CREATE NEW USER
export const create_new_user = async (username, email, password) => {
    const data = {
        "email": email,
        "password": password,
        "user_name": username
        }
    return await axios
        .post(`${BASE_URL}users`, data, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return err.response
        });
}


