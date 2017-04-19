var Sequelize = require('sequelize')

module.exports = {
	password: {
		type: Sequelize.STRING,
		field: 'name',
		allowNull: false,
		validate: { notEmpty: true } 
	},
	email: {
		type: Sequelize.STRING,
		field: 'email',
		allowNull: false,
		validate: { isEmail: true }
	}
}
