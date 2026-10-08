---
title: "IDisplayObject"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idisplayobject/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IDisposer
TypeScript: not exported by name from the package.

## Properties

- **mask** (`IGraphics`)
- **visible** (`boolean`)
- **interactive** (`boolean`)
- **inactive** (`boolean`)
- **wheelable** (`boolean`)
- **cancelTouch** (`boolean`)
- **isMeasured** (`boolean`)
- **buttonMode** (`boolean`)
- **alpha** (`number`)
- **angle** (`number`)
- **scale** (`number`)
- **crisp** (`boolean`)
- **x** (`number`)
- **y** (`number`)
- **pivot** (`IPoint`)
- **deform** (`IDeform`) — _(internal)_
- **filter** (`string`)
- **cursorOverStyle** (`string`)
- **exportable** (`boolean`)
- **_setMatrix** (`() => void`)
- **getLayer** (`() => ILayer`)
- **setLayer** (`(order: number | undefined, margin: IMargin | undefined) => void`)
- **markDirtyLayer** (`(deep?: boolean) => void`)
- **clear** (`() => void`)
- **invalidateBounds** (`() => void`)
- **toLocal** (`(point: IPoint) => IPoint`)
- **toGlobal** (`(point: IPoint) => IPoint`)
- **getLocalBounds** (`() => IBounds`)
- **getContentBounds** (`() => IBounds`) — _(internal)_ Bounds of the object's own content, also when it is not measured.
- **getAdjustedBounds** (`(bounds?: IBounds) => IBounds`)
- **on** (`<C, Key extends keyof IRendererEvents>(key: Key, callback: (this: C, event: IRendererEvents[Key]) => void, context?: C) => IDisposer`)
- **hovering** (`() => boolean`)
- **getCanvas** (`() => HTMLCanvasElement`)
- **getLocalMatrix** (`() => Matrix`) — _(internal)_

## Other inherited properties

Names only — see the declaring interface's page (e.g. `get_api_reference("IDisposer")`) for types, defaults and descriptions.

- _IDisposer_: dispose, isDisposed
