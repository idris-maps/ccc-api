var hash = require('password-hash')

module.exports = function(req, res) {
	var model = require('../models').model()
	var User = model.user
	User.findOne({ where: { email: req.body.email } }).then(function(user) {
		if(user) {
			res.status(400).json({ error: 'email already exists' })	
		} else if(!req.body.password || req.body.password.length < 6) {
			res.status(400).json({ error: 'password is invalid' })
		} else {
			create()
		}
	})

	function create() {
		User.create({
			email: req.body.email,
			password: hash.generate(req.body.password)
		}).then(function(user) {
			res.status(200).json({ success: true, id: user.dataValues.id })
		}).catch(function(err) {
			res.status(400).json({ error: err.message })
		})
	}
}
