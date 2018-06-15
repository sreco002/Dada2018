//CLIENT for the (socket)server

var socket;

function setup(){

  createCanvas(300,300);
  background(65);

  socket = io.connect('http://localhost:3000/');//connect to the server at the address, the server is sharing infos
  socket.on('mouse',newDrawing);

}

function newDrawing(data){
  noStroke();
  fill(255,0,0);
  ellipse(data.x,data.y,18,48);

}


function mouseDragged(){
console.log('Sending: '+ mouseX + ','+ mouseY);

var data ={
  x: mouseX,
  y: mouseY

}
socket.emit('mouse',data); //send message title, data object

noStroke();
fill(104,140,16);
ellipse(mouseX,mouseY,18,48);

}
function draw(){


}
