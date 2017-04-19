var request = require('supertest')
var app = require('../server')

describe('\"UJ2\" POST /authenticate', function() {
	before(function(done) {
		prepare(function() { done() })
	})
	it('should reject empty email', function(done) {
		request(app)
			.post('/authenticate')
			.type('json')
			.send({ password: 'password'})
			.expect(400)
			.end(done)
	})
	it('should reject invalid email', function(done) {
		request(app)
			.post('/authenticate')
			.type('json')
			.send({ password: 'password', email: 'not_an_email'})
			.expect(400)
			.end(done)
	})
	it('should reject empty password', function(done) {
		request(app)
			.post('/authenticate')
			.type('json')
			.send({ email: 'is@email.com'})
			.expect(400)
			.end(done)
	})
	it('should reject non-existing email', function(done) {
		request(app)
			.post('/authenticate')
			.type('json')
			.send({ email: 'not-existing@email.com', password: 'password'})
			.expect(400)
			.end(done)
	})
	it('should reject wrong password', function(done) {
		request(app)
			.post('/authenticate')
			.type('json')
			.send({ email: 'existing@email.com', password: 'wrong-password'})
			.expect(400)
			.end(done)
	})
	it('should return a token')
})

function prepare(callback) {
	var User = require('../lib/models').model().user
	User.truncate().then(function() {
		User.create({ email: 'existing@email.com', password: 'password' })
		.then(function() { console.log('Done preparing'); callback() })
		.catch(function(err) { console.log('Error creating User', err) })
	})
}
