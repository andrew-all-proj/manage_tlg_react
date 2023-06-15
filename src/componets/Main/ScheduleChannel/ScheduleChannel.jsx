import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import { SelectFilterSorte } from '../../service/serviceComponents/SelectFilterSorte'
import { Button } from '@mui/material';
import { InputDateTime, InputTime } from '../../service/DataTime'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import { Stack } from '@mui/system';
import { AlertInfo } from '../../service/serviceComponents/AlertInfo';


import SelectChannel from "../../service/SelectChannel"
import { get_list_events } from '../../../api/events'
import { TableChannel } from './TableChannelEvents';


export default function ScheduleChannel() {
    const [idChannel, setIdChannel] = useState(null);
    const [listEvents, setListEvents] = useState(null);
    const [reverseSort, setReverseSort] = React.useState(false);
    const [filter, setFilter] = useState(false);
    const [timeStart, setTimeStart] = useState('');
    const [timeStop, setTimeStop] = useState('');
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const per_page = 10


    useEffect(() => {
        if (idChannel) {
            get_list_events(idChannel, page, per_page, reverseSort, timeStart, timeStop).
                then((data) => {
                    if(data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
                    setListEvents(data)
                    setTotalPage(data.total_count)
                })
        }
        setFilter(false)
    }, [idChannel, page, filter]);


    const pageChange = (event, value) => {
        setPage(value);
    }

    return (
        <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2 }}>
                <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2, marginBottom: '5px' }}>
                <Grid container >
                    <Grid xs={12} md={6}>
                        <SelectChannel setIdChannel={setIdChannel} channel={idChannel} />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <SelectFilterSorte sx={{ minWidth: 200, m: '3px' }} label="Сортировать" setReverseSort={setReverseSort} reverseSort={reverseSort} />
                    </Grid>
                    <Grid>
                    <Stack direction='row'>
                        <InputDateTime sx={{ minWidth: 240, m: 1 }} label="с даты" dateTimeValue={timeStart} setdateTimeValue={setTimeStart} />
                        <IconButton key='IconButton1' onClick={() => setTimeStart('')} aria-label="delete" sx={{ fontSize: "25px", p: "3px" }} >
                            <DeleteIcon fontSize="default" color="primary" />
                        </IconButton>
                    </Stack>
                    </Grid>
                    <Grid>
                    <Stack direction='row'>
                        <InputDateTime sx={{ minWidth: 240, m: 1 }} label="по дату" dateTimeValue={timeStop} setdateTimeValue={setTimeStop} />
                        <IconButton key='IconButton2' onClick={() => setTimeStop('')} aria-label="delete" sx={{ fontSize: "25px", p: "3px" }}>
                            <DeleteIcon fontSize="default" color="primary" />
                        </IconButton>
                    </Stack>
                    </Grid>
                    <Button sx={{ m: 1, maxHeight: "35px" }} variant="contained" onClick={() => setFilter(true)}>Применить</Button>
                </Grid>
                <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
                </Box>
                    {
                        listEvents && <TableChannel listEvents={listEvents} idChannel={idChannel} />
                    }
                    <Pagination onChange={pageChange} page={page} count={Math.ceil(totalPage / per_page)} defaultPage={1} variant="outlined" shape="rounded" />
        </Box>
    );
}



