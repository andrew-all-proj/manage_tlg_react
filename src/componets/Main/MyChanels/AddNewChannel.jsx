import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from "react-router-dom";
import {post_new_channel} from "../../../api/channels"


export default function AddNewChannel() {
    const navigate = useNavigate();
    const location = useLocation();
    const [nameChanel, setNameChanel] = useState(null);
    const [linkChanel, setLinkChanel] = useState(null);
    const [idChanel, setIdChanel] = useState(null);
    const [alert_show, setAlertShow] = useState(true);
    const [errorMsg, setErrorMsg] = useState('ERROR');
    const [typeMsg, setTypeMsg] = useState("error")

    const post_channel = () => {
        post_new_channel(idChanel, linkChanel, nameChanel)
            .then(function (res) {
                setAlertShow(false)
                setNameChanel('')
                setIdChanel('')
                setLinkChanel('')
                setTypeMsg('success')
                setErrorMsg('Канал сохранен')
                navigate('/channel/' + res.id_channel, { replace: false })
            })
            .catch(function (err) {
                if (err.response.status === 422){
                    setErrorMsg('Ошибка ввода')
                }
                setTypeMsg('error')
                setAlertShow(false)
            });
    }

    const nameChange = (e) => {
        setNameChanel(e.target.value);
    }

    const linkChange = (e) => {
        setLinkChanel(e.target.value);
    }

    const idChange = (e) => {
        setIdChanel(e.target.value);
    }

    return(
        <Box sx={{border: 1, borderColor: '#DCDCDC', borderRadius: 2}}>
        <Grid container spacing={1} justifyContent="flex-start">
                <Grid xs={12} md={4}>
                    <Box sx={{p:5, bgcolor: '#cfe8fc', height: '200px',  maxWidth: '150px', textAlign: 'center'}} >
                        ФОТО
                    </Box>
                </Grid>
                <Grid xs={12} md={4}>
                    <Paper sx={{p:2, border: 1, borderColor: '#DCDCDC', borderRadius: 2, maxWidth: '320px'}}>
                    <Stack
                        component="form"
                        sx={{
                            width: '30ch',
                        }}
                        spacing={2}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField value={nameChanel} onChange={nameChange} id="outlined-basic" label="Имя канала" variant="outlined" />
                        <TextField value={linkChanel} onChange={linkChange} id="outlined-basic" label="Сылка на канал" variant="outlined" />
                        <TextField value={idChanel}  onChange={idChange} id="outlined-basic" label="ID канала" variant="outlined" />
                        <Alert icon={false} severity={typeMsg} sx={{ display: (alert_show ? 'none' : 'block') }}>{errorMsg}</Alert>
                        <Button onClick={post_channel} variant="contained">Сохранить</Button>
                    </Stack>
                    </Paper>
                <Grid xs={0} md={4}></Grid>
                </Grid>
        </Grid>
        </Box>
    )
}