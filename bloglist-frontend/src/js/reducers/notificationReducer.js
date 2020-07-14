

export const notificationChange = (notification, type) => {
  return {
    type: 'SET_MESSAGE',
    data: {
      message: notification,
      type: type
    }

  }
}


export const notificationRemove = (notification) => {
  return {
    type: 'REMOVE_MESSAGE',
    data: {
      message: notification
    }

  }
}


const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    return action.data
  case 'REMOVE_MESSAGE':
    return state = null
  default:
    return state
  }
}


export default notificationReducer