import React, { Fragment } from 'react';
import './ListTodos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { INITIAL_EVENTS, createEventId } from './event-utils'

function ListTodos(props) {
    const todos = props.todos;
    const listTodos = todos.map(item => {


        if( !item.isEditable ){
            const event_element = {
                title: item.namme,
                id: createEventId()
            }
            return (
                <div className="dragable_item list rrow" data-event={ JSON.stringify(event_element) } data-key={item.key} key={item.key}>
                    <p className="text ccol-md-7">{ item.namme }</p>
                    <div className="icons ccol-md-3">
                        <span>
                            <FontAwesomeIcon className="faIcons " icon="edit"
                            onClick={() => props.editTodo(item.key)} />
                        </span>
                        <span>
                            <FontAwesomeIcon className="faIcons" icon="trash"
                                onClick={() => props.deleteTodo(item.key)} />
                        </span>
                    </div>
                </div>
            )
        } else{
            return (
                <form id="toDoEdit" className="list rrow" onSubmit={ props.editHandler } key={item.key} >
                    <input type="text" className="edit_field ccol-md-7" defaultValue={ item.namme }/>
                    <input type="hidden" className="key" value={item.key}/>
                    <div className="icons ccol-md-3">
                        <button type="submit" className="submit_edit bg-success">
                            <FontAwesomeIcon className="faIcons" icon="check" />
                        </button>
                    </div>
                </form>
            )
        }
    })
    return (
        <div>{listTodos}</div>
    )
}

export default ListTodos;