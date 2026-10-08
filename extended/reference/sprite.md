---
title: "Sprite"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/sprite/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Base class of all visual elements.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: Entity → Settings
Extended by: Container, Graphics, Picture, Text

## Settings and related interfaces

- Settings: `ISpriteSettings` — get_api_reference shows it after this page
- Private settings: `ISpritePrivate`
- Events: `ISpriteEvents`

## Properties

Public properties (not settings):

- **dataItem** (`DataItem<IComponentDataItem>`) — The element's `DataItem`, or, if it has none, its nearest parent's. NOTE: data items are assigned automatically in most cases where it matters. Set one only if you know what you are doing.
- **events** (`SpriteEventDispatcher<this, Events<this, this["_events"]>>`)
- **parent** (`Container`) — Parent `Container` of this element.
