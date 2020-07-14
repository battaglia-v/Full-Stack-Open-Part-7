import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../js/reducers/blogReducer'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


const NewBlog = ({ notifyWith, user }) => {
  const dispatch = useDispatch()

  const handleNewBlog = async (event) => {
    event.preventDefault()
    console.log(event.target.author.value)
    const newBlog = ({
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      votes: 0,
      user
    })
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    dispatch(createBlog(newBlog))
    notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`, 'success')
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(3)
    },

  }))
  const classes = useStyles

  return (
    <div>
      <br></br>
      <Typography component="h2" variant="h5">
          Add Blog
      </Typography>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleNewBlog}>
        <div>
          <TextField id="standard-basic" label="Blog Author" name ="author" />
        </div>
        <div>
          <TextField id="standard-basic" label="Blog Title" name ="title" />
        </div>
        <div>
          <TextField id="standard-basic" label="Source URL" name="url"/>
        </div>
        <Button variant="outlined" size="small" display="Block" id="create">create</Button>
      </form>
    </div>
  )
}

export default NewBlog