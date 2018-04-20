import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/App';
import registerServiceWorker from './js/registerServiceWorker';

// Renders the App component, found in App.js, in the element with id "root"
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
