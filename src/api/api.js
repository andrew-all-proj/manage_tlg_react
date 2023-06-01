import axios from "axios";
import { useLocation, Navigate } from 'react-router-dom'

export const BASE_URL = "https://www.managetlg.com/api/v1/" // http://127.0.0.1:5000/api/v1/ https://www.managetlg.com/api/v1/

export const PER_PAGE = 10

export const token = localStorage.getItem('manage_jwt')

export function encodePassword(password) {
    // Конвертируем пароль в бинарный формат
    const passwordBuffer = new TextEncoder().encode(password);

    // Кодируем бинарный пароль в формат Base64 и возвращаем строку
    const encodedPassword = btoa(String.fromCharCode.apply(null, passwordBuffer));
    return encodedPassword;
}

// вставляем JWT токен в заголовок (храню в локал стораж) подумать на счет других вариантов
export const headers = () => {
    let headers = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('manage_jwt')}`,
            'Access-Control-Allow-Credentials': '*'
        }
    }
    return headers
}

// при ошибке, отсутвие, просроченом JWT токене делает редерект на страницу login
export const no_auth_rederect = () => {
    console.log("ERROR AUTH")
    localStorage.setItem('manage_jwt', '')
    window.location = "/login"
};

// обрабочик ошибок запросов
export const error_response = (err) => {
    console.log(err)
    if (err.code === 'ERR_NETWORK') {
        return { error: true, msg: 'Не найден' }
    }
    if (err.response.status === 404) {
        return { error: true, msg: 'Не найден' }
    }
    if (err.response.status === 401) {
        no_auth_rederect()
    }
    if (err.response.status === 400) {
        return { error: true, msg: 'Этот пост добавлен на это время' }
    }
    if (err.response.status === 422) {
        return { error: true, msg: 'Ошибка сохранения' }
    }
}

// GET JWT TOKEN 
export const get_jwt = async (email, password) => {
    const pswd = encodePassword(password)
    return await axios
        ({
            method: 'post',
            url: `${BASE_URL}auth`,
            headers: { "Access-Control-Allow-Headers": "access-control-allow-origin, content-type" },
            data: { 'email': email, 'password': pswd },
        })
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