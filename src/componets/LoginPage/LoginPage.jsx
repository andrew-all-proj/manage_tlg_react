import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Footer from '../Footer/Footer'
import Header from '../Heder/Header'
import Box from '@mui/material/Box';


const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {signin} = useAuth();

    const fromPage = location.state?.from?.pathname || '/';
    console.log(fromPage)

    const handelSubmint = (event) => {
        event.preventDefault();
        const form = event.target;
        const user = form.username.value;

        signin(user, () => navigate(fromPage, {replace: true}));
    }

    return(
        <Container maxWidth="md">
        <Grid container spacing={3}>
            <Grid md={12}>
                <Header />
            </Grid>
        <Grid md={12}>
            <h1>LOGIN PAGE</h1>
        <form onSubmit={handelSubmint}>
            <label>
                Name: <input name="username" />
            </label>
            <button type="submit">Login</button>
        </form>
        </Grid>
        <Grid md={12}>
            <Box sx={{  border: "solid",  borderColor: "blue", borderWidth: 1, borderRadius: 2}}>
                <h3>
                    Cервис Manage TLG - предназначен:
                </h3> 
                <div>
                    Управления каналом в Telegram
                    Формирование постов
                    Удаление постов
                    Редактирование постов
                    Создание расписания на каналах
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

export default LoginPage;