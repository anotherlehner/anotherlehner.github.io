const white = [255,255,255];
const cyan = [88, 255, 255];
const magenta = [255, 88, 255];
const colors = [white, cyan, magenta];

class Walker {
  constructor(x, y, c, leftbound, rightbound, topbound, botbound) {
    this.x = x;
    this.y = y;
    this.leftbound = leftbound;
    this.rightbound = rightbound;
    this.topbound = topbound;
    this.botbound = botbound;
    this.color = c;
    this.tx = 0;
    this.ty = 10000;
    this.visited = [];
  }

  update() {
    this.tx += 0.01;
    this.ty += 0.01;
    this.x += map(noise(this.tx), 0, 1, -5, 5);
    this.y += map(noise(this.ty), 0, 1, -3, 3);
    
    if (this.x < this.leftbound) this.x = this.leftbound;
    else if (this.x > this.rightbound) this.x = this.rightbound;

    if (this.y < this.topbound) this.y = this.topbound;
    else if (this.y > this.botbound) this.y = this.botbound;

    if (random() < 0.25) {
      this.visited.push([this.x,this.y]);
    }
  }

  show() {
    stroke(0, 55);
    for (let i = 0; i < this.visited.length; ++i) {
      // hack for line length, replace with width probably
      line(this.visited[i][0]-50, this.visited[i][1], 
           this.visited[i][0]+50, this.visited[i][1]);
    }
  }
}

class Dapper {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.walker = new Walker(x+w/2, y+h, 0,
                            10+w/2, // left boundary
                            width-w/2-10, // right boundary
                            height/2, // top boundary
                            height-10); // bottom boundary
  }

  update() {
    this.walker.update();
    this.x = this.walker.x - this.w/2;
    this.y = this.walker.y - this.h;
  }

  show() {
    // path
    this.walker.show();
    
    // body
    stroke(0);
    fill(0);
    rect(this.x, this.y, this.w, this.h);

    // undercolor
    stroke(255);
    fill(255);
    triangle(this.x, this.y + this.h/4,
            this.x+this.w, this.y + this.h/4,
            this.x+this.w/2, this.y + this.h/1.5);
    const underheight = (this.y + this.h/1.5) - (this.y + this.h/4);

    // accents
    stroke(magenta);
    fill(magenta);
    const centerline = this.x + this.w/2;
    const accenty = this.y + this.h/4 + underheight/9;
    const accentwidth = this.w / 10;
    const accentheight = accentwidth / 1.5;
    triangle(centerline, accenty,
            centerline-accentwidth, accenty - accentheight,
            centerline-accentwidth, accenty + accentheight);
    triangle(centerline, accenty,
            centerline+accentwidth, accenty - accentheight,
            centerline+accentwidth, accenty + accentheight);
  }
}

let d;

function setup() {
  createCanvas(640,640).parent('canvas-container');
  background(cyan);
  d = new Dapper(width/3, height/2-100, 100, 200);
}

function draw() {
  background(cyan);
  d.update();
  d.show();

  stroke(255);
  fill(0);
  textSize(16);
  text("Dapper", 10, height - 10);
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("dapper.png");
  }
}