var register = require('./register')

module.exports = function(app) {
	app.post('/register', register)
}
