var request = require('supertest')
var app = require('../server')

describe('POST /register', function() {
	before(function(done) {
		app.on('ready', function() {
			console.log('Test can start')
			done()
		})
	})
	it('should reject empty email', function(done) {
		console.log('Runnning test')
		request(app)
			.post('/user')
			.type('json')
			.send({ password: 'User'})
			.expect(400)
			.end(done)
	})
	it('should reject invalid email')
	it('should reject empty password')
	it('should return id')
})
