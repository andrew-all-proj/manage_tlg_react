import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import ComponentDateTimePicker from '../service/DataTime';
import Tags from '../service/TagsForm';
import FotoCard from '../service/FotoCard';
import { Card } from '@mui/material';
import { useAuth } from "../../hook/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField"
import { BASE_URL } from '../../../api/api';
import { useLocation, useNavigate, useParams } from "react-router-dom";


export default function EditPost() {
    const token = localStorage.getItem('manage_jwt')
    const [dataPost, setDataPost] = useState(null);
    const { id } = useParams()

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        if (id){
            axios.get(`${BASE_URL}posts/${id}`, config)
                .then(function (res) {
                    const data = res.data;
                    if (Object.keys(data).length !== 0) {
                        setDataPost(data)
                        console.log(data) }
                })
                .catch(function (err) {
                    console.log(err)
                });
        }
    }, []);

    return(<>
        { !dataPost ? <ChannelError />  : 

        <Box sx={{border: 1, borderColor: '#DCDCDC', borderRadius: 2}}>
            <div>
                tutututut {id}
            </div>
        </Box>
    }</>)
}

export function ChannelError() {
    return(
        <div>
            <h3>POST NOT FOUND</h3>
        </div>
    )
}