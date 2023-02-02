import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../hook/useAuth";
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { BASE_URL } from '../../../api/api';
import { Link, NavLink } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";




export default function MyChanels() {
    const navigate = useNavigate();
    const token = localStorage.getItem('manage_jwt')
    const [listChanels, setListChanels] = useState([]);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    useEffect(() => {
        setListChanels([])
        axios
            .get(`${BASE_URL}channels`, config)
            .then((response) => {
                const data = response.data;
                setListChanels([...data])
            });
    }, []);
    
    const click = (id) => {
        navigate('/channel/' + id, {replace: false})
    }

    return (
        <Box sx={{border: 1, borderColor: '#DCDCDC', borderRadius: 2}}>
        <Grid container spacing={2}>
                <Grid xs={12}>
                    <TableChannel  listChanels={listChanels} click={click} />
                </Grid>
                <Grid xs={12}>
                <NavLink to="/addnewchannel" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <Button>Добавить канал</Button>
                </NavLink>
                </Grid>
        </Grid>
        </Box>
    );
}



// {
//     "id_channel": 3,
//     "id_telegram": "-123456787",
//     "is_archive": false,
//     "link_channel": "@link_chanel3",
//     "name_channel": "channel 3"
//   }



export function TableChannel(props) {
    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID-Канала</TableCell>
                        <TableCell align="center">Название канала</TableCell>
                        <TableCell align="center">Сылка на канал</TableCell>
                        <TableCell align="center">ID - телеграмме</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.listChanels.map((row) => (
                        <TableRow onClick={() => props.click(row.id_channel)}
                            hover="true"
                            key={row.id_channel}
                            sx={{ }}
                        >
                            <TableCell align="center">{row.id_channel}</TableCell>
                            <TableCell align="center">{row.name_channel}</TableCell>
                            <TableCell align="center">{row.link_channel}</TableCell>
                            <TableCell align="center">{row.id_telegram}</TableCell>  
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
