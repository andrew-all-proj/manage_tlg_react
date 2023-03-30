import axios from "axios";
import { useLocation, Navigate } from 'react-router-dom'

import { headers, no_auth_rederect } from "./api";
import { BASE_URL, error_response } from "./api";



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


// GET USER BY ID
export const get_user_by_id = async (user_id) => {
    return await axios
        .get(`${BASE_URL}users/${user_id}`, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}


// GET USER BY ID
export const update_user = async (user_id, email, id_telegram, user_name, password=null, new_password=null) => {
    const data = {}
    if(email) data.email = email
    if(password) data.password = password
    if(new_password) data.new_password = new_password
    if(user_name) data.user_name = user_name
    if(id_telegram) data.id_telegram = id_telegram
    return await axios
        .put(`${BASE_URL}users/${user_id}`, data, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}


