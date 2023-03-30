import axios from "axios";
import { useLocation, Navigate } from 'react-router-dom'

import { headers, error_response } from "./api";
import { BASE_URL } from "./api";


import { offsetTimeTOUTC } from "../componets/service/localDateTime"



// GET LIST EVENTS FOR CHANNEL AND SORT BY FILTER
export const get_list_events = async (id_channel, page=1, per_page=100, reverse_sort, date_time_start, date_time_stop) => {
    let str_query = '?'
    if(page) { str_query = str_query + '&page=' + page };
    if(per_page) { str_query = str_query + '&per_page=' + per_page }; 
    if(reverse_sort) { str_query = str_query + '&reverse_sort=' + reverse_sort };
    if(date_time_start) { str_query = str_query + '&date_time_start=' + offsetTimeTOUTC(date_time_start) };
    if(date_time_stop) { str_query = str_query + '&date_time_stop=' + offsetTimeTOUTC(date_time_stop) };
    return await axios
        .get(`${BASE_URL}events/channels/${id_channel}${str_query}`, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
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
            return error_response(err)
        });
}


// POST EVENT (CREATE NEW EVENT)
export const post_event = async (date_start, date_stop, id_channel, id_post) => {
    const data = {
        "date_start": offsetTimeTOUTC(date_start),
        "date_stop": offsetTimeTOUTC(date_stop),
        "id_channel": id_channel,
        "id_post": id_post
        }
    return await axios
        .post(`${BASE_URL}events`, data, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
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
            return error_response(err)
        });
}


// UPDATE EVENT 
export const update_event = async (id_event, date_start, date_stop, id_post) => {
    const data = {
        "date_start": offsetTimeTOUTC(date_start),
        "date_stop": offsetTimeTOUTC(date_stop),
        "id_post": id_post
        }
    return await axios
        .put(`${BASE_URL}events/${id_event}`, data, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            error_response(err)
        });
}