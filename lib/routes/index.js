var register = require('./register')
var authenticate = require('./authenticate')

module.exports = function(app) {
	app.post('/register', register)
	app.post('/authenticate', authenticate)
}
