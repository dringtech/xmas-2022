import { Drawable } from 'lib/drawable.ts';
import { Figure } from 'lib/figure.ts';
import { Delia } from '../parts/delia.ts';

const figures: Drawable[] = [];

export function setup(context: P5I) {
  const { windowWidth, windowHeight, createCanvas, stroke, frameRate, random } = context;
  const WIDTH = windowWidth;
  const HEIGHT = windowHeight;
  createCanvas(WIDTH, HEIGHT);
  stroke(255);
  frameRate(30);
  const delia = new Delia(WIDTH / 2, HEIGHT / 2);
  figures.push(delia);
  figures.push(new Figure({ name: 'Giles', x: WIDTH * 1 / 5, y: random(0.5, 1.5) * HEIGHT / 4, target: delia }, context));
  figures.push(new Figure({ name: 'Rebecca', x: WIDTH * 2 / 5, y: random(0.5, 1.5) * HEIGHT / 4, target: delia }, context));
  figures.push(new Figure({ name: 'Martha', x: WIDTH * 3 / 5, y: random(0.5, 1.5) * HEIGHT / 4, target: delia }, context));
  figures.push(new Figure({ name: 'Bea', x: WIDTH * 4 / 5, y: random(0.5, 1.5) * HEIGHT / 4, target: delia }, context));
}

export function draw(context: P5I) {
  const { height, push, pop, scale, translate, background, clear } = context;
  push();
  scale(1, -1);
  translate(0, -height);
  clear();

  figures.forEach(f => f.draw(context));
  pop();
}

export function windowResized({ windowWidth, windowHeight, resizeCanvas }: P5I) {
  resizeCanvas(windowWidth, windowHeight);
}
