---
title: "PanelControls"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/panelcontrols/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Buttons on a `StockChart` panel that move it up or down, expand it and close it.

Docs: https://www.amcharts.com/docs/v5/charts/stock/panels/#Panel_controls

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.PanelControls.new(root, { /* settings */ });
```

## Inheritance

Extends: Container → Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IPanelControlsSettings` — get_api_reference shows it after this page
- Private settings: `IPanelControlsPrivate`

## Properties

Public properties (not settings):

- **closeButton** (`Button`) — The `Button` that closes the panel.
- **downButton** (`Button`) — The `Button` that moves the panel one place down.
- **expandButton** (`Button`) — The `Button` that expands the panel to fill the chart, or shows the other panels again.
- **upButton** (`Button`) — The `Button` that moves the panel one place up.
