
/* eslint-disable node/no-missing-require */
'use strict';

// Use a Readline parser

const SerialPort = require('serialport');
const parsers = SerialPort.parsers;

// Use a `\r\n` as a line terminator
const parser = new parsers.Readline({
  delimiter: '\r\n'
});

const port = new SerialPort('/dev/cu.usbmodem1421', {
  baudRate: 9600
});

port.on('open', () => console.log('Port open'));

port.pipe(parser);

parser.on('data', console.log);
console.log(parsers);

port.write('ROBOT PLEASE RESPOND\n');
