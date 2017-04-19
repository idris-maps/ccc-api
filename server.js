var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var port = +process.env.PORT || 3000
app.listen(port, function() {
	console.log('Server started on port ' + port)
})
