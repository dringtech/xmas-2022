import { P5I } from 'p5i';
import { Drawable } from 'lib/drawable.ts';


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
    const speed = 0.01;
    const jitterScale = 500;
    const jitter = [ (noise(this.noiseSeed)), (noise(this.noiseSeed + 10000))].map(v => (v - 0.5) * jitterScale);
    const vector = [ this.target.x - this.x + jitter[0], this.target.y - this.y + jitter[1]].map(v => v * speed);
    this.x = this.x + vector[0];
    this.y = this.y + vector[1];
  }

  sprite({ circle }: P5I): void {
    circle(0, 10, 20);
    circle(0, 0, 20);
  }
}