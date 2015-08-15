var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
module.exports = function (req, res, next) {
  var userText = req.body.text;
  var popSearchURL = 'http://popkey.co/search/' + encodeURI(userText);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', popSearchURL);
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
      console.log(popSearchURL);
      return res.status(200).json(xhr.responseText);
    }
  };
  xhr.send();

};