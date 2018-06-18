
//DECLARATIONS
//set up variables

var client = 'T1KW';
var port = '3000'


//using libraries

var app = require('http').createServer(handler)
var fs = require('fs');


var express = require('express');

var app = express();
app.use(express.static(client));

var server = app.listen(port);// listen on that port

var socket = require('socket.io');
var io = socket(server);




function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
