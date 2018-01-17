import {
  SELECT_CATEGORY,
  RECEIVE_ALL_POSTS, REQUEST_ALL_POSTS, LOADING_POSTS,
  CREAT_USER,
  ADD_COMMENTARY, RECEIVE_COMMENTARIES
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
  const {postID, commentaries, commentary} = action
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
    case RECEIVE_COMMENTARIES:
        const load_commentaries = state.all.map(c => {
          (c.id === postID) && (c.commentaries=commentaries)
          return c
        })
        return {...state,all:load_commentaries}
    case ADD_COMMENTARY:
        const add_commentary = state.all.map(c => {
          console.log(c)
          console.log(c.commentaries)
         if (c.id === postID) c.commentaries.push(commentary)
         return c
        })
        return {...state,all:add_commentary}
    default:
      return state
  }
}

const CompareForSort = (f, s) =>  ((f.timestamp === s.timestamp) ? 0 : (f.timestamp>s.timestamp) ? -1 : 1)  

function user(state = {name:''}, action){
  switch(action.type){
    case CREAT_USER:
    const name = action.name
    localStorage.token = name
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