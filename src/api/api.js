import axios from "axios";
import { useLocation, Navigate } from 'react-router-dom'

export const BASE_URL = "http://127.0.0.1:5000/api/v1/"

export const token = localStorage.getItem('manage_jwt')

const ErrorAuth = () => {
    console.log("ERROR AUTH")
    localStorage.setItem('manage_jwt', '')
}


export const headers = {
    headers: { Authorization: `Bearer ${token}`, }
};


export const no_auth_rederect = () => {
    console.log("ERROR AUTH")
    localStorage.setItem('manage_jwt', '')
    window.location = "/login"
};

// GET JWT TOKEN 
export const get_jwt = async (email, password) => {
    return await axios
        .post(`${BASE_URL}auth`, { email, password })
        .then((response) => {
            return response.data;
        });
}