module.exports = function(req, res) {
	var id = +req.params.id
	var Contract = require('../models').model().contract
	Contract.findOne({ where: { userId: req.body.id, id: id } })
	.then(function(contract) {
		if(!contract) { res.status(400).json({ error: 'No such contract for this user' }) }
		else {
			var attrs = {}
			for(k in req.body) { if(k !== 'id') { attrs[k] = req.body[k] } }
			contract.update(attrs)
			.then(function(updated) {
				var r = updated.dataValues
				r.success = true
				res.status(200).json(r) 
			})
			.catch(function(err) {
				res.status(400).json({ error: err.message })
			})
		}
	})
}
