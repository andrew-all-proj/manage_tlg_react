import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react";
import { InputDateTime, InputTime } from '../../service/DataTime'
import { formatDateTime, localDate } from '../../service/localDateTime'
import Switch from '@mui/material/Switch';
import { BASE_URL } from '../../../api/api';
import { ShowFile } from '../../service/InputFile'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
}));

const findIndex = (item, list, data) => {
    let index
    for (let i = 0; i < list.length; i++) {
        if (list[i][item] === data[item]) {
            index = i
            break;
        }
    }
    return index
}



const FormBoxMedia = ({ data, setListForCreateSchedule, listForCreateSchedule }) => {
    const mobileMode = useSelector(state => state.mobileMode)
    const [direction, setDirection] = useState('row');
    const [noPublishe, setNoPublishe] = useState(false);
    const [index, setIndex] = useState(findIndex('id_media', listForCreateSchedule, data));

    useEffect(() => {
        if (mobileMode.mobileMode) {
            setDirection("column")
        } else {
            setDirection('row')
        }

    }, [mobileMode.mobileMode]);


    const setText = (event) => {
        const targetMedia = listForCreateSchedule[index];
        targetMedia.text_post = event.target.value
        const newData = [...listForCreateSchedule];
        newData[index] = targetMedia;
        setListForCreateSchedule(newData);
    }

    const setChecked = () => {
        noPublishe ? setNoPublishe(false) : setNoPublishe(true)
        const targetMedia = listForCreateSchedule[index];
        targetMedia.publish = noPublishe
        const newData = [...listForCreateSchedule];
        newData[index] = targetMedia;
        setListForCreateSchedule(newData);
    }

    const setTime = (newTime) => {
        const targetMedia = listForCreateSchedule[index];
        targetMedia.date_publish = newTime
        const newData = [...listForCreateSchedule];
        newData[index] = targetMedia;
        setListForCreateSchedule(newData);
    }

    const setRemoveTime = (newTime) => {
        const targetMedia = listForCreateSchedule[index];
        targetMedia.dateRemovePost = newTime
        const newData = [...listForCreateSchedule];
        newData[index] = targetMedia;
        setListForCreateSchedule(newData);
    }

    return (
        <Stack direction={direction} spacing={2} sx={{ m: 1 }}>
            <Box sx={{ maxWidth: "250px" }}>
                <ShowFile file={`${BASE_URL}media/download/${data.id_media}`} typeMedia={data.type_media} />
            </Box>
            <Stack spacing={2}>
                <Item> Публиковалось: {listForCreateSchedule[index].last_time_used === listForCreateSchedule[index].date_download ? "никогда" : formatDateTime(listForCreateSchedule[index].last_time_used)} </Item>
                <Item> Описание: {listForCreateSchedule[index].description} </Item>
                <InputDateTime sx={{ minWidth: 300, m: 1 }} label="Дата публикации:" dateTimeValue={formatDateTime(listForCreateSchedule[index].date_publish)} setdateTimeValue={setTime} />
                {listForCreateSchedule[index].dateRemovePost && <InputDateTime sx={{ minWidth: 300, m: 1 }} label="Дата удаления:" dateTimeValue={formatDateTime(listForCreateSchedule[index].dateRemovePost)} setdateTimeValue={setRemoveTime} />}
                <Item> Текс поста:  <TextField
                    onChange={setText}
                    value={listForCreateSchedule[index].text_post}
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


export default FormBoxMedia;