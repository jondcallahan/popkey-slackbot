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

// get route if someone stumbles upon app page
 //app.get('/', function (req, res) { res.status(200).send('<body style="background-color:azure; font-family: Helvetica; display: flex; align-items: center; justify-content: center;"><h2><hr style="border-color: tomato; width: 80%"><center>To use the popkey slack integration, add an outgoing webhook with the URL:<br /><br />' + req.protocol + '://' + req.get('host') + '/</center><hr style="border-color: tomato; width: 80%"></h2></body>'); console.dir(url.Url('href'));});

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