---
title: "IChartElementEventMap"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ichartelementeventmap/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

The events of `<am5-chart>`.

_Since 5.21.0._

## Inheritance

Extends: (none)
TypeScript: `am5element.IChartElementEventMap` (`import type { IChartElementEventMap } from "@amcharts/amcharts5/element"`)

## Properties

- **ready** (`CustomEvent<IChartElementReadyEvent>`) — The chart is built.
- **error** (`CustomEvent<unknown>`) — The chart could not be built; `detail` has the error.
