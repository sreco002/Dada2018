// Daniel Shiffman

/* output random voices and random text from refText */
/*opening a port 3000 via Dada-Api/dadaSpeakerServer.js on */

//variables for server talking

var socket;
var label = 'distance';
var activate;

//global variable
let speech;
let voices, voice;
let refText, index, sentence,phrase;
var iptr = 0; // a counter for the words
var words = ["77 65","617265"," 64 61 64 61 ","zero un zero un zero un un un zero un un zero zero un zero un ","01010111 01100101" , "77 65","64 61 64 61","61 72 65","6d 61 73 6b","un","one", "zero un", "uno zero uno zero zero", "zero one one"]; // some words
//SETUP++++++++++++++++++
function setup() {

  createCanvas(240,640);
  background(65);

//+++++++++++++++set up for server talking
/*connecting to the server via sockets and reading message with the label=========*/
  socket = io.connect('http://localhost:3000/');//connect to the server at the address, the server is sharing infos
//sharing
//including data from the server
//and use it in the function (message, function) ie (label,newDrawing)

  socket.on(label,newDrawing);// open the channel label with data from the server
  socket.on('listening',newSensorMsg);//another possible message/channel , use data in newSensorMsg
  socket.emit('listening',activate);//emitting through the channel 'listening ', sending the message activate, this is done each time mouse is dragged



//================end set up for server talking


  refText = loadStrings("nodeMaskText.txt");

  speech = new p5.Speech(); // speech synthesis object
  speech.onLoad = voiceReady;

  speech.started(startSpeaking);
  speech.ended(endSpeaking);

  function startSpeaking() {
    background(0, 255, 0);
  }

  function endSpeaking() {
    background(0);
  }

  function voiceReady() {
    console.log('voice ready');
    console.log(speech.voices);
  }


}// end SETUP+++++++++++++++++++++++++



/*SERVER related=================== */


//FUNCTIONS +++++++++++++++++++++++++++++++

/*===============what to do with the messages received from the server on channels label and listening*/
function newDrawing(data){ //function getting the data (modified or not) from the server
  noStroke();
  fill(255,0,0);//red
  ellipse(data.x,data.y,data.z,36); // use the new data (shared) on the server
}

function newSensorMsg(activate){// receiving the status of the sensor from server and display it in the browser
//console.log("new message is : "+ activate)
  if(activate==true){
  fill(255,0,0);//red
//  blabla();
  dadada();// talk to the viewer

  }
  else if (activate == false){
  fill(0,0,255);//blue
  speech.cancel();//stop talking

  }


socket.emit('listening',activate);//listen through the channel 'listening ', check the activate status,

noStroke();
triangle(18,240,18,360,240,18); // use the new data (shared) on the server

}//end newSensorMsg

/*===============what is happening in my browser */


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

/*==============end SERVER related*/


 function dadada() {


  voices = speech.voices;
  voice = random(voices);

  console.log(voice);
  speech.setRate(0.7);
  speech.setPitch(0.8);
  //speech.setVoice(voice.name);
  speech.setVoice('Samantha'); // good voice with rate 0.7 and pitch 0.8
  index = Math.floor((Math.random()*refText.length));
  phrase = refText[index];

  speech.speak (phrase); // say something from the node txt

  if (index%3==0) {blabla();}// speak binary


 }

 function loadText(){

  refText = loadStrings("nodeMaskText.txt");
  console.log(refText);
  }
 function returnSentence(){
  //  index = Math.floor((Math.random()*txt.length));
    index = 5;
    phrase = refText[index];
    console.log(phrase);
    return phrase;
  }




  function blabla(){// speak binary

    speech.setVoice(20); // 20 is a nice computer like voice
    speech.setRate(1);
    speech.setPitch(0.6);

    //myVoice.setVoice(42);//  56 italienne 55 Indonesia 47 allemand 37Thomas francais, 15 ou Juan male espagnol 65 chinois , 60 german? ou 'Luca'
      speech.speak(words[iptr]);
      iptr = (iptr+1) % words.length; // increment
      console.log(iptr);


  }
