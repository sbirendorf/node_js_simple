var express = require('express')
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var app = express();
var request = require('request');           //Load the request module

app.use(express.static(__dirname + '/public'));                 // set the static files location /public
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

 
app.post('/api/link', function (req, res) {
     
     var link = JSON.parse(req.body.data);
     var url =  link.site;
     console.log(url);
     request({
        uri: url,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
      }, function(error, response, body) {
            if(!error){
              res.send(body);
            }else{
               res.send(error); 
            }
      });
});
app.listen(8080, function () {
  console.log('listening on port 8080!');
})