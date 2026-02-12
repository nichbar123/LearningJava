let particles = [];
const NUM_PARTICLES = 2000;
const NOISE_SCALE = 0.002;
const NOISE_STRENGTH = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Different every run
  noiseSeed(floor(random(100000)));
  randomSeed(floor(random(100000)));

  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  // Feedback fade (IMPORTANT)
  fill(0, 20);
  noStroke();
  rect(0, 0, width, height);

  stroke(
  noise(frameCount * 0.01) * 255,
  200,
  255,
  100
);
;

  for (let p of particles) {
    p.update();
    p.show();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.speed = random(0.5, 2);
  }

  update() {
    let angle =
      noise(
        this.pos.x * NOISE_SCALE,
        this.pos.y * NOISE_SCALE,
        frameCount * 0.0005
      ) *
      TWO_PI *
      NOISE_STRENGTH;

    let force = p5.Vector.fromAngle(angle);
    this.vel.add(force);
    this.vel.limit(this.speed);
    this.pos.add(this.vel);

    // Wrap edges
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }

  show() {
    point(this.pos.x, this.pos.y);
  }
}
