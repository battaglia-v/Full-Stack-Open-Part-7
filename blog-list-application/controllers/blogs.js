const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const Blog = require('../models/blog')
const User = require('../models/user')

const textParser = bodyParser.text()

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.delete('/:id', async (request, response) => {
  const id = request.params.id
  try {
    const blogToDelete = await Blog.findById(id)

    if (!blogToDelete) {
      response.status(400).json({
        error: `No blog with the following id: ${id}`
      })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      response.status(401).json({ error: 'token missing or invalid' })
    } else if (decodedToken.id !== blogToDelete.user.toString()) {
      response.status(401).json({ error: 'not authorized' })
    } else {
      const deletedBlog = await Blog.findByIdAndDelete(id)
      response.json(deletedBlog.toJSON())
    }
  } catch (e) {
    response.status(400).json({
      error: e.message
    })
  }
})


router.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!blog.url || !blog.title) {
    return response.status(400).send({ error: 'title or url missing ' })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  blog.user = user
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.post('/:id/comments', textParser, async (request, response) => {
  const { token } = request

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (blog) {
    blog.comments = blog.comments.concat(request.body.comment)
    console.log(blog.comments)
    const savedBlog = await blog.save()
    await savedBlog
      .populate({ path: 'user', select: ['name', 'username'] })
      .execPopulate()
    response.status(200).json(savedBlog.toJSON())
  } else {
    response.status(404).end()
  }
})


module.exports = router