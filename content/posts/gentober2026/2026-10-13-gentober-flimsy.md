---
title: Generativetober Day 13 - Flimsy
date: 2026-10-13
---

![day picture](../../assets/gentober-day13.png)

```javascript
const white = "#fff";
const cyan = "#55ffff";
const magenta = "#ff55ff";
const colors = [white, cyan, magenta];

function setup() {
  createCanvas(640, 640);
  background(0);
  stroke(255);

  for (let i = 0; i < 25; i++) {
    let x = width/2 + random(-250,250);
    let y = height/2 + random(-100,100);

    stroke(random([127, 167, 207, 255]));
    
    line(
      width/2 + random(-10,10), 
      height, 
      x,
      y
    );

    let randomColor = random(colors);
    stroke(randomColor);
    fill(randomColor);

    triangle(
      x,
      y,
      x+random(-50,50),
      y+random(-25,25),
      x+random(-25,25),
      y+random(-25,25)
    )
  }

  stroke(127);
  fill(127);
  textSize(16);
  text("Flimsy", 10, height-10);
}

function draw() {
  
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("flimsy.png");
  }
}
```
