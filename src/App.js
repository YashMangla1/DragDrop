import React, { Component } from 'react';
import './App.css';
import ListTodos from './ListTodos';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from './event-utils'

document.addEventListener('DOMContentLoaded', function() {
  let draggableEl = document.getElementById('left-container');

  new Draggable(draggableEl, {
    itemSelector: '.dragable_item'
  });
});


library.add(faTrash);
library.add(faEdit);
library.add(faCheck);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [{ namme:"test-todo", key: Date.now(), isEditable: false }]
    }
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  addTodo(e) {
    e.preventDefault();
    const newTodo = {
      namme: e.target.getElementsByClassName("text_field")[0].value,
      key: Date.now(),
      isEditable: false
    };
    if (newTodo.namme !== "") {
      const newtodos = [...this.state.todos, newTodo];
      this.setState({
        todos: newtodos
      })
    }
  }

  deleteTodo(key) {
    const filteredTodo = this.state.todos.filter(item =>
      item.key !== key);
    this.setState({
      todos: filteredTodo
    })

  }

  editTodo(key) {
    const newTodo = this.state.todos.filter(item => item.key === key)[0];
    newTodo.isEditable = true;
    if (newTodo.namme !== "") {
      const finalTodo = this.state.todos.filter(item => item.key !== key);
      finalTodo.push( newTodo )
      this.setState({
        todos: finalTodo
      })
    }

  }

  editHandler(e){
    e.preventDefault();
    const key = Number( e.target.getElementsByClassName("key")[0].value )
    const newTodo = this.state.todos.filter(item => item.key === key)[0];
    newTodo.namme = e.target.getElementsByClassName("edit_field")[0].value;
    newTodo.isEditable = false;
    if (newTodo.namme !== "") {
      const finalTodo = this.state.todos.filter(item => item.key !== key);
      finalTodo.push( newTodo )
      this.setState({
        todos: finalTodo
      })
    }
  }

  handleEventClick(e){
    console.log(e);
  }

  render() {

    return (
      <div className='App'>

        <div id="left-container">
          <header>
            <form id="toDo" onSubmit={this.addTodo} >
              <input type="text" className="text_field" placeholder="New ToDo"/>
              <button type="submit">Add</button>
            </form>
          </header>

          <ListTodos todos={this.state.todos}
            deleteTodo={this.deleteTodo}
            editTodo={this.editTodo}
            droppable={true}
            editHandler={this.editHandler}
          ></ListTodos>
        </div>


        <div id="right-container">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            droppable={true}
            drop={(info)=> { this.deleteTodo( Number(info.draggedEl.dataset.key) ) }}
            // weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS}
            // select={this.handleDateSelect}
            // eventContent={renderEventContent}
            eventClick={this.handleEventClick}
            // eventsSet={this.handleEvents}
          />
        </div>
      </div> 
    );
  }
}

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   )
// }


export default App;
