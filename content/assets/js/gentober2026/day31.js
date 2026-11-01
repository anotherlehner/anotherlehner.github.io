const flexCyan = [88, 255, 255];
const flexMagenta = [255, 88, 255];

const flexColumns = 28;
const flexRows = 28;
let flexPoints = [];

function setup() {
    const canvas = createCanvas(640, 640) // .parent('canvas-container');
    pixelDensity(1);
    noFill();
}

function draw() {
    background(3, 7, 12);

    // AI made a mistake right here. I don't think it intended this fill to cover
    // all the grid lines because later prompts removed it
    fill(255, 88, 255, 180);

    const time = millis() / 1000;
    const forceX = width / 2 + sin(time * 0.62) * width * 0.18;
    const forceY = height / 2 + cos(time * 0.47) * height * 0.14;
    const reach = 128;

    flexPoints = [];
    for (let row = 0; row < flexRows; row++) {
        flexPoints[row] = [];
        const y = map(row, 0, flexRows - 1, 38, height - 38);

        for (let column = 0; column < flexColumns; column++) {
            const x = map(column, 0, flexColumns - 1, 38, width - 38);
            const edgeTension = sin(PI * column / (flexColumns - 1)) *
                sin(PI * row / (flexRows - 1));
            const dx = x - forceX;
            const dy = y - forceY;
            const falloff = exp(-(dx * dx + dy * dy) / (2 * reach * reach));
            const strain = falloff * edgeTension;
            const drift = sin(y * 0.014 + time * 1.2) * 9 * edgeTension;

            flexPoints[row][column] = createVector(
                x + dx * strain * 0.58 + drift,
                y + dy * strain * 0.46 + sin(x * 0.013 - time) * 7 * edgeTension
            );
        }
    }

    for (let row = 0; row < flexRows; row++) {
        const rowBlend = row / (flexRows - 1);
        const lineColor = lerpColor(color(...flexCyan), color(...flexMagenta), rowBlend);
        stroke(red(lineColor), green(lineColor), blue(lineColor), 100);
        strokeWeight(0.85);
        beginShape();
        for (let column = 0; column < flexColumns; column++) {
            const flexPoint = flexPoints[row][column];
            vertex(flexPoint.x, flexPoint.y);
        }
        endShape();
    }

    for (let column = 0; column < flexColumns; column++) {
        const rowBlend = column / (flexColumns - 1);
        const lineColor = lerpColor(color(...flexMagenta), color(...flexCyan), rowBlend);
        stroke(red(lineColor), green(lineColor), blue(lineColor), 78);
        strokeWeight(0.75);
        beginShape();
        for (let row = 0; row < flexRows; row++) {
            const flexPoint = flexPoints[row][column];
            vertex(flexPoint.x, flexPoint.y);
        }
        endShape();
    }

    push();
    noStroke();
    fill(255);
    textSize(16);
    text("Flex", 10, height - 10);
    pop();
}

function keyPressed() {
    if (key === 's') {
        saveCanvas('flex.png');
    }
}
