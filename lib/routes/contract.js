var post = require('./contract-post')
var put = require('./contract-put')
var del = require('./contract-delete')
var get = require('./contract-get')

exports.post = function(req, res) { post(req, res) }
exports.put = function(req, res) { put(req, res) }
exports.delete = function(req, res) { del(req, res) }
exports.get = function(req, res) { get(req, res) }
