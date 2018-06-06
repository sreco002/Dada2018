//tutorial Shiffman Creating a Web SErver : https://www.youtube.com/watch?v=6oiabY1xpBo

var express = require('express');
var app = express();
var server = app.listen(3000, listening);// listen on that port

var fs = require('fs'); // import the library fs from node
var data = fs.readFileSync('additional.json');
var afinnData = fs.readFileSync('AFINN111.json');

var words = JSON.parse(data);//  interpret as Json
var afinn = JSON.parse(afinnData);
console.log(afinn);// display the file in the console


function  listening(){
  console.log("listening...");
  app.use(express.static('website'));// listen to the request to the "website" on the port and get the output

  app.get('/search/:word/:num',sendaWord);//get the (message request, and call back) such as  http://localhost:3000/search/crazy/3

function sendaWord(request, response){
  var data = request.params;//what are the parameters of the message
  var num = data.num;// this is one of the parameters
  var word = data.word; //another console
  var reply ="" ; // init the response to ""
  for (var i= 0;i <num; i++){
    reply += "Google is "+word+ "!";
  }
  response.send(reply);
}//end sendaWord


app.get('/add/:word/:score?',addWord);// score is optional

function addWord(request, response){
  var data = request.params;
  var word = data.word;
  var score = Number(data.score);// convert the data.score into a number)
  var reply;
  if (!score){
    var reply ={
      msg: "Score is required."
    }
    response.send(reply);
} else {
  words[word] = score; // creating a pair of word/score
  var data = JSON.stringify(words, null,2);
  fs.writeFile('additional.json',data,finished);

  function finished(err){
    console.log('all set.');
    reply = {
      word: word,
      score: score,
      status: "success"
    }
    response.send(reply);
  }
}

}
//end addWord

app.get('/all', sendAll); // get everything : http://localhost:3000/all

 function sendAll(request, response){
var data ={
  additional:words,
  afinn:afinn
}
  response.send(data);
}// end of sendAll the database

app.get('/search/:word/', searchWord);

function searchWord(request,response){
  var word = request.params.word;
  var reply;
  if (words[word]){
    reply = { status: "found",
    word : word,
    score: words[word]
  }
}else {
  reply = { status: "not found",
  word : word
  }
  }
  response.send(reply);
}

}// end of listening
