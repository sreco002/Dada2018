/* Shiffmann Twitter APi tuto https://www.youtube.com/watch?v=7-nX3YOC4OA */
// from  2020Bot - @twit20r  -2020botrec@gmail.com- theatredu1k

console.log("the replier bot running");
var Twit = require('twit');
//https://github.com/ttezel/twit
var config = require ('./config');
//console.log(config);
var T = new Twit(config);


// Setting up a user stream
var stream = T.stream('user');
//Anytime someone follows me
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
/* // this will create a json file where all the information of the tweet will be saved
// useful to check the variable names we need
  var fs = require('fs');
  var json = JSON.stringify(eventMsg,null,2);
  fs.writeFile("tweet.json", json);
*/

var replyto = eventMsg.in_reply_to_screen_name;
var text = eventMsg.text;
var from = eventMsg.user.screen_name;
console.log(replyto + ' ' + from);

if(replyto === 'twit20r'){
  var newtweet = '@' + from + ' made me smile again! #theatredu1k';
  tweetIt(newtweet);
}
}


//-------------------------------------
function tweetIt(txt) {
    //var r = Math.floor(Math.random() * 100);
    var tweet = {
    status : txt
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
