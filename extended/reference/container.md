---
title: "Container"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/container/"
scraped: "2026-03-15"
---

A basic element that can have child elements, maintain their layout, and have a background.
 It can have any Sprite element as a child, from very basic shapes, to full-fledged charts.

## Import

```javascript
// Import Container
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Sprite
Extended by: Label, Component, FlowNode, Chart, Button, Tooltip, ZoomableContainer, HeatLegend, Link, Scrollbar, ZoomTools, SpriteResizer, NumericStepper, ProgressPie, XYCursor, ColorPicker, ColorPickerButton, Gantt, BreadcrumbBar, HierarchyNode, ClockHand, Indicator, PanelControls, StockChart

> **Note:** This class also inherits all settings, properties, methods, and events from Sprite (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **background** (`Graphics`) — Background element. Click here for more info
- **html** (`undefined | string`) — HTML content of the container. Click here for more info @since 5.2.11
- **interactiveChildren** (`undefined | false | true`) — If set to true all descendants - not just direct children, but every element in it - will become "interactive".
- **layout** (`Layout | null`) — A method to layout Click here for more info
- **mask** (`Graphics | null`) — An element to use as a container's mask (clipping region). Click here for more info
- **maskContent** (`undefined | false | true`) — If set to true all content going outside the bounds of the container will be clipped.
- **paddingBottom** (`undefined | number`) — Bottom padding in pixels.
- **paddingLeft** (`undefined | number`) — Left padding in pixels.
- **paddingRight** (`undefined | number`) — Right padding in pixels.
- **paddingTop** (`undefined | number`) — Top padding in pixels.
- **reverseChildren** (`undefined | false | true`) — If set to true its children will be laid out in opposite order. @since 5.1.1
- **setStateOnChildren** (`undefined | false | true`) — If set to true, applying a state on a container will also apply the same state on its children. Click here for more info
- **verticalScrollbar** (`Scrollbar`) — Setting this to an instance of Scrollbar will enable vertical scrolling of content if it does not fit into the Container. Click here for more info

## Properties

- **children** (`Children`) — Default new Children(this) List of Container's child elements.
