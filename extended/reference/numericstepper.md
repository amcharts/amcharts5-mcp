---
title: "NumericStepper"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/numericstepper/"
scraped: "2026-03-15"
---

Draws an interactive NumericStepper.
@since 5.14.0

## Import

```javascript
// Import NumericStepper
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Container

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **value** (`undefined | number`) — (no description)

## Properties

- **buttonsContainer** (`Container`) — Default this.children.push(Container.new(this._root, { themeTags: ["buttons"] }))
- **downButton** (`Triangle`) — Default this.buttonsContainer.children.push(Triangle.new(this._root, { themeTags: ["downbutton"] }))
- **label** (`EditableLabel`) — Default this.children.push(EditableLabel.new(this._root, { }))
- **upButton** (`Triangle`) — Default this.buttonsContainer.children.push(Triangle.new(this._root, { themeTags: ["upbutton"] }))
