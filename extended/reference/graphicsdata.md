---
title: "GraphicsData"
type: "class"
source: "https://docs.amcharts.com/v5/reference/graphicsdata/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

What an `IGraphics` records: geometry and paint ops, in call order.

Renderer-neutral: backends replay `ops`.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Properties

Public properties (not settings):

- **ops** (`GraphicsOp[]`)
- **version** (`number`)

## Methods

- `addBounds(bounds: IBounds): void`
- `arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void`
- `arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void`
- `beginFill(color?: Color | IGradient | IPattern, alpha?: number): void`
- `beginGroup(id?: string, name?: string): void`
- `beginPath(): void`
- `bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): void`
- `clear(): void`
- `closePath(): void`
- `drawCircle(x: number, y: number, radius: number): void`
- `drawEllipse(x: number, y: number, radiusX: number, radiusY: number): void`
- `drawRect(x: number, y: number, width: number, height: number): void`
- `endFill(): void`
- `endGroup(): void`
- `endStroke(): void`
- `image(image: HTMLImageElement | HTMLCanvasElement, width: number, height: number, x: number, y: number): void`
- `lineStyle(width?: number, color?: Color | IGradient | IPattern, alpha?: number, lineJoin?: "miter" | "round" | "bevel", lineCap?: "butt" | "round" | "square"): void`
- `lineTo(x: number, y: number): void`
- `moveTo(x: number, y: number): void`
- `quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): void`
- `setLineDash(dash?: number[]): void`
- `setLineDashOffset(dashOffset?: number): void`
- `shadow(color: Color, blur?: number, offsetX?: number, offsetY?: number, opacity?: number): void`
- `svgPath(path: string): void`
