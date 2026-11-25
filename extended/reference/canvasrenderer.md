---
title: "CanvasRenderer"
type: "class"
source: "https://docs.amcharts.com/v5/reference/canvasrenderer/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

An `ArrayDisposer` subclass.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: ArrayDisposer → DisposerClass

## Properties

Public properties (not settings):

- **debugGhostView** (`boolean`)
- **defaultLayer** (`CanvasLayer`)
- **interactionsEnabled** (`boolean`)
- **layers** (`CanvasLayer[]`)
- **resolution** (`number`)
- **tapToActivate** (`boolean`)
- **tapToActivateTimeout** (`number`)
- **touchGestures** (`TouchGestures`)
- **view** (`HTMLElement`)

## Methods

- `createLinearGradient(x1: number, y1: number, x2: number, y2: number): LinearGradientDef`
- `createPattern(graphics: SceneGraphics, background: SceneGraphics, repetition: string, width: number, height: number): PatternDef`
- `createRadialGradient(x1: number, y1: number, radius1: number, x2: number, y2: number, radius2: number): RadialGradientDef`
- `createRasterPattern(source: HTMLCanvasElement, repetition: string): RasterPatternDef | null`
- `getCanvas(root: SceneNode, options?: ICanvasOptions): HTMLCanvasElement`
- `getEvent<A extends IPointerEvent>(originalEvent: A, adjustPoint?: boolean): CanvasRendererEvent<A>`
- `getLayer(order: number, visible?: boolean): CanvasLayer`
- `getLayerByOrder(order: number): CanvasLayer | undefined`
- `getObjectAtPoint(point: IPoint): SceneNode | undefined`
- `makeContainer(): SceneContainer`
- `makeGraphics(): SceneGraphics`
- `makePicture(image: HTMLImageElement | undefined): SceneImage`
- `makeRadialText(text: string, style: SceneTextStyle): SceneRadialText`
- `makeText(text: string, style: SceneTextStyle): SceneText`
- `makeTextStyle(): SceneTextStyle`
- `paintId(obj: SceneNode): string`
- `removeHovering(graphics: SceneNode): void`
- `render(root: SceneNode): void`
- `resetImageArray(): void`
- `resize(realWidth: number, realHeight: number, calculatedWidth: number, calculatedHeight: number): void`
- `resizeGhost(): void`
- `resizeLayer(layer: CanvasLayer): void`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DisposerClass")`) for signatures and descriptions.

- _DisposerClass_: dispose, isDisposed
