var request = require('supertest')
var app = require('../server')

describe('POST /register', function() {
	before(function(done) {
		app.on('ready', function() {
			var User = require('../lib/models').model().user
			User.create({
				email: 'existing@mail.com', password: 'password'
			}).then(function() {
				done()
			})
		})
	})
	it('should reject empty email', function(done) {
		request(app)
			.post('/register')
			.type('json')
			.send({ password: 'password'})
			.expect(400)
			.end(done)
	})
	it('should reject invalid email', function(done) {
		request(app)
			.post('/register')
			.type('json')
			.send({ password: 'password', email: 'not_an_email'})
			.expect(400)
			.end(done)
	})
	it('should reject empty password', function(done) {
		request(app)
			.post('/register')
			.type('json')
			.send({ email: 'is@email.com'})
			.expect(400)
			.end(done)
	})
	it('should reject existing email', function(done) {
		request(app)
			.post('/register')
			.type('json')
			.send({ email: 'existing@mail.com', password: 'password'})
			.expect(400)
			.end(done)
	})
	it('should return id')
})
