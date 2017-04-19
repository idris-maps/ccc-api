module.exports = function(req, res) {
	var model = require('../models').model()
	var User = model.user
	User.create({
		email: req.body.email,
		password: req.body.password
	}).then(function(user) {
		res.status(200).json({ success: true, id: user.dataValues.id })
	}).catch(function(err) {
		res.status(400).json({ error: err.message })
	})
}
