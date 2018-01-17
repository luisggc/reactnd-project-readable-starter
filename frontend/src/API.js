//import fetch from 'cross-fetch'
const url = process.env.REACT_APP_BACKEND
const auth = 10

const headers = {
  'Accept': 'application/json',
  'Authorization': auth
}

/* Categories */

export const getCategories = () =>
    fetch(url+"/categories",{headers})
    .then(data => data.json())
    .then(data => data.categories)

/* Posts */

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
  body: JSON.stringify({
    ...form,
    ...time_id()
  })

}).then(data => console.log(data.json()))

export const deletePost = (id) =>
fetch(`${url}/posts/${id}`, {
  method: 'DELETE',
  headers
}).then(data => console.log(data))

export const votePost = (id, option) =>
fetch(`${url}/posts/${id}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({option})
}).then(data => console.log(data))

/* Commentaries */

export const getCommentaries = (id) =>
fetch(`${url}/posts/${id}/comments`, {headers})
.then(data => data.json())
/*
  fetch(url+"/categories",{headers})
  .then(data => data.json())
*/

export const sendCommentary = (body,author,parentId) =>
fetch(`${url}/comments`, {
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
  })

}).then(data => data.json())

export const voteCommentary = (id, option) =>
fetch(`${url}/comments/${id}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({option})
}).then(data => console.log(data))


/*Variaty*/

function time_id(){
  return {
    id:guid(),
    timestamp:Date.now()
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4() + 
    s4() + s4() + s4() + s4();
}

export function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  return date + ', ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  
}

