import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import AddLinkIcon from '@mui/icons-material/AddLink';
import IconButton from '@mui/material/IconButton';

export default function LinkInput({ showInputLink, setShowInputLink, setInsetLink }) {
    const [textLink, setTextInputLink] = useState('');

    const handleSaveLink = () => {
        setShowInputLink(null);
        setInsetLink(textLink)
        setTextInputLink('');
    };

    const imputText = (e) => {
        setTextInputLink(e.target.value);
    }

    const handleClose = () => {
        setShowInputLink(null);
    };

    const open = Boolean(showInputLink);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box sx={{ border: 1, borderColor: '#DCDCDC', borderRadius: 2 }}>
            <Popover
                id={id}
                open={open}
                anchorEl={showInputLink}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Box sx={{ p: 1 }}>
                    <Input value={textLink} onChange={imputText} />
                    <IconButton onClick={handleSaveLink} aria-label="delete" size="large">
                        <AddLinkIcon fontSize="default" color="primary" />
                    </IconButton>
                </Box>
            </Popover>
        </Box>
    );
}