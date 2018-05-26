
let speech;
let voice;
let voices;

function setup() {
  createCanvas(400,100);

   speech = new p5.Speech(voiceReady);
   speech.startSpeaking;

   speech.speak('Good Night!');
   speech.endSpeaking;

   function startSpeaking(){
   background(0,255,0);
    }
  function endSpeaking(){
   background(0);
  }

  function voiceReady(){
  console.log(speech.listvoices);
}
}
function mousePressed(){
  voices = speech.voices;
  voice = random(voices);
  console.log(voices);
  speech.setVoice(voice.name);
   speech.speak('Good morning!');
}
