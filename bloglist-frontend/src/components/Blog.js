/* eslint-disable linebreak-style */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper'


const Blog = ({ blog }) => {

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
          <TableCell component="th" scope="row">
            <Link style={{ textDecoration: 'none' }} to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  })
}

export default Blog