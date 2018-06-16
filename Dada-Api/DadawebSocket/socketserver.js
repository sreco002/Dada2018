//launch a server to host sockets from diffferent "computers" https://www.youtube.com/watch?v=bjULmG8fqc8om/watch?v=2hhEOGXcCvg
//https://socket.io/get-started/chat/
//index.html is the socket client ,
// socket server is sketch socketserver
var express = require('express');
var app = express();
var server = app.listen(3000);// listen on that port
app.use(express.static('public'));// this is the place where can other app /people could look at the files I want toea sharelink with this website where database is listen to the request to the "website" on the port and get the output
console.log("socketServer is running")
var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('new connection:' + socket.id);
  socket.on('brush', mouseMsg);// the data with this title are available (on)

  function mouseMsg(data){
    socket.broadcast.emit('brush',data);// emit the message received
//io.sockets.emit('brush',data); // emit to everyone including the sender
    console.log(data);// displaythe data on console
  }
}
