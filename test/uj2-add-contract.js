var request = require('supertest')
var app = require('../server')
var hash = require('password-hash')

describe('\"UJ2\" POST /contract', function() {
	before(function(done) {
		prepare(function() { done() })
	})
	it('should reject if no token')
	it('should reject empty title')
	it('should reject empty company')
	it('should reject empty price')
	it('should not return contracts from another user')
	it('should return userId/title/company/price')
})

function prepare(callback) {
	var User = require('../lib/models').model().user
	User.truncate().then(function() {
		User.create({ email: 'existing@email.com', password: hash.generate('password') })
		.then(function() { callback() })
		.catch(function(err) { console.log('Error creating User', err) })
	})
}
