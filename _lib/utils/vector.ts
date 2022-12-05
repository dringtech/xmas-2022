import { Drawable } from 'lib/drawable.ts';

export const rangeToTarget = (me: Drawable, them: Drawable): number => Math.sqrt((me.x - them.x) ** 2 + (me.y - them.y) ** 2)

export const bearingToTarget = (me: Drawable, them: Drawable): number => {
  if (me.x == them.x)
    return Math.PI / 2 + ((me.y > them.y) ? Math.PI : 0);

  return Math.atan((them.y - me.y) / (them.x - me.x))
    + ((me.x > them.x) ? Math.PI : 0);
}

export const calculateVectorToTarget = (me: Drawable, them: Drawable, speed: number): [number, number] => {
  const dist = rangeToTarget(me, them);
  // Don't move if we're close enough to the target
  if (dist < speed) return [0, 0];
  let theta = bearingToTarget(me, them);
  return [Math.cos(theta), Math.sin(theta)].map(v => v * speed) as [number, number];
}
