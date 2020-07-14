import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addBlogComment } from '../js/reducers/blogReducer'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CardActionArea from '@material-ui/core/CardActionArea'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper'

const BlogView = ({  handleLike, handleRemove, own, notifyWith }) => {
  const id = useParams().id
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id)
  const history = useHistory()

  const handleComment = async (event) => {
    event.preventDefault()
    const blogComment = ({
      comment: event.target.comment.value,
      id: blog.id
    })
    history.push('/blogs')
    event.target.comment.value = ''
    dispatch(addBlogComment(blogComment))
    notifyWith(`a new comment '${blogComment.comment}' added!`, 'success')
  }

  const useStyles = makeStyles({
    card: {
      display: 'flex',
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 160,
    },
    table: {
      minWidth: 650,
    },
  })


  const classes = useStyles()


  return(

    <Grid item xs={12} md={12}>
      <br></br>
      <br></br>
      <CardActionArea >
        <Typography component="h2" variant="h5">
          {blog.title}
        </Typography>
        <br></br>
        <Typography variant="button" display="block" >
          {blog.likes} Likes
        </Typography>
        <Typography variant="overline" display="block" gutterBottom>
          Owner: {blog.user.name}
        </Typography>
        <Button color="primary" display="block" href={blog.url}>Take Me to the Source</Button>
        <Button color="secondary" onClick={() => handleLike(blog.id)}>like </Button>
        {own &&
        <Button color="secondary" onClick={() => handleRemove(blog.id)}>Delete</Button>}
      </CardActionArea>

      <br></br>

      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleComment}>
        <div>
          <TextField id="standard-basic" label="comment" name ="comment"/>
        </div>
        <br></br>
        <Button variant="outlined" size="small" display="Block" id="addComment">add comment</Button>
        <br></br>

      </form>
      <TableContainer component={Paper}>
        <br></br>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
          </TableHead>
          <TableBody>
            {blog.comments.map((b) => (
              // eslint-disable-next-line react/jsx-key
              <TableRow>
                <TableCell component="th" scope="row" key={b}>
                  {b}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )

}

export default BlogView