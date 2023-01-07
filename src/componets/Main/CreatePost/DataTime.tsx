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

export default function ComponentDateTimePicker() {
    const [dateWithNoInitialValue, setDateWithNoInitialValue] =
        React.useState<Dayjs | null>(null);
    const [dateWithInitialValue, setDateWithInitialValue] =
        React.useState<Dayjs | null>(dayjs('2019-01-01T18:54'));
    
    const [dateWithInitialValue2, setDateWithInitialValue2] =
        React.useState<Dayjs | null>(dayjs('2019-01-01T18:54'));

    return (
        <Card sx={{ maxWidth: 345}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3} sx={{ marginTop: 1}}>
                <MobileDateTimePicker
                    value={dateWithInitialValue}
                    onChange={(newValue) => {
                        setDateWithInitialValue(newValue);
                    }}
                    label="Опубликовать:"
                    onError={console.log}
                    minDate={dayjs('2018-01-01T00:00')}
                    inputFormat="YYYY/MM/DD hh:mm a"
                    mask="____/__/__ __:__ _M"
                    renderInput={(params) => <TextField {...params} />}
                />
                <MobileDateTimePicker
                    value={dateWithInitialValue2}
                    onChange={(newValue) => {
                        setDateWithInitialValue2(newValue);
                    }}
                    label="Удалить:"
                    onError={console.log}
                    minDate={dayjs('2018-01-01T00:00')}
                    inputFormat="YYYY/MM/DD hh:mm a"
                    mask="____/__/__ __:__ _M"
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
        <Button variant="contained" sx={{ margin: 1 }}>Опубликовать</Button>
        </Card>

    );
}