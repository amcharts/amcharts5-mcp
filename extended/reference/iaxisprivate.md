---
title: "IAxisPrivate"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxisprivate/"
scraped: "2026-03-15"
---

Inheritance

## Inheritance

Extends: IComponentPrivate
Extended by: IValueAxisPrivate, ICategoryAxisPrivate

> **Note:** This class also inherits all settings, properties, methods, and events from IComponentPrivate (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **cellWidth** (`undefined | number`) — Width in pixels between grid lines (read-only). It might not be exact, as DateAxis can have grids at irregular intervals. Could be used to detect when size changes and to adjust labels for them not to overlap.
- **tooltipPosition** (`undefined | number`) — Saves position to which tooltip points.
