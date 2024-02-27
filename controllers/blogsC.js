const blogsRouter = require('express').Router()
const blogModel = require('../models/blogsM')
const blogUserModel = require('../models/blogs-users-M')



blogsRouter.get('/', async(req, res)=>{
    const allBlogs = await blogModel.find({})
    res.json(allBlogs)    
})

blogsRouter.post('/', async(req, res, next)=>{
    const body = req.body
    
   try {
    const userAll = await blogUserModel.find({})
    const indexAleatorio = Math.floor(Math.random() * userAll.length)
    const userAleatorio = userAll[indexAleatorio]
    /* const userRandom = await blogUserModel.aggregate([{ $sample: { size: 1 } }])
    const user = await blogUserModel.findById(userRandom[0]._id) */
    
    const blog = new blogModel({
        title : body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ?? 0,
        user: userAleatorio._id
    })
    
    const savedBlog = await blog.save()
    userAleatorio.blogs = userAleatorio.blogs.concat(savedBlog._id)
    await userAleatorio.save()
    
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