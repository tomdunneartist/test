let sh;
let gra;
let font;
let str = "tomcat.studio";

function preload(){
  font = loadFont("Inter-Bold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);
  gra = createGraphics(width,height);
  
  gra.noStroke();
  gra.fill(255);
  gra.textFont(font);
  let tSize = 50;
  gra.textSize(tSize);
  const tw = gra.textWidth(str);
  tSize = tSize/tw * gra.width;
  gra.textSize(tSize);
  gra.textAlign(LEFT,TOP);

  //shader
  sh = createShader(vert,frag);
  this.shader(sh);
  sh.setUniform("u_resolution", [width*pixelDensity(),height*pixelDensity()]);
  sh.setUniform("u_tex", gra);
  noStroke();  
}

function draw() {
  gra.background(0);
  const tSize = gra.textSize();
  const lineHeight = tSize * 0.8;
  const cycle = 120;
  const frameRatio = (frameCount % cycle) / cycle;
  
  let offY = frameRatio * lineHeight;
  for(let y = -tSize; y < gra.height + tSize; y += lineHeight){
    gra.text(str,0,y + offY);  
  }
  sh.setUniform("u_time", millis()/1000);
  rect(-width/2,-height/2,width,height);
}
