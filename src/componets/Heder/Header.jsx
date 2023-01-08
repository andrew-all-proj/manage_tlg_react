import Button from '@mui/material/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import labelImg from "../../assets/images/label.png"
import { useAuth } from '../hook/useAuth'
import style from "./Header.module.css"


const Header = () => {
    const {signout} = useAuth();
    const navigate = useNavigate()

    return <div className={style.Header}>
        <img className={style.label} src={labelImg} alt="manage tlg" />
        <div className={style.NameLabel}>
            <Button variant="contained" size="large">
                Manage TLG
            </Button>
        </div>
        <div className={style.ExitLabel}>
            <Button variant="outlined" size="large" 
                onClick={() => signout(() => navigate('/login', {replace: true}))}>
                Выход
            </Button>
        </div>
    </div>
} 

export default Header