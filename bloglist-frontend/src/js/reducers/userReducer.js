import userService from '../../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}


// export const login = (user) => {
//   return async dispatch => {
//     dispatch({
//       type: 'SET_USER',
//       data: {
//         user
//       }
//     })
//   }
// }

// export const logout = (user) => {
//   return async dispatch => {
//     dispatch({
//       type: 'REMOVE_USER',
//       data: {
//         user
//       }
//     })
//   }
// }

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'INIT_USERS':
    return action.data
  case 'REMOVE_USER':
    return state = null
  default:
    return state
  }
}

export default userReducer