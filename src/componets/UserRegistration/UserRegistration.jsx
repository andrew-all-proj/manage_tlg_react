import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Footer from '../Footer/Footer'
import Header from '../Heder/Header'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { get_jwt } from '../../api/api';
import TextField from '@mui/material/TextField';
import PasswordInput from "../LoginPage/PasswordInput"
import { AlertInfo } from '../service/AlertInfo';
import { useState } from "react";
import { create_new_user } from '../../api/user'


const check_valid_create_user = (username, email, password, repeatPassword) => {
    const usernameRegex = /^[a-z0-9_-яА-ЯёЁ']{3,16}$/ 
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i  
    const pswRegex = /^[a-z0-9_-{!@#$&*}]{6,18}$/

    if (!usernameRegex.test(username)){
        return 'Имя пользователя не может быть пустым и должно содержать только буквы или цифры не меньше трех знаков.'
    }
    if (!emailRegex.test(email)){
        return 'Не верный формат email.'
    }
    if (!pswRegex.test(password)){
        return 'Пароль должен содержать не менее 6 символов и состоять из цифр и латинский букв'
    }
    if (password !== repeatPassword){
        return 'Пароли не совпадают'
    }
    return null
}

const UserRegistration = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })
    

    const reg_user = () => {
        const res = check_valid_create_user(username, email, password, repeatPassword)
        if (res){
            setAlertShow({ show: true, msgInfo: res, severity: "error" })
        }else{
            create_new_user(username, email, password).
            then((data) => {
                if (data.error){
                    return setAlertShow({ show: true, msgInfo: 'Пользователь с таким email существует', severity: "error" })
                }
                setAlertShow({ show: true, msgInfo: 'Создан пользователь! На ваш email было отправлено письмо для потверждения почты.', severity: "success" })
                navigate('/login', { replace: false })
            })
        }
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
                        <TextField value={username} onChange={nameChange} id="outlined-basic" label="Имя" variant="outlined" />
                        <TextField value={email} onChange={emailChange} id="outlined-basic" label="Email" variant="outlined" />
                        <PasswordInput onChange={passwordChange} value={password}/>
                        <PasswordInput onChange={passwordChangeRepeat} value={repeatPassword}/>
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
