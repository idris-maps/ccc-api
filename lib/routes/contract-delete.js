module.exports = function(req, res) {
	var id = +req.params.id
	var Contract = require('../models').model().contract
	Contract.findOne({ where: { userId: req.body.id, id: id } })
	.then(function(contract) {
		if(!contract) { res.status(400).json({ error: 'No such contract for this user' }) }
		else {
			contract.destroy()
			.then(function() {
				res.status(200).json({ success: true, id: id }) 
			})
			.catch(function(err) {
				res.status(400).json({ error: err.message })
			})
		}
	})
}
