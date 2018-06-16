//CLIENT for the dada(socket)server , host in the browser , take data from the browser, send it to the webserver and process data emitted by the webserver

var socket;
var label = 'distance';

function setup(){

  createCanvas(240,640);
  background(65);

  socket = io.connect('http://localhost:3000/');//connect to the server at the address, the server is sharing infos
//sharing
  socket.on(label,newDrawing);// receive a message label with data from the server
  //including data from the server
  //and use it in the function (message, function) ie (label,newDrawing)

}

function newDrawing(data){ //function getting the data (modified or not) from the server
  noStroke();
  fill(255,0,0);//red
  ellipse(data.x,data.y,data.z,36); // get the new data (shared) on the server

}


function mouseDragged(){
console.log('Sending: '+ mouseX + ','+ mouseY);
// define the javascript object with data in it, content of the message I want to share shared to the clients
  var dataP ={
  x: mouseX,
  y: mouseY,
  }
  socket.emit(label,dataP); //send message title, send the data object with it
//draw
  noStroke();
  fill(255);
  ellipse(mouseX,mouseY,18,18);

}
