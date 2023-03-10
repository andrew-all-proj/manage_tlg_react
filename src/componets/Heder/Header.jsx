import Button from '@mui/material/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import labelImg from "../../assets/images/label.png"
import style from "./Header.module.css"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../store/userSlice'
import {setShowNavBar} from '../../store/mobileSlice'

const Header = ({setShowMeny, showMeny}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const mobileMode = useSelector(state => state.mobileMode)

    const clickShowMeny = () => {
        if (mobileMode.showNavBar) {return dispatch(setShowNavBar({showNavBar: false}))}
        if (!mobileMode.showNavBar) {return dispatch(setShowNavBar({showNavBar: true}))}
    }

    const signout = () => {
        localStorage.setItem('manage_jwt', '')
        dispatch(logOutUser())
        navigate('/login', {replace: true});
    }

    return <Box sx={{ p: 2,}}>
        <Grid container spacing={{ xs: 1,  md: 2 }}>
            <Grid  xs={3} md={1}>
                <img className={style.label} src={labelImg} alt="manage tlg" />
            </Grid>
            <Grid  xs={6} md={3}>
                <Button onClick={clickShowMeny} variant="contained" size="large">
                    Manage TLG
                </Button>
            </Grid>
            <Grid  xs={0} md={6}></Grid>
            <Grid  xs={3} md={1} justifyContent="flex-stop">
                <Button variant="outlined" size="large" 
                    onClick={signout}>
                    Выход
                </Button>
            </Grid>
        </Grid>
        
    </Box>
} 

export default Header

//() => signout(() => ))