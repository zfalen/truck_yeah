var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var fs = require('fs');
var Truck = require('./models/truck');
var mongoose = require('mongoose');
var app = express();
var uriUtil = require('mongodb-uri');


var options = {
  server:  { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};  
var mongodbUri = process.env.MONGOLAB_URI || "mongodb://localhost/trucks";
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 4000;

var truckRoutes = require('./routes/routes');

app.use(express.static('public'));

app.use('/api', truckRoutes);

app.get('/', function(req, res){
    res.readFile('index.html')
});

app.listen(port);
console.log('Magic happens on port ' + port);















// var router = express.Router();




// app.use('/', express.static(path.join(__dirname, 'public')));


// app.get('/', function(req, res){
// 	res.sendFile('index.html');
// })

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// app.use(express.static(path.join(__dirname, 'public')));

// app.set('port', process.env.PORT || 4000);

// var server = app.listen(app.get('port'), function(){ 
// 	console.log('Express server listening on port ' + server.address().port)
// });