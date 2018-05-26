// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/v0CHV33wDsI

let speech;
let voices, voice;
function setup() {
  createCanvas(400, 100);
  background(0);

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
  console.log(random(voices));
   speech.setRate(0.7);
   speech.setPitch(0.8);
  speech.setVoice('voice.name');
  //speech.setVoice('Samantha'); // good voice with rate 0.7 and pitch 0.8
  var txt;
  txt = loadStrings("nodeMaskText.js");
//  speech.speak(' Do I  love you?'); // say something
//  speech.speak(' Do I know you? I am the mask dada data'); // say something
  speech.speak(txt[1]); // say something

}

function loadText(){
  var txt;
  txt = loadStrings("nodeMaskText.js");
  console.log(txt);
  }
