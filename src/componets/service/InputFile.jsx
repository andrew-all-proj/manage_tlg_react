import * as React from 'react';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import {useCallback} from 'react'
import { useDropzone } from 'react-dropzone';



const FileInput = ({ setSelectedFile, selectedFile, typeMedia = null, ...props }) => {
    const [typeFile, setTypeFile] = useState(typeMedia);
    const onDrop = useCallback(acceptedFiles => {
        selectMedia(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const selectMedia = (files) => {
        setSelectedFile(files[0])
        set_type_media(files[0].type.split('/')[0])
    }

    const deleteMedia = () => {
        setSelectedFile(null)
    }


    const createURL = (selectedFile) => {
        if (typeof selectedFile === 'string') {
            return selectedFile
        }
        return URL.createObjectURL(selectedFile)
    }

    const set_type_media = (file) => {
        if (file === "video") { setTypeFile('video') }
        else if (file === "image") { setTypeFile('img') }
    }



    return (
        <Card sx={{ maxWidth: 350, minHeight: 30}}>
        <Card {...getRootProps()} sx={{ minHeight: 100}}>
            {selectedFile ? 
                <CardActionArea>
                    <CardMedia
                        component={typeFile}
                        preload="auto"
                        controls
                        image={createURL(selectedFile)}
                    />
                    <CardContent>

                    </CardContent>
                </CardActionArea>
                : <p>Перенесите сюда файл...</p>}
        </Card>
        <Stack direction="row"
                justifyContent="center"
                alignItems="flex-start">
                <Button variant="contained" component="label" sx={{ margin: 1, width: "120px" }}>
                    Выбрать
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
