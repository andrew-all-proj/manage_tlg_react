import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Footer from '../Footer/Footer'
import Header from '../Heder/Header'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { BASE_URL } from '../../api/api';

import { useState } from "react";

import axios from "axios";
import { getJWT } from "../../api/api";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert_show, setAlertShow] = useState(true);


    const fromPage = location.state?.from?.pathname || '/'; // path redirect

    const auth_user = () => {
        axios.post(`${BASE_URL}auth`, { email, password })
            .then(function (res) {
                const token = res.data.auth_token;
                setAlertShow(true)
                signin(token, () => navigate(fromPage, { replace: true }))
            })
            .catch(function (err) {
                setAlertShow(false)
            });
    }

    const emailChange = (e) => {
        setEmail(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }


    return (
        <Container maxWidth="md">
            <Grid container spacing={3}>
                <Grid md={12}>
                    <Header />
                </Grid>
                <Grid md={12} display="flex" justifyContent="center" alignItems="center">
                    <Stack
                        component="form"
                        sx={{
                            width: '40ch',
                        }}
                        spacing={2}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography  variant="h3">
                            Вход
                        </Typography>
                        <TextField value={email} onChange={emailChange} id="outlined-basic" label="Email" variant="outlined" />
                        <TextField value={password} onChange={passwordChange} id="outlined-basic" label="Password" variant="outlined" />
                        <Alert icon={false} severity="error" sx={{ display: (alert_show ? 'none' : 'block') }}>Error password or email</Alert>
                        <Button onClick={auth_user} variant="contained">Вход</Button>
                    </Stack>

                </Grid>
                <Grid md={12} display="flex" justifyContent="center" alignItems="center">
                    <Box sx={{ border: "solid", borderColor: "blue", borderWidth: 1, borderRadius: 2, padding: 1 }}>
                        <h3>
                            Cервис Manage TLG - предназначен:
                        </h3>
                        <div>
                            <p> Управления каналом в Telegram </p>
                            <p>Формирование постов </p>
                            <p>Удаление постов </p>
                            <p>Редактирование постов </p>
                            <p>Создание расписания на каналах </p>
                        </div>
                    </Box>
                </Grid>
                <Grid md={12}>
                    <Footer />
                </Grid>
            </Grid>
        </Container>
    )
}

export default LoginPage