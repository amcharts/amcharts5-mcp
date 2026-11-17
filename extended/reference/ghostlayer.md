---
title: "GhostLayer"
type: "class"
source: "https://docs.amcharts.com/v5/reference/ghostlayer/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Properties

Public properties (not settings):

- **context** (`CanvasRenderingContext2D`)
- **imageArray** (`Uint8ClampedArray<ArrayBufferLike>`)
- **margin** (`IMargin`)
- **view** (`HTMLCanvasElement`)

## Methods

- `clear(): void`
- `getImageArray(point: IPoint): Array<number>`
- `getImageData(point: IPoint, bbox: DOMRect): ImageData`
- `resize(canvasWidth: number, canvasHeight: number, domWidth: number, domHeight: number, resolution: number): void`
- `setMargin(layers: Array<CanvasLayer>): void`
