import { Button, Card, Stack } from "@mui/material"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"


const EditText: React.FC = () => {
    return (
        <Card sx={{ maxWidth: 345, minHeight: 300}}>
            <TextField
                placeholder="Текст поста"
                fullWidth
                multiline
                rows={15}
                maxRows={15}
            />
            <Button variant="contained" sx={{ margin: 1 }} >Сохранить</Button>
        </Card>
    )
}

export default EditText;