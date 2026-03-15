---
title: "Legend"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/legend/"
scraped: "2026-03-15"
---

A universal legend control.

## Import

```javascript
// Import Legend
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Series
Extended by: StockLegend

> **Note:** This class also inherits all settings, properties, methods, and events from Series (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **clickTarget** (`"itemContainer" | "marker" | "none"`) — Default "itemContainer" Which legend item element will be clickable to toggle related chart item: "itemContainer" - the whole legend item (default). "marker" - legend item marker. "none" - disables toggling of legend item. @since 5.0.13
- **fillField** (`undefined | string`) — A key to look up in data for a fill of the data item.
- **nameField** (`undefined | string`) — A key to look up in data for a name of the data item.
- **strokeField** (`undefined | string`) — A key to look up in data for a stroke of the data item.
- **useDefaultMarker** (`undefined | false | true`) — Default false If set to true the legend will not try to mimic appearance of the actual item but rather show default square marker.

## Properties

- **itemContainers** (`ListTemplate`) — Default new ListTemplate<Container> List of all Container elements for legend items.
- **labels** (`ListTemplate`) — Default new ListTemplate<Label> List of legend label elements.
- **markerRectangles** (`ListTemplate`) — Default new ListTemplate<RoundedRectangle> List of rectangle elements used for default legend markers.
- **markers** (`ListTemplate`) — Default new ListTemplate<Container> List of legend marker elements.
- **valueLabels** (`ListTemplate`) — Default new ListTemplate<label> List of legend value label elements.
