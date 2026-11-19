---
title: "DataItem"
type: "class"
source: "https://docs.amcharts.com/v5/reference/dataitem/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

One item of a `Component`'s data, holding its values and settings.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: Settings

## Properties

Public properties (not settings):

- **bullets** (`Bullet[]`) — Bullets shown for this data item.
- **close** (`{ [index: string]: any; }`) — End of the base interval each date field's value falls in, by field. Set by a `DateAxis`.
- **component** (`Component`) — The `Component` the data item belongs to.
- **dataContext** (`unknown`) — The object in the source data this data item was made from.
- **open** (`{ [index: string]: any; }`) — Start of the base interval each date field's value falls in, by field. Set by a `DateAxis`.

## Methods

- `hide(duration?: number): void` — Hides the data item. Parameters: `duration`: Animation duration in milliseconds.
- `isHidden(): boolean` — Returns `true` if the data item is hidden.
- `show(duration?: number): void` — Shows the data item. Parameters: `duration`: Animation duration in milliseconds.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Settings")`) for signatures and descriptions.

- _Settings_: animate, dispose, get, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, remove, removeAll, set, setAll
