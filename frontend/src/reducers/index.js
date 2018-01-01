
import {
 // ADD_POST, REMOVE_POST,
  SELECT_CATEGORY, INVALIDATE_CATEGORY,
  REQUEST_POSTS, RECEIVE_POSTS,
  RECEIVE_ALL_POSTS, REQUEST_ALL_POSTS, LOADING_POSTS
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


function postsByCategory(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.category]: posts(state[action.category], action)
      })
    default:
      return state
  }
}

function allPosts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
    case REQUEST_ALL_POSTS:
      //const n = posts(state, action);
      return {
              ...state,
              all:action.posts//.sort(CompareForSort)
            }
    default:
      return state
  }
}

function loadingPosts(state = {}, action) {
  switch (action.type) {
    case LOADING_POSTS:
    console.log("antes",state)
      //state['loadingPosts'] = action.bool
      return action.bool
      ///state['loadingPosts'] = action.bool
    default:
      return state
  }
}

const CompareForSort = (f, s) =>  ((f === s) ? 0 : (f<s) ? -1 : 1)  


function posts(
                  state = {
                    isFetching: false,
                    didInvalidate: false,
                    items: []
                  },
                  action
) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    case REQUEST_ALL_POSTS:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    })
    case RECEIVE_ALL_POSTS:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.posts,
      lastUpdated: action.receivedAt
    })
    default:
      return state
  }
}


const rootReducer = combineReducers({
  postsByCategory,
  selectedCategory,
  allPosts,
  loadingPosts
})

export default rootReducer