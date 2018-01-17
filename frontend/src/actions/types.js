export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}
/*
export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY'
export function invalidateCategory(category) {
  return {
    type: INVALIDATE_CATEGORY,
    category
  }
}
*/
export const LOADING_POSTS = 'LOADING_POSTS'
export function loadingPosts(bool=false) {
  return {
    type: LOADING_POSTS,
    bool
  }
}

export const CREAT_USER = 'CREAT_USER'
export function creatUser(name = 'Anonymous') {
  return {
    type: CREAT_USER,
    name
  }
}
/*
export const LOAD_COMMENTARIES = 'LOAD_COMMENTARIES'
export function loadCommentaries(commentaries,postID) {
  return {
    type: LOAD_COMMENTARIES,
    postID,
    commentaries
  }
}
*/
export const ADD_COMMENTARY = 'ADD_COMMENTARY'
export function addCommentary(commentary,postID) {
  //body,author,id
  //const commentary = {body,author,postID}
  return {
    type: ADD_COMMENTARY,
    postID,
    commentary
  }
}