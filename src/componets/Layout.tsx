import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Link, Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'
import Header from './Heder/Header'
import Navbar from './Navbar/Navbar'
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../hook_redux';

const Layout: React.FC = () => {
    const mobileMode = useAppSelector(state => state.mobileMode)

    return (
        <Container sx={{paddingLeft: '2px', paddingRight: "2px" }} maxWidth='lg' >
            <Grid container spacing={1}>
                <Grid md={12}>
                    <Header />
                </Grid>
                <Grid xs={12}  md={3} sm={3}>
                    {mobileMode.showNavBar && <Navbar />}
                </Grid>
                <Grid md={9} xs={12}>
                    <Outlet />
                </Grid>
                <Grid md={12}>
                    <Footer />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Layout;