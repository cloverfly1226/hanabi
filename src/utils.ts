import { Color, IcosahedronGeometry, Vector3 } from "three";

export const shooTrailCount = 50;
export const shooTrailDelay = 0.5;
export const shooDuration = 1;
export const shooDelay = 0.5;
export const shooVelocity = new Vector3(0, 5, 0);
export const shooAcceleration = new Vector3(0, -5, 0);

export const icosahedron = new IcosahedronGeometry(2, 2);

export const boomTrailCount = 50;
export const boomTrailDelay = 0.8;
export const boomDuration = 1;
export const boomDelay = 0;
export const boomPosition = new Vector3(0, 2.5, 0);
export const boomAcceleration = new Vector3(0, -1, 0);

export const loopDuration = 4;

export const boomColors = [new Color("#ff6666"), new Color("#66ff66"), new Color("#ffff66"), new Color("#6666ff"), new Color("#ff66ff")];
