//https://www.youtube.com/watch?v=9r8CmofnbAQ
var txt = "Le corps humain est un royaume où chaque organe veut être le roi.Y'a le coeur, la tête les couilles, ça vous le savez déjà.Mais les autres parties du corps ont aussi leur mot à dire.Chacun veut prendre le pouvoir et le pire est à venir.Il y a bien sûr la bouche qui a souvent une grande gueule .Elle pense être la plus farouche mais se met souvent le doigt dans l' œil. Elle a la langue bien pendue pour jouer les chefs du corps Elle a la langue bien pendue pour jouer les chefs du corps";

var order = 6;
var ngrams ={};
var button;

// function preload(){
// names = loadStrings('names.txt');
// console.log(names);
//
// }
function setup(){
noCanvas();
  for (var i= 0;i<=txt.length - order; i++){
    var gram = txt.substring(i, i+order);
    if (!ngrams[gram]){
      ngrams[gram] =[];
    }
  ngrams[gram].push(txt.charAt(i+order));
  }
  button = createButton('generate');
  button.mousePressed(markovIt);
  console.log(ngrams);

}


function markovIt(){
  var currentGram = txt.substring(0, order);
  var result = currentGram;
  for (var i= 0; i<100; i++){
    var possibilities = ngrams[currentGram];
    var next = random(possibilities);
    result += next;
    var len = result.length;
    currentGram = result.substring(len-order, len);
  }
  createP(result);
}
