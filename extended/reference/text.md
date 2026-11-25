---
title: "Text"
type: "class"
source: "https://docs.amcharts.com/v5/reference/text/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A `Sprite` subclass.

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Text.new(root, { /* settings */ });
```

## Inheritance

Extends: Sprite → Entity → Settings
Extended by: RadialText

## Settings and related interfaces

- Settings: `ITextSettings` — get_api_reference shows it after this page
- Private settings: `ITextPrivate`

## Properties

Public properties (not settings):

- **textStyle** (`ITextStyle`)

## Methods

- `getDateFormatter(): DateFormatter` — Returns the `DateFormatter` of the element: its own `dateFormatter`, or else the one of the `Root`. Docs: https://docs.amcharts.com/v5/concepts/formatters/
- `getDurationFormatter(): DurationFormatter` — Returns the `DurationFormatter` of the element: its own `durationFormatter`, or else the one of the `Root`. Docs: https://docs.amcharts.com/v5/concepts/formatters/
- `getNumberFormatter(): NumberFormatter` — Returns the `NumberFormatter` of the element: its own `numberFormatter`, or else the one of the `Root`. Docs: https://docs.amcharts.com/v5/concepts/formatters/
- `markDirtyText(): void` — Forces the text to be re-evaluated and re-populated.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Sprite")`) for signatures and descriptions.

- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
