import Alert from '@mui/material/Alert';
import { useState, useEffect } from "react";




export const AlertInfo = ({showAlert, setAlertShow, severity, value, time=5000, ...props}) => {

    useEffect(() => {
        if(showAlert){
        const timeout = setTimeout(() => {
            setAlertShow({show: false})
        }, time)

        return () => clearTimeout(timeout)
        }
    }, [showAlert])

    if (!showAlert) return null

    return (
        <div>
            <Alert icon={false} severity={severity} sx={{ margin: 1, maxWidth: 300 }}>{value}</Alert>
        </div>
    )
}