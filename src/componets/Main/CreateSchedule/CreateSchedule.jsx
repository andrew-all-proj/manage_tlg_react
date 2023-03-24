import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
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
import Pagination from '@mui/material/Pagination';
import { BASE_URL } from '../../../api/api';
import { NavLink } from 'react-router-dom';
import { AlertInfo } from '../../service/AlertInfo';
import { ShowFile } from '../../service/InputFile'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { useDispatch, useSelector } from 'react-redux';




const PER_PAGE = 10

const CreateSchedule = () => {
    const [idChannel, setIdChannel] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [timeStart, setTimeStart] = useState(formatDateTime());
    const [timeStop, setTimeStop] = useState(formatDateTime());
    const [intervalTime, setIntervalTime] = useState('01:00');
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
        setLimitrecords(countMediaForTime())
        if (limitrecords === 0) return setAlertShow({ show: true, msgInfo: "Укажите время", severity: "error" })
        get_media(page, limitrecords, published, idChannel, limitrecords).
            then((data) => {
                if (data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
                setListMedia(data)
                setFormListSchedule(true)
                console.log(data)
            })
    }

    return (
        <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2 }}>
            {formListSchedule ? <FormListNewSchedule setFormListSchedule={setFormListSchedule} listMedia={listMedia}
                limitrecords={limitrecords} timeStart={timeStart} timeStop={timeStop} intervalTime={intervalTime} /> :
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
                        <SetTimeRemove />
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


const SetTimeRemove = () => {
    const [hours, setHours] = useState(0);

    const changeHours = (e) => {
        console.log(hours)
        if(hours.length > 5){
            setHours(hours.slice(0, -1))
            return
        }
        if (!isNaN(e.target.value)) {
            setHours(e.target.value)
        }
    }

    return(
        <Box sx={{ minWidth: 300, m: 1 }} >
            <TextField
            value={hours}
            onChange={changeHours}
            id="demo-helper-text-aligned"
            label="через сколько часов удалить"/>
        </Box>
    )
}


const FormListNewSchedule = ({ setFormListSchedule, listMedia, limitrecords, timeStop, timeStart, intervalTime }) => {
    const [page, setPage] = useState(1);
    const [listForCreateSchedule, setListForCreateSchedule] = useState([]);
    const TimeStart = new Date(timeStart)
    const TimeStop = new Date(timeStop)
    const [hours, minutes] = intervalTime.split(':');
    const secondsInterval = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60


    function paginate(items, page_size, current_page) {
        let start_index = (current_page - 1) * page_size;
        let end_index = start_index + page_size;
        let paginated_items = items.slice(start_index, end_index);
        console.log(paginated_items)
        return paginated_items;
    }


    useEffect(() => {
        console.log(TimeStart)
        console.log(secondsInterval)
        let listSchedule = []
        console.log(listMedia)
        listMedia.items.forEach((item) => {
            let a = new Date(TimeStart.setSeconds(TimeStart.getSeconds() + secondsInterval))
            listSchedule.push({
                'id_media': item.id_media, "date_publish": a,
                'description': item.description, 'last_time_used': item.last_time_used,
                'date_download': item.date_download, "type_media": item.type_media
            })
        });
        setListForCreateSchedule(listSchedule)
    }, [listMedia]);

    const pageChange = (event, value) => {
        setPage(value);
    }

    return (
        <Grid container spacing={0.5} >
            <div>
                <Button onClick={() => setFormListSchedule(false)}>Назад</Button>
            </div>
            {paginate(listForCreateSchedule, PER_PAGE, page).map((item) =>
                <Grid xs={12} key={item.id_media} >
                    <Box sx={{ m: 1, border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2 }}>
                        <FormBoxMedia IdMedia={item.id_media} typeMedia={item.type_media.type_media}
                            last_time_used={item.last_time_used} description={item.description}
                            date_download={item.date_download} date_publish={item.date_publish} />
                    </Box>
                </Grid>)}
            <Grid  md={6} xs={12}>
                <Pagination onChange={pageChange} page={page} count={Math.ceil(limitrecords / PER_PAGE)} defaultPage={1} variant="outlined" shape="rounded" />
            </Grid>
            <Grid  md={12} xs={12}>
                <Stack direction='row' spacing={2}>
                    <Button variant="contained" onClick={() => setFormListSchedule(false)}>Назад</Button>
                    <Button variant="contained" onClick={() => setFormListSchedule(false)}>Создать</Button>
                </Stack>
            </Grid>
        </Grid>
    )
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
}));

const FormBoxMedia = ({ IdMedia, typeMedia, last_time_used, description, date_download, date_publish }) => {
    const mobileMode = useSelector(state => state.mobileMode)
    const [direction, setDirection] = useState('row');
    const [textPost, setTextPost] = useState('');
    const [noPublishe, setNoPublishe] = useState(false);

    useEffect(() => {
        if (mobileMode.mobileMode) {
            setDirection("column")
        } else {
            setDirection('row')
        }

    }, [mobileMode.mobileMode]);

    const setChecked = () => {
        if(noPublishe) return setNoPublishe(false)
        setNoPublishe(true)
    }

    return (
        <Stack direction={direction} spacing={2}>
            <Box sx={{ maxWidth: "250px" }}>
                <ShowFile file={`${BASE_URL}media/download/${IdMedia}`} typeMedia={typeMedia} />
            </Box>
            <Stack spacing={2}>
                <Item> Публиковалось: {last_time_used == date_download ? "никогда" : localDate(last_time_used)} </Item>
                <Item> Описание: {description} </Item>
                <Item> Дата публикации: {localDate(date_publish)} </Item>
                <Item> Текс поста:  <TextField
                    onChange={(event) => setTextPost(event.target.value)}
                    value={textPost}
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={30}
                /> </Item>
                <Item> <Switch
                            checked={noPublishe}
                            onChange={setChecked}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <label>Не публиковать:</label></Item>
            </Stack>
        </Stack>
    )
}