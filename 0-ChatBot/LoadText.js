var txt;
function preload(){
txt = loadStrings("nodeMaskText.txt");

}
function setup(){
noCanvas();
console.log(txt);
}
