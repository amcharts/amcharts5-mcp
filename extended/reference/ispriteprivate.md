---
title: "ISpritePrivate"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ispriteprivate/"
scraped: "2026-03-15"
---

Inheritance

## Inheritance

Extends: IEntityPrivate
Extended by: IGraphicsPrivate, IContainerPrivate, IPicturePrivate

> **Note:** This class also inherits all settings, properties, methods, and events from IEntityPrivate (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **focusable** (`undefined | false | true`) — If set to false, its tabindex will be set to -1, so it does not get focused with TAB, regardless whether its public setting focusable is set to true. @since 5.3.16
- **lastTooltipCoords** (`IPoint`) — Logs last point for the shown tooltip (used to prevent subequent shows of tooltip in the same place) @since 5.11.3
- **showingTooltip** (`undefined | false | true`) — Is element currently showing a tooltip?
- **tooltipTarget** (`Graphics`) — An element tooltip should inherit its colors from.

