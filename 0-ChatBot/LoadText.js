var txt;
function preload(){
txt = loadStrings("nodeMaskText.js");

}
function setup(){
noCanvas();
console.log(txt);
}
