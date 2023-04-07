import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import {ItemBots, AddBoxNewBot} from './ItemBots'
import { get_list_feedback_bots } from '../../../api/bots'


export default function Bots() {
    const [listFeedbackBots, setListFeedbackBots] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })


    useEffect(() => {
        get_list_feedback_bots().
            then((data) => {
                setListFeedbackBots(data)
                setUpdateList(false)
            })
    }, [updateList]);

    return (
        <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2, padding: 0.5 }}>
            <Typography variant="h5" gutterBottom >Бот обратной связи:</Typography>
            {listFeedbackBots.map((bot) =>
                <ItemBots key={bot.id_feedback_bot} value={bot} update={setUpdateList} />
            )}
            <AddBoxNewBot update={setUpdateList} />

        </Box>
    );
}
