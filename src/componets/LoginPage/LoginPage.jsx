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
import PasswordInput from './PasswordInput'
import { get_jwt, send_email_confirm } from '../../api/api';
import ConfirmMail from "./ConfirmMail"

import { useState } from "react";


const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [idUser, setIdUser] = useState('');
    const [alert_show, setAlertShow] = useState(true);
    const [showConfirmMail, setShowConfirmMail] = useState(false);


    const fromPage = location.state?.from?.pathname || '/'; // path redirect

    const auth_user = () => {
        get_jwt(email.trim(), password.trim())
            .then(function (res) {
                console.log(res)
                const token = res.auth_token;
                setAlertShow(true)
                signin(token, () => navigate(fromPage, { replace: true }))
            })
            .catch(function (err) {
                if (err.response.data.confirm){
                    setIdUser(err.response.data.confirm)
                    return setShowConfirmMail(true)
                }
                console.log(err)
                setAlertShow(false)
            });
    }

    const reg_user = () => {
        navigate("/user_reg", { replace: true })
    }

    const emailChange = (e) => {
        setEmail(e.target.value.toLowerCase());
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
                    {showConfirmMail ? <ConfirmMail setShowConfirmMail={setShowConfirmMail} email={email} idUser={idUser}/> :
                        <Stack
                            component="form"
                            sx={{
                                width: '40ch',
                            }}
                            spacing={2}
                            noValidate
                            autoComplete="off"
                        >
                            <Typography variant="h4">
                                Вход
                            </Typography>
                            <TextField value={email} onChange={emailChange} id="outlined-basic" label="Email" variant="outlined" />
                            <PasswordInput onChange={passwordChange} value={password} />

                            <Alert icon={false} severity="error" sx={{ display: (alert_show ? 'none' : 'block') }}>Error password or email</Alert>

                            <Button onClick={auth_user} variant="contained">Вход</Button>
                            <Button onClick={reg_user} variant="contained">Регистрация</Button>

                        </Stack>
                    }

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
                            <p>Создание расписания в телеграмм каналах </p>
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