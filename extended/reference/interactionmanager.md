---
title: "InteractionManager"
type: "class"
source: "https://docs.amcharts.com/v5/reference/interactionmanager/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Pointer input for one renderer: DOM listeners, hover, drag, click, double-click, wheel, cursor and tap-to-activate. Renderer-neutral; the host supplies coordinates and the hit test.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: ArrayDisposer → DisposerClass

## Properties

Public properties (not settings):

- **interactionsEnabled** (`boolean`)
- **tapToActivate** (`boolean`)
- **tapToActivateTimeout** (`number`)
- **touchGestures** (`TouchGestures`) — Who gets a touch gesture on the chart, see `Root.touchGestures`.

## Methods

- `addEvent<C, Key extends keyof IRendererEvents>(object: N, key: Key, callback: (this: C, event: IRendererEvents[Key]) => void, context?: C): IDisposer`
- `afterRender(): void` — Re-runs hover for the last pointer position, after a render may have moved things under it.
- `removeHovering(obj: N): void`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DisposerClass")`) for signatures and descriptions.

- _DisposerClass_: dispose, isDisposed
