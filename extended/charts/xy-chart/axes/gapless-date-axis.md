---
title: "Gapless date axis"
source: "https://docs.amcharts.com/v5/charts/xy-chart/axes/gapless-date-axis/"
scraped: "2026-11-16"
---

> In a nutshell, a gapless date axis is the same as regular date axis (with some limitations), with data-less intervals removed from its scale.

In a nutshell, a gapless [date axis](https://docs.amcharts.com/v5/charts/xy-chart/axes/date-axis/) is the same as regular date axis (with some [limitations](#limitations)), with data-less intervals removed from its scale.

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/gapless-date-axis/dateaxis.png "Regular date axis with irregular data")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/gapless-date-axis/categorydateaxis.png "Gapless date axis with irregular data")

## Creating and configuring

Creating and configuring a gapless date axis works exactly the same as with regular date axis, except that instead of `DateAxis` object, we're instantiating `GaplessDateAxis`.

It still needs its `baseInterval` set, as well as renderer created and assigned to it:

TypeScript:

```ts
let xAxis = chart.xAxes.push(
  am5xy.GaplessDateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

JavaScript:

```js
var xAxis = chart.xAxes.push(
  am5xy.GaplessDateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);
```

For more configuration options - grid, label formatting, zooming, positions, etc. - please refer to "[Date axis](https://docs.amcharts.com/v5/charts/xy-chart/axes/date-axis/)" tutorial.

## Example

Example: [Gapless date axis](https://docs.amcharts.com/embeds/v5/gapless-date-axis/). Its code: get_example(path: "examples/docs-demos/gapless-date-axis").

## Limitations

While gapless date axis implements most of the functionality from a regular date axis, some settings are not supported. Here's the list of date axis settings that are **not supported**:

* `startLocation`
* `endLocation`

## Category-based date axis

Gapless date axis replaces category-based axis which is still available for backwards compatibility, but should not be used to plot date-based data with gaps removed.

For more information, read "[Category date axis](https://docs.amcharts.com/v5/charts/xy-chart/axes/category-date-axis/)".
