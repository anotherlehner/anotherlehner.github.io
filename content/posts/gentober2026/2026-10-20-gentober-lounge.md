---
title: Generativetober Day 20 - Lounge
date: 2026-10-20
---

![day picture](../../assets/gentober-day20.png)

## Code

```javascript
const white = [255, 255, 255];
const cyan = [88, 255, 255];
const magenta = [255, 88, 255];
const colors = [white, cyan, magenta];

function setup() {
  createCanvas(640, 640);
  background(0);
  noFill();

  let n = 100;
  let buffer = 20;
  let slice = (width - buffer) / n;
  for (let i = 0; i < n; i++) {
    stroke(...magenta, map(i, 0, n, 50, 255));
    bezier(
      slice + slice*i, 10, // anchor 1 (start)
      width/n, height/1.5, // control 1
      width-width/n, height-height/n, // control 2
      width - slice*i, height-30  // anchor 2 (end)
    );
  }
  
  noStroke();
  fill(...magenta, 175);
  textSize(16);
  text("Lounge", 10, height - 10);
}

function draw() {
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("lounge.png");
  }
}
```