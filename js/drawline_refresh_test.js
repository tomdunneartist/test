function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

var r=1;
  var wait=0;
  function draw() {
  strokeWeight (1);
    textSize (70);
    if (keyIsDown(84)) {
    text ("Random drawing ", 400, 400);
  }
  if (keyIsDown(84)) {
    text ("guesser", 500, 300);
  }
  
 wait+=1;
    strokeWeight (0.5); 
    stroke (0, 0, 255);

 r+=0.01;
    line (map(noise(r), 0.1, 0.2, 0, width), 
    map(noise(r+100), 0, 10, 0, height), 
    map(noise(r+0.02), 2, 0, 0, width), 
    map(noise(r+1000.02), 0, 1, 0, height));
}
