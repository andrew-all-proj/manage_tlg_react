import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import {get_list_channels} from "../../../api/channels"

export default function SelectChannel() {
    const [channel, setChannel] = useState('');
    const [listChannels, setListChannels] = useState([]);

    const handleChange = (event) => {
        setChannel(event.target.value);
    };

    useEffect(() => {
        get_list_channels().
        then((data) => {
            setListChannels(data)
        })
    }, [])




    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="channel-select-label">Выберите канал</InputLabel>
                <Select
                    labelId="channel-simple-select-label"
                    id="channel-simple-select"
                    value={channel}
                    label="Age"
                    onChange={handleChange}
                >   
                    {listChannels.map((channel) => (
                        <MenuItem key={channel.id_channel} value={channel.id_channel}>{channel.name_channel}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}