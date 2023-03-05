import { Button, Card, Stack } from "@mui/material"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import ImputEmoji from "./ImputEmoji"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

const EditText: React.FC = () => {
    return (
        <>
        <Card sx={{ maxWidth: 345, minHeight: 300 }}>
            <TextField
                placeholder="Текст поста"
                fullWidth
                multiline
                minRows={5}
                maxRows={15}
            />
            <Button variant="contained" sx={{ margin: 1 }} >Сохранить</Button>
            
        </Card>
        <Emoji />
        </>
    )
}



function Emoji() {
    console.log(111111)
    return (
        <div>
            <EmojiPicker />
        </div>
    );
}

export default EditText;