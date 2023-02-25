import * as React from 'react';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';
import { useState, useEffect } from "react";



const FileInput = ({setSelectedFile, selectedFile, typeMedia, ...props}) => {
    const [typeFile, setTypeFile] = useState(typeMedia);

    const selectMedia = (event) => {
        setSelectedFile(event.target.files[0])
        set_type_media(event.target.files[0].type.split('/')[0])
    } 

    const deleteMedia = () => {
        setSelectedFile(null)
    }


    const createURL = (selectedFile) => {
        let r = /^(ftp|http|https):\/\/[^ "]+$/;
        if (r.test(selectedFile)) {
            return selectedFile
        }
        return URL.createObjectURL(selectedFile)
    }

    const set_type_media = (file) => {
        if (file === "video") { setTypeFile('video') }
        else if (file === "image") { setTypeFile('img') }
    }
    

    return(
        <Card sx={{ maxWidth: 345, minHeight: 100}}>
        {selectedFile && (
            <CardActionArea>
            <CardMedia
                component= {typeFile}
                controls
                image={createURL(selectedFile)}
            />
            <CardContent>

            </CardContent>
        </CardActionArea>
        )}
        <Button variant="contained" component="label" sx={{ margin: 1, width: "155px" }}>
            Выбрать
            <input
                hidden
                type="file"
                name="myFile"
                onChange={selectMedia}
            />
        </Button>
        <Button onClick={deleteMedia} 
        variant="contained" component="label" sx={{ margin: 1, width: "155px"}}>Удалить</Button>
    </Card>
)}

export default FileInput;
