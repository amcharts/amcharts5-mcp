---
title: "IPathSink"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipathsink/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Where path ops trace their geometry. `CanvasRenderingContext2D` is one.

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Properties

- **moveTo** (`(x: number, y: number) => void`)
- **lineTo** (`(x: number, y: number) => void`)
- **closePath** (`() => void`)
- **rect** (`(x: number, y: number, width: number, height: number) => void`)
- **arc** (`(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean) => void`)
- **arcTo** (`(x1: number, y1: number, x2: number, y2: number, radius: number) => void`)
- **ellipse** (`(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean) => void`)
- **bezierCurveTo** (`(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number) => void`)
- **quadraticCurveTo** (`(cpX: number, cpY: number, toX: number, toY: number) => void`)
