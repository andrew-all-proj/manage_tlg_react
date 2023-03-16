import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import SelectTags from '../../service/TagsForm';
import { Card } from '@mui/material';
import { useState, useEffect, useMemo } from "react";
import { BASE_URL } from '../../../api/api';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostTextInput from './PostTextInput'
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';


import { AlertInfo } from '../../service/AlertInfo';

import { get_post, update_post,  delete_post } from '../../../api/posts'
import { post_media, set_media_to_post, unset_media_to_post } from '../../../api/media'
import { post_event, update_event, get_event } from '../../../api/events'
import {set_tags_to_media} from '../../../api/tags'
import { BlockTimePublish } from './BlockTimePublish'
import FileInput from '../../service/InputFile'
import { formatDateTime, localDate } from '../../service/localDateTime'

import ProgressLoad from "../../service/ProgressLoad"


export default function EditPost() {
    const navigate = useNavigate();
    const [dataPost, setDataPost] = useState(null);
    const { id, id_event} = useParams()

    const [idMedia, setIdMedia] = useState(null)
    const [update, setUpdate] = useState(false)
    const [typeMedia, setTypeMedia] = useState(null)

    const [textPost, setTextPost] = useState('');

    const [idChannel, setIdChannel] = useState('');

    const [datePublishPost, setDatePublishPost] = useState(formatDateTime());
    const [dateRemovePost, setDateRemovePost] = useState(dayjs(null));

    const [idEvent, setIdEvent] = useState(id_event);

    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })
    const [showAlertPublish, setAlertPublish] = useState({ show: false, msgInfo: '', severity: "error" })
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedTag, setSelectedTag] = useState([]);


    const set_type_media = (file) => {
        if (file === "video") { setTypeMedia('video') }
        else if (file === "image") { setTypeMedia('img') }
    }

    
    // GET POST
    useEffect(() => {
        setLoading(true)
        if (id) {
            get_post(id, setDataPost, setIdMedia, setTextPost)
                .then(function (data) {
                    if (Object.keys(data).length !== 0) {
                        if (data.media.length != 0) {
                            set_type_media(data.media[0].type_media.type_media)
                            setIdMedia(data.media[0].id_media)
                            setSelectedFile(`${BASE_URL}media/download/${data.media[0].id_media}`)
                        }
                        setTextPost(data.text)
                        setDataPost(data)
                    }
                })
        }
        if (id_event) {
            get_event(id_event)
            .then((data) => {
                setIdChannel(data.id_channel) 
                setDatePublishPost(localDate(data.date_start)) 
            })
        }
        setLoading(false)
    }, [id]);


    // GET UPDATE POST
    useEffect(() => {
        if (update) {
            update_post(id, textPost).
                then(function (data) {
                    if(data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
                    setTextPost(data.text)
                    setUpdate(false)
                    setAlertShow({ show: true, msgInfo: 'Пост сохранен', severity: "success" })
                })
        }
    }, [update]);


    const setTags = (id_media) => {
        set_tags_to_media(id_media, selectedTag).
        then((data) => {
            if(data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
        })
    }


    const upload_media = () => {
        setLoading(true)
        post_media(selectedFile, setIdMedia).
            then(function (data) {
                set_media_to_post(data.id_media, dataPost.id_post) // set media to post
                    .then(function (data) {
                        if(data.error) {return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })}
                        setIdMedia(data.media[0].id_media)
                        setTags(data.media[0].id_media)
                        setIdMedia(null)
                        setLoading(false)
                    })
            })
    }

    const check_url = (selectedFile) => {  // check link or object
        if (typeof selectedFile === 'string') {
            return false
        }
        return selectedFile
    }

    // GET UPDATE MEDIA
    useEffect(() => {
        if (update && check_url(selectedFile)) {   // LOAD NEW MEDIA
            if (idMedia) {
                unset_media_to_post(idMedia, dataPost.id_post)
            }   
            upload_media()
        }
        if (!selectedFile && update  && idMedia) { // unset media to post   (DELETE MEDIA)
            unset_media_to_post(idMedia, dataPost.id_post).
                then((data) => {
                    if(data.error) 
                            {setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })}
                    else{
                    setIdMedia(null)
                    setAlertShow({ show: true, msgInfo: 'Медиа обновлено', severity: "success" })}
                })
        }
    }, [update]);


    // DELETE POST
    const del_post = () => {
        delete_post(id).
            then(() => {
                navigate('/savedposts', { replace: false })
            })
    }


    // CREATE EVENT
    const publishPost = (event) => {
        setUpdate(true)
        if (idChannel) {
            post_event(datePublishPost, dateRemovePost, idChannel, id).
                then((data) => {
                    console.log(data)
                    if(data.error) return setAlertPublish({ show: true, msgInfo: data.msg, severity: "error" })
                    setIdEvent(data.id_event)
                    setAlertPublish({ show: true, msgInfo: 'Пост добавлен в расписание канала', severity: "success" })
                })
        } else {
            setAlertPublish({ show: true, msgInfo: 'Выберите канал', severity: "error" })
        }
    }


    const changePublishPost = (event) => {
        setUpdate(true)
        if (idChannel && idEvent) {
            update_event(idEvent, datePublishPost, dateRemovePost, id).
                then((data) => {
                })
        }
    }


    const updatePost = (event) => {
        setUpdate(true)
    }

    const renderVideo = useMemo(() => (
        <FileInput selectedFile={selectedFile} setSelectedFile={setSelectedFile} typeMedia={typeMedia}/>
    ), [selectedFile])


    return (<>
        {!dataPost ? <ProgressLoad /> :

            <Grid container spacing={1}>
                <Grid xs={12}>
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    {renderVideo}
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>

                    <BlockTimePublish setIdChannel={setIdChannel} idChannel={idChannel} datePublishPost={datePublishPost}
                        setDatePublishPost={setDatePublishPost} dateRemovePost={dateRemovePost} setDateRemovePost={setDateRemovePost} showAlertPublish={showAlertPublish}
                        setAlertPublish={setAlertPublish} changePublishPost={changePublishPost} idEvent={idEvent} publishPost={publishPost} 
                        selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>

                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <PostTextInput textPost={textPost} setTextPost={setTextPost} />
                    <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
                    <Stack direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ width: "330px" }}>
                        <LoadingButton
                            onClick={updatePost}
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            sx={{ margin: 1, width: "130px" }}
                        >
                            <span>Сохранить</span>
                        </LoadingButton>
                        <Button variant="contained"
                            sx={{ margin: 1, width: "100px" }}
                            onClick={del_post}>Удалить</Button>
                    </Stack >
                </Grid>
            </Grid>
        }</>
    )
}

export function ChannelError(props) {
    return (
        <div>
            <h3>{props.value}</h3>
        </div>
    )
}
