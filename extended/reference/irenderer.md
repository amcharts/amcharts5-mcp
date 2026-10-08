---
title: "IRenderer"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/irenderer/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IDisposer
TypeScript: not exported by name from the package.

## Properties

- **debugGhostView** (`boolean`)
- **tapToActivate** (`boolean`)
- **tapToActivateTimeout** (`number`)
- **resolution** (`number`)
- **interactionsEnabled** (`boolean`)
- **view** (`HTMLElement`)
- **removeHovering** (`(graphics: IDisplayObject) => void`)
- **createLinearGradient** (`(x1: number, y1: number, x2: number, y2: number) => IGradient`)
- **createRadialGradient** (`(x1: number, y1: number, radius1: number, x2: number, y2: number, radius2: number) => IGradient`)
- **createPattern** (`(graphics: IGraphics, background: IGraphics, repetition: string, width: number, height: number) => IPattern`)
- **createRasterPattern** (`(source: HTMLCanvasElement, repetition: string) => IPattern | null`)
- **makeContainer** (`() => IContainer`)
- **makeGraphics** (`() => IGraphics`)
- **makeText** (`(text: string, style: ITextStyle) => IText`)
- **makeRadialText** (`(text: string, style: ITextStyle) => IText`)
- **makeTextStyle** (`() => ITextStyle`)
- **makePicture** (`(image: HTMLImageElement | undefined) => IPicture`)
- **resize** (`(canvasWidth: number, canvasHeight: number, domWidth: number, domHeight: number) => void`)
- **render** (`(root: IDisplayObject) => void`)
- **getCanvas** (`(root: IDisplayObject, options?: ICanvasOptions) => HTMLCanvasElement`)
- **getEvent** (`<A extends IPointerEvent>(originalEvent: A, adjustPoint?: boolean) => IRendererEvent<A>`)
- **getObjectAtPoint** (`(point: IPoint) => IDisplayObject | undefined`)
- **resetImageArray** (`() => void`)

## Other inherited properties

Names only — see the declaring interface's page (e.g. `get_api_reference("IDisposer")`) for types, defaults and descriptions.

- _IDisposer_: dispose, isDisposed
