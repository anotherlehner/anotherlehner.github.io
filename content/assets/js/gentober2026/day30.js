const white = [255,255,255];
const cyan = [88, 255, 255];
const magenta = [255, 88, 255];
const colors = [white, cyan, magenta];

let content = "HimcWYA5ECgGvrKd8TcfCIqm1foNXRLgd9UT2wB7NKhB6nVVYX5tiqGqe4H0t/4fzdqRJJtEbkR+IKnMpRKVj2W3b5euB8xXDPhrNazYUZNxuffnHLPxkhmBA1o/ZaZnKnlHK+SSA+fann9gfsB+iBwX0XZTBv9ir+DIcy7vfXWhPn5E23vCfavze8mcsuFXPRGL0GDUmq1f+AqtfjGAbyazogtv47n9L0gsw21MrnMkP+zLVhMMwGZ6MqFQdD63FZ4Ft7W5PQTrHoKvAxYOQnIFMA5uKA7vdvFsy2FgMHVKsNmqeZzUFsPylJ/2br/M02w8lYKtXwyxhxOR/ShS0Kws8SKq6fxMNAhvS3VyVHn4249SDDXTfTU7Tj6+ZiKhtsIg3K7X4uhNaomoyl/eWARxgYz6fDGcH0+BoG40M60evDK3e0iGN+2WedoQIeUHpv657Mfw7yT6aDEzemY8Y1wtDwZ04sZXzqcrRhxzi2oRKkZTrbMx4cGNRuGGMoslzjihV+NiyPpXkgLoQZRWCdxfTlpNJXUHMt8wM+n3PG8ZmmEM1nGv58VJPhSSkauD9yC//ZWiXnSOwX+TP/4izjAMtEnscWtSY64mR3db5fTvzUH/dsALjYmbJ1crEQakjwGlQd2pazEFQoH3Vj36ZSyCv44VBOjR2L9Nmteud7c=";

async function setup() {
  createCanvas(640, 640, WEBGL).parent('canvas-container');
  background(0);
  stroke(255);
  const encoder = new TextEncoder();
  content = encoder.encode(content);
}

let t = 0.001;

function snap(byteCoordinate) {
  return 2*map(byteCoordinate, 0, 255, -320, 320);
}

function draw() {
  background(0);
  stroke(255);
  noFill();

  rotateX(PI*t);
  rotateY(PI*t);
  rotateZ(PI*t);
  t += 0.001;

  let lastx = snap(content[0]);
  let lasty = snap(content[1]);
  let lastz = snap(content[2]);
  for (let i = 0, j = 0; i < content.length; i+=3, j++) {
    let x = snap(content[i]);
    let y = snap(content[i+1]);
    let z = snap(content[i+2]);

    let dWhite = dist(content[i], content[i+1], content[i+2], ...white);
    let dCyan = dist(content[i], content[i+1], content[i+2], ...cyan);
    let dMagenta = dist(content[i], content[i+1], content[i+2], ...magenta);

    if (dWhite < dCyan && dWhite < dMagenta) {
      // Note: interestingly none of the line segments are white
      stroke(...white, 200);
    } else if (dCyan < dWhite && dCyan < dMagenta) {
      stroke(...cyan, 200);
    } else {
      stroke(...magenta, 200);
    }
    
    line(
      lastx,
      lasty,
      lastz,
      x,
      y,
      z);
    lastx = snap(content[i]);
    lasty = snap(content[i+1]);
    lastz = snap(content[i+2]);
  }
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("cookie.png");
  }
}