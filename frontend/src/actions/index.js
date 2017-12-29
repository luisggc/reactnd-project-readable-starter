export * from './types';
export * from './API';
/*
import fetch from 'cross-fetch'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}



export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPostsbyCategory(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(category, json) {
  return {
    type: RECEIVE_POSTS,
    category,
    posts: json,
    receivedAt: Date.now()
  }
}

export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY'
export function invalidateCategory(category) {
  return {
    type: INVALIDATE_CATEGORY,
    category
  }
}


const url = process.env.REACT_APP_BACKEND
const auth = 10

const headers = {
  'Accept': 'application/json',
  'Authorization': auth
}

export function fetchPosts(category) {

  return function (dispatch) {

    dispatch(requestPostsbyCategory(category))

    return fetch(`${url}/${category}/posts`,{headers})
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        //console.log('disp',json)
        dispatch(receivePosts(category, json))
      )
  }
}
*/