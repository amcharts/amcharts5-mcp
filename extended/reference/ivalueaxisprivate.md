---
title: "IValueAxisPrivate"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ivalueaxisprivate/"
scraped: "2026-03-15"
---

Inheritance

## Inheritance

Extends: IAxisPrivate
Extended by: IDateAxisPrivate, IDurationAxisPrivate

> **Note:** This class also inherits all settings, properties, methods, and events from IAxisPrivate (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **max** (`undefined | number`) — Calculated current maximum value of the axis scale. @readonly
- **maxFinal** (`undefined | number`) — A maximum value of the axis scale. Can be useful in cases where axis zoom is currently being animated, and max is reflecting current intermediate value, whereas maxFinal will show target value. @readonly
- **min** (`undefined | number`) — Calculated current minimum value of the axis scale. @readonly
- **minFinal** (`undefined | number`) — A minimum value of the axis scale. Can be useful in cases where axis zoom is currently being animated, and min is reflecting current intermediate value, whereas minFinal will show target value. @readonly
- **selectionMax** (`undefined | number`) — Calculated maximum value of the currently viewable (zoomed) scope. @readonly
- **selectionMaxFinal** (`undefined | number`) — A target maximum value of the viewable value scope. Can be useful in cases where axis zoom is currently being animated, and selectionMax is reflecting current intermediate value, whereas selectionMaxFinal will show target value. @readonly
- **selectionMin** (`undefined | number`) — Calculated minimum value of the currently viewable (zoomed) scope. @readonly
- **selectionMinFinal** (`undefined | number`) — A target minimum value of the viewable value scope. Can be useful in cases where axis zoom is currently being animated, and selectionMin is reflecting current intermediate value, whereas selectionMinFinal will show target value. @readonly
- **selectionStepFinal** (`undefined | number`) — When selection step changes, it might change during axis zoom animation. selectionStepFinal will show what step will be when animation is finished. @readonly
- **step** (`undefined | number`) — Value step between grid lines. @readonly
- **stepDecimalPlaces** (`undefined | number`) — Decimal places used when formatting axis labels. @readonly
