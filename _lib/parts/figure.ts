import { Drawable } from "lib/utils/drawable.ts";
import {
  bearingToTarget,
  calculateVectorToTarget,
  rangeToTarget,
} from "lib/utils/vector.ts";
import { Image, P5I } from "p5i";

const smallestGap = 75;
const jitterbug = 100;

const calculateRepulsion = (me: Drawable, allFiigures: Drawable[]) => {
  const them = allFiigures.filter((x) => x !== me && x.ghost !== true);
  const vector = [0, 0];
  for (const other of them) {
    const range = rangeToTarget(me, other);
    if (range > smallestGap) continue;
    const bearing = bearingToTarget(me, other);
    const force = [Math.cos(bearing), Math.sin(bearing)].map((v) =>
      v * Math.max(-smallestGap / range, -100)
    ) as [number, number];
    vector[0] += force[0];
    vector[1] += force[1];
  }
  return vector;
};

interface FigureConfig {
  name: string;
  x: number;
  y: number;
  target: Drawable;
  head: Image;
}

export class Figure extends Drawable implements FigureConfig {
  name: string;
  running: boolean;
  target: Drawable;
  head: Image;
  private noiseSeed: number;
  private initPos: [number, number];
  private wait: boolean;

  constructor(config: FigureConfig, { random, width, height }: P5I) {
    const { x, y, name = "unnamed", target, head = undefined } = config;
    super(x * width, y * height);
    this.name = name;
    this.running = true;
    this.target = target;
    this.head = head;
    this.noiseSeed = random(1000);
    this.initPos = [x, y];
    this.wait = false;
  }

  animate({ noise, width, height }: P5I, figures: Drawable[]): void {
    if (this.target.active && rangeToTarget(this, this.target) < 40) {
      this.makeDrop();
    }
    const target = (this.target.active || this.wait === true)
      ? this.target
      : new Drawable(this.initPos[0] * width, this.initPos[1] * height);
    if (!this.running) return;
    this.noiseSeed += jitterbug;
    const speed = width / 200;
    const jitterScale = 10;
    const jitter = [noise(this.noiseSeed), noise(this.noiseSeed + 10000)].map(
      (v) => (v - 0.5) * jitterScale,
    );
    const vector = calculateVectorToTarget(this, target, speed);
    // if (rangeToTarget(this, this.target) < 50) vector = [0, 0];
    const repulsion = calculateRepulsion(this, figures);
    this.x = this.x + vector[0] + repulsion[0] + jitter[0];
    this.y = this.y + vector[1] + repulsion[1] + jitter[1];
  }

  makeDrop() {
    this.target.drop();
    this.wait = true;
    setTimeout(
      (me) => {
        me.wait = false;
      },
      2000,
      this,
    );
  }

  sprite(
    {
      push,
      fill,
      noStroke,
      scale,
      textAlign,
      CENTER,
      text,
      circle,
      pop,
      image,
      imageMode,
      translate,
    }: P5I,
  ): void {
    push();

    noStroke();
    fill("white");
    scale(1, -1);
    textAlign(CENTER, CENTER);
    text(this.name, 0, 30);
    circle(0, 0, 30);
    imageMode(CENTER);

    push();
    translate(0, -20);
    scale(0.3);
    if (this.head) image(this.head, 0, 0);
    scale(1);
    pop();
    pop();
  }
}
