var request = require('supertest')
var app = require('../server')
var hash = require('password-hash')
var jwt = require('jsonwebtoken')
var secret = require('../secret')
var data = {
	user: { email: 'existing@email.com', password: hash.generate('password') },
	contracts: [
		{ title: 't-1', company: 'X', price: 12.35 },
		{ title: 't-2', company: 'X', price: 13.50 },
		{ title: 't-3', company: 'X', price: 32.35 },
	]
} 

describe('\"U5\" GET /contract', function() {
	before(function(done) {
		prepare(function() { done() })
	})
	it('should reject if no token', function(done) {
		request(app)
			.get('/contract')
			.type('json')
			.expect(400)
			.end(done)
	})
	it('should return three contracts', function(done) {
		request(app)
			.get('/contract')
			.set('x-access-token', data.user.token)
			.type('json')
			.expect(200)
			.end(function(err, res) {
				if(err) { done(err) }
				else if(!res.body.result) { done(new Error('Did not return result')) }
				else if(res.body.result.length !== 3) { done(new Error('Did not return 3 contracts')) }
				else { done() }
			})
	})
})
function prepare(callback) {
	var model = require('../lib/models').model()
	createUser(model, function() {
		createContracts(model, function() {
			callback()
		})
	})
}

function createContracts(model, callback) {
	var Contract = model.contract
	Contract.truncate().then(function() {
		Contract.bulkCreate(data.contracts)
		.then(function() {
			callback()
		})
	})
}

function createUser(model, callback) {
	var User = model.user
	User.truncate().then(function() {
		User.create({ email: data.user.email, password: data.user.password })
		.then(function(user) {
			data.user.id = user.dataValues.id
			data.user.token = jwt.sign({id: user.dataValues.id}, secret.jwt, { expiresIn: 10000 })
			data.contracts.forEach(function(c) { c.userId =  user.dataValues.id })
			callback()
		})
	})
}
