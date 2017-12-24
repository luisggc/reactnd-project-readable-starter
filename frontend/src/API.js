
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


/*
const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)
*/