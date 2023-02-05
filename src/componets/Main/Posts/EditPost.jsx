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
import PostTextInput from './PostTextInput'
import PhotoInput from './PhotoInput'

const get_post = async (id, config) => {
    return await axios.get(`${BASE_URL}posts/${id}`, config)
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            console.log(err)
        });
}

const update_post = async (id, config, textPost) => {
    const data = {
        "text": textPost
    }
    return await axios.put(`${BASE_URL}posts/${id}`, data, config)
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            console.log(err)
        });
}

const set_media_to_post = async (config, idMedia, idPost) => {
    const media = [idMedia]
    const data = { "media": media }

    return axios.put(`${BASE_URL}posts/${idPost}/setmedia`, data, config)
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            console.log(err)
        });
}


const unset_media_to_post = async (config, idMedia, idPost, token) => {
    const media = [idMedia]
    const data = { "media": media }

    return axios.delete(`${BASE_URL}posts/${idPost}/setmedia`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data
        })
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            console.log(err)
        });
}


const post_media = async (selectedImage, token) => {
    let formData = new FormData();
    formData.append("file", selectedImage);
    return await axios.post(`${BASE_URL}media`, formData, {
        headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (res) {
            const data = res.data;
            return data
        })
        .catch(function (err) {
            console.log(err)
        });
}



export default function EditPost() {
    const token = localStorage.getItem('manage_jwt')
    const navigate = useNavigate();
    const [dataPost, setDataPost] = useState(null);
    const { id } = useParams()
    const [idMedia, setIdMedia] = useState(null)
    const [update, setUpdate] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [textPost, setTextPost] = useState('');
    const [downloadMedia, setDownloadMedia] = useState(true)



    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // GET POST
    useEffect(() => {
        if (id) {
            get_post(id, config, setDataPost, setIdMedia, setTextPost)
            .then(function (data) {
                console.log(data)
                if (Object.keys(data).length !== 0) {
                setDataPost(data)
                setIdMedia(data.media[0].id_media)
                setTextPost(data.text)
                }
            })
        }
    }, []);

    // GET UPDATE POST
    useEffect(() => {
        if (update) {
            update_post(id, config, textPost).
            then(function (data){
                setTextPost(data.text)
                setUpdate(false)
                console.log(data)
            })  
        }
    }, [update]);

    // GET UPDATE MEDIA
    useEffect(() => {
        if (update && selectedImage && !downloadMedia) {
            unset_media_to_post(config, idMedia, dataPost.id_post, token)

            post_media(selectedImage, token, setIdMedia).
            then(function (data){
                set_media_to_post(config, data.id_media, dataPost.id_post)
                .then(function (data){
                    setIdMedia(null)
                    setIdMedia(data.media[0].id_media)
                    setDownloadMedia(true)
                })
            })
        }
    }, [update]);


    // RENDER NEW MEDIA
    useEffect(() => {
        setSelectedImage(true)
        console.log('render id')
        console.log(idMedia)
    }, [idMedia]);


    const deleteMedia = () => {
        setDownloadMedia(false)
        setSelectedImage(null)
    }

    const selectMedia = (event) => {
        setSelectedImage(event.target.files[0])
    }

    const Pass = (event) => {
        console.log(event)
    }

    const updatePost = (event) => {
        setUpdate(true)
    }


    return (<>
        {!dataPost ? <ChannelError /> :

            <Grid container spacing={1}>
                <Grid xs={12}>
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <Card sx={{ maxWidth: 345, minHeight: 100 }}>
                    {selectedImage && (
                        <div>
                            <img alt="not fount" width={"350px"} src={
                                downloadMedia ? `${BASE_URL}media/download/${idMedia}` : URL.createObjectURL(selectedImage)}/>
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
                            variant="contained" component="label" sx={{ margin: 1, width: "155px" }}>Удалить</Button>
                    </Card>
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <Tags />
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <PostTextInput textPost={textPost} setTextPost={setTextPost}/>
                    <Button variant="contained"
                        sx={{ margin: 1, width: "155px" }}
                        onClick={updatePost}>Сохранить</Button>
                    <Button variant="contained"
                        sx={{ margin: 1, width: "155px" }}
                        onClick={Pass}>Удалить</Button>
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <Card sx={{ maxWidth: 345 }}>
                        <ComponentDateTimePicker />
                        <Button variant="contained"  onClick={Pass}
                            sx={{ margin: 1, width: "155px" }}>Опубликовать</Button>
                    </Card>
                </Grid>
            </Grid>
        }</>
    )
}

export function ChannelError() {
    return (
        <div>
            <h3>POST NOT FOUND</h3>
        </div>
    )
}

//<PostTextInput textPost={textPost} setTextPost={setTextPost} />
//<PhotoInput deleteMedia={console} selectedImage={console} selectMedia={console} />