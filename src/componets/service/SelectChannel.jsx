import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import {get_list_channels} from "../../api/channels"

export default function SelectChannel(props) {
    const [listChannels, setListChannels] = useState([]);
    const [Channel, setChannel] = useState('');

    const selectChannel = (event) => {
        props.setIdChannel(event.target.value);
        setChannel(event.target.value);
    };

    useEffect(() => {
        get_list_channels().
        then((data) => {
            setListChannels(data)
        })
        if (props.channel) {
            setChannel(props.channel);
        }
    }, [props.channel])

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ marginBottom: 2}} fullWidth>
                <InputLabel id="channel-select-label">Выберите канал</InputLabel>
                <Select
                    labelId="channel-simple-select-label"
                    id="channel-simple-select"
                    value={Channel}
                    label="Channels"
                    onChange={selectChannel}
                >   
                    {listChannels.map((channel) => (
                        <MenuItem key={channel.id_channel} value={channel.id_channel}>{channel.name_channel}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}