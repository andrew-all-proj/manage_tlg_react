import axios from "axios";
import { useLocation, Navigate } from 'react-router-dom'

import { headers, no_auth_rederect } from "./api";
import { BASE_URL } from "./api";



// GET LIST EVENTS FOR CHANNEL AND SORT BY FILTER
export const get_list_events = async (id_channel, page=1, per_page=100) => {
    return await axios
        .get(`${BASE_URL}events/channels/${id_channel}?page=${page}&per_page=${per_page}`, headers())
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


// GET EVENT BY ID
export const get_event = async (id_event) => {
    return await axios
        .get(`${BASE_URL}events/${id_event}`, headers())
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


// POST EVENT (CREATE NEW EVENT)
export const post_event = async (date_start, date_stop, id_channel, id_post) => {
    const data = {
        "date_start": date_start,
        "date_stop": date_stop,
        "id_channel": id_channel,
        "id_post": id_post
        }
    return await axios
        .post(`${BASE_URL}events`, data, headers())
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


// DELETE EVENT
export const delete_event = async (id_event) => {
    return await axios
        .delete(`${BASE_URL}events/{id_event}`, headers())
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


// UPDATE EVENT 
export const update_event = async (id_event, date_start, date_stop, id_post) => {
    const data = {
        "date_start": date_start,
        "date_stop": date_stop,
        "id_post": id_post
        }
    return await axios
        .put(`${BASE_URL}events/${id_event}`, data, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            if (err.response.status === 401) {
                no_auth_rederect()
            }
        });
}