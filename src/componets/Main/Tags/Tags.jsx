import * as React from 'react';
import { useAuth } from "../../hook/useAuth";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import { padding } from '@mui/system';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTodo, removeTodo } from '../../../store/todoSlice';

const TagsBoxItem = (props: { tags: string, type_button: string }) => {

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                width: 300,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                bgcolor: 'background.paper',
                color: 'inherit',
                margin: 1
            }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 150, bgcolor: 'background.paper', color: 'inherit', fontSize: 20, fontFamily: 'Roboto' }}>
                    {props.tags}
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 150, bgcolor: 'background.paper', color: 'blue' }}>
                    <Button>{props.type_button}</Button>
                </Box>
            </Box>
        </>
    )
}


export default function Tags() {
    const todos = useSelector(state => state.todos.todos)
    const dispatch = useDispatch()
    const text = "TEXT"

    const addTask = () => dispatch(addTodo({text}))
    const remove = () => dispatch(removeTodo({text}))

    console.log(todos)
    return (
        <Box sx={{ border: "solid", borderColor: "LightGray", borderWidth: 1, borderRadius: 2 }}>
            <h3>Теги</h3>
            <Button onClick={addTask}>ТЕСТ</Button>
            <Button onClick={remove}>Удалить</Button>
            <TagsBoxItem tags="sleep" type_button="Удалить" />
            <TagsBoxItem tags="обед" type_button="Удалить" />
            <TagsBoxItem tags="обед" type_button="Добавить" />
        </Box>
    );
}