//var hash = require('password-hash')
var isEmail = require('../utils/is-email')
module.exports = function(req, res) {
	//var model = require('../models').model()
	//var User = model.user
	if(!isEmail(req.body.email)) {
		res.status(400).json({ error: 'Email is invalid' })
	} else if(!req.body.password || req.body.password.length < 6) {
		res.status(400).json({ error: 'Password is invalid' })
	} else {
		res.status(200).json({ msg: 'Not done' })
	}
}
