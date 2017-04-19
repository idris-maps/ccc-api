module.exports = function(req, res) {
	if(!req.body.title) {
		res.status(400).json({ error: 'Title is not defined' })
	} else if(!req.body.company) {
		res.status(400).json({ error: 'Company is not defined' })
	} else if(!req.body.price) {
		res.status(400).json({ error: 'Price is not defined' })
	} else {
		res.status(200).json()
	}
}
