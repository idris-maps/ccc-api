var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var models = require('./lib/models')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var port = +process.env.PORT || 3000
var dev = true
if(process.env.DEV === 'false') { dev = false }

models.init(dev, function() {
	app.listen(port, function() {
		console.log('Server started on port ' + port)
	})
})



