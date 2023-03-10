import styled from "@emotion/styled";
import { Button, Card, Chip, Paper, Stack } from "@mui/material"
import Box from "@mui/material/Box"
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Typography from '@mui/material/Typography';
import { useResize } from "../hook/useResize";


const TagsForm: React.FC = () => {
    const [showTags, setShowTags] = useState(true);
    const handleClick = () => {
        console.info('You clicked the Chip.');
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
        <Card sx={{ maxWidth: 345, minHeight: 30}}>
            <IconButton aria-label="delete" onClick={showTagsFun}>
                <BookmarksIcon color="primary" fontSize="large"/>
                <Typography variant="h6">Теги</Typography>
            </IconButton>   
            { showTags && <Box>
                <Stack direction="row" spacing={1}>
                    <Chip label="Cats" onClick={handleClick} />
                    <Chip label="Good morning" onClick={handleClick} />
                    <Chip label="Обед" onClick={handleClick} />
                </Stack>
            </Box>}
        </Card>
    )
}

export default TagsForm;