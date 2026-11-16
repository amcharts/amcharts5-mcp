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

Example: [Gapless date axis](https://docs.amcharts.com/embeds/v5/gapless-date-axis/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 95vh;
}
```

JavaScript:

```js
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

var data = [
  { date: new Date(2012, 0, 1).getTime(), value: 8 },
  { date: new Date(2012, 0, 2).getTime(), value: 10 },
  { date: new Date(2012, 0, 3).getTime(), value: 12 },
  { date: new Date(2012, 0, 7).getTime(), value: 7 },
  { date: new Date(2012, 0, 8).getTime(), value: 9 },
  { date: new Date(2012, 0, 9).getTime(), value: 13 },
  { date: new Date(2012, 0, 13).getTime(), value: 22 },
  { date: new Date(2012, 0, 14).getTime(), value: 20 }
];

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

var easing = am5.ease.linear;

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.GaplessDateAxis.new(root, {
    maxDeviation: 0.1,
    groupData: false,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    minBulletDistance: 10,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "{valueY}"
    })
  })
);

series.data.setAll(data);

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill"),
      stroke: root.interfaceColors.get("background"),
      strokeWidth: 2
    })
  });
});

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    xAxis: xAxis
  })
);

cursor.lineY.set("visible", false);

// add scrollbar
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);
```

## Limitations

While gapless date axis implements most of the functionality from a regular date axis, some settings are not supported. Here's the list of date axis settings that are **not supported**:

* `startLocation`
* `endLocation`

## Category-based date axis

Gapless date axis replaces category-based axis which is still available for backwards compatibility, but should not be used to plot date-based data with gaps removed.

For more information, read "[Category date axis](https://docs.amcharts.com/v5/charts/xy-chart/axes/category-date-axis/)".
