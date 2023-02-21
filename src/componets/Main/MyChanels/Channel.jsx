import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../hook/useAuth";
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import { BASE_URL } from '../../../api/api';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { get_channel_by_id, put_channel_by_id } from '../../../api/channels'


export default function Channel() {
    const token = localStorage.getItem('manage_jwt')
    const navigate = useNavigate();;
    const [checkChannel, setCheckChannel] = useState(false);
    const [inputID, setInputID] = useState('');
    const [inputName, setInputName] = useState(''); 
    const [inputLink, setInputLink] = useState('');
    const [alertShow, setAlertShow] = useState(true);
    const [errorMsg, setErrorMsg] = useState('ERROR');
    const [typeMsg, setTypeMsg] = useState("error")

    const { id } = useParams()


    useEffect(() => {
        get_channel_by_id
            .then((response) => {
                const data = response.data;
                if (Object.keys(data).length === 0) {
                    setCheckChannel(false)
                }else{
                    setCheckChannel(true)
                    setInputID(data.id_telegram)
                    setInputName(data.name_channel)
                    setInputLink(data.link_channel)
                }
            });
    }, [errorMsg]);

    const change_channel = () => {
        put_channel_by_id(inputID, inputLink, inputName, id)
            .then(function (res) {
                const data = res.data;
                setTypeMsg('success')
                setErrorMsg("Изменения сохранены")
                setAlertShow(false)
            })
            .catch(function (err) {
                setTypeMsg("error")
                setErrorMsg("Ошибка сохранения")
                setAlertShow(false)
            });
    }


    return(
        <>
        {!checkChannel ? <ChannelError /> : 

        <Box sx={{border: 1, borderColor: '#DCDCDC', borderRadius: 2}}>
        <Grid container spacing={2}>
        <Grid xs={3}>
            <Box sx={{p:5, bgcolor: '#cfe8fc', height: '190px',  maxWidth: '140px', textAlign: 'center'}} >
                ФОТО
            </Box>
        </Grid>
        <Grid xs={9}>
            <Paper sx={{p:2, border: 1, borderColor: '#DCDCDC', borderRadius: 2}}>
            <Stack
                component="form"
                sx={{
                }}
                spacing={2}
                noValidate
                autoComplete="off"
            >   
                <Typography variant="h6" gutterBottom>
                    Информация о канале
                </Typography>

                <TextInfo text='ID телеграм:' inputData={inputID}  setInputData={setInputID}/>
                <TextInfo text='Название канала:' inputData={inputName} setInputData={setInputName}/>
                <TextInfo text='Сылка на канал:' inputData={inputLink} setInputData={setInputLink}/>
                <Alert icon={false} severity={typeMsg} sx={{ display: (alertShow ? 'none' : 'block') }}>{errorMsg}</Alert>
                <Button onClick={change_channel} variant="outlined">Сохранить</Button>
            </Stack>
            </Paper>
        </Grid>
        </Grid>
        </Box>

        }
        </>
    )
}


export function ChannelError() {
    return(
        <div>
            <h3>CHANNEL NOT FOUND</h3>
        </div>
    )
}

export function TextInfo(props) {
    const [inputText, setInputText] = useState(true);
    const handleChange = (cb, value) => {
        cb(value)
    }
    return(
        <div>
            <Typography variant="subtitle1" gutterBottom>
                {props.text} {inputText ?  
                <span onDoubleClick={() => handleChange(setInputText, false)}>{props.inputData}</span>
                :
                <input 
                    type="text"
                    value={props.inputData}
                    onChange={(e) => handleChange(props.setInputData, e.target.value)}
                    onBlur={() => handleChange(setInputText, true)}
                    autoFocus
                />}
            </Typography>
        </div>
    )
}