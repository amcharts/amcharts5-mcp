---
title: "IXYCursorPrivate"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ixycursorprivate/"
scraped: "2026-03-15"
---

Inheritance

## Inheritance

Extends: IContainerPrivate
Extended by: IRadarCursorPrivate, ICurveCursorPrivate

> **Note:** This class also inherits all settings, properties, methods, and events from IContainerPrivate (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **downPositionX** (`undefined | number`) — Horizontal cursor position on the moment when selection started.
- **downPositionY** (`undefined | number`) — Vertical cursor position on the moment when selection started.
- **lastPoint** (`IPoint`) — Last global point to which cursor moved
- **point** (`IPoint`) — Current X/Y coordinates of the cursor.
- **positionX** (`undefined | number`) — Current horizontal position relative to the plot area (0-1).
- **positionY** (`undefined | number`) — Current vertical position relative to the plot area (0-1).
