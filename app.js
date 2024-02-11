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

app.use((error, req,res, next)=>{
	if (error.name === 'ValidationError') return res.status(400).json({ error: error.message })
})

module.exports = app