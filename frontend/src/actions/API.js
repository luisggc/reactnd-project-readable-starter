import fetch from 'cross-fetch'
import { loadingPosts } from './types'

const url = process.env.REACT_APP_BACKEND
const auth = 10

const headers = {
  'Accept': 'application/json',
  'Authorization': auth
}

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPostsbyCategory(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePostsbyCategory(category, json) {
  return {
    type: RECEIVE_POSTS,
    category,
    posts: json,
    receivedAt: Date.now()
  }
}

export function fetchPostsbyCategory(category) {

  return function (dispatch) {

    dispatch(requestPostsbyCategory(category))

    return fetch(`${url}/${category}/posts`,{headers})
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        //console.log('disp',json)
        dispatch(receivePostsbyCategory(category, json))
      )
  }
}

export const REQUEST_ALL_POSTS = 'REQUEST_ALL_POSTS'
function requestAllPosts() {
  return {
    type: REQUEST_ALL_POSTS
  }
}

export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS'
function receiveAllPosts(json) {
  return {
    type: RECEIVE_ALL_POSTS,
    posts: json,
    receivedAt: Date.now()
  }
}

export function fetchAllPosts() {

  return function (dispatch) {

    dispatch(requestAllPosts())

    return fetch(`${url}/posts`,{headers})
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error),
        dispatch(loadingPosts(true))
      )
      .then(json =>
        //console.log('disp',json)
        dispatch(receiveAllPosts(json)),
        dispatch(loadingPosts(false))
        
      )
  }
}

