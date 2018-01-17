import fetch from 'cross-fetch'
import { loadingPosts } from './types'

const url = process.env.REACT_APP_BACKEND
const auth = 10

const headers = {
  'Accept': 'application/json',
  'Authorization': auth
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
        dispatch(receiveAllPosts(json)),
        dispatch(loadingPosts(false))
      )
  }
}


export const RECEIVE_COMMENTARIES = 'RECEIVE_COMMENTARIES'
function receiveCommentaries(commentaries,postID) {
  return {
    type: RECEIVE_COMMENTARIES,
    commentaries,
    postID
  }
}

export function fetchCommentaries(postID) {
  return function (dispatch) {
    return fetch(`${url}/posts/${postID}/comments`,{headers})
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(commentaries =>
        dispatch(receiveCommentaries(commentaries,postID))
      )
  }
}