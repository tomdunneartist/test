const URL = "https://coolors.co/b90c09-642c0c-e4e7e6-b3ada2";
const COLS = createCols(URL);
let t;
let img;


function preload(){
  img = loadImage("img02.jpg");
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  background(100);
  let imgRatio =  min(width, height) / min(img.width,  img.height) ;
  img.resize(img.width * imgRatio , img.height * imgRatio);
  t = new SpringBox(0, 0, width, height, 0);
}

function draw() {
  background(100);
  t.update();
  t.draw();
}

const MAX_DIV = 6;


class SpringBox
{
  constructor(x, y, w, h, dc)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    
    this.targetDivRatio = 0.5;
    this.divRatio = 0.5;
    this.divCount = dc;
    this.children = [];
    this.moveTimeSpan = int(random(100,250));
    this.col = random(COLS);
    
    //springparam
    this.spMass = (w * h) / 10000;
    this.spK = 0.5;
    this.spDamp = 0.9;
    this.spVel = 0;
    
    //img
    this.img = createImage(w, h);
    this.img.copy(img, img.width/2 - width/2 + x,  img.height/2 - height/2 + y, w, h, 0, 0, w, h);
    
    if(dc < MAX_DIV)
    {
      if(dc % 2 == 0){
        this.children[0] = new SpringBox(x, y, w * 0.5, h, dc + 1);
        this.children[1] = new SpringBox(x + w  * 0.5, y, w * 0.5, h, dc + 1);
      }else{
        this.children[0] = new SpringBox(x, y, w, h   * 0.5, dc + 1);
        this.children[1] = new SpringBox(x, y + h * 0.5, w, h  * 0.5, dc + 1);
      }
    }
  }
  
  update()
  {
    this.updateDiv();
    this.updateTL(this.x, this.y, this.w, this.h);
  }
  
  updateDiv()
  {
    //divratio
    if(mouseIsPressed)this.targetDivRatio = 0.5;
    else if(frameCount % this.moveTimeSpan == 0)this.targetDivRatio = random(0.3, 0.7);
    
    //spring
    let f = this.spK * (this.targetDivRatio - this.divRatio);
    let accel = f / this.spMass;
    this.spVel  = this.spDamp * (this.spVel + accel);
    this.divRatio += this.spVel ;
    
    for(const c of this.children)c.updateDiv();
  }
  
  draw()
  {
    if(this.children.length == 0)
    {
      let sw = 10;
      noStroke();
      image(this.img, this.x, this.y, this.w + 1, this.h +1);
    }
    else
    {
      for(const c of this.children)c.draw();
    }
  }
  
  updateTL(x, y, w, h)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    if(this.children.length > 0)
    {
      if(this.divCount % 2 == 0){
        this.children[0].updateTL(x, y, w * this.divRatio, h);
        this.children[1].updateTL(x + w  * this.divRatio, y, w * (1 - this.divRatio), h);
      }else{
        this.children[0].updateTL(x, y, w, h  * this.divRatio);
        this.children[1].updateTL(x, y + h * this.divRatio, w, h  * (1 - this.divRatio));
      }
    }
  }
}

function createCols(url)
{
  let slaIndex = url.lastIndexOf("/");
  let colStr = url.slice(slaIndex +1);
  let cols = colStr.split("-");
  for(let i = 0; i < cols.length; i++)cols[i] = "#" + cols[i];
  return cols;
}
