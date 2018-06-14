/* Shiffmann Twitter APi tuto https://www.youtube.com/watch?v=7-nX3YOC4OA */
// from  2020Bot - @twit20r  -2020botrec@gmail.com- theatredu1k

console.log("bot2.js running");
var Twit = require('twit');
//https://github.com/ttezel/twit
var config = require ('./config');
//console.log(config);
var T = new Twit(config);


// Setting up a user stream
var stream = T.stream('user');
//Anytime someone follows me
stream.on('follow', followed);

function followed(eventMsg) {
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;

  tweetIt('@'+ screenName + 'Thank you');

}







tweetIt();
setInterval(tweetIt,1000*20);
//-------------------------------------

function tweetIt() {
    var r = Math.floor(Math.random() * 100);
    var tweet = {
    status : 'here is a random number ' + r+ '#theatredu1k'
}

//  tweet 'hello world!'
//
T.post('statuses/update', tweet, tweeted);

function tweeted(err,data, response) {
    if (err) {
  console.log("wrong");
    } else {
         console.log("Done Ok!");

    }
}

}
