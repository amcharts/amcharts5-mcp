---
title: "Matrix"
type: "class"
source: "https://docs.amcharts.com/v5/reference/matrix/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Properties

Public properties (not settings):

- **a** (`number`)
- **b** (`number`)
- **c** (`number`)
- **d** (`number`)
- **tx** (`number`)
- **ty** (`number`)

## Methods

- `append(matrix: Matrix): void` — Appends the given Matrix to this Matrix.
- `apply(origin: IPoint): IPoint` — Get a new position with the current transformation applied. Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
- `applyInverse(origin: IPoint): IPoint` — Get a new position with the inverse of the current transformation applied. Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
- `copyFrom(matrix: Matrix): void` — Copies the other matrix's properties into this matrix
- `prepend(matrix: Matrix): void` — Prepends the given Matrix to this Matrix.
- `setTransform(x: number, y: number, pivotX: number, pivotY: number, rotation: number, scale?: number): void` — Sets the matrix based on all the available properties
