---
title: "Pattern"
type: "class"
source: "https://docs.amcharts.com/v5/reference/pattern/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Base class for patterns.

Docs: https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/patterns/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Pattern.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings
Extended by: CirclePattern, GrainPattern, LinePattern, PathPattern, PicturePattern, RectanglePattern, StarPattern, TrianglePattern

## Settings and related interfaces

- Settings: `IPatternSettings` — get_api_reference shows it after this page
- Private settings: `IPatternPrivate`
- Events: `IPatternEvents`

## Properties

Public properties (not settings):

- **pattern** (`IPattern`)

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
