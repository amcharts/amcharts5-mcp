---
title: "IHeatRule"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iheatrule/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A rule that sets a setting of each series element, such as its color or size, by its data item's value: from `min` at the lowest value to `max` at the highest.

Docs: https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Properties

- **target** (`Template<any>`) — Template of the elements to set, e.g. `series.columns.template`.
- **min** (`any`) — Setting value for the element with the lowest value.
- **max** (`any`) — Setting value for the element with the highest value.
- **neutral** (`any`) — Setting value for elements whose data item has no value.
- **dataField** (`string`) — Data item field that holds the value, e.g. `"value"` or `"valueY"`.
- **key** (`string`) — The setting to set, e.g. `"fill"`.
- **minValue** (`number`) — Lowest value of the range. If not set, the series' lowest value is used, which needs `calculateAggregates`.
- **maxValue** (`number`) — Highest value of the range. If not set, the series' highest value is used, which needs `calculateAggregates`.
- **logarithmic** (`boolean`) — default `false` — Spreads the values between `min` and `max` on a logarithmic scale.
- **customFunction** (`(target: Sprite, minValue: number, maxValue: number, value?: any) => void`) — A function that sets the element's settings itself, in place of `min`, `max` and `key`. It is called for each element, also for one with no value.
