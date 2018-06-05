console.log('Side WebSErver starting !!');
var express = require('express');

var app = express();
var server = app.listen(3000, listening);// listen on that port

function  listening(){
  console.log("listening...");
  app.use(express.static('website'));// look at the "website" and get the output

}
