// from the simple example on github Web Audio Speech Synthesis and Speech Recognition Implementation for p5.js (http://p5js.org)

// R. Luke DuBois (dubois@nyu.edu)
// ABILITY Lab / Brooklyn Experimental Media Center
// NYU
//var words = ["01 01011 01 01 ","Only use electromagnetic interested in what you dislike.","As we become machines"," the Dada DatA","un lapin","Use shower curtains in a shop", "to be or not to be"," noode??","Between 0 and 1"," We are all there","together", "the  Dadaaa data" ]; // some words
//var words = ["Coucou Spock, tu aimes bien mon histoire de Sid?" ]; // some words
var words = ["WE are the MASK DATA , :  " ,"068", "097","100 ", "097 ", "013", "010"]; // some words

var iptr = 0; // a counter for the words
var myVoice = new p5.Speech(); // new P5.Speech object
var listbutton; // button
function setup()
{
  // graphics stuff:
  createCanvas(480, 480);
  background(255, 0, 0);

  // Set colors
  fill(204, 101, 192, 127);
  stroke(127, 63, 120);
  translate(200, 200);
  noStroke();
  for (var i = 0; i < 10; i ++) {
    ellipse(0, 60, 20, 100);
    rotate(PI/5);
  }
  fill(255, 255, 255, 100);

  // instructions:
  textSize(72);
  textAlign(CENTER);
  text("click me", 0, -height/2);
  // button:
    listbutton = createButton('List of voices');
    listbutton.position(180, height+180);
    listbutton.mousePressed(doList);
    // say hello:
    //myVoice.setVoice(Math.floor(random(myVoice.voices.length)));

  // myVoice.speak('0101');
}
function draw()
{
  // why draw when you can click?
}
function doList()
{
  myVoice.listVoices(); // debug printer for voice options
}
function keyPressed()
{
  background(255, 0, 0); // clear screen
}
function mousePressed()
{
  // if in bounds:
  if(mouseX<width && mouseY<height) {
    ellipse(mouseX, mouseY, 50, 50); // circle
    // randomize voice and speak word:
    vox = Math.floor(random(myVoice.voices.length))
    myVoice.setVoice(vox);
    myVoice.setRate(0.7);
    myVoice.setPitch(0.8);
    console.log(vox);

  //myVoice.setVoice(20);// 20 computer women 56 italienne 55 Indonesia 47 allemand 37Thomas francais, 15 ou Juan male espagnol 65 chinois , 60 german? ou 'Luca'
    myVoice.speak(words[iptr]);
    iptr = (iptr+1) % words.length; // increment
    console.log(words.length);
  }
}
