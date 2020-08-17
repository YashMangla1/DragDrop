import React, { Component } from 'react';
import './App.css';
import ListTodos from './ListTodos';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'


library.add(faTrash);
library.add(faEdit);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: ["test-todo"],
      currentTodo: {
        namme: '',
        key: '',
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
  }

  handleInput(t) {
    this.setState({
      currentTodo: {
        namme: t.target.value,
        key: Date.now()
      }
    })
  }
  // componentDidMount() {
  //   var containerEl = document.getElementById('external-events');

  //   new Draggable(containerEl, {
  //     itemSelector: '.fc-event',
  //     eventData: function (eventEl) {
  //       return {
  //         title: eventEl.innerText
  //       };
  //     }
  //   });

  // }
  // componentDidUpdate() {
  // var containerEl = document.getElementById('external-events');


  //  new Draggable(draggableEl); {

  //   }


  addTodo(t) {
    t.preventDefault();
    const newTodo = this.state.currentTodo;
    if (newTodo.namme !== "") {
      const newtodos = [...this.state.todos, newTodo];
      this.setState({
        todos: newtodos,
        currentTodo: {
          namme: '',
          key: ''
        }
      }

      )
    }
  } // let draggableEl = document.getElementById('mydraggable');


  deleteTodo(key) {
    const filteredTodo = this.state.todos.filter(item =>
      item.key !== key);
    this.setState({
      todos: filteredTodo
    })

  }

  editTodo(key) {
    console.log(key);

    // const filteredTodo = this.state.todos.filter(item =>
    //   item.key !== key);

  }

  render() {
    // console.log(this.state)

    return (
      <div className='App'>

        <div id="left-container">
          <header>
            <form id="toDo" onSubmit={this.addTodo} >
              <input type="text" placeholder="New ToDo"
                value={this.state.currentTodo.namme}
                onChange={this.handleInput} />
              <button type="submit">Add</button>

            </form>
          </header>

          <ListTodos todos={this.state.todos}
            deleteTodo={this.deleteTodo}
            editTodo={this.editTodo}
            droppable={true}
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
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS}
            select={this.handleDateSelect}
            eventContent={renderEventContent}
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents}

          />

        </div>
      </div>
    );
  }
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default App;
