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

export default function ComponentDateTimePicker(props) {
    const [checked, setChecked] = useState(false);

    const setFlagRemoveDatePost = (event) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        if (checked){
            props.setDateRemovePost(props.datePublishPost)}
        if (!checked){
            props.setDateRemovePost(null)}
    }, [checked]);

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3} sx={{ marginTop: 1 }}>
                    <MobileDateTimePicker
                        value={props.datePublishPost}
                        onChange={(newValue) => {
                            props.setDatePublishPost(newValue);
                        }}
                        label="Опубликовать:"
                        onError={console.log}
                        minDate={dayjs('2022-01-01T00:00')}
                        inputFormat="YYYY/MM/DD hh:mm a"
                        mask="____/__/__ __:__ _M"
                        renderInput={(params) => <TextField {...params} />}
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
                    <MobileDateTimePicker
                        value={props.dateRemovePost}
                        onChange={(newValue) => {
                            props.setDateRemovePost(newValue);
                        }}
                        label="Удалить:"
                        onError={console.log}
                        minDate={dayjs(props.datePublishPost)}
                        inputFormat="YYYY/MM/DD hh:mm a"
                        mask="____/__/__ __:__ _M"
                        renderInput={(params) => <TextField {...params} />}
                    />}
                </Stack>
            </LocalizationProvider>
        </>

    );
}