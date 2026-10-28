const white = [255,255,255];
const cyan = [88, 255, 255];
const magenta = [255, 88, 255];
const colors = [white, cyan, magenta];

class Atrophy {
  constructor(x, y, c, a, decayRate=1) {
    this.x = x;
    this.y = y;
    this.color = c;
    this.lastx = x;
    this.lasty = y;
    this.alph = a;
    this.decayRate = decayRate;
  }

  update() {
    this.lastx = this.x;
    this.lasty = this.y;
    this.x += random(-2,2);

    if (random() < 0.5) {
      this.y += random(0,2);
    } else {
      this.y += random(-2,2);
    }
  }

  show() {
    this.alph -= this.decayRate;
    if (this.alph > 0) {
      stroke(...this.color, this.alph);
      line(this.x, this.y, this.lastx, this.lasty);
    }
  }
}

let a;
let as = [];

function setup() {
  createCanvas(640, 640).parent('canvas-container');
  background(0);
  noFill();
  stroke(white);

  for (let i = 1; i < 300; i += i) {
    stroke(...white, i);
    for (let j = 1; j < i; j += 10) {
      circle(width/2+j+random(-2,2), height/2+50+i+random(-2,2), 1);
      circle(width/2-j+random(-2,2), height/2+50+i+random(-2,2), 1);
    }
  }

  stroke(white);
  for (let j = 1; j < 6; j++) {
    let r = j*80;
    let cx = width/2;
    let cy = height/2+50;
    for (let i = PI; i < 2*PI; i += 0.075) {
      let x = r*cos(i) + cx;
      let y = r*sin(i) + cy;
      let c;
      if (j == 1 || j == 2 || j == 3) {
        c = white;
      } else if (j == 4) {
        c = cyan;
      } else {
        c = magenta;
      }
      as.push(new Atrophy(x, y, c, map(j, 1, 4, 50, 255), 1/j+0.2));
    }
  }

  noStroke();
  fill(255, 127);
  textSize(16);
  text("Trophy", 10, height-10);
}

function draw() {
  for (let a of as) {
    a.update();
    a.show();
  }
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("trophy.png");
  }
}