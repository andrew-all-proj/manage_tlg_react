import * as React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect} from "react";
import { AlertInfo } from '../../service/AlertInfo';
import { Card } from '@mui/material';
import Stack from '@mui/material/Stack';
import ComponentDateTimePicker from '../../service/DataTime';
import { post_event, update_event, get_event } from '../../../api/events'
import { useLocation, useNavigate, useParams} from "react-router-dom";



export const BlockTimePublish = ({idPost, idChannel, savePost, datePublishPost, setDatePublishPost, 
    dateRemovePost, setDateRemovePost, idEvent, setIdEvent}) => {
    const [alertPublish, setAlertPublish] = useState({ show: false, msgInfo: '', severity: "error" })
    const navigate = useNavigate();

    // CREATE EVENT
    const publishPost = (event) => {
        if (idChannel) {
            savePost()
            post_event(datePublishPost, dateRemovePost, idChannel, idPost).
                then((data) => {
                    if(data.error) return setAlertPublish({ show: true, msgInfo: data.msg, severity: "error" })
                    setIdEvent(data.id_event)
                    navigate(`/post/${idPost}/${data.id_event}`)
                    setAlertPublish({ show: true, msgInfo: 'Пост добавлен в расписание канала', severity: "success" })
                })
        } else {
            setAlertPublish({ show: true, msgInfo: 'Выберите канал', severity: "error" })
        }
    }

    const changePublishPost = (event) => {
        if (idChannel && idEvent) {
            update_event(idEvent, datePublishPost, dateRemovePost, idPost).
                then((data) => {
                })
        }
    }


    return (
        <Card sx={{ maxWidth: 450, p: 1 }}>
            <ComponentDateTimePicker sx={{ margin: 2 }} datePublishPost={datePublishPost}
                setDatePublishPosts={setDatePublishPost}
                dateRemovePost={dateRemovePost}
                setDateRemovePost={setDateRemovePost} />
            <AlertInfo showAlert={alertPublish.show} setAlertShow={setAlertPublish} 
                        severity={alertPublish.severity} value={alertPublish.msgInfo} />
            <Stack direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{ width: "330px" }}>
                <Button variant="contained" onClick={publishPost}
                    sx={{ margin: 1, width: "130px" }}>Опубликовать</Button>
                {idEvent && <Button variant="contained" onClick={changePublishPost}
                    sx={{ margin: 1, width: "130px" }}>Изменить</Button>}
            </Stack>
        </Card>
    )
}