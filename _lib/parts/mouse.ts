import { P5I } from 'p5i';
import { Drawable } from 'lib/utils/drawable.ts';
const DEBUG = false;

export class Mouse extends Drawable {
  constructor(x: number, y: number) {
    super(x, y);
    this.ghost = true;
  }
  sprite({ push, noFill, stroke, strokeWeight, circle, line, pop }: P5I): void {
    if (!DEBUG) return;
    push();
    noFill();
    stroke('red');
    strokeWeight(5);
    circle(0, 0, 50);
    line(-40, 0, 40, 0);
    line(0, -40, 0, 40);
    pop();
  };
}