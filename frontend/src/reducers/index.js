import {
  SELECT_CATEGORY,
  RECEIVE_ALL_POSTS, REQUEST_ALL_POSTS, LOADING_POSTS,
  CREAT_USER
} from '../actions'

import { combineReducers } from 'redux'

function selectedCategory(state = 'all', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

function post(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
    case REQUEST_ALL_POSTS:
      return {
              ...state,
              all : action.posts ? action.posts.sort(CompareForSort) : action.posts
            }
    case LOADING_POSTS:
      console.log("antes",state)
      return {
        ...state,
        loadingPosts:action.bool
      }
    default:
      return state
  }
}
const CompareForSort = (f, s) =>  ((f.timestamp === s.timestamp) ? 0 : (f.timestamp>s.timestamp) ? -1 : 1)  

function user(state = {name:''}, action){
  switch(action.type){
    case CREAT_USER:
    const name = action.name
      return { name }
    default:
      return state
  }
}


const rootReducer = combineReducers({
  selectedCategory,
  post,
  user
})

export default rootReducer