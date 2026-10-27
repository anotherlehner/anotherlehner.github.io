const white = [255,255,255];
const cyan = [88, 255, 255];
const magenta = [255, 88, 255];
const colors = [white, cyan, magenta];

function getPerpendicularEndpoint(x, y, lastX, lastY, length, direction = 'ccw') {
  const dx = lastX - x;
  const dy = lastY - y;
  const dst = Math.hypot(dx, dy);

  // Avoid division by zero if points are identical
  if (dst === 0) return { x, y };

  // Perpendicular unit vector
  let ux, uy;
  if (direction === 'ccw') {
    ux = -dy / dst;
    uy = dx / dst;
  } else {
    ux = dy / dst;
    uy = -dx / dst;
  }

  return {
    x: x + ux * length,
    y: y + uy * length
  };
}

class Zipper {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lastx = x;
    this.lasty = y;
    this.dirx = random([-1, 1]);
    this.diry = random([-1, 1]);
    this.alph = 255;
    this.dira = -1;
    this.color = white;
  }

  update() {
    this.alph += this.dira;
    stroke(...this.color, this.alph);
    this.lastx = this.x;
    this.lasty = this.y;
    
    this.x += this.dirx * 5;
    
    this.y += this.diry * 7;

    if (this.x >= width-30 || this.x <= 30) {
      this.dirx *= -1;
      this.x = random(30,width-30);
      this.lastx = this.x;
      this.color = random(colors);
    }
    if (this.y >= height-30 || this.y <= 30) {
      this.diry *= -1;
      this.y = random(30,height-30);
      this.lasty = this.y;
      this.color = random(colors);
    }
    if (this.alph >= 255 || this.alph <= 0) {
      this.dira *= -1;
    }
  }

  show() {
    line(this.x, this.y, this.lastx, this.lasty);
    
    const p2 = getPerpendicularEndpoint(this.x, this.y, this.lastx, this.lasty, 6, 'ccw');
    line(this.x, this.y, p2.x, p2.y);

    const p3 = getPerpendicularEndpoint(this.x, this.y, this.lastx, this.lasty, 6, 'right');
    line(this.x, this.y, p3.x, p3.y);
  }
}

let z;

function setup() {
  createCanvas(640, 640).parent('canvas-container');
  background(0);
  stroke(255);

  z = new Zipper(width/2, height/2);

  noStroke();
  fill(255);
  textSize(16);
  text("Zip", 10, height-10);
}

function draw() {
  z.update();
  z.show();
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("zip.png");
  }
}