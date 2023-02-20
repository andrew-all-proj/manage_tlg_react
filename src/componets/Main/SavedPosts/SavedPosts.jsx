import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useAuth } from "../../hook/useAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';

import TableRow from '@mui/material/TableRow';

import { BASE_URL } from '../../../api/api';
import { NavLink } from 'react-router-dom';
import { get_list_posts } from '../../../api/posts'



export default function SavedPosts() {
    const [listPosts, setListPosts] = useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(1);


    useEffect(() => {
        setListPosts([])
        get_list_posts(page).
        then(function(data) {
            setListPosts([...data.items])
            setTotalPage(data.total_count)
        })
        
    }, [page]);


    const render_cell = (list_in, obj) => {
        if (!list_in) return false
        let res = ''
        list_in.map((iteam) => 
            res = iteam[obj] + ', ' + res
        )
        return res
    }

    const pageChange = (event, value) => {
        console.log(value)
        setPage(value);
    }

    return (
        <Box sx={{border: 1, borderColor: '#DCDCDC', borderRadius: 2}}>
            <Grid container spacing={1}>
                {listPosts.map((iteam) => 
                <Grid xs={12} key={iteam.id_post} >
                    {iteam.media ? iteam.media.map((media) =>
                    <span margin="3px">
                        <img src={`${BASE_URL}media/download/${media.id_media}`} alt={"Loading..."} width="200 px" height="200px"/>
                        ,
                    </span>) : '' }
                    <p>
                        <NavLink to={`/post/${iteam.id_post}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        id поста {iteam.id_post}<br/>
                        дата создания {iteam.date_create}<br/>
                        дата обновления {iteam.data_update}<br/>
                        </NavLink> 
                    </p> 
                </Grid>)}
                <Grid key='a1'>
                    <Pagination onChange={pageChange} page={page}  count={Math.ceil(totalPage/3)} defaultPage={1} variant="outlined" shape="rounded" />
                </Grid>        
            </Grid>
        </Box>
    );
}