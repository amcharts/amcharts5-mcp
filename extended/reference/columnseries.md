---
title: "ColumnSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/columnseries/"
scraped: "2026-03-15"
---

Data item
ColumnSeries uses data items of type IColumnSeriesDataItem.

## Import

```javascript
// Import ColumnSeries
import * as am5xy from "@amcharts/amcharts5/xy"
```

## Inheritance

Extends: BaseColumnSeries
Extended by: GanttSeries, CandlestickSeries

> **Note:** This class also inherits all settings, properties, methods, and events from BaseColumnSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **adjustBulletPosition** (`undefined | false | true`) — Default true
- **clustered** (`undefined | false | true`) — Default true
- **turboMode** (`undefined | false | true`) — Enables "turbo mode" of rendering. If enabled, the columsn will be drawn directly on canvas, rather than each individually, significantly speeding up the rendering. Especially on column-heavy charts. NOTE: this is an experimental feature and may not work in all setups. Some features might be disabled, too, e.g. pointer events and rounded corners. @since 5.14.0 Click here for more info
- **useLastColorForLegendMarker** (`undefined | false | true`) — (no description)

## Properties

- **allColumns** (`Graphics`) — Default this.children.push(Graphics.new(this._root, { }))
- **allColumnsData** (`Array`) — Default []
- **columns** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => RoundedRectangle._new(this._root, { position: "absolute", themeTags: $utils.mergeTags(this.columns.template.get("themeTags", []), ["series", "column"]) }, [this.columns.template]) )) A TemplateList of all columns in series. columns.template can be used to set default settings for all columns, or to change on existing ones.
