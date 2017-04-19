var hash = require('password-hash')
var isEmail = require('../utils/is-email')

module.exports = function(req, res) {
	if(!isEmail(req.body.email)) {
		res.status(400).json({ error: 'Email is invalid' })
	} else if(!req.body.password || req.body.password.length < 6) {
		res.status(400).json({ error: 'Password is invalid' })
	} else {
		var model = require('../models').model()
		var User = model.user
		User.findOne({ where: { email: req.body.email } }).then(function(user) {
			if(!user) {
				res.status(400).json({ error: 'Email does not exist' })
			} else {
				res.status(200).json({})
			}
		})
		//var hashedPW = hash.verify(req.body.password)
	}
}
