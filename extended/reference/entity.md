---
title: "Entity"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/entity/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Base class of amCharts objects with settings, states, adapters and events: elements, series, charts, formatters and more.

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Entity.new(root, { /* settings */ });
```

## Inheritance

Extends: Settings
Extended by: Annotator, AxisBullet, Bullet, ColorSet, DataProcessor, DateFormatter, Dropdown, DurationFormatter, Exporting, ExportingMenu, Gradient, InterfaceColors, Language, Layout, Modal, NumberFormatter, Pattern, PatternSet, Serializer, SliceGrouper, Sprite, StockControl, StockToolbar

## Settings and related interfaces

- Settings: `IEntitySettings` — get_api_reference shows it after this page
- Private settings: `IEntityPrivate`
- Events: `IEntityEvents`

## Properties

Public properties (not settings):

- **adapters** (`Adapters<this>`)
- **events** (`EventDispatcher<Events<this, this["_events"]>>`)
- **root** (`Root`) — The `Root` the object belongs to. _Since 5.0.6._
- **states** (`States<this>`)
- **template** (`Template<this>`) — A `Template` applied to the object. Its settings apply where the object has none set of its own.
