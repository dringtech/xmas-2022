import { Drawable } from "lib/drawable.ts";

export const calculateRepulsion = (
  me: Drawable,
  allFiigures: Drawable[],
  smallestGap: number,
) => {
  const them = allFiigures.filter((x) => x !== me && x.ghost !== true);
  const vector = [0, 0];
  for (const other of them) {
    const range = rangeToTarget(me, other);
    if (range > smallestGap) continue;
    const bearing = bearingToTarget(me, other);
    const force = [Math.cos(bearing), Math.sin(bearing)].map((v) =>
      v * Math.max(-smallestGap / range, -100)
    ) as [number, number];
    vector[0] += force[0];
    vector[1] += force[1];
  }
  return vector;
};

export const rangeToTarget = (me: Drawable, them: Drawable): number =>
  Math.sqrt((me.x - them.x) ** 2 + (me.y - them.y) ** 2);

export const bearingToTarget = (me: Drawable, them: Drawable): number => {
  if (me.x == them.x) {
    return Math.PI / 2 + ((me.y > them.y) ? Math.PI : 0);
  }

  return Math.atan((them.y - me.y) / (them.x - me.x)) +
    ((me.x > them.x) ? Math.PI : 0);
};

export const calculateVectorToTarget = (
  me: Drawable,
  them: Drawable,
  speed: number,
): [number, number] => {
  const dist = rangeToTarget(me, them);
  // Don't move if we're close enough to the target
  if (dist < speed) return [0, 0];
  const theta = bearingToTarget(me, them);
  return [Math.cos(theta), Math.sin(theta)].map((v) => v * speed) as [
    number,
    number,
  ];
};
