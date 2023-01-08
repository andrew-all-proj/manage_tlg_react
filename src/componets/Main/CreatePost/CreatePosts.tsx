import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import ComponentDateTimePicker from '../service/DataTime';
import EditText from '../service/EditText';
import Tags from '../service/TagsForm';
import FotoCard from '../service/FotoCard';
import { Card } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function CreatePost() {
    return (
        <Box sx={{border: 1, borderColor: '#DCDCDC', borderRadius: 2}}>
        <Grid container spacing={2}>
                <Grid xs={12}>
                    <ListItemText>Создать пост</ListItemText>
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <FotoCard /> 
                </Grid>
                <Grid xs={12}  md={6} mdOffset={0}>
                    <Tags />
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <EditText />
                </Grid>
                <Grid xs={12} md={6} mdOffset={0}>
                    <Card sx={{ maxWidth: 345}}>
                        <ComponentDateTimePicker/>
                        <Button variant="contained" sx={{ margin: 1 }}>Опубликовать</Button>
                    </Card>
                </Grid>
        </Grid>
        </Box>
    );
}
