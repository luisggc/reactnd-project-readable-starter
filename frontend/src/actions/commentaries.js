import {url, headers, time_id} from './API'
import fetch from 'cross-fetch'

export const RECEIVE_COMMENTARIES = 'RECEIVE_COMMENTARIES'
function receiveCommentaries(commentaries,postID) {
  return {
    type: RECEIVE_COMMENTARIES,
    commentaries,
    postID
  }
}

export function fetchCommentaries(parentId) {
  return function (dispatch) {
    return fetch(`${url}/posts/${parentId}/comments`,{headers})
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(commentaries =>
        dispatch(receiveCommentaries(commentaries,parentId))
      )
  }
}

export function addCommentaries(body,author,parentId) {
  return function (dispatch) {
    return fetch(`${url}/comments`,{
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...time_id(),
        body,
        author,
        parentId
      })})
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(commentaries =>
        dispatch(receiveCommentaries(commentaries,parentId))
      )
  }
}