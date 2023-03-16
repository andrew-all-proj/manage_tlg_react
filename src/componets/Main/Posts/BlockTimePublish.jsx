import { AlertInfo } from '../../service/AlertInfo';
import { Card } from '@mui/material';
import SelectChannel from '../../service/SelectChannel'
import ComponentDateTimePicker from '../../service/DataTime';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SelectTags from '../../service/TagsForm'

export const BlockTimePublish = ({setIdChannel, idChannel, datePublishPost, 
    setDatePublishPost, dateRemovePost, setDateRemovePost, showAlertPublish, 
    setAlertPublish, changePublishPost, idEvent, publishPost, selectedTag, setSelectedTag, ...props }) => {

    return (
        <Card sx={{ maxWidth: 450, p: 1 }}>
            <SelectChannel setIdChannel={setIdChannel} channel={idChannel} />
            <SelectTags selectedTag={selectedTag} setSelectedTag={setSelectedTag} idChannel={idChannel}/>
            <ComponentDateTimePicker sx={{ margin: 2 }} datePublishPost={datePublishPost}
                setDatePublishPosts={setDatePublishPost}
                dateRemovePost={dateRemovePost}
                setDateRemovePost={setDateRemovePost} />

            <AlertInfo showAlert={showAlertPublish.show} setAlertShow={setAlertPublish} 
                        severity={showAlertPublish.severity} value={showAlertPublish.msgInfo} />
            <Stack direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{ width: "330px" }}>
                <Button variant="contained" onClick={publishPost}
                    sx={{ margin: 1, width: "130px" }}>Опубликовать</Button>
                {idEvent && <Button variant="contained" onClick={changePublishPost}
                    sx={{ margin: 1, width: "130px" }}>Изменить</Button>}
            </Stack>
        </Card>
    )
}