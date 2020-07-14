import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper'

const UserBlogs = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)

  const blog = blogs.filter(blog => blog.user.id === id)

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  })

  const classes = useStyles()


  return (
    <TableContainer component={Paper}>
      <br></br>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
        </TableHead>
        <TableBody>
          {blog.map(blog =>
            // eslint-disable-next-line react/jsx-key
            <TableRow>
              <TableCell component="th" scope="row" key={blog.id}>{blog.title}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>


  )
}

export default UserBlogs