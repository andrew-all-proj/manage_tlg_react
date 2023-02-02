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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';


export default function Channel() {
    const token = localStorage.getItem('manage_jwt')
    const navigate = useNavigate();
    const [typeMsg, setTypeMsg] = useState("error")
    const [alert_show, setAlertShow] = useState(true);
    const [errorMsg, setErrorMsg] = useState('ERROR');
    const [channel, setChannel] = useState([]);
    const { id } = useParams()
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    useEffect(() => {
        setChannel([])
        axios
            .get(`${BASE_URL}channels/${id}`, config)
            .then((response) => {
                const data = response.data;
                if (Object.keys(data).length === 0) {
                    setChannel([])
                }else{
                    setChannel(data)
                }
            });
    }, []);
    console.log(channel)

    return(
        <>
        {channel.length === 0 ? <ChannelError /> : 

        <Box sx={{border: 1, borderColor: '#DCDCDC', borderRadius: 2}}>
        <Grid container spacing={2}>
        <Grid xs={3}>
            <Box sx={{p:5, bgcolor: '#cfe8fc', height: '180px',  maxWidth: '150px', textAlign: 'center'}} >
                ФОТО
            </Box>
        </Grid>
        <Grid xs={9}>
            <Paper sx={{p:2, border: 1, borderColor: '#DCDCDC', borderRadius: 2}}>
            <Stack
                component="form"
                sx={{
                    width: '30ch',
                }}
                spacing={2}
                noValidate
                autoComplete="off"
            >   
                <Typography variant="h6" gutterBottom>
                    Информация о канале
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    ID - Телеграм: {channel.id_telegram}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Название канала: {channel.name_channel}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Сылка на канал: {channel.link_channel}
                </Typography>
                <Alert icon={false} severity={typeMsg} sx={{ display: (alert_show ? 'none' : 'block') }}>{errorMsg}</Alert>
                <Button variant="outlined">Изменить</Button>
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