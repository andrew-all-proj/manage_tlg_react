import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import { useState, useEffect } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import IconButton from '@mui/material/IconButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const PostTextInput = ({textPost, setTextPost}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const setEmoji = (emojiData, event) => {
        setTextPost(textPost + emojiData.emoji)
    }

    const showEmoji = () => {
        if (showEmojiPicker) return setShowEmojiPicker(false)
        if (!showEmojiPicker) return setShowEmojiPicker(true)
    }
    
    return(
    <Card sx={{ maxWidth: 345, minHeight: 100}}>
        <TextField
            onChange={(event) => setTextPost(event.target.value)}
            value={textPost}
            fullWidth
            multiline
            minRows={15}
            maxRows={30}
        />
        <IconButton aria-label="delete" onClick={showEmoji}>
            <InsertEmoticonIcon color="primary" fontSize="large"/>
        </IconButton>
        {showEmojiPicker && <EmojiPicker onEmojiClick={setEmoji} />}
    </Card>
)}

export default PostTextInput;