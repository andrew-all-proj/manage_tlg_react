import Alert, { AlertColor } from '@mui/material/Alert';
import { useState, useEffect } from "react";

export type setAlertShowType = {
    show: boolean;
    msgInfo?: string;
    severity?: AlertColor;
    };

type AlertInfoType = {
    time?: number
    value: string
    severity: AlertColor | undefined;
    showAlert: boolean
    setAlertShow: (params: setAlertShowType) => void
}


export const AlertInfo: React.FC<AlertInfoType> = ({showAlert, setAlertShow, severity, value, time=10000}) => {

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