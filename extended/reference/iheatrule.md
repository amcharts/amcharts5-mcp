---
title: "IHeatRule"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iheatrule/"
scraped: "2026-03-15"
---

Defines interface for a heat rule.

## Properties

- **customFunction** (`undefined | ( target: Sprite, minValue: number, maxValue: number, value: any) => void`) — A custom function that will set target element's settings. Can be used to do custom manipulation on complex objects requiring more than modifying a setting.
- **dataField** (`string`) — Which data field to use when determining item's value.
- **key** (`undefined | string`) — A setting key to set.
- **logarithmic** (`undefined | false | true`) — Default false Use logarithmic scale when calculating intermediate setting values.
- **max** (`any`) — The setting value to use for items if the highest value.
- **maxValue** (`undefined | number`) — Custom highest value.
- **min** (`any`) — The setting value to use for items if the lowest value.
- **minValue** (`undefined | number`) — Custom lowest value.
- **neutral** (`any`) — The setting value to use for items which do not have value at all.

