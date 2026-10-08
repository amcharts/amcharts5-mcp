---
title: "SliceGrouper"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/slicegrouper/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A plugin that can be used to automatically group small slices on percent charts into a single slice.

Docs: https://www.amcharts.com/docs/v5/charts/percent-charts/grouping-slices/

## Import

```js
import * as am5plugins_sliceGrouper from "@amcharts/amcharts5/plugins/sliceGrouper";

am5plugins_sliceGrouper.SliceGrouper.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings

## Settings and related interfaces

- Settings: `ISliceGrouperSettings` — get_api_reference shows it after this page
- Private settings: `ISliceGrouperPrivate`
- Events: `ISliceGrouperEvents`

## Properties

Public properties (not settings):

- **zoomOutButton** (`Button`) — Button shown while the small slices are shown after a click on the group slice; it groups them again. Made only when `clickBehavior` is not `"none"`.
