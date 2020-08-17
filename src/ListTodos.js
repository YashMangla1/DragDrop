import React from 'react';
import './ListTodos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ListTodos(props) {
    const todos = props.todos;
    const listTodos = todos.map(item => {
        return <div className="list fc-event" key={item.key}>
            <p>
                {/* <div id='draggable-el' data-event='{ "title": "my event", "duration": "02:00" }'>drag me</div> */}
                {/* <p class='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
                <div class='fc-event-main'>{item.namme}</div> */}
                <span>
                    <FontAwesomeIcon className="faIcons " icon="edit"
                        onClick={() => props.editTodo(item.key)} />

                    <FontAwesomeIcon className="faIcons" icon="trash"
                        onClick={() => props.deleteTodo(item.key)} />
                </span>

            </p>
            {/* <p>
                            </p> */}

        </div >
    })
    return (
        <div>{listTodos}</div>
    )
}

export default ListTodos;