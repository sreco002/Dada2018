/* Shiffmann Twitter APi tuto https://www.youtube.com/watch?v=7-nX3YOC4OA */
// from  2020Bot - @twit20r  -2020botrec@gmail.com- theatredu1k

console.log("the Dada bot is dreaming");
var Twit = require('twit');
//https://github.com/ttezel/twit
var config = require ('./config');
//console.log(config);
var T = new Twit(config);

var myPythonScriptPath = '..\..\Dada-Api\DadaStory2.py';
// Use python shell
var PythonShell = require('python-shell');
var pyshell = new PythonShell(myPythonScriptPath);

pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
});

// end the input stream and allow the process to exit
pyshell.end(function (err) {
    if (err){
        throw err;
    };

});

function preload(){
poem = loadStrings('dadaPoem.txt');
console.log(poem);


}
// tweetIt();
// setInterval(tweetIt,1000*20);

//-------------------------------------

function tweetIt() {
 var r = Math.floor(Math.random() * 100);

    var tweet = {
      status : 'number of the day is '+ r + ' #theatredu1k'

      }
      //post the tweet
      T.post('statuses/update',tweet, tweeted);
    }


    function tweeted(err,data, response) {
    if (err) {
      console.log("wrong");
    } else {
      console.log("C Ok!");
       }
    }
