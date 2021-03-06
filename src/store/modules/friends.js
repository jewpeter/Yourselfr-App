import { createAction, handleActions } from 'redux-actions'
import { config } from '../config.js'

const LOAD_FRIENDS = 'LOAD_FRIENDS'
export const loadFriends = () => {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      fetch(`${config.http}/api/users/friends`, { credentials: 'include' })
        .then((r) => r.json())
        .then((res) => {
          console.log(res)
          dispatch(createAction(LOAD_FRIENDS)(res))
          resolve()
        })
    })
  }
}

export const actions = {
  loadFriends
}

export default handleActions({
  [LOAD_FRIENDS]: (state, { payload }) => {
    return [...payload]
  }
}, [])
