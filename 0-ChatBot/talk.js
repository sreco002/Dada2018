// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/v0CHV33wDsI
//global variable
let speech;
let voices, voice;
let txt, index, sentence,phrase;

function setup() {

  createCanvas(400, 100);
  background(0);
  txt = loadStrings("nodeMaskText.txt");

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
  index = Math.floor((Math.random()*txt.length));
  phrase = txt[index];
  speech.speak (phrase); // say something from the node txt
//  speech.speak(' Do I know you? I am the mask dada data'); // say something

}

function loadText(){
  var txt;
  txt = loadStrings("nodeMaskText.txt");
  console.log(txt);
  }
  function returnSentence(){
  //  index = Math.floor((Math.random()*txt.length));
    index = 5;
    phrase = txt[index];
    console.log(phrase);
    return phrase;
  }
