var register = require('./register')
var authenticate = require('./authenticate')
var contract = require('./contract')

module.exports = function(app) {
	app.post('/register', register)
	app.post('/authenticate', authenticate)
	app.post('/contract', checkToken, contract.post)
}

function checkToken(req, res, next) {
	var token = req.headers['x-access-token']
	if(!token) { res.status(400).json({ error: 'Not authentification token' }) }
	else {
		jwt.verify(token, secret, function(err, decode) {
			if(err) { res.status(400).json({ error: 'Invalid token' }) }
			else { 
				req.body.id = decode.id 
				next() 
			}
		})
	}
}
