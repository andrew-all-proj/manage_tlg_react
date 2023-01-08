import styled from "@emotion/styled";
import { Button, Card, Chip, Paper, Stack } from "@mui/material"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"


const TagsForm: React.FC = () => {
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <Card sx={{ maxWidth: 345, minHeight: 300}}>
            <Stack direction="row" spacing={1}>
                <Chip label="Cats" onClick={handleClick} />
                <Chip label="Good morning" onClick={handleClick} />
                <Chip label="Обед" onClick={handleClick} />
            </Stack>
        </Card>
    )
}

export default TagsForm;