import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import {ShowFile} from '../../service/InputFile'

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
        setPage(value);
    }

    const cut_string = (str) => {
        if (!str || str.length < 50) return str
        return str.slice(0, 50)
    }

    return (
        <Box sx={{border: 1, borderColor: '#DCDCDC', borderRadius: 2}}>
            <Grid container spacing={1}>
                {listPosts.map((iteam) => 
                <Grid xs={12} key={iteam.id_post} >
                    {iteam.media ? iteam.media.map((media) =>
                    <Box sx={{maxWidth: "200px"}}>
                        <ShowFile file={`${BASE_URL}media/download/${media.id_media}`} typeMedia={media.type_media.type_media} />
                    </Box>) : '' }
                    <p>
                        <NavLink to={`/post/${iteam.id_post}/`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        id поста: {iteam.id_post}<br/>
                        текст поста: {cut_string(iteam.text)}<br/>
                        дата создания: {iteam.date_create}<br/>
                        дата обновления: {iteam.data_update}<br/>
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