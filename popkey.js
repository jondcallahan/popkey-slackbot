module.exports = function (req, res, next) {
  var popSearchURL = 'https://popkey.co/search/' + encodeURI(req.body.text);
  var cheerio = require('cheerio');
  var request = require('request');
  var payload = {};

  request(popSearchURL, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var gifArray = [];
          $('.js-image').each(function(i, element){
            var img = $(this);
            var gif = img.attr('data-animated');
            gifArray.push(gif);
          });
          var randomGIF = gifArray[Math.floor(Math.random() * gifArray.length)];

          if (!randomGIF) {
            payload = { "text": 'No results found, yo!' };
          } else if ( gifArray.length == 1) {
            payload = { "response_type": "in_channel",
                        "text": randomGIF + ' // Only one GIF found for that search.',
                        "attachments": [{
                          "fallback": randomGIF,
                          "image_url": randomGIF
                        }]
                      };
          } else {
            payload = { "response_type": "in_channel",
                        "text": randomGIF,
                        "attachments": [{
                          "fallback": randomGIF,
                          "image_url": randomGIF
                        }]
                      };
          }
          
          return res.status(200).json(payload);
    } // End if no error
     else {
      return res.status(200).json({"text": "Server error, please try again later"});
     }
  });
};



