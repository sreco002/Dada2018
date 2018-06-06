// convert AFINN111txt in .json
var table ;
var afinn ={};
function preload(){
table = loadTable('AFINN111.txt', 'tsv');

}
function setup(){
noCanvas();
console.log(table);
for (var i= 0; i<table.getRowCount();i++){
  var row = table.getRow(i);
  var word = row.get(0);
  var score = row.get(1);
//  console.log(word,score);
  afinn[word] = score; // make the JS object JSON pair up : key is the word, score is the value
}
console.log(afinn);
save(afinn,'AFINN111.json');
}
function draw(){}
