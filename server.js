var http = require('http');
var express = require('express');

var app = express();
var server = http.createServer(app);

app.get('/', function(req, res) {
  res.send('Add "whoami" to the url to get your browser information.');
});

app.get('/whoami', function(req, res) {
  var clientIp = req.header('x-forwarded-for') || req.ip;
  var clientLanguage = req.headers["accept-language"].split(',')[0];
  var clientOS = req.headers['user-agent'].split(')')[0].split('(')[1];
  var clientInf0 = {
    ipaddress: clientIp,
    language: clientLanguage,
    software: clientOS
  }
  res.send(clientInf0);
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("server listening at", addr.address + ":" + addr.port);
});
