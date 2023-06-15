import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { AlertInfo } from '../../service/serviceComponents/AlertInfo';
import { get_channel_by_id, put_channel_by_id } from '../../../api/channels'
import { TextChangeDoubleClick } from '../../service/TextChangeDoubleClick'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';


export default function Channel() {
    const [checkChannel, setCheckChannel] = useState(false);
    const [inputID, setInputID] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputLink, setInputLink] = useState('');
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })

    const { id } = useParams()


    useEffect(() => {
        get_channel_by_id(id)
            .then((response) => {
                const data = response;
                if (Object.keys(data).length === 0) {
                    setCheckChannel(false)
                } else {
                    setCheckChannel(true)
                    setInputID(data.id_telegram)
                    setInputName(data.name_channel)
                    setInputLink(data.link_channel)
                }
            });
    }, [showAlert]);

    const change_channel = () => {
        put_channel_by_id(inputID, inputLink, inputName, id)
            .then(function (data) {
                if(data.error) return setAlertShow({ show: true, msgInfo: "Ошибка сохранения", severity: "error" })
                setAlertShow({ show: true, msgInfo: "Изменения сохранены", severity: "success" })
            });
    }

    return (
        <>
            {!checkChannel ? <ChannelError /> :

                <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2 }}>
                    <Grid container spacing={0.5} justifyContent="center">
                        <Grid xs={12} md={4}>
                            <Box sx={{ p: 5, bgcolor: '#cfe8fc', height: '190px', maxWidth: '140px', textAlign: 'center' }} >
                                ФОТО
                            </Box>
                        </Grid>
                        <Grid xs={12} md={4}>
                            <Paper sx={{ p: 2, border: 1, borderColor: '#DCDCDC', borderRadius: 2, maxWidth: '800px', minWidth: '230px' }}>
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        Информация о канале
                                    </Typography>
                                    <IteamInfo label="Название канала:" inputData={inputName} setInputData={setInputName} />
                                    <IteamInfo label="ID телеграм:" inputData={inputID} setInputData={setInputID} />
                                    <IteamInfo label="Сылка на канал" inputData={inputLink} setInputData={setInputLink} />
                                    <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
                                    <Button onClick={change_channel} variant="outlined">Сохранить</Button>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid xs={0} md={4}></Grid>
                    </Grid>
                </Box>

            }
        </>
    )
}


const IteamInfo = ({ label, inputData, setInputData }) => {
    const [inputText, setInputText] = useState(true);
    const modeInputText = () => {
        setInputText(false)
    }

    return (<>
        <Stack direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={0.5} >
        <TextChangeDoubleClick label={label} inputData={inputData} setInputData={setInputData} inputText={inputText} setInputText={setInputText} />
        <IconButton onClick={modeInputText} aria-label="delete" size="large">
            <BorderColorIcon fontSize="default" color="primary" />
        </IconButton>
        </Stack>
    </>
    )

}

export function ChannelError() {
    return (
        <div>
            <h3>CHANNEL NOT FOUND</h3>
        </div>
    )
}