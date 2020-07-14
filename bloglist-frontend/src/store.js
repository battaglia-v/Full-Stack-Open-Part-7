import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './js/reducers/blogReducer'
import notificationReducer from './js/reducers/notificationReducer'
import userReducer from './js/reducers/userReducer'


const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  users: userReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store