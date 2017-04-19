module.exports = function(req, res) {
	if(!req.body.title) {
		res.status(400).json({ error: 'Title is not defined' })
	} else if(!req.body.company) {
		res.status(400).json({ error: 'Company is not defined' })
	} else if(!req.body.price) {
		res.status(400).json({ error: 'Price is not defined' })
	} else {
		var Contract = require('../models').model().contract
		Contract.create({
			userId: req.body.id,
			title: req.body.title,
			company: req.body.company,
			price: req.body.price
		}).then(function(contract) {
			res.status(200).json(contract.dataValues)
		}).catch(function(err) {
			res.status(400).json({ error: err.message })
		})
	}
}
