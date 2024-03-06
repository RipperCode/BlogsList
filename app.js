const express = require('express')
const app = express();
const cors = require('cors');
const {tokenMiddleware, userMiddleware}  = require('./middleware/middlewaresBlogs')

app.use(cors())
app.use(express.json())
app.use(tokenMiddleware)
app.use(userMiddleware)
app.disable('x-powered-by')

const blogRouter = require('./controllers/blogsC')
const blogUserRouter = require('./controllers/blog-users-C')
const loginRouter = require('./controllers/login-controllers')

app.use('/api/blogs', blogRouter)
app.use('/api/users', blogUserRouter)
app.use('/api/login',loginRouter)

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
	else if (error.name === 'CastError') return res.status(400).json({error: error.message})
	else if (error.name === 'JsonWebTokenError') return res.status(401).json({error: error.message})
	else if (error.name === 'TokenExpiredError') return res.status(401).json({error: error.message})
	next(error)

})


module.exports = app