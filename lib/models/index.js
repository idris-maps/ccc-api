var Sequelize = require('sequelize')
var userModel = require('./user')
var sequelize, User

exports.init = function(dev, callback) {
	if(dev) {
		var store = 'data/dev-server.sqlite'
	} else {
		var store = 'data/server.sqlite'
	}

	sequelize = new Sequelize({
		host: 'localhost',
		dialect: 'sqlite',
		storage: store,
		logging: false
	})

	User = sequelize.define('user', userModel,{ freezeTableName: true })
	if(dev) { var opt = { force: true } } else { var opt = {} }

	User.sync(opt).then(function() {
		console.log('Started DB')
		callback()
	}).catch(function(err) {
		console.log('Could not start DB', err)
	})

}

exports.model = function() {
	if(User) {
		return { user: User }
	} else {
		return null
	}
}
