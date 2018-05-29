/* Shiffmann Twitter APi tuto https://www.youtube.com/watch?v=7-nX3YOC4OA */
// from  2020Bot - @twit20r  -2020botrec@gmail.com- theatredu1k

console.log("the Image bot running");
var Twit = require('twit');
//https://github.com/ttezel/twit
var config = require ('./config');
//console.log(config);
var T = new Twit(config);
var exec = require('child_process').exec;// // call the node package child_process
var fs = require('fs');// call the node package fs

tweetIt();
setInterval(tweetIt,1000*120);

//-------------------------------------

function tweetIt() {
  var cmd ='processing-java --sketch=`pwd`/Twitt_Image --run';
  exec(cmd, processing);

  function processing(){
    var fileName = 'Twitt_Image/output.png';
    var params = {
      encoding: 'base64'// How I want to read the file
    }
    var b64 = fs.readFileSync(fileName,params);//read the file made by processing
    T.post('media/upload',{media_data :b64}, uploaded);  //upload the media

    function uploaded(err,data,response){
    //This is where I will Twitt, reference the media
    var id = data.media_id_string;
    var tweet = {
      status : '#theatredu1k live from node.js',
      media_ids :[id]
      }
      //post the tweet
      T.post('statuses/update',tweet, tweeted);
    }


    function tweeted(err,data, response) {
    if (err) {
      console.log("wrong");
    } else {
      console.log("Done Ok!");
       }
    }
  }
}
