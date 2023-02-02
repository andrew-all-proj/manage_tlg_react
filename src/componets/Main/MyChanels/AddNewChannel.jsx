import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../hook/useAuth";
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { BASE_URL } from '../../../api/api';
import { Link, NavLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from "react-router-dom";


export default function AddNewChannel() {
    const token = localStorage.getItem('manage_jwt')
    const {signout} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [nameChanel, setNameChanel] = useState(null);
    const [linkChanel, setLinkChanel] = useState(null);
    const [idChanel, setIdChanel] = useState(null);
    const [alert_show, setAlertShow] = useState(true);
    const [errorMsg, setErrorMsg] = useState('ERROR');
    const [typeMsg, setTypeMsg] = useState("error")

    const post_channel = () => {
        const data = {
            "id_telegram": idChanel,
            "link_channel": linkChanel,
            "name_channel": nameChanel
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.post(`${BASE_URL}channels`, data, config)
            .then(function (res) {
                setAlertShow(false)
                setNameChanel('')
                setIdChanel('')
                setLinkChanel('')
                setTypeMsg('success')
                setErrorMsg('Канал сохранен')
            })
            .catch(function (err) {
                if (err.response.status === 401){
                    signout(() => navigate('/login', {replace: true}))
                }
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
        <Grid container spacing={2}>
                <Grid xs={3}>
                    <Box sx={{p:5, bgcolor: '#cfe8fc', height: '200px',  maxWidth: '150px', textAlign: 'center'}} >
                        ФОТО
                    </Box>
                </Grid>
                <Grid xs={9}>
                    <Paper sx={{p:2, border: 1, borderColor: '#DCDCDC', borderRadius: 2}}>
                    <Stack
                        component="form"
                        sx={{
                            width: '40ch',
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
                </Grid>
        </Grid>
        </Box>
    )
}