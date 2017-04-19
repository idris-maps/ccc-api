var request = require('supertest')
var app = require('../server')
var hash = require('password-hash')
var jwt = require('jsonwebtoken')
var secret = require('../secret')
var data = {
	user: { email: 'existing@email.com', password: hash.generate('password') },
	otherUser: { email: 'another.user@email.com', password: hash.generate('password2') }
} 

describe('\"UJ4\" DELETE /contract', function() {
	before(function(done) {
		prepare(function() { done() })
	})
	it('should reject if no token', function(done) {
		request(app)
			.delete('/contract/' + data.user.contractId)
			.type('json')
			.send({})
			.expect(400)
			.end(done)
	})
	it('should not be able to delete another users contract', function(done) {
		request(app)
			.delete('/contract/' + data.otherUser.contractId)
			.set('x-access-token', data.user.token)
			.type('json')
			.send({})
			.expect(400)
			.end(done)
	})
	it('should return the id of the deleted message', function(done) {
		request(app)
			.delete('/contract/' + data.user.contractId)
			.set('x-access-token', data.user.token)
			.type('json')
			.send({})
			.expect(200)
			.end(function(err, res) {
				if(err) { done(err) }
				else if(!res.body.id) { done(new Error('Did not return the id')) }
				else { done() }
			})
	})
})

function prepare(callback) {
	var model = require('../lib/models').model()
	createUsers(model, function() {
		createContracts(model, function() {
			callback()
		})
	})
}

function createContracts(model, callback) {
	var Contract = model.contract
	Contract.truncate().then(function() {
		Contract.create({ title: 't-1', company: 'X', price: 12.50, userId: data.user.id })
		.then(function(contract) {  
			data.user.contractId = contract.dataValues.id
			Contract.create({ title: 't-2', company: 'X', price: 22.50, userId: data.otherUser.id })
			.then(function(contract) {
				data.otherUser.contractId = contract.dataValues.id
				callback()
			})
		})
	})
}

function createUsers(model, callback) {
	var User = model.user	
	User.truncate().then(function() {
		User.create({ email: data.user.email, password: data.user.password })
			.then(function(user) { 
				data.user.id = user.dataValues.id
				data.user.token = jwt.sign({id: user.dataValues.id}, secret.jwt, { expiresIn: 10000 })
				User.create({ email: data.otherUser.email, password: data.otherUser.password })
				.then(function(user) {
					data.otherUser.id = user.dataValues.id
					callback()
				})
			})
	})
}
