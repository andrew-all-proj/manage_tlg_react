import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState, useEffect, useMemo } from "react";
import Box from '@mui/material/Box';
import FotoCard from '../../service/FotoCard';
import TagsForm from '../../service/TagsForm';
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import SelectTags from '../../service/TagsForm'
import { AlertInfo } from '../../service/AlertInfo'
import FileInput from '../../service/InputFile'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import {get_list_tags, set_tags_to_media} from '../../../api/tags'
import {post_media} from '../../../api/media'
import SelectChannel from '../../service/SelectChannel'


export default function AddMedia() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedTag, setSelectedTag] = useState([]);
    const [idChannel, setIdChannel] = useState('');
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })
    const [loading, setLoading] = useState(false);

    const saveMedia = () => {
        if(selectedFile){
        setLoading(true)
        post_media(selectedFile).
        then((data) => {
            setLoading(false)
            if(data.error) return setAlertShow({ show: true, msgInfo: 'Ошибка сохранения', severity: "error" })
            set_tags_to_media(data.id_media, selectedTag).
            then((data) => {
                if(data.error) return setAlertShow({ show: true, msgInfo: 'Ошибка привязки тегов', severity: "error" })
                setSelectedFile(null)
                setAlertShow({ show: true, msgInfo: "Сохранено", severity: "success" })
            })
        })
    }
    }

    return (
        <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2 }}>
            <Grid container spacing={2} >
                <Grid md={12} xs={12}>
                    <h3>Добавить медиа</h3>
                </Grid>
                <Grid md={6} xs={12}>
                    <FileInput selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                </Grid>
                <Grid md={6} xs={12}>
                    <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2 }}>
                        <SelectChannel setIdChannel={setIdChannel} channel={idChannel} />
                        <SelectTags selectedTag={selectedTag} setSelectedTag={setSelectedTag} idChannel={idChannel}/>
                    </Box>
                </Grid>
                <Grid md={12} xs={12}>
                <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
                <LoadingButton
                        onClick={saveMedia}
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

