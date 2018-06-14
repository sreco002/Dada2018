/* Program to draw a cosine wave */
var lambda;
var ampl;

function setup(){

   createCanvas(800, 800);
   
   lambda = width / 4;
   ampl = 100;
   
   pixelDensity(1);
   noLoop();
}

function draw(){
   
   background(0);
   fill(255);
   ellipseMode(CENTER);
     
    for(var i = 0; i < width; i++){
      var y = ampl * Math.cos(2 * Math.PI * i / lambda);
      ellipse(i, height/2 - y, 4, 4);  
   }
}