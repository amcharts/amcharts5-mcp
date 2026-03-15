---
title: "ProgressPie"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/progresspie/"
scraped: "2026-03-15"
---

Draws an interactive progress pie.
@since 5.14.0

## Import

```javascript
// Import ProgressPie
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Container

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **innerRadius** (`number | Percent`) — (no description)
- **numberFormat** (`undefined | string`) — (no description)
- **radius** (`number | Percent`) — (no description)
- **value** (`undefined | number`) — (no description)

## Properties

- **backgroundSlice** (`Slice`) — Default this.children.push(Slice.new(this._root, { themeTags: ["background"] }))
- **circle** (`Circle`) — Default this.children.push(Circle.new(this._root, { themeTags: ["background"] }))
- **label** (`Label`) — Default this.children.push(Label.new(this._root, { }))
- **slice** (`Slice`) — Default this.children.push(Slice.new(this._root, { isMeasured: false }))
