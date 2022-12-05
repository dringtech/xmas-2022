import { P5I } from 'p5i';
import { Drawable } from 'lib/drawable.ts';
import { calculateVectorToTarget } from 'lib/utils/vector.ts';

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
  animate({ width, noise }: P5I): void {
    if (!this.running) return;
    this.noiseSeed += 1000;
    const speed = 5;
    const jitterScale = speed*2;
    const jitter = [ (noise(this.noiseSeed)), (noise(this.noiseSeed + 10000))].map(v => (v - 0.5) * jitterScale);
    const vector = calculateVectorToTarget(this, this.target, speed);
    this.x = this.x + vector[0] + jitter[0];
    this.y = this.y + vector[1] + jitter[1];
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