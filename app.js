var express = require('express');
var bodyParser = require('body-parser');
var popkey = require('./popkey');
var url = require('url');
var app = express();
var port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

//static file server middleware
app.use(express.static('public'));

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