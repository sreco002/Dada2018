// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/v0CHV33wDsI
/* output random voices and random text from refText */
//global variable
let speech;
let voices, voice;
let refText, index, sentence,phrase;
var iptr = 0; // a counter for the words
var words = ["77 65 20 61 72 65 20 68 65 78 61 64 65 63 69 6d 61 6c 20 6d 61 73 6b 73","77 65 20 61 72 65 20 62 69 6e 61 72 79 20 6d 61 73 6b 73","We are the MASK DATA","01010111 01100101" , "77 65","64 61 64 61","61 72 65","6d 61 73 6b","un","one", "zero un", "uno zero uno zero zero", "zero one one"]; // some words

function setup() {

  createCanvas(48,240);
  background(0);
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
}
//add function to get the value of the proximity sensor
function presence(){
  // is there someone?
  //get the value from Arduino web server , if the value is above the treshold , talk
}
function mousePressed() {
  voices = speech.voices;
  voice = random(voices);
  console.log(voice);
   speech.setRate(0.7);
   speech.setPitch(0.8);
  speech.setVoice(voice.name);
  //speech.setVoice('Samantha'); // good voice with rate 0.7 and pitch 0.8
  // voice electro Cellos
  //speech.speak(' stay cooool'); // say something
  index = Math.floor((Math.random()*refText.length));
  phrase = refText[index];

  speech.speak (phrase); // say something from the node txt


  speech.setVoice(20); // 20 is a nice computer like voice
  speech.setRate(1);
  speech.setPitch(0.6);

  //myVoice.setVoice(42);//  56 italienne 55 Indonesia 47 allemand 37Thomas francais, 15 ou Juan male espagnol 65 chinois , 60 german? ou 'Luca'
    speech.speak(words[iptr]);
    iptr = (iptr+1) % words.length; // increment
    console.log(iptr);

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
