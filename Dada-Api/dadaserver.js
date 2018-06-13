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

// var fs = require('fs'); // import the library fs from node
// var data = fs.readFileSync('additional.json','utf8');
// var afinnData = fs.readFileSync('AFINN111.json');


function  listening(){
  console.log("Dada listening...");
  app.use(express.static('t1kwebsite'));// link with this website where database is listen to the request to the "website" on the port and get the output



}// end of listening
