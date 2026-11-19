---
title: "ISceneHost"
type: "interface"
source: "https://docs.amcharts.com/v5/reference/iscenehost/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

What scene nodes need from the renderer that owns them.

## Inheritance

Extends: IRenderer
All ancestors: IRenderer, IDisposer
TypeScript: not exported by name from the package.

## Properties

- **defaultLayer** (`ILayer`)
- **layers** (`readonly ILayer[]`)
- **_interaction** (`InteractionManager<SceneNode>`)
- **_useLayer** (`(order: number, margin: IMargin | undefined) => ILayer`) — The layer for `order`, created if needed, marked dirty and sized.
- **_layerCanvas** (`(layer: ILayer) => HTMLCanvasElement`) — The canvas a layer paints on, for code that needs a raster element.
- **_measureText** (`(text: SceneText) => IBounds`) — Lays out `text` and returns its local bounds.
- **_textContext** (`(text: SceneText) => CanvasRenderingContext2D`) — The context `text` is measured with.
- **_removeObject** (`(node: SceneNode) => void`)

## Other inherited properties

Names only — see the declaring interface's page (e.g. `get_api_reference("IRenderer")`) for types, defaults and descriptions.

- _IRenderer_: createLinearGradient, createPattern, createRadialGradient, createRasterPattern, debugGhostView, getCanvas, getEvent, getObjectAtPoint, interactionsEnabled, makeContainer, makeGraphics, makePicture, makeRadialText, makeText, makeTextStyle, removeHovering, render, resetImageArray, resize, resolution, tapToActivate, tapToActivateTimeout, touchGestures, view
- _IDisposer_: dispose, isDisposed
