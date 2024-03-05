const blogUserRouter = require('express').Router()
const blogUserModel = require('../models/blogs-users-M')
const bcrypt = require('bcrypt')


blogUserRouter.get('/',async (req, res)=>{
    const users = await blogUserModel.find({}).populate('blogs')
    res.json(users)

})

blogUserRouter.post('/', async (req,res, next)=>{
    const body = req.body
    const saltRounds = 10
    if(body.password.length < 3) return res.status(400).json({error: 'min password length is 3'})
    
    const passwordHash = await bcrypt.hash(body?.password, saltRounds)
    const user = new blogUserModel({
        username: body?.username,
        name: body?.name,
        password: passwordHash
    })
    try {
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
   
})
module.exports = blogUserRouter