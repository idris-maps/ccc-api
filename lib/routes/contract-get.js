module.exports = function(req, res) {
	var userId = req.body.id
	var Contract = require('../models').model().contract
	Contract.findAll({ where: { userId: userId } })
	.then(function(contracts) {
		var r = []
		contracts.forEach(function(c) {
			r.push(c.dataValues)
		})
		res.status(200).json({ success: true, result: r })
	}).catch(function(err) {
		res.status(400).json({ error: err.message })
	})
}
