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



export default function Navbar() {
    return (
        <Paper sx={{ minWidth: '100%', height: 800}}>
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                    <NavLink to="/createpost" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        Создать пост
                    </NavLink>
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        <Link to="/savedposts" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                            Сохраненые посты
                        </Link>
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        <Link to="/savedposts" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                            Расписание канала
                        </Link>
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText> 
                    <NavLink to="/createschedule" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        Создать расписание
                    </NavLink>   
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                    <NavLink to="/addmedia" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        Добавить медиа
                    </NavLink>    
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                    <NavLink to="/channels" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        Мои каналы
                    </NavLink> 
                    </ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                    <NavLink to="/tags" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        Метки
                    </NavLink> 
                    </ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Добавить медиа</ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}