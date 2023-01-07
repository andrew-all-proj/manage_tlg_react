import { useState, useEffect, useRef } from "react";
import React from 'react';
import { ITodo } from "../types/types"
import { TodoList } from './TodoList';

const TodoImput: React.FC = () => {
    const [value, setValue] = useState("")
    const [toDos, setTodos] = useState<ITodo[]>([])

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
    }

    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter"){
            addTodos()
        }
    }

    const addTodos = () => {
        setTodos([...toDos, {
            id: Date.now(),
            title: value,
            complete: false
        }])
        setValue('')
    }

    const addTodo = () => {

    }

    const removeTodo = (id: number): void => {
        console.log(id)
        setTodos(toDos.filter(toDo => toDo.id !== id))
    }

    const toggleTodo = (id: number): void => {
        setTodos(toDos.map(toDo => {
            if (toDo.id !== id) return toDo;

            return {
                ...toDo, 
                complete: !toDo.complete
            }    
        }))
    }

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [])

    return (<div>
        <div>
            <input value={value} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef}/>
            <button onClick={addTodos}>Кнопка</button>
        </div>
            <TodoList items={toDos} removeTodo={removeTodo} toggleTodo={toggleTodo}/>
        </div>
    )
}

export default TodoImput;