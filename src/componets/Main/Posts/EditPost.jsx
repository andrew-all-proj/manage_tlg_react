import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import dayjs, { Dayjs } from 'dayjs';
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
import SelectChannel from './SelectChannel'
import { get_post, update_post, unset_media_to_post, post_media, set_media_to_post, delete_post } from '../../../api/posts'



export default function EditPost() {
    const navigate = useNavigate();
    const [dataPost, setDataPost] = useState(null);
    const { id } = useParams()
    const [idMedia, setIdMedia] = useState(null)
    const [update, setUpdate] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [textPost, setTextPost] = useState('');
    const [downloadMedia, setDownloadMedia] = useState(false)
    const [isExistMedia, setIsExistMedia] = useState(false)
    const [channel, setChannel] = useState('');


    const [datePosts, setDatePosts] = useState(dayjs('2022-01-02T18:54'));
    const [dateRemovePost, setDateRemovePost] = useState(dayjs(null));


    // GET POST
    useEffect(() => {
        if (id) {
            get_post(id, setDataPost, setIdMedia, setTextPost)
            .then(function (data) {
                if (Object.keys(data).length !== 0) {
                    if (data.media.length != 0){
                        setIdMedia(data.media[0].id_media)
                        setIsExistMedia(true)
                        setDownloadMedia(true)}
                    setTextPost(data.text)
                    setDataPost(data)
                }
            })
        }
    }, [id]);


    // GET UPDATE POST
    useEffect(() => {
        if (update) {
            update_post(id, textPost).
            then(function (data){
                setTextPost(data.text)
                setUpdate(false)
            })  
        }
    }, [update]);


    // GET UPDATE MEDIA
    useEffect(() => {
        if (update && selectedImage && !downloadMedia) {
            console.log("SET")
            if (idMedia){
                unset_media_to_post(idMedia, dataPost.id_post)}
            post_media(selectedImage, setIdMedia).
            then(function (data){
                set_media_to_post(data.id_media, dataPost.id_post) // set media to post
                .then(function (data){
                    setIdMedia(null)
                    setIdMedia(data.media[0].id_media)
                    setDownloadMedia(true)
                    setIsExistMedia(true)
                })
            })
        }else if(update && !selectedImage && idMedia && !downloadMedia){ // unset media to post
            console.log("UNSET")
            unset_media_to_post(idMedia, dataPost.id_post).
            then(() => {setIdMedia(null)
                        setDownloadMedia(false)
                        setIsExistMedia(false)})
        }
    }, [update]);


    // DELETE POST
    const del_post = () => {
        delete_post(id).
        then(() => {
            navigate('/savedposts', { replace: false })
        })
    }


    // RENDER NEW MEDIA
    useEffect(() => {
    }, [idMedia, selectedImage]);


    const deleteMedia = () => {
        setDownloadMedia(false)
        setIsExistMedia(false)
        setSelectedImage(null)
    }

    const selectMedia = (event) => {
        setIsExistMedia(true)
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
                    <Card sx={{ maxWidth: 345, minHeight: 200 }}>
                    {isExistMedia ? 
                        downloadMedia ? 
                            <div>
                                <img alt="not fount" width={"350px"} src={`${BASE_URL}media/download/${idMedia}`}/>
                            </div>
                            :
                            <div>
                                <img alt="not fount" width={"350px"} src={URL.createObjectURL(selectedImage)}/>
                            </div>
                        :
                        <>Добавить фото</>
                        }
                    </Card>
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
                        onClick={del_post}>Удалить</Button>
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <Card sx={{ maxWidth: 345, p: 1}}>
                        <SelectChannel  setChannel={setChannel} channel={channel}/>
                        <ComponentDateTimePicker  sx={{ margin: 2}} datePosts={datePosts} 
                                                                    setDatePosts={setDatePosts} 
                                                                    dateRemovePost={dateRemovePost} 
                                                                    setDateRemovePost={setDateRemovePost}/>
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
