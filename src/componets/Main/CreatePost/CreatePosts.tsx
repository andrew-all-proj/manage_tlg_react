import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import ComponentDateTimePicker from './DataTime';
import EditText from './EditText';
import Tags from './TagsForm';
import FotoCard from './FotoCard';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function CreatePost() {
    return (
        <Box sx={{  border: "solid",  borderColor: "LightGray", borderWidth: 1, borderRadius: 2}}>
        <Grid container spacing={2}>
                <Grid xs={12}>
                    <ListItemText>Создать пост</ListItemText>
                </Grid>
            <Grid container xs={12} md={12}>
                <Grid xs={12} md={3} mdOffset={0}>
                    <FotoCard /> 
                </Grid>
                <Grid xs={12}  md={3} mdOffset={0}>
                    <Tags />
                </Grid>
            </Grid>
            <Grid container xs={12} md={12}>
                <Grid xs={12} md={3} mdOffset={0}>
                    <EditText />
                </Grid>
                <Grid xs={12} md={3} mdOffset={0}>
                    <ComponentDateTimePicker/>
                </Grid>
            </Grid>
        </Grid>
        </Box>
    );
}
