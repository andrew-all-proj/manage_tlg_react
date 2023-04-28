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


export default function Docs() {
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })
    const [listPosts, setListPosts] = useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(1);
    const [reverseSort, setReverseSort] = React.useState(false);
    const [timeStart, setTimeStart] = useState('');
    const [timeStop, setTimeStop] = useState('');
    const [filter, setFilter] = useState(false);



    return (
        <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2 }}>
            Документация
        </Box>
    );
}


