export const url = process.env.REACT_APP_BACKEND
export const auth = 10

export const headers = {
  'Accept': 'application/json',
  'Authorization': auth
}

export function time_id(){
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

