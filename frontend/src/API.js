//import fetch from 'cross-fetch'
const url = process.env.REACT_APP_BACKEND
const auth = 10

const headers = {
  'Accept': 'application/json',
  'Authorization': auth
}

export const getCategories = () =>
    fetch(url+"/categories",{headers})
    .then(data => data.json())
    .then(data => data.categories)

export const getPostsbyCategory = (category) =>
  fetch(`${url}/${category}/posts`,{headers})
  .then(data => data.json())

export const getPosts = () =>
fetch(`${url}/posts`,{headers})
.then(data => data.json())

export const sendPost = (form) =>
fetch(`${url}/posts`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(form)

}).then(data => console.log(data.json()))

export const deletePost = (id) =>
fetch(`${url}/posts/${id}`, {
  method: 'DELETE',
  headers
}).then(data => console.log(data))