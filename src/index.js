import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from './event-utils'

var containerEl = document.getElementById('left-container');

new Draggable(containerEl, {
  itemSelector: '.fc-event',
  eventData: function (eventEl) {
    return {
      title: eventEl.innerText
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
