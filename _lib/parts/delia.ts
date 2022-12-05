import { P5I } from 'p5i';
import { Drawable } from "lib/utils/drawable.ts";
import { calculateVectorToTarget } from 'lib/utils/vector.ts';

const DEBUG = false;


export class Delia extends Drawable {
  private target: Drawable;
  private vector: [number, number];
  constructor(x: number, y: number, target: Drawable) {
    super(x, y);
    this.target = target;
    this.vector = [0, 0];
  }
  sprite({ text, fill, noStroke, line, push, pop, scale, textAlign, CENTER }: P5I): void {
    push();
    DEBUG && line(0, 0, this.vector[0], this.vector[1]);
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    scale(1, -1);
    text('Delia', 0, 0);
    pop();
  }
  animate({ }: P5I): void {
    const speed = 20;
    this.vector = calculateVectorToTarget(this, this.target, speed);
    this.x = this.x + this.vector[0];
    this.y = this.y + this.vector[1];
  }
}