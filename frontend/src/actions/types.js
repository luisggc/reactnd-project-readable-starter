export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY'
export function invalidateCategory(category) {
  return {
    type: INVALIDATE_CATEGORY,
    category
  }
}

export const LOADING_POSTS = 'LOADING_POSTS'
export function loadingPosts(bool=false) {
  return {
    type: LOADING_POSTS,
    bool
  }
}