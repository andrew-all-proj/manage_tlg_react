import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';





const PostTextInput = (props) => {
    return(
    <Card sx={{ maxWidth: 345, minHeight: 100}}>
        <TextField
            onChange={(event) => props.setTextPost(event.target.value)}
            value={props.textPost}
            fullWidth
            multiline
            rows={15}
            maxRows={30}
        />
    </Card>
)}

export default PostTextInput;