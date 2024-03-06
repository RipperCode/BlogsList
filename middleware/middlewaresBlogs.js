const jwt = require('jsonwebtoken')

function tokenMiddleware(req, res, next){
	const authorization = req.get('authorization')
	
	if(!authorization) return  next()
	
	if(!(authorization && authorization.startsWith('Bearer'))){
		res.status(401).json({error: 'Unauthorized'})
	}else{
		req.token = authorization.replace('Bearer ', '')
		return next()
	}
	
}

function userMiddleware(req, res, next){
	if(req.method !== 'POST' && req.method !== 'DELETE') return next()

	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	req.user = decodedToken.id
	next()
}

module.exports = {tokenMiddleware, userMiddleware}