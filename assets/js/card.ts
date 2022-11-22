import { p5i, P5I } from 'p5i';
import { Drawable } from 'lib/drawable.ts';
import { Figure } from 'lib/figure.ts';

const figures: Drawable[] = [];
const { mount } = p5i();

function setup({ windowWidth, windowHeight, createCanvas, stroke, frameRate, random }: P5I) {
  const WIDTH = windowWidth;
  const HEIGHT = windowHeight;
  createCanvas(WIDTH, HEIGHT);
  stroke(255);
  frameRate(30);
  figures.push(new Figure({ name: 'Giles', x: WIDTH * 1 / 5, y: random(0.5, 1.5) * HEIGHT / 4, }));
  figures.push(new Figure({ name: 'Rebecca', x: WIDTH * 2 / 5, y: random(0.5, 1.5) * HEIGHT / 4, }));
  figures.push(new Figure({ name: 'Martha', x: WIDTH * 3 / 5, y: random(0.5, 1.5) * HEIGHT / 4, }));
  figures.push(new Figure({ name: 'Bea', x: WIDTH * 4 / 5, y: random(0.5, 1.5) * HEIGHT / 4, }));
}

function draw(context: P5I) {
  const { height, push, pop, scale, translate, background } = context;
  push();
  scale(1, -1);
  translate(0, -height);
  background(100, 100);

  figures.forEach(f => f.draw(context));
  pop();
}

addEventListener('DOMContentLoaded', () => {
  mount(document.getElementById('cardCanvas'), { setup, draw });
});