---
title: "IGraphics"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/igraphics/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IDisplayObject
All ancestors: IDisplayObject, IDisposer
TypeScript: not exported by name from the package.

## Properties

- **blendMode** (`BlendMode`)
- **clear** (`() => void`)
- **beginFill** (`(color?: Color | IGradient | IPattern, alpha?: number) => void`)
- **endFill** (`() => void`)
- **beginPath** (`() => void`)
- **lineStyle** (`(width?: number, color?: Color | IGradient | IPattern, alpha?: number, lineJoin?: "miter" | "round" | "bevel", lineCap?: "butt" | "round" | "square") => void`)
- **setLineDash** (`(dash?: number[]) => void`)
- **setLineDashOffset** (`(dashOffset?: number) => void`)
- **endStroke** (`() => void`)
- **drawRect** (`(x: number, y: number, width: number, height: number) => void`)
- **drawCircle** (`(x: number, y: number, radius: number) => void`)
- **drawEllipse** (`(x: number, y: number, radiusX: number, radiusY: number) => void`)
- **arc** (`(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean) => void`)
- **arcTo** (`(x1: number, y1: number, x2: number, y2: number, radius: number) => void`)
- **lineTo** (`(x: number, y: number) => void`)
- **moveTo** (`(x: number, y: number) => void`)
- **closePath** (`() => void`)
- **bezierCurveTo** (`(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number) => void`)
- **quadraticCurveTo** (`(cpX: number, cpY: number, toX: number, toY: number) => void`)
- **svgPath** (`(path: string) => void`)
- **image** (`(image: HTMLImageElement | HTMLCanvasElement, width: number, height: number, x: number, y: number) => void`)
- **shadow** (`(color: Color, blur?: number, offsetX?: number, offsetY?: number, opacity?: number) => void`)
- **beginGroup** (`(id?: string, name?: string) => void`) — Groups the shapes drawn until `endGroup` under an id and a name. Canvas ignores it; SVG writes a `<g>`. _Since 5.21.0._
- **endGroup** (`() => void`)

## Other inherited properties

Names only — see the declaring interface's page (e.g. `get_api_reference("IDisplayObject")`) for types, defaults and descriptions.

- _IDisplayObject_: _setMatrix, alpha, angle, buttonMode, cancelTouch, crisp, cursorOverStyle, deform, exportable, filter, getAdjustedBounds, getCanvas, getContentBounds, getLayer, getLocalBounds, getLocalMatrix, hovering, inactive, interactive, invalidateBounds, isMeasured, markDirtyLayer, mask, on, pivot, scale, setLayer, toGlobal, toLocal, visible, wheelable, x, y
- _IDisposer_: dispose, isDisposed
