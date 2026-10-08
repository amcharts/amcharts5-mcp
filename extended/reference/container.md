---
title: "Container"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/container/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

An element that holds child elements, arranges them with a layout, and can have a background.

Its children can be any `Sprite`, from basic shapes to whole charts.

Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/containers/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Container.new(root, { /* settings */ });
```

## Inheritance

Extends: Sprite → Entity → Settings
Extended by: BreadcrumbBar, Button, Chart, ClockHand, ColorPicker, ColorPickerButton, Component, FlowNode, Gantt, HeatLegend, HierarchyNode, Indicator, Label, Link, NumericStepper, PanelControls, ProgressPie, Scrollbar, SpriteResizer, StockChart, Tooltip, XYCursor, ZoomTools, ZoomableContainer

## Settings and related interfaces

- Settings: `IContainerSettings` — get_api_reference shows it after this page
- Private settings: `IContainerPrivate`
- Events: `IContainerEvents`

## Properties

Public properties (not settings):

- **children** (`Children<Sprite>`) — The container's child elements.
