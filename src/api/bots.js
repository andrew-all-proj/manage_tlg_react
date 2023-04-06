import axios from "axios";
import { BASE_URL, headers, error_response } from "./api";


// GET LIST FEEDBACK BOT
export const get_list_feedback_bots = async () => {
    return await axios
        .get(`${BASE_URL}feedback_bots`, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}

//(POST)  ADD NEW FEEDBACK BOT
export const add_new_feedback_bot = async (name_bot, token_bot) => {
    const data = {
        "name_bot": name_bot,
        "token_bot": token_bot
        }
    return await axios
        .post(`${BASE_URL}feedback_bots`, data, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}

//(DELETE)  REMOVE FEEDBACK BOT
export const remove_feedback_bot = async (id_feedback_bot) => {
    return await axios
        .delete(`${BASE_URL}feedback_bots/${id_feedback_bot}`, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}


//(PUT)  UPDATE FEEDBACK BOT
export const update_feedback_bot = async (id_feedback_bot, name_bot, token_bot) => {
    const data = {
        "name_bot": name_bot,
        "token_bot": token_bot
        }
    return await axios
        .put(`${BASE_URL}feedback_bots/${id_feedback_bot}`, data, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}



//(DELETE)  REMOVE USER FEEDBACK BOT
export const remove_user_feedback_bot = async (id_users_to_feedback_bot) => {
    return await axios
        .delete(`${BASE_URL}feedback_bots/users/${id_users_to_feedback_bot}`, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}


//(PUT)  UPDATE USER FEEDBACK BOT
export const update_user_feedback_bot = async (id_users_to_feedback_bot, id_feedback_bot, id_user_telegram, name_user) => {
    const data = {
        "id_feedback_bot": id_feedback_bot,
        "id_user_telegram": id_user_telegram,
        "name_user": name_user
        }
    return await axios
        .put(`${BASE_URL}feedback_bots/users/${id_users_to_feedback_bot}`, data, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}

//(POST)  ADD NEW USER FEEDBACK BOT
export const add_new_user_feedback_bot = async (id_feedback_bot, id_user_telegram, name_user) => {
    const data = {
        "id_feedback_bot": id_feedback_bot,
        "id_user_telegram": id_user_telegram,
        "name_user": name_user
        }
    return await axios
        .post(`${BASE_URL}feedback_bots/users`, data, headers())
        .then((response) => {
            return response.data;
        })
        .catch(function (err) {
            return error_response(err)
        });
}