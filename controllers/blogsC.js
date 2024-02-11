const blogsRouter = require('express').Router()
const blogModel = require('../models/blogsM')

blogsRouter.get('/', async(req, res)=>{
    const allBlogs = await blogModel.find({})
    res.json(allBlogs)    
})

blogsRouter.post('/', async(req, res, next)=>{
    const body = req.body

   try {
    const blog = new blogModel({
        title : body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ?? 0
    })
    
    const savedBlog = await blog.save()
    res.json(savedBlog)
   } catch (error) {
        next(error)
   }
    
})

module.exports = blogsRouter