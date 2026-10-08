---
title: "IIndicatorEditableSetting"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iindicatoreditablesetting/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: (none)
TypeScript: `am5stock.IIndicatorEditableSetting` (`import type { IIndicatorEditableSetting } from "@amcharts/amcharts5/stock"`)

## Properties

- **key** (`string`) — Key of the indicator setting this field edits.
- **name** (`string`) — Label of the field in the settings modal. Consecutive fields with the same name share one row.
- **type** (`"number" | "checkbox" | "color" | "dropdown" | "text"`) — Kind of input the settings modal shows for the setting.
- **minValue** (`number`) — Smallest value allowed for a `"number"` setting. _Since 5.8.1._
- **maxValue** (`number`) — Largest value allowed for a `"number"` setting. _Since 5.20.0._
- **step** (`number`) — Step of the number input. A step of `1` or more also makes the setting a whole number: typed decimals are rounded. _Since 5.20.0._
- **scale** (`number`) — Multiplier for showing the value in the settings modal: the input shows the stored value times `scale` and divides it back on save. For example, Acceleration Bands `factor` is stored in thousandths, so `scale: 1000` shows `0.001` as `1`. The stored value, `minValue`, `maxValue` and `step` stay in stored units. _Since 5.20.0._
- **options** (`(string | { value: number | string; text: string; extTarget?: string; extTargetValue?: number | string; extTargetMinValue?: number; extTargetMaxValue?: number; extTargetStep?: number; })[]`) — Items of a `"dropdown"`: strings, or objects with a `value` and a `text`. An option with `extTarget` (the key of a `"number"` field) sets that field to `extTargetValue` when picked, and its limits to `extTargetMinValue`, `extTargetMaxValue` and `extTargetStep`.
