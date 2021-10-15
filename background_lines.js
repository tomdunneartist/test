const CYCLE = 500;
let cols = createCols("https://coolors.co/F0F0F0-6C757D-343A40-656565");
let bgCol = cols[0];
let lineCol = cols.splice(1,cols.length-1);
  
function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);
  let dep = max(width,height);
  ortho(-width / 2, width / 2, -height / 2, height / 2,-dep*3 , dep*3);
}

function draw() {
  randomSeed(0);
  background(bgCol);
  const cycle = CYCLE;
  let fr = (frameCount % cycle)/cycle;
  let size =min(height,width)*1.8;
  let num = 2;
  let span = size/num;
  rotateX(-PI/10);
  //rotateY(fr*TAU);
  rotateY(-PI/6);
  let count = 0;
  for(let z = -size/2; z < size/2; z += span)
  {
    let radOffset = map(z, -size/8, size/8, 0, TAU);
    let waveRatio = map(abs(z), 0, size/2, 0.5, 0);
    push();
    translate(0,0,z);
    wavedLinePlane(size,size*0.1,sin(radOffset + fr * TAU)*0.5,10,lineCol[int(count + frameCount*0) % lineCol.length]);
    pop();
    count ++;
  }
}

function wavedLinePlane(w,h,waveHeightRatio,sw,sc)
{
  strokeWeight(sw);
  noStroke();
  fill(bgCol);
  wavedPlane(w,h,waveHeightRatio,false);
  stroke(sc);
  noFill();
  wavedPlane(w,h,waveHeightRatio,true);
}

function wavedPlane(w,h,waveHeightRatio, isStroke)
{
  const cycle = CYCLE/2;
  const vertNum = 50;
  let fr = (frameCount % cycle)/cycle;
  const span = w/vertNum;
  
  if(isStroke)beginShape();
  else beginShape(TRIANGLE_STRIP);
  for(let x = -w/1; x <= w/1; x += span)
  {
    let radOffset = map(x, -w/2, w/2, 0, TAU*2);
    let maxWaveH = h * 0.5 * waveHeightRatio;
    let waveH = sin(fr * TAU + radOffset) * maxWaveH;
    let y = waveH - maxWaveH;
    if(!isStroke)vertex(x,h,0);
    vertex(x,y,0);
  }
  
  if(!isStroke)vertex(w/2, h,0);
  endShape();
}

function createCols(_url)
{
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}
