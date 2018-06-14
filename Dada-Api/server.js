//tutorial Shiffman Creating a Web SErver : https://www.youtube.com/watch?v=6oiabY1xpBo
// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010
// https://www.npmjs.com/package/sentiment

var express = require('express');
var bodyParser = require ('body-parser');
var app = express();
var server = app.listen(3000, listening);// listen on that port

var fs = require('fs'); // import the library fs from node
var data = fs.readFileSync('additional.json','utf8');
var afinnData = fs.readFileSync('AFINN111.json');

var additional = JSON.parse(data);//  interpret as Json
var afinn = JSON.parse(afinnData);
//console.log(afinn);// display the file in the console


function  listening(){
  console.log("listening...");
  app.use(express.static('T1KW'));// will launch the index.html from this website , listen to the request to the "website" on the port and get the output


  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());

  app.post('/analyze', analyzeThis);
  function analyzeThis(request,response){
    var txt = request.body.txt;
    var words = txt.split(/\W+/);// anything which is not AtoZ or 0 to 9
    var totalScore = 0;
    var wordlist =[];
    for (var i = 0;i<words.length;i++){
      var word = words[i];
      var score = 0;
      if(additional.hasOwnProperty(word)){
        score = Number(additional[word]);
      } else if(afinn.hasOwnProperty(word)){
        score = Number(afinn[word]);
        }
      totalScore+= score;
    }
    var comp = totalScore /words.length;
    var reply= {
      score:totalScore,
      comparative:comp
    }
    response.send(reply);
  }


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


    app.get('/add/:word/:score?',addWord);// score? means score is optional
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
        additional[word] = score; // creating a pair of word/score
        var data = JSON.stringify(additional, null,2);
        fs.writeFile('additional.json',data,finished);
        function finished(err){
          console.log('all set.');
          reply = {
            word: word,
            score: score,
            status: "success"
          }
          response.send(reply);
        }// end of finished(err)
      }// end else

    }//end addWord

    app.get('/all', sendAll); // get everything : http://localhost:3000/all
    function sendAll(request, response){
      var data ={
        additional:additional,
        afinn:afinn
      }
      response.send(data);
    }// end of sendAll the database

    app.get('/search/:word/', searchWord);
    function searchWord(request,response){
      var word = request.params.word;
      var reply;
      if (additional[word]){
        reply = { status: "found",
        word : word,
        score: additional[word]
        }
      }else {
        reply = { status: "not found",
        word : word
        }
      }
      response.send(reply);
    }// end of searchWord

}// end of listening
