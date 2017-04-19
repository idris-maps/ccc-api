module.exports = function(req, res) {
	if(!req.body.title) {
		res.status(400).json({ error: 'Title is not defined' })
	} else {
		res.status(200).json()
	}
}
