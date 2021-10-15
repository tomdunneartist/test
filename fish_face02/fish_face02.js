var gl,noctaves,c,t,lt,running;
let img;
function preload() {
  img = loadImage('img01.jpg');
}
function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight,WEBGL);
  gl=this.canvas.getContext('webgl');
  gl.disable(gl.DEPTH_TEST);
  noctaves=1;
  running=false;
  lt=random(100);
  img.resize(width,height);
  c=[];
  initc();
  test=new p5.Shader(this._renderer,vert,frag);//shaders are loaded
  shader(test);//shaders are applied  
}
function initc(){
  for(var i=0;i<22;i++){
    c[i]=random(-2,2);
  }
}
function mouseMoved(){
  if(random(1)>.95 &&!running){
    t=millis();
    lt+=t;
    initc();
    running=true;
  }
  running=true;
}
function draw() {    
  test.setUniform("iResolution", [width,height]);//pass some values to the shader
  test.setUniform("iTime", millis()*.001);
  test.setUniform('iMouse',[mouseX,mouseY]);
  test.setUniform("iImg",img);
  test.setUniform("c",c);
  
  if(running){
    t++;
    if(t>=lt){
      running=false;
      lt=random(50);
    }
  }
  test.setUniform("running",running);
  shader(test);
  box(min(width,height));
}
function mouseReleased(){
  noctaves=(noctaves>=7)?1:noctaves+2;
  if(noctaves==1)initc();
}
