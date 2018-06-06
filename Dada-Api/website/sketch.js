function setup(){
  createCanvas(640,480);

  console.log('running');
  var button = select('#submit');
  button.mousePressed(submitWord);


function submitWord(){
    word = select('#word').value();
    score = select('#score').value();
    console.log(word, score);
    loadJSON('add/'+word+'/'+score, finished);// get request Json to send data to the server.js function to add the word and the score
    function finished(data){
      console.log(data);

    }

  }

}//end setup

function gotData(data){
    background(121);
  console.log(data);
  var keys = Object.keys(data);
  for (var i=0;i <keys.length;i++){
    var word = keys[i];
    var score = data[word];
    var x = random(width);
    var y = random(height);
    fill (255);
    textSize(map(score,0,10,0,64));
    text(word,x,y);
  }
  console.log(keys);
}
