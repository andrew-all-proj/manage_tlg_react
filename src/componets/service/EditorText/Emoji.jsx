import IconButton from '@mui/material/IconButton';
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState, useEffect, useMemo, useCallback } from "react";
import {$getSelection} from 'lexical';


export const Emoji = () => {
    const [editor] = useLexicalComposerContext();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const setEmoji = (emojiData, event) => {
        editor.update(() => {
            const selection = $getSelection();
            if (selection) {
                selection.insertText(emojiData.emoji);
            }
        });
    }

    const showEmoji = () => {
        if (showEmojiPicker) return setShowEmojiPicker(false)
        if (!showEmojiPicker) return setShowEmojiPicker(true)
    }

    return (
        <>
            <IconButton aria-label="delete" onClick={showEmoji}>
                <InsertEmoticonIcon color="primary" fontSize="large" />
            </IconButton>
            {showEmojiPicker && <EmojiPicker onEmojiClick={setEmoji} />}
        </>
    )
}