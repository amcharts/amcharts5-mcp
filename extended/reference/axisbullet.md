---
title: "AxisBullet"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/axisbullet/"
scraped: "2026-03-15"
---

Draws a bullet on an axis.

## Import

```javascript
// Import AxisBullet
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: Entity

> **Note:** This class also inherits all settings, properties, methods, and events from Entity (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **location** (`undefined | number`) — Relative location of the bullet within the cell. 0 - beginning, 0.5 - middle, 1 - end.
- **sprite** (`Sprite`) — A visual element of the bullet.
- **stacked** (`undefined | false | true`) — Default false Indicates if the bullet should be stacked on top of another bullet if it's on the same position. Will work on horizontal or vertical axes only. @since 5.2.28

## Properties

- **axis** (`Axis | undefined`) — Target axis object.
