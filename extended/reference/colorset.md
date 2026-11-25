---
title: "ColorSet"
type: "class"
source: "https://docs.amcharts.com/v5/reference/colorset/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A list of colors that series and other elements take in turn. When the list runs out, it generates more.

Docs: https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/#color-sets

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.ColorSet.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings

## Settings and related interfaces

- Settings: `IColorSetSettings` — get_api_reference shows it after this page
- Private settings: `IColorSetPrivate`

## Methods

- `getIndex(index: number): Color` — Returns the `Color` at `index`, generating more colors if the list is shorter. Parameters: `index`: Index. Returns: Color
- `next(): Color` — Returns the next `Color` in the list, `step` positions after the last one. Generates more colors when the list runs out. With `reuse`, a `step` that would come back to colors already used moves on by one instead, so every color in the list is used before any repeats. Returns: Color
- `reset(): void` — Starts over, so the next `next()` returns the color at `startIndex`.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
