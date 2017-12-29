import fetch from 'cross-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(category) {
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
    posts: json.data.children.map(child => child.data),
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

    dispatch(requestPosts(category))

    return fetch(`${url}/${category}/posts`,{headers})
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receivePosts(category, json))
      )
  }
}