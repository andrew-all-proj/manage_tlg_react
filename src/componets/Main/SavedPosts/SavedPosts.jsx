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
import { localDate, formatDateTimeShow } from '../../service/localDateTime';



export default function SavedPosts() {
    const [listPosts, setListPosts] = useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(1);


    useEffect(() => {
        setListPosts([])
        get_list_posts(page, PER_PAGE).
            then(function (data) {
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



    return (
        <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2 }}>
            <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2, marginBottom: '5px'}}>
                <Grid>
                    Сортировать Фильтр с 10.10.2023 по 10.10.2024 тип медиа поиск в тексте теги
                </Grid>
            </Box>
            {listPosts.map((iteam) =>
                <Item key={iteam.id_post} media={iteam.media[0].id_media} typeMedia={iteam.media[0].type_media.type_media}
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
        if (!str || str.length < 50) return str
        return str.slice(0, 50)
    }
    return (
        <Stack direction="row" spacing={2}>
            <Box sx={{minWidth: "140px", maxWidth: "200px", minHeight: '100px', padding: '3px'}}>
                <ShowFile file={`${BASE_URL}media/download/${media}`} typeMedia={typeMedia} />
            </Box>
            <Box sx={{ minWidth: "200px" }}>
                <NavLink to={`/post/${idPost}/`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    Создан: {formatDateTimeShow(localDate(dateCreate))}<br />
                    Текст поста: {cut_string(textPost)}<br />
                </NavLink>
            </Box>
        </Stack>
    )
} 