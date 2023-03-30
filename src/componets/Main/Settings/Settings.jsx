import * as React from 'react';
import { useAuth } from "../../hook/useAuth";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import { padding } from '@mui/system';
import { addTodo, removeTodo } from '../../../store/todoSlice';
import { get_list_tags, add_tag, remove_tag, update_tag } from '../../../api/tags'
import { useState, useEffect } from "react";
import {TextChangeDoubleClick} from '../../service/TextChangeDoubleClick'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Stack from '@mui/material/Stack';
import {get_user_by_id, update_user} from '../../../api/user';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import PasswordInput from '../../service/PasswordInput';
import { AlertInfo } from '../../service/AlertInfo';
import { check_valid_create_user } from '../../service/serviceFunctions/checkImputReg';
//check_valid_create_user = (username=null, email=null, password=null, repeatPassword=null)


export default function Settings() {
    //const id_user = useSelector(state => state.id_user)
    const [idUser, setIdUser] = useState(localStorage.getItem('manage_id'));
    const [name, setUserName] = useState();
    const [idTelegram, setIdTelegram] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState([]);
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })


    useEffect(() => {
        if(idUser){
            get_user_by_id(idUser).
            then((data) => {
                setUserName(data.user_name)
                setIdTelegram(data.id_telegram)
                setEmail(data.email)
            })
            
        }
    }, [idUser]);


    const updateUserInfo = () => {
        const msg = check_valid_create_user(name.trim(), email.trim())
        if (msg){
            return setAlertShow({ show: true, msgInfo: msg, severity: "error" })
        }
        update_user(idUser, email.trim(), idTelegram.trim(), name.trim()).
        then((data) => {
            if(data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
            setUserName(data.user_name)
            setIdTelegram(data.id_telegram)
            setEmail(data.email)
            setAlertShow({ show: true, msgInfo: "Сохранено", severity: "success" })
        })
    }


    const updatePassword = () => {
        const msg = check_valid_create_user(undefined, undefined, newPassword[0], newPassword[1])
        if (msg){
            return setAlertShow({ show: true, msgInfo: msg, severity: "error" })
        }
        update_user(idUser, null, null, null, password, newPassword[0]).
        then((data) => {
            if(data.error) return setAlertShow({ show: true, msgInfo: "Ошибка пароля", severity: "error" })
            setUserName(data.user_name)
            setIdTelegram(data.id_telegram)
            setEmail(data.email)
            setAlertShow({ show: true, msgInfo: "Пароль изменен", severity: "success" })
        })
    }


    return (
        <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2 }}>
            <Grid container spacing={1}>
                <Grid xs={12}>
                    <h4>Настройки</h4>
                    <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
                </Grid>
                <Grid xs={12}>
                    <Stack direction="column" spacing={1} >
                        <IteamInfo id='IteamInfo1' key="IteamInfokey1"  label="Имя:" inputData={name} setInputData={setUserName}/>
                        <IteamInfo id='IteamInfo2' key="IteamInfokey2" label="Email:" inputData={email} setInputData={setEmail}/>
                        <IteamInfo id='IteamInfo3' key="IteamInfokey3" label="ID телеграм:" inputData={idTelegram} setInputData={setIdTelegram}/>
                        <Button sx={{maxWidth: 100}} variant="contained" onClick={updateUserInfo}>Сохранить</Button>
                        <Box sx={{maxWidth: 350}}>
                            <PasswordInput onChange={(e) => setPassword(e.target.value)} value={password} id='psw1' label='Старый пароль' />
                        </Box>
                        <Box>
                            <PasswordInput onChange={(e) => setNewPassword([e.target.value, newPassword[1]])} value={newPassword[0]} id='psw2' label='Новый пароль'/>
                            <PasswordInput onChange={(e) => setNewPassword([newPassword[0], e.target.value])} value={newPassword[1]} id='psw3' label='Новый пароль' />
                        </Box>
                        
                        <Button sx={{maxWidth: 100}} variant="contained" onClick={updatePassword}>Сохранить</Button>
                    </Stack>
                </Grid>
            </Grid>

            
        </Box>
    );
}

const IteamInfo = ({id, label, inputData, setInputData }) => {
    const [inputText, setInputText] = useState(true);
    const modeInputText = () => {
        setInputText(false)
    }

    return (
        <Stack direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={0.5} >
        <TextChangeDoubleClick id={id+"TextChangeDoubleClick"} label={label} inputData={inputData} setInputData={setInputData} inputText={inputText} setInputText={setInputText} />
        <IconButton onClick={modeInputText} aria-label="delete" size="small">
            <BorderColorIcon fontSize="default" color="primary" />
        </IconButton>
        </Stack>
    )

}