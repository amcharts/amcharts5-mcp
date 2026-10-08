---
title: "math"
type: "namespace"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Helpers exported as `am5.math`.

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.math.…
```

## Functions

- `boundsOverlap(bounds1: IBounds, bounds2: IBounds): boolean` — Returns `true` if two bounds overlap. Bounds that only touch do not.
- `ceil(value: number, precision: number): number` — Rounds a number up to a whole number, or to `precision` decimal places if set.
- `circlesOverlap(circle1: { x: number; y: number; radius: number; }, circle2: { x: number; y: number; radius: number; }): boolean` — Returns `true` if two circles overlap or touch.
- `closest(values: number[], referenceValue: number): number` — Returns the closest value from the array of values to the reference value.
- `cos(angle: number): number` — Returns cosine of an angle specified in degrees.
- `fitAngleToRange(value: number, startAngle: number, endAngle: number): number` — Fits an angle into the given start/end range, snapping to the nearest boundary when the angle falls outside.
- `fitToRange(value: number, min: number, max: number): number` — Clamps a value to the given [min, max] range.
- `getAngle(point1: IPoint, point2?: IPoint): number` — Returns the angle in degrees from `point1` to `point2`: `0` points right and angles grow clockwise. If `point2` is omitted, returns the angle of `point1` as seen from `0, 0`.
- `getArcBounds(cx: number, cy: number, startAngle: number, endAngle: number, radius: number): IBounds` — Returns the bounding box of a circular arc.
- `getArcPoint(radius: number, arc: number): { x: number; y: number; }` — Returns a point on a circle at the given angle, relative to the circle's center.
- `getCubicControlPointA(p0: IPoint, p1: IPoint, p2: IPoint, tensionX: number, tensionY: number): IPoint` — Returns the first control point for a cubic bezier spline segment interpolating through three consecutive points with the given tension.
- `getCubicControlPointB(p1: IPoint, p2: IPoint, p3: IPoint, tensionX: number, tensionY: number): IPoint` — Returns the second control point for a cubic bezier spline segment interpolating through three consecutive points with the given tension.
- `getPointOnCubicCurve(pointA: IPoint, pointB: IPoint, controlPointA: IPoint, controlPointB: IPoint, position: number): IPoint` — Returns a point on a cubic bezier curve at the given position (0–1).
- `getPointOnLine(pointA: IPoint, pointB: IPoint, position: number): IPoint` — Returns a point at a relative position along a straight line between two points.
- `getPointOnQuadraticCurve(pointA: IPoint, pointB: IPoint, controlPoint: IPoint, position: number): IPoint` — Returns a point on a quadratic bezier curve at the given position (0–1).
- `inBounds(point: IPoint, bounds: IBounds): boolean` — Returns `true` if a point is inside the given bounds (inclusive).
- `mergeBounds(bounds: IBounds[]): IBounds` — Merges an array of bounds into a single bounding box that encompasses all of them.
- `normalizeAngle(value: number): number` — Normalizes an angle to the 0–360 range.
- `resolveLocationOnPath(location: number, cumulativeLengths: number[]): { index: number; t: number; }` — Given a normalized location (0–1) along a multi-segment path and an array of cumulative segment lengths, returns which segment the location falls in and the local parameter t within that segment.
- `round(value: number, precision?: number, floor?: boolean): number` — Rounds a number to a whole number, or to `precision` decimal places if set.
- `sin(angle: number): number` — Returns sine of an angle specified in degrees.
- `spiralPoints(cx: number, cy: number, radius: number, radiusY: number, innerRadius: number, step: number, radiusStep: number, startAngle: number, endAngle: number): IPoint[]` — Generates points along a spiral path.
- `tan(angle: number): number` — Returns tangent of an angle specified in degrees.

## Other members

- `DEGREES` (constant)
- `HALFPI` (constant)
- `PI` (constant)
- `RADIANS` (constant)
