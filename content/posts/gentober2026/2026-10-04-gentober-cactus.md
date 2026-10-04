---
title: Generativetober Day 4 - Cactus
date: 2026-10-04
---

![day picture](../../assets/gentober-day4.png)

```javascript
const white = "#fff";
const cyan = "#55ffff";
const magenta = "#ff55ff";

function cactus(x,y, baseHeight, distance) {
  // saguaro-like cactus with random number of arms
  if (distance >= 4) {
    stroke(white);
  } else if (distance >= 2) {
    stroke(cyan);
  } else {
    stroke(magenta);
  }

  strokeWeight(1.5 / distance);

  let dy = baseHeight+random(25,100);
  let cHeight = dy;

  // spine
  line(x,y, x, y-dy);

  // arms
  const nArms = random(1, 4);
  for(let i=1; i <= nArms; i++) {
    let xpos = x + random(-cHeight/4, cHeight/4);
    let y1 = y - 0.30*cHeight;
    let y2 = y1 - random(cHeight/6, cHeight/3);
    line(xpos, y1, xpos, y2);
    line(xpos, y1, x, y1+10);
  }
}

function setup() {
  createCanvas(640, 640);
  background(0);

  // sketch name
  noFill();
  stroke(255);
  strokeWeight(1);
  textSize(15);
  text("Cactus", 10, height-10);

  
  let cga = [white, cyan, magenta];

  // landscape
  for (let y=400, x=0, z=0.25; y < 620; y+=10, x+=10, z+=0.06) {
    strokeWeight(z);
    if (y < 575) {
      stroke(y < 475 ? white : cyan);
      line(x*5+random(0,100), y, 200 + random(100,200), y);
    } else {
      stroke(magenta);
      line(x*3 + random(-200, -350), y, x*4, y);
    }
  }

  // cactus
  for (let nc = 0, d = 5; nc < 5; nc++, d--) {
    cactus(random(0,600), 400 + nc*50, 100*nc+100, d);
  }
}

function keyPressed() {
  if (key == 's') {
    saveCanvas("day4.png");
  }
}
```
