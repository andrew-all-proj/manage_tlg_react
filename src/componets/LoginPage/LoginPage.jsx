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
import PasswordInput from '../service/PasswordInput'
import { get_jwt, send_email_confirm } from '../../api/api';
import ConfirmMail from "./ConfirmMail"
import { AlertInfo } from "../service/AlertInfo"

import { useState } from "react";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authUser, logOutUser } from '../../store/userSlice';


const LoginPage  = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [idUser, setIdUser] = useState('');
    const [showConfirmMail, setShowConfirmMail] = useState(false);
    const [showAlert, setShowAlert] = useState({ show: false, msgInfo: '', severity: "error" })
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const signin = (newtoken, id_user) => {
        localStorage.setItem('manage_jwt', newtoken)
        localStorage.setItem('manage_id', id_user)
        navigate(fromPage, { replace: true });
    }


    const fromPage = location.state?.from?.pathname || '/'; // path redirect

    const auth_user = () => {
        if (!email || !password){
            return setShowAlert({ show: true, msgInfo: 'Поля ввода не могут быть пустыми', severity: "error" })
        }
        get_jwt(email.trim(), password.trim())
            .then(function (res) {
                dispatch(authUser({user_name: res.user_name, id_user: res.id_user}))
                setShowAlert({ show: true, msgInfo: 'Успешно', severity: "success" })
                signin(res.auth_token, res.id_user)
            })
            .catch(function (err) {
                console.log(err)
                if (err.code === "ERR_NETWORK"){
                    setShowAlert({ show: true, msgInfo: 'Нет связи сервером', severity: "error" })
                }
                if (err.response.data.confirm){
                    setIdUser(err.response.data.confirm)
                    return setShowConfirmMail(true)
                }
                console.log(err)
                setShowAlert({ show: true, msgInfo: 'Ошибка ввода пароля или email', severity: "error" })
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
                            <PasswordInput label="Пароль" onChange={passwordChange} value={password} />

                            <AlertInfo showAlert={showAlert.show} setShowAlert={setShowAlert} severity={showAlert.severity} value={showAlert.msgInfo} />

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