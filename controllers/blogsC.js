const blogsRouter = require('express').Router()
const blogModel = require('../models/blogsM')
const blogUserModel = require('../models/blogs-users-M')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async(req, res)=>{
    const allBlogs = await blogModel.find({}).populate('user')
    res.json(allBlogs)    
})

blogsRouter.post('/', async(req, res, next)=>{
    const body = req.body
    console.log('este es el token dentro del controlador: ',req.token)
   try {
    
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    console.log(decodedToken)
    if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
    }
    const user = await blogUserModel.findById(decodedToken.id)
    
    const blog = new blogModel({
        title : body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ?? 0,
        user: user._id
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    res.json(savedBlog)
   } catch (error) {
        next(error)
   }
    
})

blogsRouter.delete('/:id', async (req, res, next)=>{
    try {
        const id = req.params.id
        await blogModel.findByIdAndDelete(id)
        res.status(204).end() 
    } catch (error) {
        next(error)
    }
    
})

blogsRouter.put('/:id', async (req, res, next)=> {
    const body = req.body
    const id = req.params.id
    
    const newBlog = {
        url: body?.url,
        likes: body?.likes
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(id, newBlog, {new: true})
    res.json(updatedBlog)
})

module.exports = blogsRouter