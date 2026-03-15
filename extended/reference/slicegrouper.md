---
title: "SliceGrouper"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/slicegrouper/"
scraped: "2026-03-15"
---

A plugin that can be used to automatically group small slices on percent charts into a single slice.

## Import

```javascript
// Import SliceGrouper
import * as am5plugins_sliceGrouper from "@amcharts/amcharts5/plugins/sliceGrouper"
```

## Inheritance

Extends: Entity

> **Note:** This class also inherits all settings, properties, methods, and events from Entity (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **clickBehavior** (`"none" | "break" | "zoom"`) — What happens when group slice is clicked. "none" (default) - nothing. "break" - underlying small slices are shown. "zoom" - series shows only small slies (big ones are hidden).
- **groupName** (`undefined | string`) — Default "Other" Name (category) of the group slice.
- **legend** (`Legend`) — If set, plugin will try to manipulate the items in legend, such as adding group slice, hiding items for small slices, etc.
- **limit** (`undefined | number`) — If set, only X first slices will be left as they are. The rest of the slices will be grouped.
- **series** (`PercentSeries`) — A series that will be used to group slices on.
- **threshold** (`undefined | number`) — Default 5 Any slice which has percent value less than this setting will be grouped.
