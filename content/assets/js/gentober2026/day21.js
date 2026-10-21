const white = [255, 255, 255];
const cyan = [88, 255, 255];
const magenta = [255, 88, 255];
const colors = [white, cyan, magenta];

class Walker {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.color = c;
    this.lastx = x;
    this.lasty = y;
    this.tx = random(0, 100);
    this.ty = random(999, 9999);
    this.r = width/3.5;
  }

  update() {
    this.lastx = this.x;
    this.lasty = this.y;
    if (random() > 0.5) {
      this.x += map(noise(this.tx), 0, 1, -5, 5);
    } else {
      this.y += map(noise(this.ty), 0, 1, -5, 5);
    }
    
    this.tx += 0.02;
    this.ty += 0.02;
  }

  show() {
    let centerdist = dist(this.x,this.y,width/2,height/2);
    let aph = map(centerdist, 0, this.r, 200, 0);
    if (centerdist > this.r) {
      this.x = width/2;
      this.y = width/2;
    }
    stroke(...this.color, aph);
    line(this.lastx, this.lasty, this.x, this.y);
  }
}

let walkers = [];

function setup() {
  createCanvas(640, 640).parent('canvas-container');
  background(0);
  stroke(255);

  const r = width/3.5;
  const h = height/2;
  const w = width/2;
  for (let i = 0; i < 2*PI; i += 0.08) {
    let x = r * cos(i) + w;
    let y = r * sin(i) + h;
    stroke(magenta);
    circle(x,y,1);

    if (random() < 0.5) {
      stroke(...white, 200);
      line(x, y, x + random(-75, 75), y);
    } else {
      stroke(...cyan, 225);
      line(x, y, x, y + random(-50, 50));
    }
  }

  for (let j = 0; j < 10; ++j) {
    walkers.push(new Walker(width/2, height/2, magenta));
  }
  
  noStroke();
  fill(magenta);
  textSize(16);
  text("Hero", 10, height - 10);
}

function draw() {
  for (let w of walkers) {
    w.update();
    w.show();
  }
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("hero.png");
  }
}