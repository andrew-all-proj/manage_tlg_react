import * as React from 'react';
import { useAuth } from "../../hook/useAuth";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import { padding } from '@mui/system';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { get_list_tags, add_tag, remove_tag, update_tag } from '../../../api/tags'
import { useState, useEffect } from "react";
import SelectChannel from '../../service/SelectChannel'
import { AlertInfo } from '../../service/AlertInfo';
import Input from '@mui/material/Input';
import {TextChangeDoubleClick} from '../../service/TextChangeDoubleClick'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';



const ariaLabel = { 'aria-label': 'description' };


const TagsBoxItem = ({ tag_name, id_tag, getIdTag, setTagIdremove, setUpdateNameTag}) => {
    const [inputText, setInputText] = useState(true);

    const removeTag = (id) => {
        console.log(id)
        setTagIdremove(id)
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                minWidth: 200,
                maxWidth: 400,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                bgcolor: 'background.paper',
                color: 'inherit',
                margin: 1
            }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 200, bgcolor: 'background.paper', color: 'inherit', fontSize: 20, fontFamily: 'Roboto' }}>
                    <TextChangeDoubleClick  inputData={tag_name} 
                                            setInputData={setUpdateNameTag} 
                                            id={id_tag} getId={getIdTag}
                                            inputText={inputText} setInputText={setInputText}/>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  minWidth: 50, bgcolor: 'background.paper', color: 'blue' }}>
                    <IconButton key={id_tag} onClick={() => {setInputText(false)}} aria-label="delete" size="large">
                        <BorderColorIcon fontSize="default" color="primary"/>
                    </IconButton>
                    <IconButton key={id_tag} onClick={() => {removeTag(id_tag)}} aria-label="delete" size="large">
                        <DeleteIcon fontSize="default" color="primary"/>
                    </IconButton>
                </Box>
            </Box>
        </>
    )
}


const AddItemTag = ({textTag}) => {
    const [nameTag, setNameTag] = useState('');

    const imputText = (e) => {
        if (nameTag.length > 35){
            setNameTag(nameTag.substring(0, nameTag.length - 1))}
        else{
            setNameTag(e.target.value)  
        }
    }

    const addTag = () => {
        textTag(nameTag.trim())
        setNameTag('')
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                minWidth: 200,
                maxWidth: 400,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                bgcolor: 'background.paper',
                color: 'inherit',
                margin: 1
            }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  minWidth: 200, bgcolor: 'background.paper', color: 'inherit', fontSize: 20, fontFamily: 'Roboto' }}>
                    <Input value={nameTag} onChange={imputText} inputProps={ariaLabel} />
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  minWidth: 50, bgcolor: 'background.paper', color: 'blue' }}>
                    <IconButton  onClick={addTag} aria-label="delete" size="large">
                        <LibraryAddIcon fontSize="default" color="primary"/>
                    </IconButton>
                </Box>
            </Box>
        </>
    )
}


export default function Tags() {
    const [idChannel, setIdChannel] = useState('');
    const [listTags, setListTags] = useState('');
    const [nameNewTags, setNameNewTag] = useState('');
    const [tagIdRemove, setTagIdremove] = useState('');
    const [tagIdUpdate, setTagIdUpdate] = useState('');
    const [updateNameTag, setUpdateNameTag] = useState('');
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })

    

    useEffect(() => {
        if(idChannel){
            getListTags()
        }
    }, [idChannel]);


    useEffect(() => {
        if(nameNewTags){
            add_tag(idChannel, nameNewTags.trim()).
            then((data) => {
                if(data.error) return setAlertShow({ show: true, msgInfo: "Такой Тэг уже есть", severity: "error" })
                setNameNewTag('')
                getListTags()
            })    
        }
        
    }, [nameNewTags]);


    useEffect(() => {
        if(tagIdRemove){
            remove_tag(tagIdRemove).
            then((data) => {
                if(data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
                getListTags()
            })
                
        }
        
    }, [tagIdRemove]);


    useEffect(() => {
        if(tagIdUpdate && updateNameTag){
            update_tag(tagIdUpdate, updateNameTag).
            then((data) => {
                if(data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
                getListTags()
            })
                
        }
        
    }, [updateNameTag]);


    const getListTags = () => {
        get_list_tags(idChannel).
            then((data) => {
                if(data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
                setListTags(data)
            })}


    return (
        <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2 }}>
            <h3>Метки</h3>
            <Box sx={{maxWidth: "400px", margin: 1}}>
                <SelectChannel setIdChannel={setIdChannel} channel={idChannel} />
            </Box>
            <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
            {listTags && <AddItemTag textTag={setNameNewTag} />}
            {listTags && 
                listTags.map((tag) => 
                <TagsBoxItem key={tag.id_tag} id_tag={tag.id_tag} getIdTag={setTagIdUpdate} tag_name={tag.tag_name} setTagIdremove={setTagIdremove} setUpdateNameTag={setUpdateNameTag}/>)
            }
        </Box>
    );
}