import { Drawable } from 'lib/drawable.ts';
import { bearingToTarget, calculateVectorToTarget, rangeToTarget } from 'lib/utils/vector.ts';
import { P5I } from 'p5i';

const smallestGap = 75;
const jitterbug = 100;

const calculateRepulsion = (me: Drawable, allFiigures: Drawable[]) => {
  const them = allFiigures.filter(x => x !== me && x.ghost !== true);
  let vector = [0, 0];
  for (const other of them) {
    const range = rangeToTarget(me, other);
    if (range > smallestGap) continue;
    const bearing = bearingToTarget(me, other);
    const force = [Math.cos(bearing), Math.sin(bearing)].map(v => v * Math.max(- smallestGap / range, -100)) as [number, number];
    vector[0] += force[0];
    vector[1] += force[1];
  }
  return vector;
}

interface FigureConfig {
  name: string;
  x: number;
  y: number;
  target: Drawable;
}

export class Figure extends Drawable implements FigureConfig {
  name: string;
  running: boolean;
  target: Drawable;
  private noiseSeed: number;
  constructor(config: FigureConfig, { random }: P5I) {
    const { x, y, name = 'unnamed', target } = config;
    super(x, y);
    this.name = name;
    this.running = true;
    this.target = target;
    this.noiseSeed = random(1000);
  }
  animate({ width, noise }: P5I, figures: Drawable[]): void {
    if (!this.running) return;
    this.noiseSeed += jitterbug;
    const speed = 5;
    const jitterScale = speed * 2;
    const jitter = [(noise(this.noiseSeed)), (noise(this.noiseSeed + 10000))].map(v => (v - 0.5) * jitterScale);
    let vector = calculateVectorToTarget(this, this.target, speed);
    // if (rangeToTarget(this, this.target) < 50) vector = [0, 0];
    const repulsion = calculateRepulsion(this, figures);
    this.x = this.x + vector[0] + repulsion[0] + jitter[0];
    this.y = this.y + vector[1] + repulsion[1] + jitter[1];
  }

  sprite({ push, noFill, fill, noStroke, stroke, scale, textAlign, CENTER, text, circle, pop }: P5I): void {
    push();
    noStroke();
    fill('white');
    scale(1, -1);
    textAlign(CENTER, CENTER);
    text(this.name, 0, 0);
    noFill()
    stroke('white');
    circle(0, -20, 20);
    circle(0, 0, 30);
    pop();
  }
}