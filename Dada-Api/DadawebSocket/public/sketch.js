//CLIENT for the (socket)server

var socket;

function setup(){

  createCanvas(300,300);
  background(65);

  socket = io.connect('http://localhost:3000/');//connect to the server at the address, the server is sharing infos
  socket.on('brush',newDrawing);// receive? message called brush?

}

function newDrawing(data){
  noStroke();
  fill(255,0,0);
  ellipse(data.x,data.y,18,48); // get the data (shared) on the server

}


function mouseDragged(){
console.log('Sending: '+ mouseX + ','+ mouseY);
// define the data object shared to the clients
var data ={
  x: mouseX,
  y: mouseY

}
socket.emit('brush',data); //send message title, data object

noStroke();
fill(104,140,16);
ellipse(mouseX,mouseY,18,48);

}
function draw(){
  noStroke();
  fill(104,0,160);
  ellipse(data.x,data.y,18,48);


}
