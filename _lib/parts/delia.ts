import { Image, P5I } from "p5i";
import { Drawable } from "lib/utils/drawable.ts";
import { calculateVectorToTarget, rangeToTarget } from "lib/utils/vector.ts";

const DEBUG = false;
const SCALE = 0.4;

interface SpriteArray {
  head: Image;
  standing: Image;
  running?: Image[];
}

export class Delia extends Drawable {
  private target: Drawable;
  private vector: [number, number];
  private standing: boolean;
  private mirror: boolean;
  desired: Drawable;
  sprites: SpriteArray;
  hunting: boolean;
  private ctx: unknown;
  constructor(
    x: number,
    y: number,
    target: Drawable,
    sprites: SpriteArray,
    desired: Drawable,
  ) {
    super(x, y);
    this.target = target;
    this.vector = [0, 0];
    this.sprites = sprites;
    this.desired = desired;
    this.standing = true;
    this.mirror = false;
    this.hunting = true;
  }
  sprite(
    { line, push, pop, scale, CENTER, image, imageMode, frameCount, floor }:
      P5I,
  ): void {
    push();
    DEBUG && line(0, 0, this.vector[0], this.vector[1]);
    scale(this.mirror ? -1 : 1, -1);
    scale(SCALE);
    imageMode(CENTER);

    const frame = floor(frameCount / 5) % this.sprites.running.length;
    const currentSprite = this.standing
      ? this.sprites.standing
      : this.sprites.running[frame];
    image(currentSprite, 0, 0);
    image(this.sprites.head, 120, -50);

    pop();
  }
  animate({ width, height, constrain }: P5I): void {
    this.ctx = { width, height };
    if (this.hunting && rangeToTarget(this, this.desired) < 50) {
      this.active = true;
      self.dispatchEvent(new CustomEvent('turkeySnaffled'));
    }
    if (rangeToTarget(this, this.desired) > 100) this.hunting = true;
    const speed = constrain(width / 30, 30, 100);
    this.vector = calculateVectorToTarget(this, this.target, speed);
    this.x = constrain(this.x + this.vector[0], 70, width-70);
    this.y = constrain(this.y + this.vector[1], 20, height-40);
    this.standing = (this.vector[0] === 0) || (this.vector[1] === 0);
    if (!this.standing) this.mirror = this.vector[0] < 0;
    if (this.active) {
      this.desired.mirror = this.mirror;
      this.desired.x = this.x + SCALE * (this.mirror ? -190 : 150);
      this.desired.y = this.y + SCALE * 10;
    }
  }
  drop() {
    const { width, height } = this.ctx;
    this.active = false;
    this.hunting = false;
    this.desired.x = width / 2;
    this.desired.y = height / 2;
    self.dispatchEvent(new CustomEvent('turkeyDropped'));
  }
}
