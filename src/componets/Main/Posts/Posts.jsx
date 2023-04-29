import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import { useNavigate, useParams} from "react-router-dom";

import { useState, useEffect, useMemo } from "react";
//import PostTextInput from './PostTextInput'
import FileInput from '../../service/InputFile'
import EditorText  from '../../service/EditorText/EditorText'


import { set_tags_to_media, unset_tags_to_media } from '../../../api/tags'
import { post_media, set_media_to_post, get_media_by_id, unset_media_to_post } from '../../../api/media'
import { get_post, update_post, delete_post, post_create } from '../../../api/posts'
import { BASE_URL } from '../../../api/api';

import { AlertInfo } from '../../service/AlertInfo';
import SelectChannel from '../../service/SelectChannel'
import { formatDateTime, localDate } from '../../service/localDateTime'
import { get_event } from '../../../api/events'
import {BlockTimePublish} from './BlockTimePublish'
import SelectTags from '../../service/TagsForm';
import ProgressLoad from "../../service/ProgressLoad"


export default function Post() {
    const navigate = useNavigate();
    const { id_post, id_event} = useParams()

    const [getText, setGetText] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [textPost, setTextPost] = useState('');
    const [idPost, setIdPost] = useState(id_post)
    const [idEvent, setIdEvent] = useState(id_event);
    const [idChannel, setIdChannel] = useState('');
    const [idMedia, setIdMedia] = useState('')
    const [typeMedia, setTypeMedia] = useState('')

    const [modeEdit, setModeEdit] = useState(false)
    const [alertSavePostShow, setAlertSavePostShow] = useState({ show: false, msgInfo: '', severity: "error" })
    const [loading, setLoading] = useState(false); 
    const [showProgressLoad, setShowProgressLoad] = useState(false); 

    const [stateMedia, setStateMedia] = useState('new');
    const [selectedTag, setSelectedTag] = useState([]);
    const [listGetTags, setListGetTags] = useState([]);

    const [datePublishPost, setDatePublishPost] = useState(formatDateTime());
    const [dateRemovePost, setDateRemovePost] = useState('');


    const checkTypeMedia = (file) => {
        if (file === "video") { setTypeMedia('video') }
        else if (file === "image") { setTypeMedia('img') }
        else if (file === "audio") { setTypeMedia('audio') }
    }

    // used if rederect from url post/id_posr/id_event
    useEffect(() => {       
        if(id_post){            //load by id post
            setShowProgressLoad(true)
            get_post(id_post)
            .then((data) => {
                if(data.error) {
                    return setAlertSavePostShow({ show: true, msgInfo: "Пост не найден", severity: "error" })}
                if (Object.keys(data).length !== 0) {
                    if (data.media.length != 0) {
                        checkTypeMedia(data.media[0].type_media.type_media)
                        setIdMedia(data.media[0].id_media)
                        getInfoMediaByID(data.media[0].id_media)
                        setSelectedFile(`${BASE_URL}media/download/${data.media[0].id_media}`)
                        setStateMedia('update')
                    }
                    setModeEdit(true)
                    setTextPost(data.text)
                }
                setShowProgressLoad(false)
            })
        }
        if (id_event) {
            get_event(id_event)
            .then((data) => {
                setIdChannel(data.id_channel) 
                setDatePublishPost(formatDateTime(localDate(data.date_start)))
                setIdEvent(data.id_event)
                if(data.date_stop){
                    setDateRemovePost(formatDateTime(localDate(data.date_stop)))
                }
                setStateMedia('update')
            })
        }
    }, []);

    // create new post
    useEffect(() => {
        console.log(1111)
        if(getText){
            if (idPost) {             // update text post
                updatePost(idPost)
                return
            } 
            createPost()    
        }   
    }, [textPost]);

    
    useEffect(() => {
        if(!idPost && selectedFile){
            createPost()                             // if don't have text, but have media. Create new post
        }
        if(idPost && getText){                              //update media
            console.log("UPDATE MEDIA")      
            console.log(stateMedia)
            if(stateMedia === 'delete'){                      //delete media
                unsetMediaToPost(id_post)
            }
            if(stateMedia === 'new'){
                unsetMediaToPost(id_post)
                loadMedia(id_post)
                console.log("CREATE NEW MEDIA")
                setAlertSavePostShow({ show: true, msgInfo: "Медиа обновлено", severity: "success" }) 
            }
            if(stateMedia === 'update' && selectedFile){
                setTags(idMedia) 
            }
        }
        setLoading(false)   
    }, [getText]);

    const waitStateUpdate = async (setState, value) => {
        new Promise(resolve => setState(value));
        }

    // Save new post or update post
    const savePost = async () => {
        setLoading(true)
        if(getText){
            await waitStateUpdate(setGetText, false);
        }
        console.log('update')
        console.log(getText)
        await waitStateUpdate(setGetText, true);
    };

    const createPost = () => { 
        post_create(textPost)      // create new post 
        .then(function (data) {
            if (data.error) { setLoading(false); return setAlertSavePostShow({ show: true, msgInfo: "Ошибка сохранения поста", severity: "error" }) }
            setTextPost(data.text)
            setIdPost(data.id_post)
            if (selectedFile) {
                loadMedia(data.id_post)
            }else{
                setModeEdit(true)
                setLoading(false)
                setAlertSavePostShow({ show: true, msgInfo: "Пост создан", severity: "success" }) 
            }
            navigate(`/post/${data.id_post}`)
        }) 
    }

    const updatePost = (id_post) => {
        console.log('update')
        console.log(textPost)
        update_post(id_post, textPost).
            then((data) => {
                if (data.error) { setLoading(false); return setAlertSavePostShow({ show: true, msgInfo: "Ошибка обновления поста", severity: "error" }) }
                setTextPost(data.text)
                setAlertSavePostShow({ show: true, msgInfo: "Текст обновлен", severity: "success" }) 
            })
    }


    const unsetMediaToPost = (id_post) => {
        if(idMedia){
        unset_media_to_post(idMedia, id_post).
                then((data) => {
                    if (data.error) { setLoading(false); return setAlertSavePostShow({ show: true, msgInfo: "Ошибка удаление медиа", severity: "error" }) }
                    setIdMedia('')
                })
            }
    }

    // control select file or delete or update media file 
    useEffect(() => {
        if(typeof selectedFile === 'string'){
            setStateMedia('update')
            return  
        }
        if(selectedFile === null){
            setStateMedia('delete')
        }
        
        if(selectedFile){
            setStateMedia('new')
        }  

    }, [selectedFile]);


    // load new media
    const loadMedia = (id_post) => {
        post_media(selectedFile).
            then(function (data) {
                if (data.error) { setLoading(false); return setAlertSavePostShow({ show: true, msgInfo: "Ошибка сохранения медиа", severity: "error" }) }
                setIdMedia(data.id_media)
                setMediaPost(data.id_media, id_post)
                console.log("UPDATE NEW MEDIA!!!")
                setModeEdit(true)
                setLoading(false)
                setAlertSavePostShow({ show: true, msgInfo: "Пост обновлен", severity: "success" }) 
                setStateMedia('update')
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
                if (data.error) { setLoading(false); return setAlertSavePostShow({ show: true, msgInfo: "Ошибка сохранения медиа", severity: "error" }) }
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
        setModeEdit(false)
        setSelectedFile(null)
        setTextPost('')
        navigate(`/post/`)
    }


    const renderVideo = useMemo(() => (
        <FileInput selectedFile={selectedFile} setSelectedFile={setSelectedFile} typeMedia={typeMedia}/>
    ), [selectedFile])

return (
    <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2 }}>
    {showProgressLoad ? <ProgressLoad /> : 
        <Grid container >
            <Grid xs={12}>
                {modeEdit ? <NewPost newPost={newPost}/> : <Typography variant="h5" gutterBottom >Содать пост</Typography>} 
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
            <EditorText getText={getText} setGetText={setGetText} textPost={textPost} setTextPost={setTextPost}/>
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
                dateRemovePost={dateRemovePost} setDateRemovePost={setDateRemovePost} idEvent={idEvent} setIdEvent={setIdEvent}/>}
            </Grid>
        </Grid>
    }
    </Box>
)}
//<PostTextInput textPost={textPost} setTextPost={setTextPost}  editorStateText={editorStateText} setEditorStateText={setEditorStateText} />

const NewPost = ({newPost}) => {
    return(
        <Stack direction='row' >
            <Typography variant="h6" gutterBottom >Содать новый пост:</Typography>
            <Button variant="contained"
                            sx={{ margin: 1, width: "100px" }}
                            onClick={newPost} >Новый</Button>
        </Stack>
    )
}
