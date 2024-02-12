const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json())
const blogRouter = require('./controllers/blogsC')


app.use('/api/blogs', blogRouter)

app.get('/', (req, res) => {
	res.send('Hello remote world!\n');
});

app.use((req, res)=>{
	res.status(404).json({error: 'ruta invalida'})
})

app.use((error, req,res, next)=>{
	if (error.name === 'ValidationError') return res.status(400).json({ error: error.message })
	if (error.name === 'CastError') return res.status(400).json({error: error.message})
	next(error)
})

module.exports = app