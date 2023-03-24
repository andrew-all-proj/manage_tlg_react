import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Switch from '@mui/material/Switch';

const formatDateTime = () => {
    let d = new Date();
    var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        ("0" + d.getDate()).slice(-2) + "T" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return datestring
}

export default function ComponentDateTimePicker({ setDateRemovePost, dateRemovePost, datePublishPost, setDatePublishPosts }) {

    const [checked, setChecked] = useState(false);

    const setFlagRemoveDatePost = (event) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        if (checked) {
            setDateRemovePost(datePublishPost)
        }
        if (!checked) {
            setDateRemovePost(null)
        }
    }, [checked]);


    return (
        <Box sx={{ maxWidth: 500 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3} sx={{ marginTop: 1, maxWidth: 450 }} >
                    <InputDateTime sx={{ minWidth: 300 }} label="Время публикации" dateTimeValue={datePublishPost} setdateTimeValue={setDatePublishPosts} />
                    <div>
                        <Switch
                            checked={checked}
                            onChange={setFlagRemoveDatePost}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <label>Удалить</label>
                    </div>
                    {checked &&
                        <InputDateTime sx={{ minWidth: 300 }} label="Время удаление" dateTimeValue={dateRemovePost} setdateTimeValue={setDateRemovePost} />}
                </Stack>
            </LocalizationProvider>
        </Box>

    );
}


export const InputDateTime = ({ sx, dateTimeValue, setdateTimeValue, label }) => {
    const changeDateTime = (e) => {
        setdateTimeValue(e.target.value)
        console.log(e.target.value)
    }

    return (
        <TextField
            id="datetime-local"
            label={label}
            type="datetime-local"
            value={dateTimeValue}
            onChange={(e) => changeDateTime(e)}
            sx={sx}
            InputLabelProps={{
                shrink: true,
            }}
        />
    )
}


export const InputTime = ({ sx, dateTimeValue, setdateTimeValue, label }) => {
    const changeDateTime = (e) => {
        setdateTimeValue(e.target.value)
        console.log(e.target.value)
    }

    return (
        <TextField
            id="time-local"
            label={label}
            type="time"
            defaultValue="00:00"
            value={dateTimeValue}
            onChange={(e) => changeDateTime(e)}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                step: 300, // 5 min
            }}
            sx={sx}
        />
    )
}