//launch a server to host sockets from diffferent "computers" https://www.youtube.com/watch?v=bjULmG8fqc8om/watch?v=2hhEOGXcCvg
//https://socket.io/get-started/chat/
//index.html is the socket client ,
// socket server is sketch socketserver
/* goes with dadasketch.js*/

/* client is the place where can other app /people could look at the files we want to share
link with this website where database is listen to the request to the "website" on the port and get the output
*/

//DECLARATIONS
//set up variables

var client = 'T1KW';
var port = '3000'
var label = 'distance';
var iptr = 0;
//using libraries
var express = require('express');
var app = express();
app.use(express.static(client));// this is the place where can other app /people could look at the files I want toea sharelink with this website where database is listen to the request to the "website" on the port and get the output

var server = app.listen(port);// listen on the port where all the clients are

var socket = require('socket.io');// manage the links between clients and the server
var io = socket(server);
io.sockets.on('connection', newConnection);// include this new connection among the web server clients

/*link to arduino*/
var serialPort = require('serialport');
var serialDevicePort = new serialPort('/dev/cu.usbmodem1421', {
  baudRate: 9600
});
console.log("listen to Arduino...");

var message = "we are the Dada Data"; // data goes there


console.log("dadasocketServer is running for client : "+ client +"label is " +label)// which website is the client

//FUNCTIONS
//when there is a new connection , what to do : open the channels, make data available and broadcast data 
function newConnection(socket){//when there is a new connection
  console.log('new connection:' + socket.id);//when there is a new connection
  socket.on(label, mouseMsg);// socket link is alive, make the data with this 'label' are available (on)
  socket.on('listening',newSensorMsg);//another possible channel , perform newsensorMsg

  function mouseMsg(data){
    socket.broadcast.emit(label,data);// emit the data received with this label , sent by the client website
    //io.sockets.emit('brush',data); // emit to everyone including the sender
    //console.log(data);// display the data on console
    console.log(message + " number "+ iptr );

  }
  function newSensorMsg(data){
    socket.broadcast.emit('listening',data);
    console.log(data);

  }
}
//end new connection
//arduino==============
function write(){
  serialDevicePort.open(function (err){
  //  console.log(message + " number "+ iptr );
    serialDevicePort.write(message,function(err,res){
      if(err){console.log(err);}
      serialDevicePort.close();
    });
  });
  iptr++;
}
setTimeout(write,1000); // wait for initialization
setInterval(write,30000); // write data every 30000sec
//end arduino
