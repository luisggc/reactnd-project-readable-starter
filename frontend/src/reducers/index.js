import {
  SELECT_CATEGORY,
  RECEIVE_ALL_POSTS, REQUEST_ALL_POSTS, LOADING_POSTS, MODIFY_POST, DELETE_POST,
  CREAT_USER,
  ADD_COMMENTARY, RECEIVE_COMMENTARIES, DELETE_COMMENTARY, MODIFY_COMMENTARY,
  EDIT_TEMP
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
  const {postID, commentaries, commentary, post} = action
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
    case REQUEST_ALL_POSTS:
      return { ...state,
        all : action.posts ? action.posts.sort(CompareAntiCrono) : action.posts 
      }
    case LOADING_POSTS:
      return {...state, loadingPosts:action.bool}
    
    case MODIFY_POST:
      const modified = state.all.map(c => {
        (c.id === post.id) && (c=post)
        return c
      })
      return {...state,all:modified}
    case DELETE_POST:
      return { ...state, all:state.all.filter(p => p.id !== postID)}

    /*Commentaries*/

    case RECEIVE_COMMENTARIES:
      const load_commentaries = state.all.map(c => {
        (c.id === postID) && (c.commentaries=commentaries)
        return c
      })
      console.log(load_commentaries.sort(CompareAntiCrono))
      console.log(load_commentaries.sort(CompareCrono))
      
      return {...state,all:load_commentaries.sort(CompareAntiCrono)}
    case ADD_COMMENTARY:
        const add_commentary = state.all.map(c => {
          if(!c.commentaries) c.commentaries=[]
          if (c.id === postID) c.commentaries.push(commentary)
         return c
        })
        return {...state,all:add_commentary}
    case DELETE_COMMENTARY:
      const postdel_commentary = state.all.map(c =>{
        if (c.id === postID) c.commentaries = c.commentaries.filter(_ => _.id !== action.commentaryID)
        return c
      })
      return {...state,all:postdel_commentary}
    case MODIFY_COMMENTARY:
    commentary.parentID = commentary.parentId ? commentary.parentId  : commentary.parentID 
      const modified_commentary = state.all.map(p =>{
        if (p.id === commentary.parentID) p.commentaries = p.commentaries.map(c => c.id===commentary.id ? commentary:c)
        return p
      })
      return {...state,all:modified_commentary}
    default:
      return state
  }
}

const CompareCrono = (f, s) =>  ((f.timestamp === s.timestamp) ? 0 : (f.timestamp>s.timestamp) ? -1 : 1)  
const CompareAntiCrono = (f, s) =>  ((f.timestamp === s.timestamp) ? 0 : (f.timestamp>s.timestamp) ? 1 : -1)  


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

function editTemp(state=null, action){
  const { id, title, body, kind } = action
  switch(action.type){
    case EDIT_TEMP:
      if (id==='') return null
      return { id, title, body, kind }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedCategory,
  post,
  user,
  editTemp
})

export default rootReducer