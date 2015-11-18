module.exports = function (req, res, next) {
  var request = require('request');

  if ( req.query.code ) {
    console.log('Code URL Query Param: ' + req.query.code);

    request.post({url:'https://slack.com/api/oauth.access', form: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code

      }}, function(err,httpResponse,body){ 
            resBody = JSON.parse(body);
            console.log('body');
            if ( resBody.ok !== true ) {
              console.log('NOT OK!');
              console.log('ERROR: ' + resBody.error);
              console.log('Full Response Body: ');
              console.log(resBody);
              res.render('error', { 'error': resBody.error } );

            } else{
              console.log('Succesful BODY : ');
              console.log(resBody);
              res.redirect('/greatSuccess');
              } // End Else
          });
    
  } else {
    res.render('success');
  }

};