import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import Switch from '@mui/material/Switch';

const formatDateTime = () => {
    let d = new Date();
    var datestring = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    ("0" + d.getDate()).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return datestring
}

export default function ComponentDateTimePicker(props) {

    const [checked, setChecked] = useState(false);

    const setFlagRemoveDatePost = (event) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        if (checked) {
            props.setDateRemovePost(props.datePublishPost)
        }
        if (!checked) {
            props.setDateRemovePost(null)
        }
    }, [checked]);

    const changeDateTime = (e) => {
        props.setDatePublishPosts(e.target.value)
    }

    const changeRemoveDateTime = (e) => {
        props.setDateRemovePost(e.target.value)
    }

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3} sx={{ marginTop: 1 }}>
                    <TextField
                        id="datetime-local"
                        label="Время публикации"
                        type="datetime-local"
                        value = {props.datePublishPost}
                        sx={{ width: 350 }}
                        onChange={(e) => changeDateTime(e)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div>
                        <Switch
                            checked={checked}
                            onChange={setFlagRemoveDatePost}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <label>Удалить</label>
                    </div>
                    {checked &&
                        <TextField
                        id="datetime-local"
                        label="Время публикации"
                        type="datetime-local"
                        value = {props.dateRemovePost}
                        onChange={(e) => changeRemoveDateTime(e)}
                        sx={{ width: 350 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />}
                </Stack>
            </LocalizationProvider>
        </>

    );
}
