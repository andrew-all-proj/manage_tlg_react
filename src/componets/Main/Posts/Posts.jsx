import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import { useNavigate, useParams } from "react-router-dom";

import { useState, useEffect, useMemo } from "react";
import FileInput from '../../service/ImputShowMedia/InputFile'
import EditorText from '../../service/EditorText/EditorText'


import { set_tags_to_media, unset_tags_to_media } from '../../../api/tags'
import { post_media, set_media_to_post, get_media_by_id, unset_media_to_post } from '../../../api/media'
import { get_post, update_post, delete_post, post_create } from '../../../api/posts'
import { BASE_URL } from '../../../api/api';

import { AlertInfo } from '../../service/AlertInfo';
import SelectChannel from '../../service/SelectChannel'
import { formatDateTime, localDate } from '../../service/localDateTime'
import { get_event } from '../../../api/events'
import { BlockTimePublish } from './BlockTimePublish'
import SelectTags from '../../service/TagsForm';
import ProgressLoad from "../../service/ProgressLoad"


const checkDifferencesDelete = (dataPost, selectedFile) => {
    let differences = [];
    for (let i = 0; i < dataPost.media.length; i++) {
        let id = dataPost.media[i].id_media;
        let index = selectedFile.findIndex(x => x.id_media === id);

        if (index === -1) {
            differences.push(id);
        }
    }
    if (differences.length > 0) {
        return differences
    } else {
        return []
    }
}

const checkDifferencesNew = (dataPost, selectedFile) => {
    let differences = [];
    for (let i = 0; i < selectedFile.length; i++) {
        let id = selectedFile[i].id_media;
        let index = dataPost.media.findIndex(x => x.id_media === id);

        if (index === -1) {
            if (id !== undefined) {  // Добавляем проверку на undefined
                differences.push(selectedFile[i].file);
            }
        }
    }

    if (differences.length > 0) {
        return differences
    } else {
        return []
    }
}


