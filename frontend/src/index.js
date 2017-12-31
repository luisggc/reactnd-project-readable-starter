import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css'
import { fetchAllPosts } from './actions'
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunkMiddleware)
));

store
  .dispatch(fetchAllPosts())
  //.then(() => console.log(store.getState()))

ReactDOM.render(
<Provider store={store}> 
    <App/>
</Provider>, document.getElementById('root'));
registerServiceWorker();