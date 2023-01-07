import Button from '@mui/material/Button'
import React from 'react'
import labelImg from "../../assets/images/label.png"
import style from "./Header.module.css"


const Header: React.FC<any> = () => {
    return <div className={style.Header}>
        <img className={style.label} src={labelImg} alt="manage tlg" />
        <div className={style.NameLabel}>
            <Button variant="contained" size="large">
                Manage TLG
            </Button>
        </div>
        <div className={style.ExitLabel}>
            <Button variant="outlined" size="large">
                Выход
            </Button>
        </div>
    </div>
} 

export default Header