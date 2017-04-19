var request = require('supertest')
var app = require('../server')
var hash = require('password-hash')
var jwt = require('jsonwebtoken')
var secret = require('../secret')
var token

describe('\"UJ2\" POST /contract', function() {
	before(function(done) {
		prepare(function() { done() })
	})
	it('should reject if no token', function(done) {
		request(app)
			.post('/contract')
			.type('json')
			.send({ title: 'contract-4', company: 'X', price: 120 })
			.expect(400)
			.end(done)
	})
	it('should reject empty title', function(done) {
		request(app)
			.post('/contract')
			.set('x-access-token', token)
			.type('json')
			.send({ company: 'X', price: 120 })
			.expect(400)
			.end(done)
	})
	it('should reject empty company', function(done) {
		request(app)
			.post('/contract')
			.set('x-access-token', token)
			.type('json')
			.send({ title: 'contract-4', price: 120 })
			.expect(400)
			.end(done)
	})
	it('should reject empty price', function(done) {
		request(app)
			.post('/contract')
			.set('x-access-token', token)
			.type('json')
			.send({ title: 'contract-4', company: 'X' })
			.expect(400)
			.end(done)
	})
	it('should not return contracts from another user')
	it('should return userId/title/company/price')
})

function prepare(callback) {
	var User = require('../lib/models').model().user
	User.truncate().then(function() {
		User.create({ email: 'existing@email.com', password: hash.generate('password') })
		.then(function(user) { 
			token = jwt.sign({id: user.dataValues.id}, secret.jwt, { expiresIn: 10000 })
			callback() 
		})
		.catch(function(err) { console.log('Error creating User', err) })
	})
}
