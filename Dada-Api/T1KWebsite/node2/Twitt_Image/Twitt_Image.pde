void setup() {
  size(640, 480);
  for ( int i = 0; i<500; i++) {
    float x = random(width);
    float y = random(height);
    float r = map(millis(),0,1000,255,100);
    float g = random(100, 255);
    float b = random(100, 255);
    float radius = map(second(),0,60,20,64);
    noStroke();
    fill(r, g, b);
    ellipse(x, y, radius, random(6,64));
    
  }
  save("output.png");
  //exit();
}