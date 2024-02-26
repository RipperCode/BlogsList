const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json())
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogsC')
const blogUserRouter = require('./controllers/blog-users-C')

app.disable('x-powered-by');
app.use('/api/blogs', blogRouter)
app.use('/api/users', blogUserRouter)

app.get('/', (req, res) => {
	res.send('Hello remote world!\n');
});

app.use((req, res)=>{
	res.status(404).json({error: 'ruta invalida'})
})

app.use((error, req,res, next)=>{
	
	if (error.name === 'ValidationError') {
		return res.status(400).json({error: error.message})
	}
	if (error.name === 'CastError') return res.status(400).json({error: error})
	next(error)
})

module.exports = app