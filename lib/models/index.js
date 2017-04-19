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
	User.sync().then(function() {
		console.log('Started DB')
		callback()
	}).catch(function(err) {
		console.log('Could not start DB', err)
	})

}

exports.model = {
	if(user) {
		return { user: user }
	}
}
