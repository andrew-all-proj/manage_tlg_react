import React from 'react';
import Box from '@mui/material/Box';
import { get_list_tags, add_tag, remove_tag, update_tag, IListTags } from '../../../api/tags'
import { useState, useEffect } from "react";
import SelectChannel from '../../service/SelectChannel'
import { AlertInfo } from '../../service/AlertInfo';
import { AddItemTag } from './AddItemTag'
import { TagsBoxItem } from './TagsBoxItem'


const Tags: React.FC = () => {
  const [idChannel, setIdChannel] = useState<null | number>(null);
  const [listTags, setListTags] = useState<IListTags | null>(null);
  const [nameNewTags, setNameNewTag] = useState<string>('');
  const [tagIdRemove, setTagIdremove] = useState<null | number>(null);
  const [tagIdUpdate, setTagIdUpdate] = useState<null | number>(null);
  const [updateNameTag, setUpdateNameTag] = useState<string>('');
  const [showAlert, setAlertShow] = useState({ show: false, msgInfo: '', severity: "error" })

  useEffect(() => {
    //get list tag
    if (idChannel) {
      getListTags()
    }
  }, [idChannel]);

  useEffect(() => {
    //add tag
    if (nameNewTags && idChannel) {
      add_tag(idChannel, nameNewTags.trim()).
        then((data) => {
          if (data.error) return setAlertShow({ show: true, msgInfo: "Такой тэг уже есть", severity: "error" })
          setNameNewTag('')
          getListTags()
        })
    }
  }, [nameNewTags]);


  useEffect(() => {
    //remove tag
    if (tagIdRemove) {
      remove_tag(tagIdRemove).
        then((data) => {
          if (data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
          getListTags()
        })

    }
  }, [tagIdRemove]);


  useEffect(() => {
    //update tag
    if (tagIdUpdate && updateNameTag) {
      update_tag(tagIdUpdate, updateNameTag).
        then((data) => {
          if (data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
          getListTags()
        })

    }
  }, [updateNameTag]);


  const getListTags = () => {
    //get list tag for channel
    if (idChannel) {
      get_list_tags(idChannel).
        then((data) => {
          if (data.error) return setAlertShow({ show: true, msgInfo: data.msg, severity: "error" })
          setListTags(data)
        })
    }
  }

  return (
    <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2 }}>
      <h3>Метки</h3>
      <Box sx={{ maxWidth: "400px", margin: 1 }}>
        <SelectChannel setIdChannel={setIdChannel} channel={idChannel} />
      </Box>
      <AlertInfo showAlert={showAlert.show} setAlertShow={setAlertShow} severity={showAlert.severity} value={showAlert.msgInfo} />
      {listTags && <AddItemTag setTextTag={setNameNewTag} />}
      {Array.isArray(listTags) &&
        listTags.map((tag) =>
          <TagsBoxItem key={tag.id_tag} id_tag={tag.id_tag} setTagIdUpdate={setTagIdUpdate} tag_name={tag.tag_name} setTagIdremove={setTagIdremove} setUpdateNameTag={setUpdateNameTag} />)
      }
    </Box>
  )
}

export default Tags;
