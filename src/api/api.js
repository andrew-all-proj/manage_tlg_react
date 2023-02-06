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



