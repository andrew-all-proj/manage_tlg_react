import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react";
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import { AlertInfo } from '../../service/serviceComponents/AlertInfo';
import { post_create } from '../../../api/posts'
import { set_media_to_post } from '../../../api/media'
import { post_event} from '../../../api/events'
import { PER_PAGE } from '../../../api/api'
import FormBoxMedia from './FormBoxMedia';


const FormListNewSchedule = ({ setFormListSchedule, listMedia, limitrecords, timeStop, timeStart, intervalTime, idChannel, timeRemove, totalPage}) => {
    const [page, setPage] = useState(1);
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [listForCreateSchedule, setListForCreateSchedule] = useState([]);
    const TimeStart = new Date(timeStart)
    const [hours, minutes] = intervalTime.split(':');
    const secondsInterval = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })


    function paginate(items, page_size, current_page) {
        let start_index = (current_page - 1) * page_size;
        let end_index = start_index + page_size;
        let paginated_items = items.slice(start_index, end_index);
        return paginated_items;
    }


    const dateTimeRemove = (time) => {
        if(timeRemove && timeRemove != 0){
            return new Date(time.getTime() + parseInt(timeRemove, 10) * 60 * 60 * 1000);
        }
        return null
    }


    useEffect(() => {
        const Time = new Date(TimeStart.setSeconds(TimeStart.getSeconds() - secondsInterval))
        let listSchedule = []
        listMedia.items.forEach((item) => {
            const date_publish = new Date(Time.setSeconds(Time.getSeconds() + secondsInterval))
            listSchedule.push({
                'id_media': item.id_media, "date_publish": date_publish, "dateRemovePost": dateTimeRemove(date_publish),
                'description': item.description, 'last_time_used': item.last_time_used,
                'date_download': item.date_download, "type_media": item.type_media.type_media,
                'publish': true, "text_post": '',
            })
        });
        setListForCreateSchedule(listSchedule)
    }, [listMedia]);

    const pageChange = (event, value) => {
        setPage(value);
    }


    const setMediaToPost = (id_media, id_post) => {
        set_media_to_post(id_media, id_post).
            then((data) => {
                if (data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
            })
    }

    const createEvent = (datePublishPost, dateRemovePost, idChannel, id) => {
        post_event(datePublishPost, dateRemovePost, idChannel, id).
            then((data) => {
                if (data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
            })
    }


    const saveSchedule = () => {
        for (let i = 0; i < listForCreateSchedule.length; i++) {
            if (listForCreateSchedule[i].publish) {
                post_create(listForCreateSchedule[i].text_post).
                    then((data) => {
                        if (data.error) {
                            setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
                            return null 
                        }
                        setMediaToPost(listForCreateSchedule[i].id_media, data.id_post)
                        return data.id_post
                    }).
                    then((id_post) => {
                        if (!id_post) return null
                        createEvent(listForCreateSchedule[i].date_publish, listForCreateSchedule[i].dateRemovePost, idChannel, id_post)
                        setDisableSaveButton(true)
                        setAlertShow({ show: true, msgInfo: "Расписание опубликовано", severity: "success" })
                    })
            }
        }
        
    }


    return (
        <Grid container spacing={0.5} >
            <div>
                <Button onClick={() => setFormListSchedule(false)}>Назад</Button>
            </div>
            {paginate(listForCreateSchedule, PER_PAGE, page).map((item) =>
                <Grid xs={12} key={item.id_media} >
                    <Box sx={{ m: 1, border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2 }}>
                        <FormBoxMedia data={item} listForCreateSchedule={listForCreateSchedule} setListForCreateSchedule={setListForCreateSchedule} />
                    </Box>
                </Grid>)}
            <Grid md={6} xs={12}>
                <Pagination onChange={pageChange} page={page} count={Math.ceil(totalPage / PER_PAGE)} defaultPage={1} variant="outlined" shape="rounded" />
            </Grid>
            <Grid md={12} xs={12}>
            <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
                <Stack direction='row' spacing={2}>
                    <Button variant="contained" onClick={() => setFormListSchedule(false)}>Назад</Button>
                    <Button disabled={disableSaveButton} variant="contained" onClick={saveSchedule}>Сохранить</Button>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default FormListNewSchedule;