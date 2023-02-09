import { AlertInfo } from '../service/AlertInfo';
import { Card } from '@mui/material';
import SelectChannel from './SelectChannel'
import ComponentDateTimePicker from '../service/DataTime';
import Button from '@mui/material/Button';

export const BlockTimePublish = ({setIdChannel, idChannel, datePublishPost, 
    setDatePublishPost, dateRemovePost, setDateRemovePost, showAlertPublish, 
    setAlertPublish, changePublishPost, idEvent, publishPost, ...props }) => {

    return (
        <Card sx={{ maxWidth: 345, p: 1 }}>
            <SelectChannel setIdChannel={setIdChannel} channel={idChannel} />
            <ComponentDateTimePicker sx={{ margin: 2 }} datePublishPost={datePublishPost}
                setDatePublishPosts={setDatePublishPost}
                dateRemovePost={dateRemovePost}
                setDateRemovePost={setDateRemovePost} />

            <AlertInfo showAlert={showAlertPublish.show} setAlertShow={setAlertPublish} severity={showAlertPublish.severity} value={showAlertPublish.msgInfo} />
            <Button variant="contained" onClick={publishPost}
                sx={{ margin: 1, width: "155px" }}>Опубликовать</Button>
            {idEvent && <Button variant="contained" onClick={changePublishPost}
                sx={{ margin: 1, width: "155px" }}>Изменить</Button>}
        </Card>
    )
}