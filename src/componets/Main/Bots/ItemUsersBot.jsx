import * as React from 'react';
import { useAuth } from "../../hook/useAuth";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import { padding } from '@mui/system';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { get_list_tags, add_tag, remove_tag, update_tag } from '../../../api/tags'
import { useState, useEffect } from "react";
import SelectChannel from '../../service/SelectChannel'
import Input from '@mui/material/Input';
import { TextChangeDoubleClick } from '../../service/TextChangeDoubleClick'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { get_list_feedback_bots, add_new_feedback_bot, remove_feedback_bot, update_feedback_bot, 
    remove_user_feedback_bot, update_user_feedback_bot, add_new_user_feedback_bot } from '../../../api/bots'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AlertInfo } from '../../service/serviceComponents/AlertInfo';
import SaveIcon from '@mui/icons-material/Save';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


export const ItemUsersBot = ({ value, update }) => {
    const [inputName, setInputName] = useState(true);
    const [inputId, setInputId] = useState(true);
    const [inputNameUserBot, setInputNameUserBot] = useState(value.name_user);
    const [inputIdUserBot, setInputIdUserBot] = useState(value.id_user_telegram);
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })


    const remove_user = () => {
        remove_user_feedback_bot(value.id_users_to_feedback_bot).
        then((data) => {
            if (data.error) return setAlertShow({ show: true, msgInfo: "Ошибка Удаления", severity: "error" })
            update(true)
        })
    }

    const update_user = () => {
        update_user_feedback_bot(value.id_users_to_feedback_bot, value.id_feedback_bot, inputIdUserBot, inputNameUserBot).
        then((data) => {
            if (data.error) return setAlertShow({ show: true, msgInfo: "Ошибка Удаления", severity: "error" })
            setAlertShow({ show: true, msgInfo: "Обновлен", severity: "success" })
            update(true)
        })
    }

    return (
        <>
        <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2, marginTop: 0.5, padding: 0.5 }}>
            <Grid container >
                <Grid xs={12} md={8}>
                    <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
                    <Stack direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={0.5} >
                        <TextChangeDoubleClick id={value.name_usre} label="Имя:" inputData={inputNameUserBot} setInputData={setInputNameUserBot} inputText={inputName} setInputText={setInputName} />
                        <IconButton onClick={() => setInputName(false)} aria-label="delete" size="small">
                            <BorderColorIcon fontSize="default" color="primary" />
                        </IconButton>
                    </Stack>
                    <Stack direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={0.5} >
                        <TextChangeDoubleClick id={value.id_feedback_bot} label="Токен:" inputData={inputIdUserBot} setInputData={setInputIdUserBot} inputText={inputId} setInputText={setInputId} />
                        <IconButton onClick={() => setInputId(false)} aria-label="delete" size="small">
                            <BorderColorIcon fontSize="default" color="primary" />
                        </IconButton>
                    </Stack>
                </Grid>
                <Grid xs={12} md={2}>
                    <IconButton onClick={update_user} aria-label="delete" size="large">
                        <SaveIcon fontSize="default" color="primary" />
                    </IconButton>
                    <IconButton onClick={remove_user} aria-label="delete" size="large">
                        <DeleteIcon fontSize="default" color="primary" />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}