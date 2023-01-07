import { ITodo } from "../types/types"
import TodoItem from "./TodoItem"

interface ITodolistProps {
    items: ITodo[]
    toggleTodo: (id: number) => void
    removeTodo: (id: number) => void
}

const TodoList: React.FC<ITodolistProps> = (props) => {
    const {items, toggleTodo, removeTodo} = props

    return <div>
        {
            props.items.map(todo => <TodoItem 
                key={todo.id}
                toggleTodo={toggleTodo}
                removeTodo={removeTodo} 
                {...todo}/>)
        }
    </div>
}

export {
    TodoList
}