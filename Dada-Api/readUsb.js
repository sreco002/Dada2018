
/* eslint-disable node/no-missing-require */
'use strict';

// Use a Readline parser

var SerialPort = require('serialport');
var parsers = SerialPort.parsers;
var receivedData="";

// Use a `\r\n` as a line terminator
var parser = new parsers.Readline({
  delimiter: '\r\n'
});

var port = new SerialPort('/dev/cu.usbmodem1421', {
  baudRate: 9600
});

port.on('open', () => console.log('Port open'));

port.pipe(parser);//input from port to parser

//parser.on('data', console.log);//print on console , what is received
// put the parser into an array of receivedData and translate into string
parser.on('data',function(data){
  receivedData =data.toString();
  //console.log(receivedData);
  // checking that we can manipulate what we received
  if (receivedData == "Hello") {console.log("On");}
  if (receivedData == "0") {console.log("OFF");}
  });



port.write('ROBOT PLEASE RESPOND\n');
