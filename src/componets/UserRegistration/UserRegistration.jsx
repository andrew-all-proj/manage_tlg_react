import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Footer from '../Footer/Footer'
import Header from '../Heder/Header'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import PasswordInput from "../service/PasswordInput"
import { AlertInfo } from '../service/AlertInfo';
import { useState } from "react";
import { create_new_user } from '../../api/user'
import { send_email_confirm } from '../../api/api'
import {check_valid_create_user} from '../service/serviceFunctions/checkImputReg'


const UserRegistration = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })
    

    const reg_user = () => {
        const res = check_valid_create_user(username.trim(), email.trim(), password.trim(), repeatPassword.trim())
        if (res){
            setAlertShow({ show: true, msgInfo: res, severity: "error" })
        }else{
            create_new_user(username.trim(), email.trim(), password.trim())
            .then((data) => {
                if (data.status === 400 || data.status === 422 ){
                    return setAlertShow({ show: true, msgInfo: 'Пользователь с таким email существует или не коретно введен', severity: "error" })
                }
                send_email(data.id_user)
                setAlertShow({ show: true, msgInfo: 'Создан пользователь! На ваш email было отправлено письмо для потверждения почты.', severity: "success" })
                navigate('/login', { replace: false })})
            .catch(function (err) {
                console.log(err)
                setAlertShow({ show: true, msgInfo: 'Неверно введены данные', severity: "error" })
            })
        }
    }


    const send_email = (id_user) => {
        send_email_confirm(id_user)
            .then(function (res) {
                console.log(res)
            })
            .catch(function (err) {
                console.log(err)
            });
    }

    

    const nameChange = (e) => {
        setUsername(e.target.value);
    }

    const emailChange = (e) => {
        setEmail(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    const passwordChangeRepeat = (e) => {
        setRepeatPassword(e.target.value);
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
                        <Typography variant="h4">
                            Регистрация
                        </Typography>
                        <TextField value={username} onChange={nameChange} id="outlined-basic1" label="Имя" variant="outlined" />
                        <TextField value={email} onChange={emailChange} id="outlined-basic2" label="Email" variant="outlined" />
                        <PasswordInput id="usr1" label="Новый пароль" onChange={passwordChange} value={password}/>
                        <PasswordInput id="usr2" label="Новый пароль" onChange={passwordChangeRepeat} value={repeatPassword}/>
                        <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} 
                                    severity={showAlert.severity} value={showAlert.msgInfo}  time={25000} />
                        <Button onClick={reg_user} variant="contained">Сохранить</Button>
                    </Stack>

                </Grid>
                <Grid md={12}>
                    <Footer />
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserRegistration
