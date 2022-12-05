import { P5I } from 'p5i';

export abstract class Drawable {
  initPos: [number, number];
  x: number;
  y: number;
  ghost: boolean;

  constructor(x: number, y: number) {
    this.initPos = [x, y];
    this.x = x;
    this.y = y;
    this.ghost = false;
  }

  sprite({ circle }: P5I): void { circle(0, 0, 20) }
  animate(_context: P5I, _figures: Drawable[]): void { }
  draw(context: P5I): void {
    context.push();
    context.translate(this.x, this.y);
    this.sprite(context);
    context.pop();
  }
}