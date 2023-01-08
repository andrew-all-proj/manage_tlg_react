import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Link, Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'
import Header from './Heder/Header'
import Navbar from './Navbar/Navbar'

const Layout: React.FC = () => {
    return (
        <>  <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid md={12}>
                    <Header />
                </Grid>
                <Grid md={3}>
                    <Navbar />
                </Grid>
                <Grid md={9} xs={12}>
                    <Outlet />
                </Grid>
                <Grid md={12}>
                    <Footer />
                </Grid>
            </Grid>
            </Container>
        </>
    )
}

export default Layout;