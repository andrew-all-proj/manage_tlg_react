import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import { ShowFile } from '../../service/InputFile'

import { BASE_URL } from '../../../api/api';
import { NavLink } from 'react-router-dom';
import { get_list_posts } from '../../../api/posts'
import { PER_PAGE } from '../../../api/api';
import { Stack } from '@mui/system';
import { InputDateTime, InputTime } from '../../service/DataTime'
import { formatDateTime, localDate, formatDateTimeShow } from '../../service/localDateTime'
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {SelectFilterSorte} from '../../service/serviceComponents/SelectFilterSorte'
import { AlertInfo } from '../../service/AlertInfo';

import NoFile from "../../../assets/images/nofile.jpg"

export default function SavedPosts() {
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })
    const [listPosts, setListPosts] = useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(1);
    const [reverseSort, setReverseSort] = React.useState(false);
    const [timeStart, setTimeStart] = useState('');
    const [timeStop, setTimeStop] = useState('');
    const [filter, setFilter] = useState(false);


    useEffect(() => {
        setListPosts([])
        get_list_posts(page, PER_PAGE, reverseSort, timeStart, timeStop).
            then(function (data) {
                if(data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
                setListPosts([...data.items])
                setTotalPage(data.total_count)
            })
        setFilter(false)

    }, [page, filter]);


    const render_cell = (list_in, obj) => {
        if (!list_in) return false
        let res = ''
        list_in.map((iteam) =>
            res = iteam[obj] + ', ' + res
        )
        return res
    }

    const pageChange = (event, value) => {
        setPage(value);
    }




    return (
        <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2 }}>
            <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2, marginBottom: '5px' }}>
                <Grid container spacing={1}>
                    <Grid xs={12} md={3}>
                        <SelectFilterSorte sx={{ minWidth: 200, m: '3px'}} label="Сортировать" setReverseSort={setReverseSort} reverseSort={reverseSort} />
                    </Grid>
                    <Grid xs={12} md={4}>
                        <Stack direction='row'>
                            <InputDateTime sx={{ minWidth: 240, m: 1 }} label="с даты" dateTimeValue={timeStart} setdateTimeValue={setTimeStart} />
                            <IconButton key='IconButton1' onClick={() => setTimeStart('')} aria-label="delete" sx={{fontSize: "25px", p: "3px"}} >
                                <DeleteIcon fontSize="default" color="primary"/>
                            </IconButton>
                        </Stack>
                    </Grid>
                    <Grid xs={12} md={4}>
                        <Stack direction='row'>
                            <InputDateTime sx={{ minWidth: 240, m: 1 }} label="по дату" dateTimeValue={timeStop} setdateTimeValue={setTimeStop} />
                            <IconButton key='IconButton2' onClick={() => setTimeStop('')} aria-label="delete" sx={{fontSize: "25px", p: "3px"}}>
                                <DeleteIcon fontSize="default" color="primary"/>
                            </IconButton>
                        </Stack>
                    </Grid>
                    <Button sx={{m: 1}} variant="contained" onClick={()=> setFilter(true)}>Применить</Button>
                    <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
                </Grid>
            </Box>
            {listPosts.map((iteam) =>
                <Item key={iteam.id_post} media={iteam.media[0] && iteam.media[0].id_media} typeMedia={iteam.media[0] && iteam.media[0].type_media.type_media}
                    idPost={iteam.id_post} textPost={iteam.text} dateCreate={iteam.date_create} />
            )}
            <Box sx={{ p: "7px" }}>
                <Pagination onChange={pageChange} page={page} count={Math.ceil(totalPage / PER_PAGE)} defaultPage={1} variant="outlined" shape="rounded" />
            </Box>
        </Box>
    );
}

const Item = ({ media, typeMedia, idPost, textPost, dateCreate }) => {
    const cut_string = (str) => {
        if (!str || str.length < 70) return str
        return str.slice(0, 70)
    }

    return (
        <Stack direction="row" spacing={2}>
            <Box sx={{ minWidth: "140px", maxWidth: "200px", minHeight: '100px', padding: '3px' }}>
                <ShowFile file= {media ? `${BASE_URL}media/download/${media}` : NoFile} typeMedia={typeMedia} />
            </Box>
            <Box sx={{ minWidth: "180px" }}>
                <NavLink to={`/post/${idPost}/`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <Box >
                        Создан: {formatDateTimeShow(localDate(dateCreate))}<br />
                        {cut_string(textPost)}
                    </Box>
                </NavLink>
            </Box>
        </Stack>
    )
}

