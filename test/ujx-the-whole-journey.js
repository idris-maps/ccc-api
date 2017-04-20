var request = require('supertest')
var app = require('../server')
var user = { email: 'test@email.com', password: 'test-password' }
var contract = [
	{ title: 'a', company: 'x', price: 12.50 },
	{ title: 'b', company: 'y', price: 11 }
]
var altTitle = 'a new title'

describe('\"UJX\" The whole journey', function() {
	it('should register the user', function(done) {
		request(app)
			.post('/register')
			.type('json')
			.send({ email: user.email, password: user.password })
			.expect(200)
			.end(done)
	})
	it('should return a token on authentication', function(done) {
		request(app)
			.post('/authenticate')
			.type('json')
			.send({ email: user.email, password: user.password })
			.expect(200)
			.end(function(err, res) {
				if(err) { done(err) }
				else if(!res.body.token) { done(new Error('No token')) }
				else {
					user.token = res.body.token
					done()
				}
			})	
	})
	it('should POST a contract', function(done) {
		request(app)
			.post('/contract')
			.set('x-access-token', user.token)
			.send(contract[0])
			.type('json')
			.expect(200)
			.end(function(err, res) {
				if(
					res.body.title === contract[0].title &&
					res.body.company === contract[0].company &&
					res.body.price === contract[0].price
				) { 
					contract[0].id = res.body.id
					done()
				} else { done(new Error('Did not return the posted contract')) }
			})
	})
	it('should POST another contract', function(done) {
		request(app)
			.post('/contract')
			.set('x-access-token', user.token)
			.send(contract[1])
			.type('json')
			.expect(200)
			.end(function(err, res) {
				if(
					res.body.title === contract[1].title &&
					res.body.company === contract[1].company &&
					res.body.price === contract[1].price
				) { 
					contract[1].id = res.body.id
					done()
				} else { done(new Error('Did not return the posted contract')) }
			})
	})
	it('should update the title of a contract', function(done) {
		request(app)
			.put('/contract/' + contract[0].id)
			.set('x-access-token', user.token)
			.send({ title: altTitle })
			.type('json')
			.expect(200)
			.end(function(err, res) {
				if(err) { done(err) }
				else if(res.body.title !== altTitle) {
					done(new Error('Did not change the name'))
				} else { done() }
			})
	})
	it('should delete a contract', function(done) {
		request(app)
			.delete('/contract/' + contract[1].id)
			.set('x-access-token', user.token)
			.type('json')
			.expect(200)
			.end(done)
	})
	it('should return one contract with modified title', function(done) {
		request(app)
			.get('/contract')
			.set('x-access-token', user.token)
			.type('json')
			.expect(200)
			.end(function(err, res) {
				var r = res.body.result
				if(r.length !== 1) {
					done(new Error('Did not return one contract'))
				} else if(
					r[0].title === altTitle &&
					r[0].company === contract[0].company &&
					r[0].price === contract[0].price
				) { 
					done() 
				} else {
					done(new Error('Did not return expected contract'))
				} 
			})
	})
})
