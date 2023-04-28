import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useEffect } from "react";
import { TextChangeDoubleClick } from '../../service/TextChangeDoubleClick'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { add_new_feedback_bot, remove_feedback_bot, update_feedback_bot, add_new_user_feedback_bot } from '../../../api/bots'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AlertInfo } from '../../service/AlertInfo';
import SaveIcon from '@mui/icons-material/Save';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {ItemUsersBot} from './ItemUsersBot'


export const ItemBots = ({ value, update }) => {
    const [inputText, setInputText] = useState(true);
    const [inputToken, setInputToken] = useState(true);
    const [inputNameBot, setInputNameBot] = useState(value.name_bot);
    const [inputTokenBot, setInputTokenBot] = useState(value.token_bot);
    const [showAddUserBot, setShowAddUserBot] = useState(false);
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })

    const remove_bot = () => {
        remove_feedback_bot(value.id_feedback_bot).
            then((data) => {
                if (data.error) return setAlertShow({ show: true, msgInfo: "Ошибка Удаления", severity: "error" })
                setAlertShow({ show: true, msgInfo: "Удален", severity: "success" })
                update(true)
            })
    }

    const update_bot = () => {
        update_feedback_bot(value.id_feedback_bot, inputNameBot, inputTokenBot).
            then((data) => {
                if (data.error) return setAlertShow({ show: true, msgInfo: "Ошибка обновления", severity: "error" })
                setAlertShow({ show: true, msgInfo: "Обновлен", severity: "success" })
                update(true)
            })
    }


    return (
        <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2, marginTop: 0.5, padding: 0.5 }}>
            <Grid container >
                <Grid xs={12} md={8}>
                    <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
                    <Stack direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={0.5} >
                        <TextChangeDoubleClick id={value.id_feedback_bot} label="Имя бота:" inputData={inputNameBot} setInputData={setInputNameBot} inputText={inputText} setInputText={setInputText} />
                        <IconButton onClick={() => setInputText(false)} aria-label="delete" size="small">
                            <BorderColorIcon fontSize="default" color="primary" />
                        </IconButton>
                    </Stack>
                    <Stack direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={0.5} >
                        <TextChangeDoubleClick id={value.id_feedback_bot} label="Токен:" inputData={inputTokenBot} setInputData={setInputTokenBot} inputText={inputToken} setInputText={setInputToken} />
                        <IconButton onClick={() => setInputToken(false)} aria-label="delete" size="small">
                            <BorderColorIcon fontSize="default" color="primary" />
                        </IconButton>
                    </Stack>
                </Grid>
                <Grid xs={12} md={2}>
                    <IconButton onClick={update_bot} aria-label="delete" size="large">
                        <SaveIcon fontSize="default" color="primary" />
                    </IconButton>
                    <IconButton onClick={remove_bot} aria-label="delete" size="large">
                        <DeleteIcon fontSize="default" color="primary" />
                    </IconButton>
                </Grid>
            </Grid>
            <Typography variant="subtitle1" gutterBottom >Пересылать пользователю:</Typography>
            {value.users_feedback.map((user) =>
                <ItemUsersBot key={user.id_users_to_feedback_bot} value={user} update={update} />
            )}
            {showAddUserBot ? <AddBoxNewUserBot label="Добавить пользователя:" update={update} idFeedbackBot={value.id_feedback_bot} setShow={setShowAddUserBot}/> 
                :
            <IconButton onClick={() => setShowAddUserBot(true)} aria-label="delete" size="large">
                <PersonAddIcon fontSize="default" color="primary" />
            </IconButton>
            }
        </Box>
    )
}


export const AddBoxNewUserBot = ({ update, label, idFeedbackBot, setShow }) => {
    const [nameUserBot, setNameUserBot] = useState('');
    const [idUserBot, setIdUserBot] = useState('');
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })

    const add_user_feedback_bot = () => {
        if(nameUserBot.length < 3){
            return setAlertShow({ show: true, msgInfo: "Имя пользователя должно быть больше 4 символов", severity: "error" })
        }
        if(idUserBot.length < 6){
            return setAlertShow({ show: true, msgInfo: "Неверный id", severity: "error" })
        }
        add_new_user_feedback_bot(idFeedbackBot, idUserBot, nameUserBot). 
        then((data) => {
            if (data.error) return setAlertShow({ show: true, msgInfo: "Ошибка добавления", severity: "error" })
            update(true)
            setShow(false)
        })
    }


    return (
        <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2, marginTop: 0.5, padding: 0.5 }}>
            <Typography variant="h5" gutterBottom >{label}</Typography>
            <Stack sx={{ paddingBottom: 0.5 }}
                direction="column"
                justifyContent="flex-start"
                alignItems="left"
                spacing={0.5} >
                <TextField id="outlined-basic0" value={nameUserBot} onChange={(e) =>  setNameUserBot(e.target.value)} label="Имя пользователя" variant="outlined" />
                <TextField id="outlined-basiс1" value={idUserBot} onChange={(e) => setIdUserBot(e.target.value)} label="Id пользователя" variant="outlined" />
            </Stack>
            <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
            <Button onClick={add_user_feedback_bot} variant="contained">Добавить</Button>
        </Box>
    )
}


export const AddBoxNewBot = ({ update }) => {
    const [nameBot, setNameBot] = useState('');
    const [tokenBot, setTokenBot] = useState('');
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })

    const create_bot = () => {
        if(nameBot.length < 3){
            return setAlertShow({ show: true, msgInfo: "Имя бота должно быть больше 4 символов", severity: "error" })
        }
        if(tokenBot.length < 10){
            return setAlertShow({ show: true, msgInfo: "Неверный токен", severity: "error" })
        }
        add_new_feedback_bot(nameBot, tokenBot)
            .then((data) => {
                if (data.error) return setAlertShow({ show: true, msgInfo: "Ошибка добавления", severity: "error" })
                update(true)
                setNameBot('')
                setTokenBot('')
                setAlertShow({ show: true, msgInfo: "Создан", severity: "success" })
            })
    }


    return (
        <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2, marginTop: 0.5, padding: 0.5 }}>
            <Typography variant="h5" gutterBottom >Добавить бота:</Typography>
            <Stack sx={{ paddingBottom: 0.5 }}
                direction="column"
                justifyContent="flex-start"
                alignItems="left"
                spacing={0.5} >
                <TextField id="outlined-basic0" value={nameBot} onChange={(e) => setNameBot(e.target.value)} label="Название бота" variant="outlined" />
                <TextField id="outlined-basiс1" value={tokenBot} onChange={(e) => setTokenBot(e.target.value)} label="Токен бота" variant="outlined" />
            </Stack>
            <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
            <Button onClick={create_bot} variant="contained">Добавить</Button>
        </Box>
    )
}