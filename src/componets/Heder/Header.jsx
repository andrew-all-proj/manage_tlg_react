import Button from '@mui/material/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import labelImg from "../../assets/images/label.png"
//import style from "./Header.module.css"
import Box from '@mui/material/Box';
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../store/userSlice'
import { setShowNavBar } from '../../store/mobileSlice'
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { CardMedia } from '@mui/material';

const Header = ({ setShowMeny, showMeny }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const mobileMode = useSelector(state => state.mobileMode)

    const clickShowMeny = () => {
        if (mobileMode.showNavBar) { return dispatch(setShowNavBar({ showNavBar: false })) }
        if (!mobileMode.showNavBar) { return dispatch(setShowNavBar({ showNavBar: true })) }
    }

    const signout = () => {
        localStorage.setItem('manage_jwt', '')
        dispatch(logOutUser())
        navigate('/login', { replace: true });
    }

    return <Box >
        <Grid container spacing={{ xs: 2, md: 10 }}>
            <Grid xs={3} md={1}>
                <CardMedia 
                    sx={{ width: 70, height: 45 }}
                    component='img'
                    preload="auto"
                    controls
                    image={labelImg}
                />
            </Grid>
            <Grid xs={6} md={3}>
                <Button onClick={clickShowMeny} variant="contained" sx={{ minWidth: "100px", minHeight: "45px" }}>
                    Manage TLG
                </Button>
            </Grid>
            <Grid xs={0} md={6}></Grid>
            <Grid xs={2} md={1} justifyContent="flex-stop">
                <IconButton onClick={signout} color="primary">
                    <LogoutIcon sx={{ fontSize: 40 }} />
                </IconButton>
            </Grid>
        </Grid>

    </Box>
}

export default Header

//() => signout(() => ))