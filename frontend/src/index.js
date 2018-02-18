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
import { BrowserRouter, Route } from 'react-router-dom'

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunkMiddleware)
));

//if (store.getState().user.name == ''){
//.dispatch(checkUser())
store
  .dispatch(fetchAllPosts())
  .then(() => console.log(store.getState()))

ReactDOM.render(
<Provider store={store}> 
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();