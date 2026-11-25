---
title: "SceneText"
type: "class"
source: "https://docs.amcharts.com/v5/reference/scenetext/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Text and its layout. The backend lays it out (`_measureText`) because measuring needs a text engine.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: SceneNode → DisposerClass
Extended by: SceneRadialText

## Properties

Public properties (not settings):

- **resolution** (`number`)
- **style** (`SceneTextStyle`)
- **text** (`string`)
- **textVisible** (`boolean`)
- **truncated** (`boolean`)

## Methods

- `invalidateBounds(): void`
- `invalidateVisibility(): void`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("SceneNode")`) for signatures and descriptions.

- _SceneNode_: clear, contains, dragging, getAdjustedBounds, getCanvas, getLayer, getLocalBounds, hovering, markDirtyLayer, on, setLayer, shouldCancelTouch, toGlobal, toLocal
- _DisposerClass_: dispose, isDisposed
