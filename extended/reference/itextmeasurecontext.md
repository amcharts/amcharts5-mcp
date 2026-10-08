---
title: "ITextMeasureContext"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/itextmeasurecontext/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

What text layout measures with. A canvas 2D context in the chart's DOM is one: it resolves relative font sizes (`em`) against the page like the layer canvases do.

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Properties

- **font** (`string`)
- **save** (`() => void`)
- **restore** (`() => void`)
- **measureText** (`(text: string) => TextMetrics`)
