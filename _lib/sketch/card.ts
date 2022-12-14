import { Image, P5I } from "p5i";
import { Figure } from "lib/parts/figure.ts";
import { Delia } from "lib/parts/delia.ts";
import { Mouse } from "lib/parts/mouse.ts";
import { Drawable } from "lib/util/drawable.ts";
import { Turkey } from "../parts/turkey.ts";

const figures: Drawable[] = [];
let mouse: Mouse;
let assets: Record<string, Image>;

const parent = document.getElementById("cardCanvas");

export function preload({ loadImage }: P5I) {
  assets = Object.entries(assetsUrls).reduce(
    (a, [k, v]) => ({ ...a, [k]: loadImage(v) }),
    {},
  );
}

function getBoundingBox() {
  return { width: parent?.clientWidth, height: parent?.clientHeight };
}

export function setup(context: P5I) {
  const { createCanvas, stroke, frameRate, noLoop, loop } = context;
  const { width: WIDTH, height: HEIGHT } = getBoundingBox();
  createCanvas(WIDTH, HEIGHT);
  stroke(255);
  frameRate(30);
  mouse = new Mouse(WIDTH * 0.2, HEIGHT * 0.1);
  figures.push(mouse);
  const turkey = new Turkey(WIDTH / 2, HEIGHT / 2, assets.turkey);
  figures.push(turkey);
  const delia = new Delia(mouse.x, mouse.y, mouse, {
    head: assets.delia_head,
    standing: assets.delia_standing,
    running: [assets.delia_running_1, assets.delia_running_2],
  }, turkey);
  figures.push(delia);
  figures.push(
    new Figure({
      name: "Giles",
      x: 0.25,
      y: 0.75,
      target: delia,
      head: assets.giles,
    }, context),
  );
  figures.push(
    new Figure({
      name: "Rebecca",
      x: 0.75,
      y: 0.75,
      target: delia,
      head: assets.rebecca,
    }, context),
  );
  figures.push(
    new Figure({
      name: "Martha",
      x: 0.75,
      y: 0.25,
      target: delia,
      head: assets.martha,
    }, context),
  );
  figures.push(
    new Figure({
      name: "Bea",
      x: 0.25,
      y: 0.255,
      target: delia,
      head: assets.bea,
    }, context),
  );
  addEventListener('startGame', () => {
    loop();
  })
  noLoop();
}

export function draw(context: P5I) {
  const {
    width,
    height,
    push,
    pop,
    scale,
    translate,
    clear,
  } = context;
  clear();
  push();
  scale(1, -1);
  translate(0, -height);

  // Sort figures by y
  figures.forEach((f: Drawable) => f.animate(context, figures));
  figures.sort((a: Drawable, b: Drawable) => (b.y - a.y));
  figures.forEach((f: Drawable) => f.draw(context));
  pop();
}

export function windowResized(
  { resizeCanvas }: P5I,
) {
  const { width, height } = getBoundingBox();
  resizeCanvas(width, height);
  getBoundingBox();
  // setTimeout(getBoundingBox, 0);
}

export function mousePressed(context: P5I) {
  setMousePosition(context);
}
export function mouseMoved(context: P5I) {
  setMousePosition(context);
}
export function mouseDragged(context: P5I) {
  setMousePosition(context);
  const { mouseX, mouseY, width, height } = context;
  // Don't trigger default if inside canvas
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height ) return false;
}

function setMousePosition({ mouseX, mouseY, width, height, constrain, min }: P5I) {
  if (mouse === undefined) return;
  mouse.x = constrain(mouseX, 70, width-70);
  mouse.y = constrain(height - mouseY, 20, height-40);
}
