var express = require('express'),
	bodyParser = require('body-parser'),
	popkey = require('./popkey'),
	slackOauth = require('./slack-oauth.js'),
	url = require('url'),
	app = express(),
	port = process.env.PORT || 3000;
require('dotenv').load();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

//static file server middleware
app.set('views', __dirname + '/public');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

// get routes for pages
app.get('/', function(req, res) {
	res.render('index');
});

app.get('/greatSuccess', function(req, res) {
	res.render('success');
});

app.get('/oauth', slackOauth );

//post route for slack
app.post('/', popkey );

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('PopKey Slack bot listening on port ' + port);
});