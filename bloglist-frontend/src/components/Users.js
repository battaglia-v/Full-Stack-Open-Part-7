import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import random from 'random-key-generator'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const Users = () => {
  const users = useSelector(state => state.users)
  const byBlogs = (u1, u2) => u2.blogs.length - u1.blogs.length

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  })

  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Users</TableCell>
            <TableCell align="right">Total Blogs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.sort(byBlogs).map(u =>
            <TableRow key={random()}>
              <TableCell component="th" scope="row">
                <Link style={{ textDecoration: 'none' }} to={`/users/${u.id}`}>{u.name}</Link>
              </TableCell>
              <TableCell align="right" key={random()}>{u.blogs.length}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default Users