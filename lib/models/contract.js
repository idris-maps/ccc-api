var Sequelize = require('sequelize')

module.exports = {
	title: {
		type: Sequelize.STRING,
		field: 'title',
		allowNull: false,
		validate: { notEmpty: true } 
	},
	company: {
		type: Sequelize.STRING,
		field: 'company',
		allowNull: false,
		validate: { notEmpty: true } 
	},
	price: {
		type: Sequelize.FLOAT,
		field: 'title',
		allowNull: false,
		validate: { isFloat: true } 
	}
}
