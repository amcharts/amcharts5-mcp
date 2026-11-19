---
title: "PatternSet"
type: "class"
source: "https://docs.amcharts.com/v5/reference/patternset/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A list of `Pattern` objects that series and other elements take in turn.

_Since 5.10.0._ Docs: https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/patterns/#pattern-sets

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.PatternSet.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings

## Settings and related interfaces

- Settings: `IPatternSetSettings` — get_api_reference shows it after this page
- Private settings: `IPatternSetPrivate`

## Methods

- `getCirclePattern(settings: ICirclePatternSettings): CirclePattern` — Creates a `CirclePattern` with these settings. Parameters: `settings`: Pattern settings. Returns: Pattern object
- `getIndex(index: number): Pattern` — Returns the `Pattern` at `index`. Parameters: `index`: Index. Returns: Pattern
- `getLinePattern(settings: ILinePatternSettings): LinePattern` — Creates a `LinePattern` with these settings. Parameters: `settings`: Pattern settings. Returns: Pattern object
- `getRectanglePattern(settings: IRectanglePatternSettings): RectanglePattern` — Creates a `RectanglePattern` with these settings. Parameters: `settings`: Pattern settings. Returns: Pattern object
- `next(): Pattern` — Returns the next `Pattern` in the list, `step` positions after the last one. Returns: Pattern
- `reset(): void` — Starts over, so the next `next()` returns the pattern at `startIndex`.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
