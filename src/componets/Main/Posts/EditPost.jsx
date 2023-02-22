import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import Tags from '../../service/TagsForm';
import { Card } from '@mui/material';
import { useState, useEffect } from "react";
import { BASE_URL } from '../../../api/api';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostTextInput from './PostTextInput'

import { AlertInfo } from '../../service/AlertInfo';

import { get_post, update_post, unset_media_to_post, post_media, set_media_to_post, delete_post } from '../../../api/posts'
import { post_event, update_event } from '../../../api/events'
import { BlockTimePublish } from './BlockTimePublish'


export default function EditPost() {
    const navigate = useNavigate();
    const [dataPost, setDataPost] = useState(null);
    const { id, id_channel } = useParams()

    const [idMedia, setIdMedia] = useState(null)
    const [update, setUpdate] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [isExistMedia, setIsExistMedia] = useState(false)
    const [downloadMedia, setDownloadMedia] = useState(false)

    const [textPost, setTextPost] = useState('');

    const [idChannel, setIdChannel] = useState(id_channel);

    const [datePublishPost, setDatePublishPost] = useState(dayjs('2022-01-02T18:54'));
    const [dateRemovePost, setDateRemovePost] = useState(dayjs(null));

    const [idEvent, setIdEvent] = useState(null);

    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })
    const [showAlertPublish, setAlertPublish] = useState({ show: false, msgInfo: '', severity: "error" })


    // GET POST
    useEffect(() => {
        console.log(id_channel)
        if (id) {
            get_post(id, setDataPost, setIdMedia, setTextPost)
                .then(function (data) {
                    if (Object.keys(data).length !== 0) {
                        if (data.media.length != 0) {
                            setIdMedia(data.media[0].id_media)
                            setIsExistMedia(true)
                            setDownloadMedia(true)
                        }
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
                then(function (data) {
                    setTextPost(data.text)
                    setUpdate(false)
                    setAlertShow({ show: true, msgInfo: 'Пост сохранен', severity: "success" })
                })
        }
    }, [update]);


    // GET UPDATE MEDIA
    useEffect(() => {
        if (update && selectedImage && !downloadMedia) {
            console.log("SET")
            if (idMedia) {
                unset_media_to_post(idMedia, dataPost.id_post)
            }
            post_media(selectedImage, setIdMedia).
                then(function (data) {
                    set_media_to_post(data.id_media, dataPost.id_post) // set media to post
                        .then(function (data) {
                            setIdMedia(null)
                            setIdMedia(data.media[0].id_media)
                            setDownloadMedia(true)
                            setIsExistMedia(true)
                        })
                })
        } else if (update && !selectedImage && idMedia && !downloadMedia) { // unset media to post
            console.log("UNSET")
            unset_media_to_post(idMedia, dataPost.id_post).
                then(() => {
                    setIdMedia(null)
                    setDownloadMedia(false)
                    setIsExistMedia(false)
                    setAlertShow({ show: true, msgInfo: 'Медиа обновлено', severity: "success" })
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
        console.log(idChannel)
        setUpdate(true)
        if (idChannel) {
            post_event(datePublishPost, dateRemovePost, idChannel, id).
                then((data) => {
                    setIdEvent(data.id_event)
                    setAlertPublish({ show: true, msgInfo: 'Пост добавлен в расписание канала', severity: "success" })
                })
        } else {
            setAlertPublish({ show: true, msgInfo: 'Выберите канал', severity: "error" })
        }
    }


    const changePublishPost = (event) => {
        console.log(idChannel)
        setUpdate(true)
        if (idChannel && idEvent) {
            update_event(idEvent, datePublishPost, dateRemovePost, id).
                then((data) => {
                    console.log(data)
                })
        }
    }


    // RENDER NEW MEDIA
    useEffect(() => {
    }, [idMedia, selectedImage, idEvent]);


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
        {!dataPost ? <ChannelError value="POST NOT FOUND" /> :

            <Grid container spacing={1}>
                <Grid xs={12}>
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <Card sx={{ maxWidth: 345, minHeight: 200 }}>
                        {isExistMedia ?
                            downloadMedia ?
                                <div>
                                    <img alt="not fount" width={"350px"} src={`${BASE_URL}media/download/${idMedia}`} />
                                </div>
                                :
                                <div>
                                    <img alt="not fount" width={"350px"} src={URL.createObjectURL(selectedImage)} />
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
                    <PostTextInput textPost={textPost} setTextPost={setTextPost} />

                    <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />

                    <Button variant="contained"
                        sx={{ margin: 1, width: "155px" }}
                        onClick={updatePost}>Сохранить</Button>
                    <Button variant="contained"
                        sx={{ margin: 1, width: "155px" }}
                        onClick={del_post}>Удалить</Button>
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>

                    <BlockTimePublish setIdChannel={setIdChannel} idChannel={idChannel} datePublishPost={datePublishPost}
                        setDatePublishPost={setDatePublishPost} dateRemovePost={dateRemovePost} setDateRemovePost={setDateRemovePost} showAlertPublish={showAlertPublish} 
                        setAlertPublish={setAlertPublish} changePublishPost={changePublishPost} idEvent={idEvent} publishPost={publishPost}/>    

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
