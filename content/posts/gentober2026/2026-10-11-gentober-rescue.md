---
title: Generativetober Day 11 - Rescue
date: 2026-10-11
---

![day picture](../../assets/gentober-day11.png)

```javascript
function setup() {
  createCanvas(640, 640);
  background(0);

  stroke(255);
  strokeWeight(1);

  let j = 0;
  for (let i = 1; i <= 38; i++) {
    j += 0.05;
    strokeWeight(noise(j));
    line(
      width/j + random(-15, 15)/j, 
      height/j + random(-15, 15)/j,
      width/j + random(-15, 15)/j, 
      height-height/j + random(-15, 15)/j);
    line(
      width-width/j + random(-15, 15)/j, 
      height/j + random(-15, 15)/j,
      width-width/j + random(-15, 15)/j, 
      height-height/j + random(-15, 15)/j);
  }

  stroke(175);
  fill(175);
  textSize(16);
  text("Rescue", 10, height-10);
}

function keyPressed() {
  if (key == 's') {
    saveCanvas("rescue.png");
  }
}
```
