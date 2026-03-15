---
title: "ZoomTools"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/zoomtools/"
scraped: "2026-03-15"
---

A tool that displays button for zoomable targets.
@since 5.8.0

## Import

```javascript
// Import ZoomTools
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Container
Extended by: ZoomControl

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **target** (`IZoomable`) — A target element that zoom tools will control, e.g. ZoomableContainer.

## Properties

- **homeButton** (`Button`) — Default this.children.push(Button.new(this._root, { width: 35, height: 35, themeTags: ["home"] })) A Button for home.
- **minusButton** (`Button`) — Default this.children.push(Button.new(this._root, { width: 35, height: 35, themeTags: ["minus"] })) A Button for zoom out.
- **plusButton** (`Button`) — Default this.children.push(Button.new(this._root, { width: 35, height: 35, themeTags: ["plus"] })) A Button for zoom in.
