import { Image, P5I } from "p5i";
import { Figure } from "lib/parts/figure.ts";
import { Delia } from "lib/parts/delia.ts";
import { Mouse } from "lib/parts/mouse.ts";
import { Drawable } from "lib/util/drawable.ts";

const figures: Drawable[] = [];
let mouse: Mouse;
let assets: Record<string, Image>;

export function preload({ loadImage }: P5I) {
  assets = Object.entries(assetsUrls).reduce(
    (a, [k, v]) => ({ ...a, [k]: loadImage(v) }),
    {},
  );
}

export function setup(context: P5I) {
  const { windowWidth, windowHeight, createCanvas, stroke, frameRate, random } =
    context;
  const WIDTH = windowWidth;
  const HEIGHT = windowHeight;
  createCanvas(WIDTH, HEIGHT);
  stroke(255);
  frameRate(30);
  mouse = new Mouse(WIDTH / 2, HEIGHT / 2);
  figures.push(mouse);
  const delia = new Delia(WIDTH / 2, HEIGHT / 2, mouse, {
    head: assets.delia_head,
    standing: assets.delia_standing,
    running: [assets.delia_running_1, assets.delia_running_2],
  });
  figures.push(delia);
  figures.push(
    new Figure({
      name: "Giles",
      x: WIDTH * 1 / 5,
      y: random(0.5, 1.5) * HEIGHT / 4,
      target: delia,
      head: assets.giles,
    }, context),
  );
  figures.push(
    new Figure({
      name: "Rebecca",
      x: WIDTH * 2 / 5,
      y: random(0.5, 1.5) * HEIGHT / 4,
      target: delia,
      head: assets.rebecca,
    }, context),
  );
  figures.push(
    new Figure({
      name: "Martha",
      x: WIDTH * 3 / 5,
      y: random(0.5, 1.5) * HEIGHT / 4,
      target: delia,
      head: assets.martha,
    }, context),
  );
  figures.push(
    new Figure({
      name: "Bea",
      x: WIDTH * 4 / 5,
      y: random(0.5, 1.5) * HEIGHT / 4,
      target: delia,
      head: assets.bea,
    }, context),
  );
}

export function draw(context: P5I) {
  const { height, push, pop, scale, translate, clear } = context;
  clear();
  push();
  scale(1, -1);
  translate(0, -height);

  // Sort figures by y
  figures.forEach((f: Drawable) => f.animate(context, figures));
  figures.forEach((f: Drawable) => f.draw(context));
  pop();
}

export function windowResized(
  { windowWidth, windowHeight, resizeCanvas }: P5I,
) {
  resizeCanvas(windowWidth, windowHeight);
}

export function mousePressed(context: P5I) {
  setMousePosition(context);
  return false;
}
export function mouseMoved(context: P5I) {
  setMousePosition(context);
  return false;
}
export function mouseDragged(context: P5I) {
  setMousePosition(context);
  return false;
}

function setMousePosition({ mouseX, mouseY, height }: P5I) {
  mouse.x = mouseX;
  mouse.y = height - mouseY;
}
