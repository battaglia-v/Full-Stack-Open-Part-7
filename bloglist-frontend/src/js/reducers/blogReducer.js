/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
import blogService from '../../services/blogs'



export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data:({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: 0,
        user: newBlog.user.name,
        comments: ''
      })
    })
  }
}

export const addBlogComment = content => {
  return async dispatch => {
    const newComment = await blogService.comment(content)
    const { comments } = newComment
    console.log(newComment)
    dispatch({
      type: 'NEW_BLOG_COMMENT',
      data:({
        comments: comments,
        id: newComment.id
      })
    })
  }
}

export const addLikes = (likedBlog) => {
  return async dispatch => {
    const updateLikes = await blogService.update(likedBlog)
    dispatch({
      type: 'UPDATE_LIKES',
      data:({
        updateLikes
      })
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const removeBlog = await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data:({
        removeBlog
      })
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}


const rootReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('ACTION:', action)

  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'UPDATE_LIKES':
    const likeId = action.data.updateLikes.id
    return state.map(blog => {
      return blog.id === likeId ? action.data.updateLikes: blog
    })
  case 'NEW_BLOG_COMMENT':
    const blog = state.find((blog) => blog.id === action.id)
    const addBlogComment = { ...blog, comments: action.comments }
    return state.map((blog) =>
      blog.id === action.id ? addBlogComment : blog
    )
  case 'DELETE':
    const deleteId = action.data.removeBlog.id
    return state.filter(b => b.id !== deleteId)
  default:
    return state

  }
}

export default rootReducer