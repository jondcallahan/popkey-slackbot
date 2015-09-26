module.exports = function (req, res, next) {
  var userText = req.body.text;
  var userTrigger = req.body.trigger_word;
  var searchTerm = userText.replace(userTrigger+' ', '');
  var popSearchURL = 'https://popkey.co/search/' + encodeURI(searchTerm);
  var cheerio = require('cheerio');
  var request = require('request');
  request(popSearchURL, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var gifArray = [];
          $('.js-image').each(function(i, element){
            var img = $(this);
            var gif = img.attr('data-animated');
            var gifURL = gif;
            gifArray.push(gifURL);
          });
          var randomGIF = gifArray[Math.floor(Math.random() * gifArray.length)];

          if (!randomGIF) {
            randomGIF = 'No results found, yo!';
          } else if ( gifArray.length == 1) {
            randomGIF += ' // Only one GIF found for that search.'; 
          }
          return res.status(200).json({'text': randomGIF});
    }
  });
};



