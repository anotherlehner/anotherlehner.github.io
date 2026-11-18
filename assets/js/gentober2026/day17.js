const white = [255, 255, 255];
const cyan = [255, 88, 255];
const magenta = [88, 255, 255];
const colors = [white, cyan, magenta];

class Walker {
  constructor(x,y,lowx,lowy,highx,highy) {
    this.x = x;
    this.y = y;
    this.lastx = x;
    this.lasty = y;
    this.lowx = lowx;
    this.lowy = lowy;
    this.highx = highx;
    this.highy = highy;
  }

  update() {
    this.lastx = this.x;
    this.lasty = this.y;
    if (random() < 0.5) {
      this.x += random() < 0.5 ? -5 : 5;
    } else {
      this.y += random() < 0.5 ? -5 : 5;
    }
    if (this.x < this.lowx) this.x = this.highx;
    if (this.x > this.highx) this.x = this.lowx;
    if (this.y < this.lowy) this.y = this.highy;
    if (this.y > this.highy) this.y = this.lowy;
  }

  show() {
    stroke(...random(colors), 30);
    noFill();
    line(this.x, this.y, this.lastx, this.lasty);
  }
}

let w;

function setup() {
  createCanvas(640, 640).parent('canvas-container');
  background(0);

  // frame
  stroke(127);
  noFill();
  square(120,100, 400);

  w = new Walker(120, 100, 120, 100, 120+400, 100+400);
  
  // title
  stroke(127);
  fill(127);
  textSize(16);
  text("Contraption", 10, height-10);
}

function draw() {
  w.update();
  w.show();
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("contraption.png");
  }
}