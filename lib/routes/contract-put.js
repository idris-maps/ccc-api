module.exports = function(req, res) {
	var id = +req.params.id
	var Contract = require('../models').model().contract
	getContract(function(err, contract) {
		if(err) { res.send(400).json({ error: err }) }
		else if(!contract) { res.status(400).json({ error: 'No such contract for this user' }) }
		else {
			getContract(function(err, contract) {
				res.send(200).json(contract.dataValues)
			})
		}
	})
/*
	Contract.findOne({ where: { userId: req.body.id, id: id } })
	.then(function(contract) {
		if(!contract) { res.status(400).json({ error: 'No such contract for this user' }) }
		else {
			var attrs = {}
			for(k in req.body) { if(k !== 'id') { attrs[k] = req.body[k] } }
			contract.update(attrs)
			.then(function() {
				Contract.findOne()
			})
			.catch(function(err) {
				res.status(400).json({ error: err.message })
			})
		}
	})
*/
	function getContract(callback) {
		Contract.findOne({ where: { userId: req.body.id, id: id } })
		.then(function(contract) { callback(null, contract) })
		.catch(function(err) { callback(err.message) })
	}
}


