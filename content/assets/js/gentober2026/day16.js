const white = [255,255,255];
const cyan = [88, 255, 255];
const magenta = [255, 88, 255];
const colors = [white, cyan, magenta];

class Walker {
  constructor(x, y, c, g) {
    this.x = x;
    this.y = y;
    this.lastx = this.x;
    this.lasty = this.y;
    this.tx = random(0, 1000);
    this.ty = random(1000, 9999);
    this.color = c;
    this.lean = random(-1, 1);
    this.age = 0;
    this.lifespan = random(5, 23);
    this.alpha = random(127, 255);
    this.gangly = g;
  }

  update() {
    this.tx += random(0.05, 0.08);
    this.ty += random(0.01, 0.05);
    this.lastx = this.x;
    this.lasty = this.y;
    this.x += map(noise(this.tx), 0, 1, -3, 3) + this.lean;
    this.y += map(noise(this.ty), 0, 1, -2, -1); // tend up
    this.age += 0.1;
    if (this.gangly 
        && random() < 0.1 
        && this.age < this.lifespan/2 
        && this.age > this.lifespan/4) {
      this.gangly.sprout(this.x, this.y, this.color);
    }
  }

  show() {
    if (this.age < this.lifespan) {
      stroke(...this.color, this.alpha);
      strokeWeight(map(this.age, 0, this.lifespan, 5, 0));
      line(this.x, this.y, this.lastx, this.lasty);
    }
  }
}

class Gangly {
  constructor(x, y, nStrands) {
    this.x = x;
    this.y = y;
    this.nStrands = nStrands;
    this.strands = [];
    for (let i = 0; i < nStrands; i++) {
      this.strands.push(new Walker(x+random(-25,25), y, random(colors), this));
    }
  }

  sprout(x, y, c) {
    this.strands.push(new Walker(x, y, c));
  }

  update() {
    for (const strand of this.strands) {
      strand.update();
    }
  }

  show() {
    for (const strand of this.strands) {
      strand.show();
    }
  }
}

let g;

function setup() {
  createCanvas(340, 340).parent('canvas-container');
  background(0);
  showTitle();
  g = new Gangly(width/2, height, random(5, 25));
}

function showTitle() {
  stroke(255);
  fill(255);
  strokeWeight(1);
  textSize(16);
  text("Gangly", 10, height-10);
}

function draw() {
  g.update();
  g.show();
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("gangly.png");
  }
}
