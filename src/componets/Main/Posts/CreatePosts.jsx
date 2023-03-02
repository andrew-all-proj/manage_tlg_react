import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import Tags from '../../service/TagsForm';
import { useState, useEffect, useMemo } from "react";
import PostTextInput from './PostTextInput'
import FileInput from './InputFile'
import { post_create, post_media, set_media_to_post } from '../../../api/posts'
import { AlertInfo } from '../../service/AlertInfo';



export default function CreatePost() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [textPost, setTextPost] = useState('');
    const [idPost, setIdPost] = useState(null)
    const [loadPost, setLoadPost] = useState(false)
    const [showAlertPublish, setAlertPublish] = useState({ show: false, msgInfo: '', severity: "error" })


    useEffect(() => {
        if(loadPost){
        post_create(textPost)
        .then(function(data){
            setTextPost(data.text)
            setIdPost(data.id_post)
        }).catch((err) => {
            setLoadPost(false)
            setAlertPublish({ show: true, msgInfo: 'Ошибка сохранения', severity: "error" })
        })
        }   
    }, [loadPost]);



    useEffect(() => {
        if (idPost && selectedFile) {
            post_media(selectedFile).
            then(function(data) {
                if (!data.id_media) {return false}
                set_media_to_post(data.id_media, idPost)
            }).
            then(function(data) {
                const id = idPost
                setIdPost(null)
                navigate('/post/' + id, { replace: false })
            }).catch((err) => {
                setLoadPost(false)
                setAlertPublish({ show: true, msgInfo: 'Ошибка сохранения медиа', severity: "error" })
                navigate('/post/' + idPost, { replace: false })
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

    const renderVideo = useMemo(() => (
        <FileInput selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
    ), [selectedFile])

    return (
        <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2 }}>
            <Grid container spacing={1}>
                <Grid xs={12}>
                    СОЗДАТЬ НОВЫЙ ПОСТ
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    {renderVideo}
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <Tags />
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <div>
                    <PostTextInput textPost={textPost} setTextPost={setTextPost} />
                    </div>
                    <AlertInfo showAlert={showAlertPublish.show} setAlertShow={setAlertPublish} severity={showAlertPublish.severity} value={showAlertPublish.msgInfo} />
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