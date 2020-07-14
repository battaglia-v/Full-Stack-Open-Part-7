import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, useHistory, Link
} from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import BlogView from './components/BlogView'


import loginService from './services/login'
import storage from './utils/storage'

import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addLikes, deleteBlog } from './js/reducers/blogReducer'
import { notificationChange, notificationRemove } from './js/reducers/notificationReducer'
import { initializeUsers } from './js/reducers/userReducer'

import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Typography from '@material-ui/core/Typography'
// import Link from '@material-ui/core/Link'



const App = () => {
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const users = useSelector(state => state.users)

  const history = useHistory()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])



  console.log(user)


  const notifyWith = (message, type='success') => {
    dispatch(notificationChange(message, type))
    setTimeout(() => {
      dispatch(notificationRemove(null))
    }, 5000)
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    dispatch(addLikes(likedBlog))
    dispatch(initializeBlogs())
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(deleteBlog(blogToRemove.id))
    }
    history.push('/blogs')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUsername('')
      setPassword('')
      setUser(user)
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
      history.push('/blogs')
    } catch(error) {
      // notifyWith('wrong username/password', 'error')
    }
  }

  const handleLogout = () => {
    storage.logoutUser(user)
    setUser(null)
  }

  const useStyles = makeStyles((theme) => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
      flex: 1,
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
      overflowX: 'auto',
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
  }))

  const classes = useStyles()



  if ( !user ) {
    return (
      <div>
        <Notification notification={notification}/>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Router>
        <div>
          <React.Fragment>
            <Toolbar className={classes.toolbar}>
              <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="center"
                noWrap
                className={classes.toolbarTitle}
              > Blog App
              </Typography>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <Button variant="outlined" size="small">
          Sign up
              </Button>
            </Toolbar>
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
              <Link
                color="inherit"
                noWrap
                key="blogs"
                variant="body2"
                to="/blogs"
                className={classes.toolbarLink}
                style={{ textDecoration: 'none' }}
              >blogs
              </Link>
              <Link
                color="inherit"
                noWrap
                key="blogs"
                variant="body2"
                to="/users"
                className={classes.toolbarLink}
                style={{ textDecoration: 'none' }}
              >users</Link>
              <em>{user.name} logged in </em>
              <Button variant="outlined" size="small" onClick={handleLogout}>logout</Button>
            </Toolbar>
          </React.Fragment>


          <Notification notification={notification} />

          <Switch>
            <Route path="/blogs/:id" render={({ match }) =>
              <BlogView
                handleLike={handleLike}
                handleRemove={handleRemove}
                own={user.name}
                blogs={blogs}
                user={user}
                notifyWith={notifyWith}
                id={match.params.id}
              />
            }/>
            <Route exact path="/users/:id" render={({ match }) =>
              <UserBlogs id={match.params.id} users={users} user={user}/>
            }/>
            <Route path="/users">
              <h2>Users</h2>
              <Users user={user}/>
            </Route>
            <Route path="/blogs">
              <br></br>
              <br></br>
              {blogs.sort(byLikes).map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLike={handleLike}
                  handleRemove={handleRemove}
                  users={users}
                />
              )}
              <br></br>
              <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <NewBlog notifyWith={notifyWith} initializeBlogs={initializeBlogs}/>
              </Togglable>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}


export default App