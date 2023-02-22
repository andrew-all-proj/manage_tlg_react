import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FotoCard from '../../service/FotoCard';
import TagsForm from '../../service/TagsForm';
import EditText from '../../service/EditText';
import Grid, { grid2Classes } from '@mui/material/Unstable_Grid2';


export default function AddMedia() {
    return (
        <Box sx={{  border: "solid",  borderColor: "LightGray", borderWidth: 1, borderRadius: 2}}>
            <Grid container spacing={2} >
                <Grid md={12}>
                    <h3>Добавить медиа</h3>
                </Grid>
                <Grid md={6}>
                    <FotoCard />
                </Grid>
                <Grid md={6}>
                    <TagsForm />
                </Grid>
                <Grid md={12}>
                    <EditText />
                </Grid>
            </Grid>
        </Box>
    );
}
