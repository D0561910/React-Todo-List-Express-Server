// Import dependencies
import * as React from 'react';

// Import interfaces
import { TodoItemInterface } from './../interfaces';

// TodoItem component
const TodoItem = (props: TodoItemInterface) => {

    return (
        <div className='todo-item'>
            <div onClick={() => props.handleTodoComplete(props.todo.id)}>
                {props.todo.done ? (
                    <span className="todo-item-checked">✔</span>
                ) : (
                        <span className="todo-item-unchecked" />
                    )}
            </div>
            <div className="todo-item-input-wrapper">
                <input
                    value={props.todo.task}
                    onBlur={props.handleTodoBlur}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.todo.id)}
                />
            </div>
            <div className="item-remove" onClick={() => props.handleTodoRemove(props.todo.id)}>
                ⨯
      </div>
        </div>
    )
}

export default TodoItem;
