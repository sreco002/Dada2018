/* Shiffmann Twitter APi tuto https://www.youtube.com/watch?v=7-nX3YOC4OA */
// from  2020Bot - @twit20r  -2020botrec@gmail.com- theatredu1k

var Twit = require('twit');
//https://github.com/ttezel/twit
var config = require ('./config');
//console.log(config);
var T = new Twit(config);

var myPythonScriptPath = 'DadaStory2.py';
// Use python shell
var PythonShell = require('python-shell');
var pyshell = new PythonShell(myPythonScriptPath);

pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    //console.log("poem is written");
});

// end the input stream and allow the process to exit
pyshell.end(function (err) {
    if (err){
        throw err;
    };

});

var fs = require('fs')
  , filename = '\T1KW/dadaPoem.txt';
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  //console.log('OK: ' + filename);
  console.log(data)
  tweetIt(data);
});





// setInterval(tweetIt,1000*20);

//-------------------------------------

function tweetIt(data) {
 //var r = Math.floor(Math.random() * 100);
var r = data;
    var tweet = {
      status : data+'@theatredu1k'
      // watch out the lenght of the post , limited to

      //#GenerativePoetry #Bot
      }
      //post the tweet
      T.post('statuses/update',tweet, tweeted);
    }


    function tweeted(err,data, response) {
    if (err) {
      console.log("too long");
    } else {
      console.log("C Ok!");
       }
    }
