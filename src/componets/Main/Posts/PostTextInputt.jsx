import TextField from '@mui/material/TextField';
import { Box, Card } from '@mui/material';
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import IconButton from '@mui/material/IconButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { createRoot } from 'react-dom/client';
import { stateToHTML } from 'draft-js-export-html';
import Stack from '@mui/material/Stack';
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from "react-dom";
import Input from '@mui/material/Input';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import AddLinkIcon from '@mui/icons-material/AddLink';


import { Editor, Transforms, Range } from 'slate';
import { withReact, ReactEditor } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { BoldPlugin } from '@craftjs/utils';
import { Lexical } from 'react-lexical';

const Bold = ({ attributes, children }) => {
    return <strong {...attributes}>{children}</strong>;
  };

const MyInput = ({ editorStateText, setEditorStateText }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [inputLink, setImputLink] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const onChange = (editorState) => {
        setEditorStateText(editorState);
    }


    const handleBoldClick = () => {
        //const newState = RichUtils.toggleInlineStyle(editorStateText, 'BOLD');
    }

    const handlelItalicClick = () => {
        //const newState = RichUtils.toggleInlineStyle(editorStateText, 'ITALIC');
    }


    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: 'Type here to begin editing...' }],
        },
    ]);

    const editor = withHistory(withReact(createEditor()));
    const [selection, setSelection] = useState(null);

    const handleSelect = (selection) => {
        setSelection(selection);
    };

    const handleBold = () => {
        if (selection) {
            Transforms.select(editor, selection);
            BoldPlugin.toggle(editor);
        }
    };

    const handleConvertClick = () => {
        const contentState = editorStateText.getCurrentContent();
        console.log(contentState)
        const htmlContent = stateToHTML(contentState);
        const telegramText = htmlContent.replace(/<em>(.*?)<\/em>/g, '<i>$1</i>')
            .replace(/<strong>(.*?)<\/strong>/g, '<b>$1</b>');
        const output = telegramText.replace(/<p>(.*?)<\/p>/g, '$1');
        console.log(output);
        console.log('HTML Content:', htmlContent);
    }



    const handleClickOpenInputLink = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseOrSave = () => {
        setAnchorEl(null);
    };


    // bind link    
    useEffect(() => {
        if (inputLink) {
            setImputLink(null)
            setAnchorEl(null);
        }
    }, [inputLink]);

    const handleRenderLeaf = (props) => {
        if (props.leaf.bold) {
            return <Bold {...props} />;
        }
        return <span {...props.attributes}>{props.children}</span>;
    };



    return (
        <>
            <Stack direction="row" sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2 }}>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleCloseOrSave}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <InputLink setImputLink={setImputLink} setAnchorEl={setAnchorEl} />
                </Popover>

                <IconButton aria-label="delete" onClick={handleBoldClick}>
                    <FormatBoldIcon color="primary" fontSize="large" />
                </IconButton>
                <IconButton aria-label="delete" onClick={handlelItalicClick}>
                    <FormatItalicIcon color="primary" fontSize="large" />
                </IconButton>
                <IconButton aria-describedby={id} variant="contained" onClick={handleClickOpenInputLink}>
                    <AddLinkIcon color="primary" fontSize="large" />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleConvertClick}>
                    <AddLinkIcon color="primary" fontSize="large" />
                </IconButton>

                <Lexical onSelect={handleSelect} text={Editor.string(editor, [])}>
                    <Editor
                        editor={editor}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderLeaf={handleRenderLeaf}
                    />
                </Lexical>


            </Stack>
        </>
    );
}


const InputLink = ({ setImputLink, setAnchorEl }) => {
    const [link, setLink] = useState('');

    const imputTextLink = (e) => {
        setLink(e.target.value)
    }

    const saveTextLink = () => {
        if (link) {
            setImputLink(link)
        }
    }

    return (
        <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2, m: 1 }} >
            <Input value={link} defaultValue="Hello world" onChange={imputTextLink} />
            <IconButton aria-label="delete" onClick={saveTextLink}>
                <AddLinkIcon color="primary" fontSize="large" />
            </IconButton>
        </Box>
    )
}


const PostTextInput = ({ textPost, setTextPost, editorStateText, setEditorStateText }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const setEmoji = (emojiData, event) => {
        setTextPost(textPost + emojiData.emoji)
    }

    const showEmoji = () => {
        if (showEmojiPicker) return setShowEmojiPicker(false)
        if (!showEmojiPicker) return setShowEmojiPicker(true)
    }

    return (
        <Card sx={{ maxWidth: 460, minHeight: 50 }}>
            <Box sx={{ padding: 1, fontSize: 18 }}>
                <MyInput editorStateText={editorStateText} setEditorStateText={setEditorStateText} />
            </Box>
            <IconButton aria-label="delete" onClick={showEmoji}>
                <InsertEmoticonIcon color="primary" fontSize="large" />
            </IconButton>
            {showEmojiPicker && <EmojiPicker onEmojiClick={setEmoji} />}
        </Card>
    )
}

export default PostTextInput;

