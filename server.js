var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var models = require('./lib/models')
var routes = require('./lib/routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes(app)

var port = +process.env.PORT || 3000

var dev = true
if(process.env.DEV === 'false') { dev = false }

models.init(true, function() {
	app.listen(port, function() {
		console.log('Server started on port ' + port)
		app.emit('ready')
	})
})

module.exports = app



