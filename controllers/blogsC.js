const blogsRouter = require('express').Router()
const blogModel = require('../models/blogsM')
const blogUserModel = require('../models/blogs-users-M')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async(req, res)=>{
    const allBlogs = await blogModel.find({}).populate('user', {username:1, name:1})
    res.json(allBlogs)    
})

blogsRouter.post('/', async(req, res, next)=>{
    const body = req.body
    
   try {
    
   
    
    if (!req.user) {
    return res.status(401).json({ error: 'token invalid' })
    }
    const user = await blogUserModel.findById(req.user)
    
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
    const id = req.params.id
   
    try {
        
        if (!req.user) return res.status(401).json({ error: 'token invalid' })
    
        const blog = await blogModel.findById(id)
        
        if (blog.user.toString() === req.user.toString()){
            await blogModel.findByIdAndDelete(id)
            res.status(204).json({message: 'blog eliminado'})
        }else return res.status(401).json({ error: 'no autorizado para eliminar este blog' })
            
    } catch (error) {
        next()
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