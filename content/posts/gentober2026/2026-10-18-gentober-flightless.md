---
title: Generativetober Day 18 - Flightless
date: 2026-10-18
---

![day picture](../../assets/gentober-day18.png)

## Code

```javascript
const white = [255, 255, 255];
const cyan = [88, 255, 255];
const magenta = [255, 88, 255];
const colors = [white, cyan, magenta];

function setup() {
  createCanvas(640, 640);
  background(0);
  noStroke();
  
  let c = white;
  for (let i = 11; i > 0; i--) {
    c[0] -= (255-88)/12;
    fill(c);

    rect(
      width/3 + random(-100, 100),
      i * 50,
      200 + random(-100, 100),
      48
    );
  }
  
  stroke(255);
  fill(255);
  textSize(16);
  text("Flightless", 10, height-10);
}

function draw() {
  
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("flightless.png");
  }
}
```