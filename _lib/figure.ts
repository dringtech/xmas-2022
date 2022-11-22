import { P5I } from 'p5i';
import { Drawable } from 'lib/drawable.ts';

type FigureConfig = {
  name?: string;
  x: number;
  y: number;
}

export class Figure extends Drawable{
  private name: string;
  constructor(config: FigureConfig) {
    const { x, y, name = 'unnamed' } = config;
    super(x, y);
    this.name = name;
  }
  animate({ width }: P5I): void {
    this.x = (this.x + 10) % width;
  }
}