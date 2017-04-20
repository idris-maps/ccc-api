module.exports = function(req, res) {
	var id = +req.params.id
	var Contract = require('../models').model().contract
	var attrs = {}
	for(k in req.body) { if(k !== 'id') { attrs[k] = req.body[k] } }
	getContract(function(err, contract) {
		if(err) { res.status(400).json({ error: err }) }
		else if(!contract) { res.status(400).json({ error: 'No such contract for this user' }) }
		else {
			updateContract(contract, attrs, function(err) {
				if(err) { res.status(400).json({ error: err.message }) }
				else {
					getContract(function(err, contract) {
						res.status(200).json(contract.dataValues)
					})
				}
			})
		}
	})
	function getContract(callback) {
		Contract.findOne({ where: { userId: req.body.id, id: id } })
		.then(function(contract) { callback(null, contract) })
		.catch(function(err) { callback(err.message) })
	}
	function updateContract(contract, attrs, callback) {
		contract.update(attrs)
		.then(function() { callback(null) })
		.catch(function(err) { callback(err.message) })
	}
}


