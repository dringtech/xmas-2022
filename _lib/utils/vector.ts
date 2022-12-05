import { Drawable } from 'lib/drawable.ts';

export const calculateVectorToTarget = (me: Drawable, them: Drawable, speed: number): [number, number] => {
  const dist = Math.sqrt((me.x - them.x)**2 + (me.y - them.y)**2);
  // Don't move if we're close enough to the target
  if (dist < speed) return [0, 0];
  let theta = 0;
  if (me.x == them.x) {
    theta = Math.PI/2 + ((me.y > them.y) ? Math.PI : 0);
  } else {
    theta = Math.atan((them.y - me.y) / (them.x - me.x));
    theta += ((me.x > them.x) ? Math.PI : 0)
  }
  return [ Math.cos(theta), Math.sin(theta) ].map(v => v * speed) as [number, number];
}
