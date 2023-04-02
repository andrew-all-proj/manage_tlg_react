import {createSlice} from '@reduxjs/toolkit';


const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos:[]
    },
    reducers:{
        addTodo(state, action){
            state.todos.push({
                key: new Date().toISOString(),
                text: action.payload.text
            })
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        }
    }
})

export const {addTodo, removeTodo} = todoSlice.actions

export default todoSlice.reducer;