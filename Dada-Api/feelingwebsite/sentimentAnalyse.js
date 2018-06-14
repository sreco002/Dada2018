var afinn;
function preload(){
  afinn = loadJSON('AFINN111.json');
}
function setup(){
  console.log(afinn);
  var txt = select('#txt');
  txt.input(typing);

  function typing(){

   var textinput = txt.value();
   var r = /[,.!?]+/;// characters which will split the text in sentences
   var r = " ";// characters which will split the text in sentences

   var words= textinput.split(r);// split into an array of words
   console.log(words);
   var scoreWords =[];
   var totalScore =0;
   var score = 0;

   for (var i= 0; i<words.length;i++){
     var word = words[i].toLowerCase();
     if (afinn.hasOwnProperty(word)){
       var score =afinn[word];
       totalScore += Number(score)
       scoreWords.push(word + ':'+score);
     }
   }
   var scoreP = select ('#score');
   scoreP.html('score:' +totalScore);
   var comp = select ('#comparative');
   comp.html('comparative:'  +totalScore / words.length);
   var wordlist = select('#wordlist');
   wordlist.html('words:'+ scoreWords);

  }


}
function draw(){}
