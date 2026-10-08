---
title: "SpriteResizer"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/spriteresizer/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A frame with grips around an element: dragging the left or right grip scales the element, and the top or bottom grip rotates it.

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.SpriteResizer.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `ISpriteResizerSettings` — get_api_reference shows it after this page
- Private settings: `ISpriteResizerPrivate`
- Events: `ISpriteResizerEvents`

## Properties

Public properties (not settings):

- **gripB** (`Container`) — Bottom grip, which rotates the element.
- **gripL** (`Container`) — Left grip, which scales the element.
- **gripR** (`Container`) — Right grip, which scales the element.
- **gripT** (`Container`) — Top grip, which rotates the element.
- **rectangle** (`Rectangle`) — The frame drawn around the element.
