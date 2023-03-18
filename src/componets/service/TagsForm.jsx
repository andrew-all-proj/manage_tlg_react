import styled from "@emotion/styled";
import { Button, Card, Chip, Paper, Stack } from "@mui/material"
import Box from "@mui/material/Box"
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Typography from '@mui/material/Typography';
import { useResize } from "../hook/useResize";
import {get_list_tags, set_tags_to_media} from '../../api/tags'
import {AlertInfo} from './AlertInfo'

export const TagsForm = ({listTags, selectedTag, setSelectedTag}) => {
    const [showTags, setShowTags] = useState(true);

    const handleClick = (id) => {
        if(id && selectedTag.includes(id)){
            setSelectedTag(selectedTag.filter((item) => item !== id))
        }else{
            setSelectedTag(selectedTag => [...selectedTag, id])
        }
    };

    const size = useResize()

    useEffect(() => {
        if (!size.isScreenMd){
            setShowTags(false) 
        }else{
            setShowTags(true) 
        }
    }, [size.isScreenMd]);


    const showTagsFun = () => {
        if (showTags) return setShowTags(false)
        if (!showTags) return setShowTags(true)
    }
    return (
        <Card sx={{ maxWidth: 500, minHeight: 30, p: 1}}>
            <IconButton aria-label="delete" onClick={showTagsFun}>
                <BookmarksIcon color="primary" fontSize="large"/>
                <Typography variant="h6">Теги</Typography>
            </IconButton>   
            { showTags && <Box>
                <Stack direction="row" spacing={1} >
                    {listTags && listTags.map((tag) => 
                        <ItemChip selected={selectedTag} key={tag.id_tag}  label={tag.tag_name} onClick={handleClick}  id={tag.id_tag} />
                    )}
                </Stack>
            </Box>}
        </Card>
    )
}

const ItemChip = ({label, onClick, id, selected}) => {
    const [selectedChip, setSelectedChip] = useState("default");
    
    useEffect(() => {
        if (selected.includes(id)){
            setSelectedChip("primary")
        }else{
            setSelectedChip("default")
        }
    }, [selected]);

    return(
        <Chip color={selectedChip} key={id}  label={label} onClick={() => {onClick(id)}} /> 
    )
}

const SelectTags = ({selectedTag, setSelectedTag, idChannel}) => {
    const [listTags, setListTags] = useState([]);
    const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })
    

    useEffect(() => {
        if (idChannel) {
            get_list_tags(idChannel).
            then((data) => {
                if(data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
                setListTags(data)
            })
        }
    }, [idChannel]);
    
    return(
    <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2 }}>
        <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
        <TagsForm listTags={listTags} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
    </Box>
)}

export default SelectTags;