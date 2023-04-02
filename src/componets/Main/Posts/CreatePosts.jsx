import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import SelectTags from '../../service/TagsForm';
import { useState, useEffect, useMemo } from "react";
import PostTextInput from './PostTextInput'
import FileInput from '../../service/InputFile'
import { post_create } from '../../../api/posts'
import { set_tags_to_media } from '../../../api/tags'
import { post_media, set_media_to_post } from '../../../api/media'
import { AlertInfo } from '../../service/AlertInfo';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import SelectChannel from '../../service/SelectChannel'


export default function CreatePost() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [textPost, setTextPost] = useState('');
    const [idPost, setIdPost] = useState(null)
    const [loadPost, setLoadPost] = useState(false)
    const [showAlertPublish, setAlertPublish] = useState({ show: false, msgInfo: '', severity: "error" })
    const [selectedTag, setSelectedTag] = useState([]);
    const [idChannel, setIdChannel] = useState('');

    const [loading, setLoading] = useState(false);



    useEffect(() => {
        if (loadPost) {
            post_create(textPost)
                .then(function (data) {
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
            setLoading(true)
            post_media(selectedFile).
                then(function (data) {
                    if (!data.id_media) { return false }
                    set_media_to_post(data.id_media, idPost)
                    set_tags_to_media(data.id_media, selectedTag)
                }).
                then(function (data) {
                    const id = idPost
                    setIdPost(null)
                    navigate('/post/' + id, { replace: false })
                }).catch((err) => {
                    setLoading(false)
                    setLoadPost(false)
                    setAlertPublish({ show: true, msgInfo: 'Ошибка сохранения медиа', severity: "error" })
                    navigate('/post/' + idPost, { replace: false })
                })
        } else if (idPost) {
            const id = idPost
            setIdPost(null)
            navigate('/post/' + id, { replace: false })
        }
    }, [idPost]);


    const createPost = () => {
        setLoadPost(true)
    }

    const renderVideo = useMemo(() => (
        <FileInput selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
    ), [selectedFile])

    return (
        <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2 }}>
            <Grid container >
                <Grid xs={12}>
                    СОЗДАТЬ НОВЫЙ ПОСТ
                </Grid>
                <Grid xs={12} md={6} >
                    {renderVideo}
                </Grid>
                <Grid xs={12} md={6} >
                    <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2 }}>
                        <SelectChannel setIdChannel={setIdChannel} channel={idChannel} />
                        <SelectTags selectedTag={selectedTag} setSelectedTag={setSelectedTag} idChannel={idChannel}/>
                    </Box>
                </Grid>
                <Grid xs={12} md={6}>
                    <div>
                        <PostTextInput textPost={textPost} setTextPost={setTextPost} />
                    </div>
                    <AlertInfo showAlert={showAlertPublish.show} setAlertShow={setAlertPublish} severity={showAlertPublish.severity} value={showAlertPublish.msgInfo} />
                    <LoadingButton
                        onClick={createPost}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        sx={{ margin: 1, width: "150px" }}
                    >
                        <span>Сохранить</span>
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
}