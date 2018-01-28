import {url, headers} from './API'
import { loadingPosts } from './types'
import fetch from 'cross-fetch'

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

export const MODIFY_POST = 'MODIFY_POST'
function modifyPost(post) {
  return {
    type: MODIFY_POST,
    post,
    receivedAt: Date.now()
  }
}

export function votePost(id, option) {

    return function (dispatch) {
      return fetch(`${url}/posts/${id}`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({option})
      })
        .then(
          response => response.json(),
          error => console.log('An error occurred.', error)
        )
        .then(json => dispatch(modifyPost(json)))
    }
  }

export const DELETE_POST = 'DELETE_POST'
export function deletePost(id) {
    return function(dispatch){
        console.log(id)
        return fetch(`${url}/posts/${id}`, {
            method: 'DELETE',
            headers
          }).then(response => response.json())
          .then(json => dispatch({
            type: DELETE_POST,
            postID:json.id,
            receivedAt: Date.now()
          })
        )
    }
}
/*
export const DELETE_POST = 'DELETE_POST'

export function deletePost(id) {
    return function(dispatch){
        return fetch(`${url}/posts/${id}`, {
            method: 'DELETE',
            headers
          }).then(response => response.json())
          .then(json => dispatch({
            type: DELETE_POST,
            postID:json.id,
            receivedAt: Date.now()
          }))
    }
}*/