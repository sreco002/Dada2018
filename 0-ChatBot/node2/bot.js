/* Shiffmann Twitter APi tuto https://www.youtube.com/watch?v=7-nX3YOC4OA */
console.log("bot.js running");

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
var params ={ q: 'computational art',
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
