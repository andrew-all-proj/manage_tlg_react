import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from "react";
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const ariaLabel = { 'aria-label': 'description' };

interface AddItemTagProps {
  setTextTag: (tag: string) => void;
}

export const AddItemTag: React.FC<AddItemTagProps> = ({ setTextTag }) => {
  const [nameTag, setNameTag] = useState('');

  const imputText = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    if (nameTag.length > 35) {
      setNameTag(nameTag.substring(0, nameTag.length - 1))
    }
    else {
      setNameTag(e.target.value)
    }
  }

  const addTag = () => {
    setTextTag(nameTag.trim())
    setNameTag('')
  }

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        minWidth: 200,
        maxWidth: 400,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        bgcolor: 'background.paper',
        color: 'inherit',
        margin: 1
      }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 200, bgcolor: 'background.paper', color: 'inherit', fontSize: 20, fontFamily: 'Roboto' }}>
          <Input value={nameTag} onChange={imputText} inputProps={ariaLabel} />
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 50, bgcolor: 'background.paper', color: 'blue' }}>
          <IconButton onClick={addTag} aria-label="delete" size="large">
            <LibraryAddIcon fontSize="medium" color="primary" />
          </IconButton>
        </Box>
      </Box>
    </>
  )
}