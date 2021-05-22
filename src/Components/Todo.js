import React from 'react'

export default function Todo(props) {

    function toggleCheckbox(){
        props.todoChangeHandler(props.todo.id)
    }
    
    return (
        <div>
            <label>
                <input type="checkbox" checked={props.todo.complete} onChange={toggleCheckbox}/>
                <span id={props.todo.id}>{props.todo.todoname}</span>
            </label>
        </div>
    )
}
