---
title: "SceneNode"
type: "class"
source: "https://docs.amcharts.com/v5/reference/scenenode/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A renderer-neutral display object: state, place in the tree, transform and bounds. Backends paint it.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: DisposerClass
Extended by: SceneContainer, SceneGraphics, SceneImage, SceneText

## Properties

Public properties (not settings):

- **alpha** (`number`)
- **angle** (`number`)
- **buttonMode** (`boolean`)
- **cancelTouch** (`boolean`)
- **compoundAlpha** (`number`)
- **crisp** (`boolean`)
- **cursorOverStyle** (`string`)
- **exportable** (`boolean`)
- **exportName** (`string`) — The layer name an SVG document gives this object, as `data-name`.
- **filter** (`string`)
- **inactive** (`boolean`)
- **interactive** (`boolean`)
- **isMeasured** (`boolean`)
- **mask** (`SceneGraphics`)
- **pivot** (`ScenePivot`)
- **scale** (`number`)
- **touchAxis** (`"x" | "xy"`)
- **visible** (`boolean`)
- **wheelable** (`boolean`)
- **x** (`number`)
- **y** (`number`)

## Methods

- `clear(): void`
- `contains(child: SceneNode): boolean`
- `dragging(): boolean`
- `getAdjustedBounds(bounds: IBounds): IBounds`
- `getCanvas(): HTMLCanvasElement`
- `getLayer(): ILayer`
- `getLocalBounds(): IBounds`
- `hovering(): boolean`
- `invalidateBounds(): void`
- `markDirtyLayer(_deep?: boolean): void`
- `on<C, Key extends keyof IRendererEvents>(key: Key, callback: (this: C, event: IRendererEvents[Key]) => void, context?: C): IDisposer`
- `setLayer(order: number | undefined, margin: IMargin | undefined): void`
- `shouldCancelTouch(): boolean`
- `toGlobal(point: IPoint): IPoint`
- `toLocal(point: IPoint): IPoint`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DisposerClass")`) for signatures and descriptions.

- _DisposerClass_: dispose, isDisposed
