import { Image, P5I } from "p5i";
import { Drawable } from "lib/utils/drawable.ts";
import { calculateVectorToTarget } from "lib/utils/vector.ts";

const DEBUG = false;

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
  sprites: SpriteArray;
  constructor(x: number, y: number, target: Drawable, sprites: SpriteArray) {
    super(x, y);
    this.target = target;
    this.vector = [0, 0];
    this.sprites = sprites;
    this.standing = true;
  }
  sprite(
    { line, push, pop, scale, CENTER, image, imageMode, frameCount, floor }:
      P5I,
  ): void {
    push();
    DEBUG && line(0, 0, this.vector[0], this.vector[1]);
    scale(this.mirror ? -1 : 1, -1);
    scale(0.4);
    imageMode(CENTER);

    const frame = floor(frameCount / 5) % this.sprites.running.length;
    const currentSprite = this.standing
      ? this.sprites.standing
      : this.sprites.running[frame];
    image(currentSprite, 0, 0);
    image(this.sprites.head, 120, -50);

    pop();
  }
  animate({}: P5I): void {
    const speed = 20;
    this.vector = calculateVectorToTarget(this, this.target, speed);
    this.x = this.x + this.vector[0];
    this.y = this.y + this.vector[1];
    this.standing = (this.vector[0] === 0) || (this.vector[1] === 0);
    if (!this.standing) this.mirror = this.vector[0] < 0;
  }
}
