import { Drawable } from 'lib/drawable.ts';
import { Figure } from 'lib/figure.ts';
import { P5I } from '../../../../deno/.cache/deno/npm/registry.npmjs.org/p5i/0.4.2/dist/p5i.d.ts';
import { Delia } from '../parts/delia.ts';
import { Mouse } from '../parts/mouse.ts';

const figures: Drawable[] = [];
let mouse: Mouse;

export function setup(context: P5I) {
  const { windowWidth, windowHeight, createCanvas, stroke, frameRate, random } = context;
  const WIDTH = windowWidth;
  const HEIGHT = windowHeight;
  createCanvas(WIDTH, HEIGHT);
  stroke(255);
  frameRate(30);
  mouse = new Mouse(WIDTH / 2, HEIGHT / 2);
  figures.push(mouse);
  const delia = new Delia(WIDTH / 2, HEIGHT / 2, mouse);
  figures.push(delia);
  figures.push(new Figure({ name: 'Giles', x: WIDTH * 1 / 5, y: random(0.5, 1.5) * HEIGHT / 4, target: delia }, context));
  figures.push(new Figure({ name: 'Rebecca', x: WIDTH * 2 / 5, y: random(0.5, 1.5) * HEIGHT / 4, target: delia }, context));
  figures.push(new Figure({ name: 'Martha', x: WIDTH * 3 / 5, y: random(0.5, 1.5) * HEIGHT / 4, target: delia }, context));
  figures.push(new Figure({ name: 'Bea', x: WIDTH * 4 / 5, y: random(0.5, 1.5) * HEIGHT / 4, target: delia }, context));
}

export function draw(context: P5I) {
  const { height, push, pop, scale, translate, background, clear } = context;
  clear();
  push();
  scale(1, -1);
  translate(0, -height);

  // Sort figures by y
  figures.forEach((f: Drawable) => f.animate(context, figures));
  figures.forEach((f: Drawable) => f.draw(context));
  pop();
}

export function windowResized({ windowWidth, windowHeight, resizeCanvas }: P5I) {
  resizeCanvas(windowWidth, windowHeight);
}
export function mouseMoved({ mouseX, mouseY, height }: P5I) {
  mouse.x = mouseX;
  mouse.y = height - mouseY;
}