export default function Post() {
    const navigate = useNavigate();
    const { id_post, id_event } = useParams()
    const [idPost, setIdPost] = useState(id_post)
    const [startSavePost, setStartSavePost] = useState(false);

    const [selectedFile, setSelectedFile] = useState([]);
    const [textPost, setTextPost] = useState('');
    const [dataPost, setDataPost] = useState(null);
    const [newIdMedia, setNewIdMedia] = useState(null);

    const [idEvent, setIdEvent] = useState(id_event);
    const [idChannel, setIdChannel] = useState('');

    const [modeEdit, setModeEdit] = useState(false)
    const [alertSavePostShow, setAlertSavePostShow] = useState({ show: false, msgInfo: '', severity: "error" })
    const [loading, setLoading] = useState(false);
    const [showProgressLoad, setShowProgressLoad] = useState(false);

    const [selectedTag, setSelectedTag] = useState([]);
    const [listGetTags, setListGetTags] = useState([]);

    const [datePublishPost, setDatePublishPost] = useState(formatDateTime());
    const [dateRemovePost, setDateRemovePost] = useState('');


    // used if rederect from url post/id_posr/id_event
    useEffect(() => {
        if (idPost) {            //load by id post
            setShowProgressLoad(true)
            getPost(id_post)
        }
        if (id_event) {
            get_event(id_event)
                .then((data) => {
                    setIdChannel(data.id_channel)
                    setDatePublishPost(formatDateTime(localDate(data.date_start)))
                    setIdEvent(data.id_event)
                    if (data.date_stop) {
                        setDateRemovePost(formatDateTime(localDate(data.date_stop)))
                    }
                })
        }
    }, []);


    const getPost = (id_post) => {
        get_post(id_post)
            .then((data) => {
                if (data.error) {
                    return setAlertSavePostShow({ show: true, msgInfo: "Пост не найден", severity: "error" })
                }
                setDataPost(data)
                if (Object.keys(data).length !== 0) {
                    if (data.media.length != 0) {
                        setSelectedFile(data.media)
                        getInfoMediaByID(data.media[0].id_media)
                    }
                    setModeEdit(true)
                    setTextPost(data.text)
                }
                setShowProgressLoad(false)
            })
    }


    useEffect(() => {
        if (idPost && startSavePost) {                                                 //update media
            const listDeleteMedia = checkDifferencesDelete(dataPost, selectedFile)
            if (listDeleteMedia) {
                listDeleteMedia.map((item) => unsetMediaToPost(id_post, item))
            }
            const listUploadMedia = checkDifferencesNew(dataPost, selectedFile)
            if (listUploadMedia.length > 0) {
                listUploadMedia.map((item) => loadMedia(id_post, item))
            }
        }
        setLoading(false)
    }, [dataPost]);


    const waitStateUpdate = async (setState, value) => {
        new Promise(resolve => setState(value));
    }

    // Save new post or update post
    const savePost = async () => {
        setLoading(true)
        if (startSavePost) {
            await waitStateUpdate(setStartSavePost, false);
        }
        await waitStateUpdate(setStartSavePost, true);
        setLoading(true);
    };

    // update post
    useEffect(() => {
        if (!idPost && startSavePost) {
            if(textPost){
                createPost(textPost);
            }else{
                createPost('');
            }
            
        }
        if (textPost && idPost && startSavePost) {             // update text post
            updatePost(idPost)
            return
        }
    }, [textPost]);


    useEffect(() => {
        if (startSavePost && idPost) {                               // start update post 
            get_post(idPost)                                       // get state post in server
                .then((data) => {
                    if (data.error) {
                        return setAlertSavePostShow({ show: true, msgInfo: "Пост не найден", severity: "error" })
                    }
                    setDataPost(data)
                })
        }
    }, [startSavePost]);


    const createPost = async (text_post) => {
        setLoading(true)
        post_create(text_post)                   // create new post 
            .then(async function (data) {
                if (data.error) { setLoading(false); return setAlertSavePostShow({ show: true, msgInfo: "Ошибка сохранения поста", severity: "error" }) }
                setTextPost(data.text)
                if (selectedFile) {
                    for (let i = 0; i < selectedFile.length; i++) {
                        await loadMedia(data.id_post, selectedFile[i].file, selectedFile[i].id_media)
                    }
                } else {
                    setModeEdit(true)
                    setLoading(false)
                    setAlertSavePostShow({ show: true, msgInfo: "Пост создан", severity: "success" })
                }
                setIdPost(data.id_post)
                navigate(`/post/${data.id_post}`)
            }).then(() => {
                setStartSavePost(false)
                setLoading(false)
            })
    }


    const updatePost = (id_post) => {
        update_post(id_post, textPost).
            then((data) => {
                if (data.error) { setLoading(false); return setAlertSavePostShow({ show: true, msgInfo: "Ошибка обновления поста", severity: "error" }) }
                setTextPost(data.text)
                setSelectedFile(data.media)
                setAlertSavePostShow({ show: true, msgInfo: "Текст обновлен", severity: "success" })
                setLoading(false)
            })
    }


    const unsetMediaToPost = (id_post, id_media) => {
        if (id_media) {
            unset_media_to_post(id_media, id_post).
                then((data) => {
                    if (data.error) { setLoading(false); return setAlertSavePostShow({ show: true, msgInfo: "Ошибка удаление медиа", severity: "error" }) }
                    setAlertSavePostShow({ show: true, msgInfo: "Медиа удалено", severity: "success" })
                    setLoading(false)
                })
        }
    }


    function updateIdMedia(new_id, old_id) {
        const updatedStateFile = selectedFile.map((item) => {
            if (item.id_media === old_id) {
                return {
                    ...item,
                    id_media: new_id
                };
            }
            return item;
        });
        setSelectedFile(updatedStateFile);
    }

    useEffect(() => {
        if (newIdMedia) {
            updateIdMedia(newIdMedia[0], newIdMedia[1])
        }
    }, [newIdMedia]);


    // load new media
    const loadMedia = async (id_post, file, id_media) => {
        setLoading(true)
        await post_media(file).
            then((data) => {
                if (data.error) { setLoading(false); return setAlertSavePostShow({ show: true, msgInfo: "Ошибка сохранения медиа", severity: "error" }) }
                setMediaPost(data.id_media, id_post)
                setNewIdMedia([data.id_media, id_media])
                setModeEdit(true)
                setAlertSavePostShow({ show: true, msgInfo: "Медиа обновлено", severity: "success" })
                setLoading(false)
            })

    }


    const setMediaPost = (id_media, id_post) => {
        set_media_to_post(id_media, id_post)
            .then((data) => {
                if (data.error) { setLoading(false); return setAlertSavePostShow({ show: true, msgInfo: "Ошибка сохранения медиа", severity: "error" }) }
                if (selectedTag) {
                    setTags(id_media)
                }
            })
    }


    const setTags = (id_media) => {
        let difference = listGetTags.filter(x => !selectedTag.includes(x))
        set_tags_to_media(id_media, selectedTag).
            then((data) => {
                if (data.error) { setLoading(false); return setAlertSavePostShow({ show: true, msgInfo: "Ошибка сохранения тег", severity: "error" }) }
            })
        if (difference) {
            unset_tags_to_media(id_media, difference).
                then((data) => {
                    if (data.error) { return setAlertSavePostShow({ show: true, msgInfo: data.msg, severity: "error" }) }
                    getInfoMediaByID(id_media)
                })
        }
    }


    // GET LIST TAGS FOR MEDIA
    const getInfoMediaByID = (id_media) => {
        setSelectedTag([])
        let listTags = []
        get_media_by_id(id_media).
            then((data) => {
                if (data.error) return setAlertSavePostShow({ show: true, msgInfo: "Ошибка получения тегов", severity: "error" })
                for (const element of data.tags) {
                    listTags.push(element.id_tag)
                }
                setListGetTags([...listTags])
                setSelectedTag([...listTags])
            })
    }


    // DELETE POST
    const deletePost = () => {
        delete_post(idPost).
            then((data) => {
                if (data.error) return setAlertSavePostShow({ show: true, msgInfo: "Ошибка удаление поста", severity: "error" })
                newPost()
            })
    }


    // NEW POST 
    const newPost = () => {
        setIdPost('')
        setTextPost('')
        setModeEdit(false)
        setSelectedFile([])
        setDataPost(null)
        navigate(`/post`)
    }


    const renderVideo = useMemo(() => (
        <FileInput selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
    ), [selectedFile])

    return (
        <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2 }}>
            {showProgressLoad ? <ProgressLoad /> :
                <Grid container >
                    <Grid xs={12}>
                        {modeEdit ? <NewPost newPost={newPost} /> : <Typography variant="h5" gutterBottom >Содать пост</Typography>}
                    </Grid>
                    <Grid xs={12} md={6} >
                        {renderVideo}
                    </Grid>
                    <Grid xs={12} md={6} >
                        <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2 }}>
                            <SelectChannel setIdChannel={setIdChannel} channel={idChannel} />
                            <SelectTags selectedTag={selectedTag} setSelectedTag={setSelectedTag} idChannel={idChannel} />
                        </Box>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <EditorText startSavePost={startSavePost} setStartSavePost={setStartSavePost} textPost={textPost} setTextPost={setTextPost} />
                        <AlertInfo showAlert={alertSavePostShow.show} setAlertShow={setAlertSavePostShow} severity={alertSavePostShow.severity} value={alertSavePostShow.msgInfo} />
                        <LoadingButton
                            onClick={savePost}
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            sx={{ margin: 1, width: "150px" }}
                        >
                            <span>Сохранить</span>
                        </LoadingButton>
                        {modeEdit && <Button variant="contained"
                            sx={{ margin: 1, width: "100px" }}
                            onClick={deletePost} >Удалить</Button>}
                    </Grid>
                    <Grid xs={12} md={6} >
                        {modeEdit && <BlockTimePublish idPost={idPost} idChannel={idChannel}
                            savePost={savePost} datePublishPost={datePublishPost} setDatePublishPost={setDatePublishPost}
                            dateRemovePost={dateRemovePost} setDateRemovePost={setDateRemovePost} idEvent={idEvent} setIdEvent={setIdEvent} />}
                    </Grid>
                </Grid>
            }
        </Box>
    )
}


const NewPost = ({ newPost }) => {
    return (
        <Stack direction='row' >
            <Typography variant="h6" gutterBottom >Содать новый пост:</Typography>
            <Button variant="contained"
                sx={{ margin: 1, width: "100px" }}
                onClick={newPost} >Новый</Button>
        </Stack>
    )
}
