
//Shiffmann Coding Challenge 86 #86: Cube Wave by Bees and Bombs
//https://www.youtube.com/watch?v=H81Tdrmz2LA
let w = 24;
let angle = 0;
let ma;
let maxD;
function setup(){
    createCanvas(400,400, WEBGL);
    ma = atan(1/sqrt(2));
    maxD = dist(0,0,200,200);
}

function draw() {
    
    background(100);
    ortho(400,-400,400,-400,0,1000);
    //directionalLight(255,255,255,0,-1,0)
  
    strokeWeight(0.1);
    stroke(51);
//    rotateX(-QUARTER_PI);
//    rotateY(ma);
   
    rotateX(-ma);
    rotateY(-QUARTER_PI);
    
  
    //rotateX(angle*0.25);
    let offset = 0;
    for ( let z= 0; z<height; z += w){
        for ( let x= 0; x<width; x += w){
        push();
        let d= dist(x,z,width/2,height/2);
        let offset = map(d,0,maxD,-PI,PI);
        let a = angle +offset;
        let h = floor(map(sin(a),- 1,1,100,300));// up down
       //let h = w;
        translate(x-width/2,0,z-height/2);
        //ambientMaterial(255);
        normalMaterial(255);
        box(w -2,h,w-2);
           
        pop();
}
          
       // offset+= 0.1;
      
   }
    angle-=0.124;
}
