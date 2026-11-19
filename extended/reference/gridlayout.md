---
title: "GridLayout"
type: "class"
source: "https://docs.amcharts.com/v5/reference/gridlayout/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Lays out a `Container`'s children in rows from left to right, with as many columns as fit its width. With the container's `direction: "rtl"`, rows go from right to left, so a partly filled last row is on the right.

Docs: https://docs.amcharts.com/v5/concepts/common-elements/containers/#layout

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.GridLayout.new(root, { /* settings */ });
```

## Inheritance

Extends: Layout → Entity → Settings

## Settings and related interfaces

- Settings: `IGridLayoutSettings` — get_api_reference shows it after this page
- Private settings: `IGridLayoutPrivate`

## Methods

- `getColumnWidths(container: Container, columnCount: number, maxCellWidth: number, availableWidth: number, extra?: (child: Sprite) => number): number[]`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
