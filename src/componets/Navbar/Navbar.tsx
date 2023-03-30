import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import { Link, NavLink } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import TagIcon from '@mui/icons-material/Tag';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';



export default function Navbar() {
    return (
        <Paper sx={{ minWidth: '100%'}}>
            <MenuList>
                <NavLink to="/createpost" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <MenuItem>
                    <ListItemIcon>
                        <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        Создать пост
                    </ListItemText>
                </MenuItem>
                </NavLink>
                <NavLink to="/savedposts" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <MenuItem>
                    <ListItemIcon>
                        <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                            Сохраненые посты
                    </ListItemText>
                </MenuItem>
                </NavLink>
                <NavLink to="/schedule_channel" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <MenuItem>
                    <ListItemIcon>
                        <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                            Расписание канала
                    </ListItemText>
                </MenuItem>
                </NavLink>
                <NavLink to="/createschedule" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <MenuItem>
                    <ListItemIcon>
                        <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText> 
                        Создать расписание  
                    </ListItemText>
                </MenuItem>
                </NavLink> 
                <NavLink to="/addmedia" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <MenuItem>
                    <ListItemIcon>
                        <AddPhotoAlternateIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        Добавить медиа 
                    </ListItemText>
                </MenuItem>
                </NavLink>
                <NavLink to="/addmedia" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <MenuItem>
                    <ListItemIcon>
                        <DocumentScannerIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        Шаблоны постов
                    </ListItemText>
                </MenuItem>
                </NavLink>     
                <NavLink to="/channels" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <MenuItem>
                    <ListItemIcon>
                        <PlaylistAddIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        Мои каналы
                    </ListItemText>
                </MenuItem>
                </NavLink>
                <Divider />
                <NavLink to="/tags" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <MenuItem>
                    <ListItemIcon>
                        <TagIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        Метки
                    </ListItemText>
                </MenuItem>
                </NavLink>
                <NavLink to="/settings" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <MenuItem>
                    <ListItemIcon>
                        <ManageAccountsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Настройки</ListItemText>
                </MenuItem>
                </NavLink>
            </MenuList>
        </Paper>
    );
}