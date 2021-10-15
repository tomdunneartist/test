/**
*REGARD
*sketch de jacques maire
*le 24/04/2021 modifié le 27/04/2021
*/
var limage; 
var coord=[]; 
var v0,v1,v2,v3;
var dheight, dwidth;
var axe, depart, eye;
var angleR, angles;
var cotw,coth;
var nbw,nbh;
var pas;
var compteur;
var plus;
var limage;
function preload(){
limage=loadImage('/img02.jpg');
}

function setup() {
    createCanvas(windowWidth,windowHeight,WEBGL);
 compteur=0.0;
   fill(0,100,200);
   cotw=180;w2=cotw;
   coth=90;h2=coth;
   nbw=19;
   nbh=9;
    nbp=56;
    pas=20;
    dheight=pas*nbh;
    dwidth=pas*nbw;  
    image(limage, 0, 0);
    let wid=limage.width;
    let hei=limage.height;
   compteur=0;
    angleR=createVector(1.1, 0, 1.3);
    angles=createVector(0,0,0);
    var coord=new Array(nbw);
    for(let i=0;i<nbw;i++){
      coord[i]=new Array(nbh);}
}


function draw() {
    background(245,59,59);
  compteur+=0.021+0.0002*cos(frameCount*0.00001);
  camera(20, 20, 1000, 20, 20, 0, 0, 1, 0);
  rotateY(0.2+0.25*((frameCount%0.001 )));
  //ambientLight(155,255,220);
  //pointLight(250, 250, 0, 0, 0, 350);

    
 
      
  for(let x = 0; x < (cotw-pas); x+=pas) {
  for(let y =0; y <  (coth-pas); y+=pas) {
    beginShape(TRIANGLE_STRIP);
  
      texture(limage);
    v0=coteTerrain(x,y);
     v1=coteTerrain(x,(y+pas));
     v2=coteTerrain(x+pas,y+pas);
     v3=coteTerrain(x+pas,y);
       vertex(v1.x-w2,v1.y-h2,v1.z, x/(cotw-pas) , (y+pas)/(coth-pas));
       vertex(v0.x-w2,v0.y-h2,v0.z, x/(cotw-pas) , y/(coth-pas));
       vertex(v2.x-w2,v2.y-h2,v2.z,(x+pas)/(cotw-pas) ,(y+pas)/(coth-pas));
      vertex(v3.x-w2,v3.y-h2,v3.z, (x+pas)/(cotw-pas), y/(coth-pas));
   endShape();
    
  }}
}

function coteTerrain( x,  y) {
  var nx= map(x,0, dwidth, 0, cotw);  
  var ny= map(y, 0, dheight, 0, coth);
  var xfil = noise(compteur+nx, compteur+ny);
  var yfil=noise(compteur+nx, compteur+ny);
  var afil=noise(abs(cos(3.0*nx)*cos(
  compteur)), abs(sin(3.0*ny)*sin(compteur)) );
 let vv=createVector(x, y, afil);
  return  olinde(createVector(xfil, yfil, afil), afil,vv );
}



function olinde( ax, ph,  v0) {
  var vv=p5.Vector.mult(ax,0.1*(1-cos(ph)));
  var ww=p5.Vector.dot(vv,v0);
 var res=comb(3.0*cos(ph), v0,2.0*ww, ax);
 var axcro=p5.Vector.cross(ax,v0);
 var croix=p5.Vector.mult(axcro, sin(ph));
  return p5.Vector.add(res, croix);
}

function comb(a1,v1,a2,v2) {
  return p5.Vector.add(p5.Vector.mult(v1, a1), p5.Vector.mult(v2, a2));
}


function repere( ll,  ee) {
  noStroke();
  push();
  translate(ll, 0, 0);
  fill(255, 0, 0);
  box(ll*2.0, ee, ee);
  pop();
  push();
  translate(0, ll, 0);
  fill(0, 255, 0);
  box(ee, ll*2.0, ee);
  pop();
  push();
  translate(0, 0, ll);
  fill(0, 0, 255);
  box(ee, ee, ll*2.0);
  pop();
}
