// matthugues.io/serial-communication-with-node-js-and-arduino/ amended from var SerialPort = require('serialport').SerialPort;

var serialPort = require('serialport');
var iptr;

var port = new serialPort('/dev/cu.usbmodem1421', {
  baudRate: 9600
});
console.log("Starting up serial host...");

var message = "we are the Dada Data"; // data goes there
iptr=0;
function write(){
  port.open(function (err){
    console.log(message + " number "+ iptr );
    port.write(message,function(err,res){
      if(err){console.log(err);}
      port.close();
    });
  });
  iptr++;
}
setTimeout(write,1000); // wait for initialization
setInterval(write,5000); // write data every 5sec
