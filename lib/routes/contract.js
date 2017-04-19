var post = require('./contract-post')
var put = require('./contract-put')

exports.post = function(req, res) { post(req, res) }
exports.put = function(req, res) { put(req, res) }
