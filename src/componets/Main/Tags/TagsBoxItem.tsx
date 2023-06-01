import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from "react";
import { TextChangeDoubleClick } from '../../service/TextChangeDoubleClick'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';


interface TagsBoxItemProps {
  tag_name: string;
  id_tag: number;
  setTagIdUpdate: (id: number) => void;
  setTagIdremove: (id: number) => void;
  setUpdateNameTag: (id: string) => void;
}

export const TagsBoxItem: React.FC<TagsBoxItemProps> = ({ tag_name, id_tag, setTagIdUpdate, setTagIdremove, setUpdateNameTag }) => {
  const [inputText, setInputText] = useState(true);

  const removeTag = (id: number) => {
    console.log(id)
    setTagIdremove(id)
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
          <TextChangeDoubleClick inputData={tag_name}
          setInputData={setUpdateNameTag}
          id={id_tag} getId={setTagIdUpdate}
          inputText={inputText} setInputText={setInputText} label={undefined} />
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 50, bgcolor: 'background.paper', color: 'blue' }}>
          <IconButton key={id_tag} onClick={() => { setInputText(false) }} aria-label="delete" size="large">
            <BorderColorIcon fontSize="medium" color="primary" />
          </IconButton>
          <IconButton key={id_tag} onClick={() => { removeTag(id_tag) }} aria-label="delete" size="large">
            <DeleteIcon fontSize="medium" color="primary" />
          </IconButton>
        </Box>
      </Box>
    </>
  )
}
