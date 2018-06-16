//launch a server to host sockets from diffferent "computers" https://www.youtube.com/watch?v=bjULmG8fqc8om/watch?v=2hhEOGXcCvg
//https://socket.io/get-started/chat/
//index.html is the socket client ,
// goes with index.html/talk.js from T1KW website

/* client is the place where can other app /people could look at the files we want to share
link with this website where database is listen to the request to the "website" on the port and get the output
*/

//DECLARATIONS
//set up variables

var client = 'T1KW';
var port = '3000'
var label = 'distance';
var iptr = 0;
var receivedData ="";
//using libraries
var express = require('express');
var app = express();
app.use(express.static(client));// this is the place where can other app /people could look at the files I want toea sharelink with this website where database is listen to the request to the "website" on the port and get the output

var server = app.listen(port);// listen on that port

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

//-----------
/* eslint-disable node/no-missing-require */
'use strict';

// Use a Readline parser

var serialPort = require('serialport');
var parsers = serialPort.parsers;

// Use a `\r\n` as a line terminator
var parser = new parsers.Readline({
  delimiter: '\r\n'
});

var serialDevicePort = new serialPort('/dev/cu.usbmodem1421', {
  baudRate: 9600
});


//----------read data from the sensor on Arduino
 serialDevicePort.on('open', () => console.log('Port open'));
 serialDevicePort.pipe(parser);

 //parser.on('data', console.log);//print on console , what is received
 // put the parser into an array of receivedData and translate into string
 parser.on('data',function(data){
   receivedData =data.toString();
   //console.log(receivedData);
   // checking that we can manipulate what we received

   });



//-------------



var message = "we are the Dada Data listening"; // data goes there

console.log(message+ " to "+client +" with the label :  " +label)// which website is the client

//FUNCTIONS

function newConnection(socket){

  console.log('new connection:' + socket.id);//when there is a new connection
  socket.on(label, mouseMsg);// if there is a message called 'label' trigger this function 'mouseMsg'
  //link between label and function

  function mouseMsg(data){
    if (receivedData == "Hello") {data.z = 8;}
    if (receivedData == "0") {data.z = 1;}
    receivedData;// add the received Data from Arduino to the new message
    socket.broadcast.emit(label,data);// send back out emit the data received with this label , sent by the client website
    //io.sockets.emit('brush',data); // emit to everyone io.sockets including the sender
    console.log(data);// display the data on console
    console.log(message + " number "+ iptr );

  }
}
