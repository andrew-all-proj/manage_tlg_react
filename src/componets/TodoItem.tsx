import { ITodo } from "../types/types"

interface ITodoItem extends ITodo {
    removeTodo: (id: number) => void
    toggleTodo: (id: number) => void
}


const TodoIteam: React.FC<ITodoItem> = (props) => {
    const {id, title, complete, toggleTodo, removeTodo} = props
    return (
        <div>
            <input type="checkbox" checked={complete} onChange={() => toggleTodo(id)}/>
            {title}
            <button onClick={() => removeTodo(id)}>Удалить</button>
        </div>
    )
}

export default TodoIteam