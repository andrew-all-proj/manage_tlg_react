import styled from "@emotion/styled";
import { Button, Card, CardContent, CardMedia, Chip, Paper, Stack } from "@mui/material"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import example_images from "../../assets/images/example.jpg"


const FotoCard: React.FC = () => {
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <Card sx={{ maxWidth: 345, minHeight: 100}}>
            <CardMedia
                component="img"
                image={example_images}
                alt="Paella dish"
                sx={{ marginBottom: 1 }}
            />
            <Button variant="contained" component="label" sx={{ margin: 1 }}>
                Загрузить
                <input hidden accept="image/*" multiple type="file" />
            </Button>
        </Card>
    )
}

export default FotoCard;