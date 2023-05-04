import * as React from 'react';
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { BASE_URL } from '../../../api/api'
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FileInput = ({ setSelectedFile, selectedFile }) => {
    const onDrop = useCallback(acceptedFiles => {
        selectMedia(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true})

    const [column, setColumn] = useState(12);
    const [selectedMedia, setSelectedMedia] = useState([]);
    //const [idSelectedMedia, setIdSelectedMedia] = useState('');

    const selectMedia = (files) => {
        const arrayNewFile = []
        for (let i = 0; i < files.length; i++) {
            arrayNewFile.push({"file": files[i], "id_media": uuidv4() ,'local_link': URL.createObjectURL(files[i]), "type_media": { "type_media": files[i].type.split('/')[0] } })
        }
        setSelectedFile([...selectedFile, ...arrayNewFile])
    }

    useEffect(() => {
        console.log(selectedFile.length)
        if(selectedFile.length > 1) {
            console.log(111111)
            setColumn(6)
        }
    }, [selectedFile]);

    const deleteMedia = () => {
        setSelectedFile((selectedFile) =>
            selectedFile.filter((item) => !selectedMedia.includes(item.id_media)))
    } 

    const handlerSelectMedia = (idSelectedMedia, stateSelect) => {
        if (stateSelect) {
            if (!selectedMedia.includes(idSelectedMedia)) {
                setSelectedMedia([...selectedMedia, idSelectedMedia]);
            }
        } else {
            setSelectedMedia(selectedMedia.filter((item) => item !== idSelectedMedia));
        }
    };

    return (
        <Card  sx={{ maxWidth: 450, minHeight: 30, m: 1 }}>
            <Card {...getRootProps()}  sx={{ minHeight: 100 }}>
                {selectedFile !== [] ?
                    <Grid container >
                        {selectedFile.map((item) => <Grid key={item.id_media} xs={column} md={column}>
                        <ItemMedia getRootProps={getRootProps} key={item.id_media} keyMedia={item.id_media} localLink={item.local_link}
                            typeFile={item.type_media.type_media} IdFile={item.id_media}
                            callBack={handlerSelectMedia} />
                        </Grid>)}
                    </Grid>
                    : <p>Перенесите сюда файл...</p>}
            </Card>
            <Stack direction="row"
                justifyContent="center"
                alignItems="flex-start">
                <Button variant="contained" component="label" sx={{ margin: 1, width: "120px" }}>
                    Добавить
                    <input
                        hidden
                        type="file"
                        name="myFile"
                        onChange={(e) => selectMedia(e.target.files)}
                    />
                </Button>
                <Button onClick={deleteMedia}
                    variant="contained" component="label" sx={{ margin: 1, width: "120px" }}>Удалить</Button>
            </Stack>
        </Card >
    )
}

export default FileInput;


export const ItemMedia = ({ typeFile, IdFile, localLink, keyMedia, callBack }) => {
    const [showBorder, setShowBorder] = useState(null);
    const [idMedia, setIdMedia] = useState(keyMedia);

    const set_type_media = (file) => {
        if (file === "video") { return 'video' }
        else if (file === "image") { return 'img' }
        else if (file === "audio") { return 'audio' }
    }

    const handlerOnClick = (e) => {
        if (showBorder) {
            callBack(idMedia, false)
            setShowBorder(null)
        } else {
            callBack(idMedia, true)
            setShowBorder({ border: 3, borderColor: 'red' })
        }
    }


    return (
        <CardActionArea sx={{ p: 0.2, MaxHeight: 200, ...showBorder }}>
            <CardMedia
                id={keyMedia}
                onClick={handlerOnClick}
                component={set_type_media(typeFile)}
                preload="auto"
                controls
                image={localLink ? localLink : `${BASE_URL}media/download/${IdFile}`}
            />
        </CardActionArea>

    )
}


export const ShowFile = ({ file, typeMedia = 'img' }) => {

    if (typeMedia === 'image') {
        typeMedia = 'img'
    }

    return (
        <>
            <CardMedia
                component={typeMedia}
                preload="metadata"
                controls
                image={file}
            />
        </>
    )
}
