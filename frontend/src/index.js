import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import './styles/bootstrap.min.css'
import './styles/normalize.css'
import './styles/reset.css'
import './styles/grid.css'
import './styles/comment.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
