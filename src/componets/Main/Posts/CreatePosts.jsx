import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import ComponentDateTimePicker from '../../service/DataTime';
import Tags from '../../service/TagsForm';
import { Card } from '@mui/material';
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from 'dayjs';
import PostTextInput from './PostTextInput'
import PhotoInput from './InputFile'
import { post_create, get_post, update_post, unset_media_to_post, post_media, set_media_to_post } from '../../../api/posts'



export default function CreatePost() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [textPost, setTextPost] = useState('');
    const [idPost, setIdPost] = useState(null)
    const [loadPost, setLoadPost] = useState(false)

    const [datePosts, setDatePosts] = useState(dayjs('2022-01-02T18:54'));

    const [dateRemovePost, setDateRemovePost] = useState(dayjs('2022-01-01T18:54'));


    useEffect(() => {
        if(loadPost){
        post_create(textPost)
        .then(function(data){
            setTextPost(data.text)
            setIdPost(data.id_post)
        })
        }   
    }, [loadPost]);



    useEffect(() => {
        if (idPost && selectedFile) {
            post_media(selectedFile).
            then(function(data) {
                console.log(data.id_media)
                set_media_to_post(data.id_media, idPost)
            }).
            then(function(data) {
                const id = idPost
                setIdPost(null)
                navigate('/post/' + id, { replace: false })
            })
        }else if(idPost){
            const id = idPost
            setIdPost(null)
            navigate('/post/' + id, { replace: false })
        }
    }, [idPost]);


    const createPost = () => {
        setLoadPost(true)
    }


    return (
        <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2 }}>
            <Grid container spacing={1}>
                <Grid xs={12}>
                    СОЗДАТЬ НОВЫЙ ПОСТ
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <PhotoInput selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <Tags />
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <PostTextInput textPost={textPost} setTextPost={setTextPost} />
                    <Button variant="contained"
                        sx={{ margin: 1, width: "155px" }}
                        onClick={createPost}>Сохранить</Button>
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    
                </Grid>
            </Grid>
        </Box>
    );
}