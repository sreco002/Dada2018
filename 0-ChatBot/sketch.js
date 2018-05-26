
// open -a "Google Chrome" --args --allow-file-access-from-files

function setup() {
  noCanvas();
  let speech = new p5.Speech();
  let speechRec = new p5.SpeechRec('en-US',gotSpeech);
  let continuous = true;
  let interim = false;

  speechRec.start(continuous,interim);

  speech.setVoice(56);
  speech.setRate(1);
  speech.setPitch(0.8);
  speech.speak('the code is binary');// say hello

  let bot = new RiveScript();
  // Load a list of files all at once script for the chatbot answers
  //var files = ['brain.rive'];
  var files = ['../0-ChatBot/brain/knockknock.rive'];
  bot.loadFile(files, botLoaded, errorLoading);

  function botLoaded() {
    console.log("Bot loaded");
    bot.sortReplies();
  }

  function errorLoading(error) {
    console.log("Error when loading rivescript files: " + error);
  }

  let button = select('#submit');
  let user_input = select('#textinput');
  let output = select('#bot');

  button.mousePressed(chat);

function gotSpeech(){
  if (speechRec.resultValue){
    let input = speechRec.resultString;
    console.log(input);
    user_input.value(input);
    let reply = bot.reply("local-user", input);
    speech.setVoice(56);

    speech.setPitch(0.8);
    speech.speak(reply);
  // output.html(reply);

  }
}

  function chat() {
    let input = user_input.value();

  }
}
