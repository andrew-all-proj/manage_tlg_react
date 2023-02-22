import * as React from 'react';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';


const PhotoInput = (props) => {
    return(
        <Card sx={{ maxWidth: 345, minHeight: 100}}>
        {props.selectedImage && (
            <div>
                <img alt="not fount" width={"350px"} src={URL.createObjectURL(props.selectedImage)} />
            </div>
        )}
        <Button variant="contained" component="label" sx={{ margin: 1, width: "155px" }}>
            Загрузить
            <input
                hidden
                type="file"
                name="myImage"
                onChange={props.selectMedia}
            />
        </Button>
        <Button onClick={props.deleteMedia} 
        variant="contained" component="label" sx={{ margin: 1, width: "155px"}}>Удалить</Button>
    </Card>
)}

export default PhotoInput;