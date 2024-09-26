import { IcosahedronGeometry, Vector3 } from "three";

export const shooTrailCount = 50;
export const shooTrailDelay = 0.5;
export const shooDuration = 1;
export const shooDelay = 0.5;
export const shooVelocity = new Vector3(0, 5, 0);
export const shooAcceleration = new Vector3(0, -5, 0);

export const icosahedron = new IcosahedronGeometry(5, 2);

export const boomTrailCount = 50;
export const boomTrailDelay = 0.5;
export const boomDuration = 1;
export const boomDelay = 0;
export const boomPosition = new Vector3(0, 2.5, 0);
export const boomAcceleration = new Vector3(0, -3, 0);

export const loopDuration = 6;
