/* Shiffmann Twitter APi tuto https://www.youtube.com/watch?v=7-nX3YOC4OA */
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/v0CHV33wDsI
/* output random voices and random text from refText */


console.log("TwitterTalk.js running");

//global variable
let speech;
let voices, voice;
let refText, index, sentence,phrase;
var iptr = 0; // a counter for the words
var words = ["We are the MASK DATA","0111011101100101", "01101110011001010111010001110111011011110111001001101011","01101101011000010111001101101011", "un","one", "zero un", "uno zero uno zero zero", "zero one one"]; // some words


var fs = require ('fs');
// var dataFile = fs.readFileSync('words.json');
// var words = JSON.parse(dataFile);
// console.log(words);

var Twit = require('twit');
//https://github.com/ttezel/twit
var config = require ('./config');
//console.log(config);
var T = new Twit(config);
//
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//
var params ={ q: 'I am happy+OR + i+love+you +happiest ',
              lang: "en",
               count: 1
           }

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    var tweets = data.statuses;
    for (var i= 0; i< tweets.length; i++){

      // fs.writeFile('words.json',tweets[i].text, finished);
      // function finished(err){
      //   console.log('all set.');
    //}


  console.log(tweets[i].text);
}
  //  console.log(data);
}



function setup() {

  createCanvas(400, 100);
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
  speech.setRate(0.9);
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
