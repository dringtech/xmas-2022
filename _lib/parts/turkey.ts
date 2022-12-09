import { Image } from "p5i";
import { Drawable } from "lib/utils/drawable.ts";

export class Turkey extends Drawable {
  private turkey: Image;
  scale: number;
  mirror: boolean;
  constructor(x: number, y: number, turkey: Image) {
    super(x, y);
    this.turkey = turkey;
    this.scale = 1;
    this.mirror = false;
  }
  sprite({ imageMode, image, push, pop, translate, scale, CENTER }: P5I): void {
    push();
    imageMode(CENTER);
    translate(10, 10);
    scale(this.mirror ? -1 : 1, -1);
    scale(0.3);
    image(this.turkey, 0, 0);
    pop();
  }
}
