//CLIENT for the dada(socket)server , host in the browser , take data from the browser, send it to the webserver and process data emitted by the webserver

var socket;
var label = 'distance';

function setup(){

  createCanvas(240,640);
  background(65);
/*connecting to the server via sockets and reading message with the label=========*/
  socket = io.connect('http://localhost:3000/');//connect to the server at the address, the server is sharing infos
//sharing
//including data from the server
//and use it in the function (message, function) ie (label,newDrawing)

  socket.on(label,newDrawing);// open the channel label with data from the server
  socket.on('listening',newSensorMsg);//another possible message/channel , use data in newSensorMsg
}//end setup

//what to do with the messages received from the server on channels label and listening
function newDrawing(data){ //function getting the data (modified or not) from the server
  noStroke();
  fill(255,0,0);//red
  ellipse(data.x,data.y,data.z,36); // use the new data (shared) on the server
}

function newSensorMsg(activate){// receiving the status of the sensor from server and display it in the browser
if(activate== true){fill(255,0,0);}
else if (activate == false){fill(0,255,0);}


  noStroke();
  triangle(18,240,18,360,240,18); // use the new data (shared) on the server

}

/*what is happening in my browser =====================================*/
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

  var activate= true;
  socket.emit('listening',activate);

}
