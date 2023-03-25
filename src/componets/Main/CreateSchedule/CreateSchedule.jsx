import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import SelectChannel from '../../service/SelectChannel';
import { InputDateTime, InputTime } from '../../service/DataTime'
import { formatDateTime, localDate } from '../../service/localDateTime'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SelectTags from '../../service/TagsForm'
import { get_media } from '../../../api/media'
import { AlertInfo } from '../../service/AlertInfo';
import TextField from '@mui/material/TextField';
import  FormListNewSchedule from './FormListNewSchedule'
import { PER_PAGE } from '../../../api/api'


const CreateSchedule = () => {
    const [idChannel, setIdChannel] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [timeStart, setTimeStart] = useState(formatDateTime());
    const [timeStop, setTimeStop] = useState(formatDateTime());
    const [intervalTime, setIntervalTime] = useState('01:00');
    const [timeRemove, setTimeRemove] = useState(0);
    const [published, setPublished] = useState(true);
    const [formListSchedule, setFormListSchedule] = useState(false);
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })
    const [listMedia, setListMedia] = useState({});
    const [limitrecords, setLimitrecords] = useState(0);


    const countMediaForTime = () => {
        const TimeStart = new Date(timeStart)
        const TimeStop = new Date(timeStop)
        const [hours, minutes] = intervalTime.split(':');
        const secondsInterval = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60;
        if (TimeStart > TimeStop) {
            setAlertShow({ show: true, msgInfo: "Дата старта должна бвть меньше даты стоп", severity: "error" })
            return false
        }
        return Math.floor((TimeStop - TimeStart) / secondsInterval / 1000)
    }


    const get_list_media = (page = 1, per_page = PER_PAGE) => {
        if (!idChannel) return setAlertShow({ show: true, msgInfo: "Выберите канал", severity: "error" })
        setLimitrecords(countMediaForTime())
        if (limitrecords === 0) return setAlertShow({ show: true, msgInfo: "Укажите время", severity: "error" })
        get_media(page, limitrecords, published, idChannel, limitrecords).
            then((data) => {
                if (data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
                setListMedia(data)
                setFormListSchedule(true)
            })
    }

    return (
        <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2 }}>
            {formListSchedule ? <FormListNewSchedule setFormListSchedule={setFormListSchedule} listMedia={listMedia}
                limitrecords={limitrecords} timeStart={timeStart} timeStop={timeStop} intervalTime={intervalTime} idChannel={idChannel} timeRemove={timeRemove}/> :
                <Grid container spacing={0.5} >
                    <Grid md={12} xs={12}>
                        <h3>Создать расписание</h3>
                        <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
                    </Grid>
                    <Grid md={6} xs={12}>
                        <SelectChannel setIdChannel={setIdChannel} channel={idChannel} />
                    </Grid>
                    <Grid md={6} xs={12}>
                        <SelectTags selectedTag={selectedTag} setSelectedTag={setSelectedTag} idChannel={idChannel} />
                    </Grid>
                    <Grid md={6} xs={12}>
                        <InputDateTime sx={{ minWidth: 300, m: 1 }} label="Время начала" dateTimeValue={timeStart} setdateTimeValue={setTimeStart} />
                    </Grid>
                    <Grid md={6} xs={12}>
                        <InputDateTime sx={{ minWidth: 300, m: 1 }} label="Время конца" dateTimeValue={timeStop} setdateTimeValue={setTimeStop} />
                    </Grid>
                    <Grid md={6} xs={12}>
                        <InputTime sx={{ minWidth: 300, m: 1 }} label="Промежуток" dateTimeValue={intervalTime} setdateTimeValue={setIntervalTime} />
                    </Grid>
                    <Grid md={6} xs={12}>
                        <SetTimeRemove setTimeRemove={setTimeRemove} timeRemove={timeRemove}/>
                    </Grid>
                    <Grid md={12} xs={12}>
                        <SwitchLabels setPublished={setPublished} published={published} />
                    </Grid>
                    <Grid md={6} xs={12}>
                        <Button onClick={() => get_list_media(1, PER_PAGE)} variant="contained">Создать</Button>
                    </Grid>
                </Grid>
            }
        </Box>
    );
}

export default CreateSchedule

export function SwitchLabels({ setPublished, published }) {
    const clickPublished = (e) => {
        setPublished(e.target.checked)
    }


    return (
        <FormGroup>
            <FormControlLabel control={<Switch value={published} defaultChecked={published} onClick={clickPublished} />} label="Не опобуликованное Медиа" />
            <FormControlLabel disabled={true} control={<Switch />} label="Удаленное медиа за период" />
            <FormControlLabel disabled={true} control={<Switch />} label="Посты за период" />
        </FormGroup>
    );
}


const SetTimeRemove = ({setTimeRemove, timeRemove}) => {

    const changeHours = (e) => {
        if (timeRemove.length > 5) {
            setTimeRemove(timeRemove.slice(0, -1))
            return
        }
        if (!isNaN(e.target.value)) {
            setTimeRemove(e.target.value)
        }
    }

    return (
        <Box sx={{ minWidth: 300, m: 1 }} >
            <TextField
                value={timeRemove}
                onChange={changeHours}
                id="demo-helper-text-aligned"
                label="через сколько часов удалить" />
        </Box>
    )
}