const white = [255,255,255];
const cyan = [88, 255, 255];
const magenta = [255, 88, 255];
const colors = [white, cyan, magenta];

function showTitle() {
  stroke(75);
  fill(75);
  textSize(16);
  text("Beacon", 10, height - 10);
}

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = random(colors);
    this.isBeacon = false;
    this.tbright = random(0, 10000);
    this.alph = random(50, 255);
  }

  setBeacon(isBeacon) {
    this.isBeacon = isBeacon;
  }

  update() {
  }

  show() {
    stroke(...this.color, this.alph);
    circle(this.x, this.y, random());
    if (this.isBeacon) {
      stroke(...this.color, random(0, 255));
      const n = random(0,5);
      line(this.x - n, this.y, this.x + n, this.y);
      line(this.x, this.y - n, this.x, this.y + n);
    }
  }
}

const stars = [];

function setup() {
  createCanvas(640, 640).parent('canvas-container');
  background(0);

  for (let i = 0; i < 100; i++) {
    stars.push(new Star(random(0,width), random(0,height)));
  }

  random(stars).setBeacon(true);
  
  showTitle();
}

function draw() {
  background(0);
  
  for (let s of stars) {
    s.update();
    s.show();
  }

  showTitle();
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("beacon.png");
  }
}