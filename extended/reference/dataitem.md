---
title: "DataItem"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/dataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

One item of a `Component`'s data, holding its values and settings.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: Settings

## Properties

Public properties (not settings):

- **bullets** (`Bullet[]`) — Bullets shown for this data item.
- **close** (`{ [index: string]: any; }`) — End of the base interval each date field's value falls in, by field. Set by a `DateAxis`.
- **component** (`Component`) — The `Component` the data item belongs to.
- **dataContext** (`unknown`) — The object in the source data this data item was made from.
- **open** (`{ [index: string]: any; }`) — Start of the base interval each date field's value falls in, by field. Set by a `DateAxis`.
