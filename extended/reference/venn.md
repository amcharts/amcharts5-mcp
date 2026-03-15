---
title: "Venn"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/venn/"
scraped: "2026-03-15"
---

Creates a Venn diagram.

## Import

```javascript
// Import Venn
import * as am5venn from "@amcharts/amcharts5/venn"
```

## Inheritance

Extends: Series

> **Note:** This class also inherits all settings, properties, methods, and events from Series (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **categoryField** (`undefined | string`) — A field in data that holds category names.
- **colors** (`ColorSet`) — A ColorSet to use when asigning colors for slices.
- **fillField** (`undefined | string`) — A field that holds color for slice fill.
- **intersectionsField** (`undefined | string`) — A field in data that holds array of categories that overlap.
- **patterns** (`PatternSet`) — A PatternSet to use when asigning patterns for slices. Click here for more info @since 5.10.0

## Properties

- **hoverGraphics** (`Graphics`) — Default Graphics.new() A Graphics element that is used to show the shape of the hovered slice or intersection.
- **labels** (`ListTemplate`) — Default this.addDisposer(this._makeLabels()) A ListTemplate of all slice labels in series. labels.template can also be used to configure slice labels.
- **labelsContainer** (`Container`) — Default Container.new() A Container that holds all labels.
- **slices** (`ListTemplate`) — Default this.addDisposer(this._makeSlices()) A ListTemplate of all slices in series. slices.template can also be used to configure slices.
- **slicesContainer** (`Container`) — Default Container.new() A Container that holds all slices (circles and intersections).
