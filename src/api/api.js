import axios from "axios";
import { useLocation, Navigate } from 'react-router-dom'

export const BASE_URL = "http://127.0.0.1:5000/api/v1/" // http://127.0.0.1:5000/api/v1/ http://www.managetlg.com/api/v1/

export const token = localStorage.getItem('manage_jwt')

const ErrorAuth = () => {
    console.log("ERROR AUTH")
    localStorage.setItem('manage_jwt', '')
}


export const headers = () => {
    let headers = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('manage_jwt')}`, 
        'Access-Control-Allow-Credentials':'*'}
    }
    return headers
}


export const no_auth_rederect = () => {
    console.log("ERROR AUTH")
    localStorage.setItem('manage_jwt', '')
    window.location = "/login"
};

// GET JWT TOKEN 
export const get_jwt = async (email, password) => {
    return await axios
        ({method: 'post',
        url:`${BASE_URL}auth`,
        headers: {"Access-Control-Allow-Headers": "access-control-allow-origin, content-type"},
        data: {email, password}, })
        .then((response) => {
            return response.data;
        });
}


// RESEND EMAIL FOR CONFIRM
export const send_email_confirm = async (id_user) => {
    return await axios
        .get(`${BASE_URL}email/${id_user}`)
        .then((response) => {
            return response.data;
        });
}