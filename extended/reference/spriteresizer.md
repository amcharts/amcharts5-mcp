---
title: "SpriteResizer"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/spriteresizer/"
scraped: "2026-03-15"
---

Sources
SpriteResizer can be used (imported) via one of the following packages.
// Import SpriteResizer
import * as am5 from "@amcharts/amcharts5";

// Create SpriteResizer
am5.SpriteResizer.new(root, {
  // ... config if applicable
});

<!-- Load SpriteResizer -->
<script src="index.js"></script>

<script>
// Create SpriteResizer
am5.SpriteResizer.new(root, {
  // ... config if applicable
});
</script>

## Import

```javascript
// Import SpriteResizer
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Container

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **rotationStep** (`undefined | number`) — Default 10 Rotation increment in degrees.
- **sprite** (`Sprite`) — Target Sprite element.
- **spriteTemplate** (`Template`) — Target Template. If a template is set, scale and rotation will be set on Template instead of a Sprite.

## Properties

- **gripB** (`Container`) — Default this._createGrip("bottom")
- **gripL** (`Container`) — Default this._createGrip("left")
- **gripR** (`Container`) — Default this._createGrip("right")
- **gripT** (`Container`) — Default this._createGrip("top")
- **rectangle** (`Rectangle`) — Default this.children.push(Rectangle.new(this._root, { themeTags: ["rectangle"], fillOpacity: 0, fill: color(0xFFFFFF) }))
