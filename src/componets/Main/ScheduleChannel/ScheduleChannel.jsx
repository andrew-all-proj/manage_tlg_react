import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';


import SelectChannel from "../service/SelectChannel"
import { get_list_events } from '../../../api/events'
import { TableChannel } from './TableChannelEvents';


export default function ScheduleChannel() {
    const [idChannel, setIdChannel] = useState(null);
    const [listEvents, setListEvents] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const per_page = 3


    useEffect(() => {
        if (idChannel){
            get_list_events(idChannel, page, per_page).
            then((data) => {
                setListEvents(data)
                setTotalPage(data.total_count)
            })
        }
    }, [idChannel, page]);

    useEffect(() => {

        
    }, [listEvents]);

    const pageChange = (event, value) => {
        console.log(value)
        setPage(value);
    }

    return (
        <Box sx={{border: 1, borderColor: '#DCDCDC', borderRadius: 2}}>
            <Grid container spacing={1}>
                <Grid md={6}>
                    <SelectChannel setIdChannel={setIdChannel} channel={idChannel}/>
                </Grid>
                <Grid md={6}>
                    TUT DRUGOY FILTER
                </Grid>
                <Grid md={12}>
                { 
                    listEvents && <TableChannel listEvents={listEvents} idChannel={idChannel}/>
                    }
                </Grid>
                <Grid md={12}>
                    <Pagination onChange={pageChange} page={page}  count={Math.ceil(totalPage/per_page)} defaultPage={1} variant="outlined" shape="rounded" />
                </Grid>
            </Grid>
        </Box>
    );
}
