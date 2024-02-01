const blogsRouter = require('express').Router()
const req = require('express/lib/request')
const blogModel = require('../models/blogsM')

blogsRouter.get('/', (req, res)=>{
    blogModel.find({}).then(result => res.json(result))    
})

blogsRouter.post('/', (req, res)=>{
    const body = req.body

    const blog = new blogModel({
        tittle : body.tittle,
        author: body.author,
        url: body.url,
        likes: body.like
    })
    blog.save().then(savedBlog => {
        res.json(savedBlog)
    })
})

module.exports = blogsRouter