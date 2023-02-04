import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from "react-router-dom";
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
import PostTextInput from './PostTextInput'



export default function CreatePost() {
    const token = localStorage.getItem('manage_jwt')
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [textPost, setTextPost] = useState('');
    const [idPost, setIdPost] = useState(null)
    const [idMedia, setIdMedia] = useState(null)


    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const createPost = () => {
        const data = {
            "text": textPost
        }
        axios.post(`${BASE_URL}posts`, data, config)
            .then(function (res) {
                const data = res.data;
                setTextPost(data.text)
                setIdPost(data.id_post)
            })
            .catch(function (err) {
                console.log(err)
        });
    }

    useEffect(() => {
        if ((idPost && !selectedImage) || idMedia){
        const id = idPost
        setIdPost(null)
        navigate('/post/' + id, {replace: false})
        }
    }, [idPost, idMedia]);

    
    useEffect(() => {
        if (idPost && selectedImage){
            console.log(3333)
            let formData = new FormData();
            formData.append("file", selectedImage);
            axios.post(`${BASE_URL}media`, formData, {headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": `Bearer ${token}`}
            })
                .then(function (res) {
                    const data = res.data;
                    setIdMedia(data.id_media)
                })
                .catch(function (err) {
                    console.log(err)
                });
        }
    }, [idPost]);


    useEffect(() => {
        console.log(1111111111111)
        if (idMedia){
            console.log(22222222)
            const media = [idMedia]
            const data = {"media": media}
        
            axios.put(`${BASE_URL}posts/${idPost}/setmedia`, data, config)
                .then(function (res) {
                    const data = res.data;
                })
                .catch(function (err) {
                    console.log(err)
                });
        }
    }, [idMedia]);

    const deleteMedia = () => {
        setSelectedImage(null)
    }

    const selectMedia = (event) => {
        setSelectedImage(event.target.files[0])
    }


    return (
        <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2 }}>
            <Grid container spacing={1}>
                <Grid xs={12}>
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>

                    <Card sx={{ maxWidth: 345, minHeight: 100}}>
                        {selectedImage && (
                            <div>
                                <img alt="not fount" width={"350px"} src={URL.createObjectURL(selectedImage)} />
                            </div>
                        )}
                        <Button variant="contained" component="label" sx={{ margin: 1, width: "155px" }}>
                            Загрузить
                            <input
                                hidden
                                type="file"
                                name="myImage"
                                onChange={selectMedia}
                            />
                        </Button>
                        <Button onClick={deleteMedia} 
                        variant="contained" component="label" sx={{ margin: 1, width: "155px"}}>Удалить</Button>
                    </Card>

                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <Tags />
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <PostTextInput textPost={textPost} setTextPost={setTextPost}/>
                    <Button variant="contained" 
                            sx={{ margin: 1, width: "155px"}} 
                            onClick={ createPost }>Сохранить</Button>
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <Card sx={{ maxWidth: 345 }}>
                        <ComponentDateTimePicker />
                        <Button variant="contained" 
                                sx={{ margin: 1, width: "155px" }}>Опубликовать</Button>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}







