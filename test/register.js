var request = require('supertest')
var app = require('../server')

describe('POST /register', function() {
	it('should reject empty email', function(done) {
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
