import { P5I } from 'p5i';

export abstract class Drawable {
  protected x: number;
  protected y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  sprite({ circle }: P5I): void { circle(0, 0, 20) }
  animate(_context?: P5I): void { }
  draw(context: P5I): void {
    this.animate(context);
    context.push();
    context.translate(this.x, this.y);
    this.sprite(context);
    context.pop();
  }
}