import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AlertInfo } from '../service/AlertInfo';
import { get_jwt, send_email_confirm } from '../../api/api';



const ConfirmMail = ({ setShowConfirmMail, email, idUser }) => {
    const [showAlertPublish, setAlertPublish] = useState({ show: false, msgInfo: '', severity: "error" })
    const [disabledButton, setDisabledButton] = useState(false)

    const send_email = () => {
        setDisabledButton(true)
        send_email_confirm(idUser)
            .then(function (res) {
                setAlertPublish({ show: true, msgInfo: 'Письмо отправлено', severity: "success" })
                console.log(res)
            })
            .catch(function (err) {
                setDisabledButton(false)
                console.log(err)
            });
    }

    const exitConfirmMail = () => {
        setShowConfirmMail(false)
    }

    return (
        <div>
            <Stack
                component="form"
                sx={{
                    width: '40ch',
                }}
                spacing={2}
                noValidate
                autoComplete="off"
            >
                <Typography variant="h5">
                    Потверждение почты
                </Typography>
                <Box sx={{ border: "solid", borderColor: "blue", borderWidth: 1, borderRadius: 2, padding: 1 }}>
                    <p>Для входа потвердите свою электронную почту: {email}.</p>
                    <p>Пройдите по сылке в отправленом письме. </p>
                    <p>Для повторной отправки нажмите кнопку отправить ссылку.</p>
                </Box>
                {disabledButton && <p>Повторно отправить через: <Timer seconds={60} cb={setDisabledButton} /> </p>}
                <AlertInfo showAlert={showAlertPublish.show} setAlertShow={setAlertPublish} severity={showAlertPublish.severity} value={showAlertPublish.msgInfo} time={20000} />
                <Button onClick={send_email} variant="contained" disabled={disabledButton}>Отправить ссылку</Button>
                <Button onClick={exitConfirmMail} variant="contained">Выход</Button>

            </Stack>
        </div>
    )
}

export default ConfirmMail;

const Timer = ({ seconds, cb }) => {
    // initialize timeLeft with the seconds prop
    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
        // exit early when we reach 0
        if (!timeLeft) return cb(false);

        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [timeLeft]);

    return (<>
                <h4>{timeLeft}</h4>
            </>
    );
};