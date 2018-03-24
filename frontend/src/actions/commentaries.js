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

export const DELETE_COMMENTARY = 'DELETE_COMMENTARY'
export function deleteCommentary(id, postID) {
    return function(dispatch){
        console.log(id,postID)
        return fetch(`${url}/comments/${id}`, {
            method: 'DELETE',
            headers
          }).then(response => response.json())
          .then(json => dispatch({
            type: DELETE_COMMENTARY,
            commentaryID:id,
            postID:postID,
            receivedAt: Date.now()
          })
        )
    }
}



export const MODIFY_COMMENTARY= 'MODIFY_COMMENTARY'
function modifyCommentary(commentary) {
  return {
    type: MODIFY_COMMENTARY,
    commentary,
    receivedAt: Date.now()
  }
}

export function voteCommentary(id, option, parentID) {

    return function (dispatch) {
      return fetch(`${url}/comments/${id}`, {
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
        .then(json => dispatch(modifyCommentary({...json,parentID})))
    }
  }

/*
export const voteCommentary = (id, option) =>
fetch(`${url}/comments/${id}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({option})
}).then(data => console.log(data))*/