---
title: "Scrollbars"
source: "https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/"
scraped: "2026-11-16"
---

Scrollbars are useful controls that allow zooming chart's axis.

## Adding scrollbars

We create a scrollbar like everything else in amCharts 5: by calling `new()` [method](https://docs.amcharts.com/v5/getting-started/#new-element-syntax) of its class - `Scrollbar`.

Please note that scrollbar requires at least one setting to be present during instantiation: `orientation`.

Newly created Scrollbar object needs to be set on chart's `scrollbarX` setting (if we are adding a horizontal scrollbar), or `scrollbarY` (for vertical scrolling).

TypeScript:

```ts
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical" }));
```

JavaScript:

```js
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical" }));
```

Horizontal scrollbar will zoom/pan all horizontal axes, whereas vertical one will affect all vertical axes.

### Scrollbar elements

Scrollbar has three properties to access its three elements: `startGrip`, `endGrip`, and `thumb`.

The first two are elements of type `Button`, whereas `thumb` is a `RoundedRectangle`.

All three are fully customizable as we can override their default settings with our own.

TypeScript:

```ts
let scrollbarX = chart.get("scrollbarX");

scrollbarX.thumb.setAll({
  fill: am5.color(0x550000),
  fillOpacity: 0.1
});

scrollbarX.startGrip.setAll({
  visible: false
});

scrollbarX.endGrip.setAll({
  visible: false
});
```

JavaScript:

```js
let scrollbarX = chart.get("scrollbarX");

scrollbarX.thumb.setAll({
  fill: am5.color(0x550000),
  fillOpacity: 0.1
});

scrollbarX.startGrip.setAll({
  visible: false
});

scrollbarX.endGrip.setAll({
  visible: false
});
```

The above will make thumb semi-transparent red, while disabling both grips.

### Scrollbar background

When created, scrollbar will have its setting `background` set to an element of type `RoundedRectangle`.

We can modify any of its [settings](https://docs.amcharts.com/v5/reference/roundedrectangle/#settings) to configure scrollbar's background.

TypeScript:

```ts
let scrollbarX = chart.get("scrollbarX");

scrollbarX.get("background").setAll({
  fill: am5.color(0x000000),
  fillOpacity: 0.2,
  cornerRadiusTR: 0,
  cornerRadiusBR: 0,
  cornerRadiusTL: 0,
  cornerRadiusBL: 0
});
```

JavaScript:

```js
var scrollbarX = chart.get("scrollbarX");

scrollbarX.get("background").setAll({
  fill: am5.color(0x000000),
  fillOpacity: 0.2,
  cornerRadiusTR: 0,
  cornerRadiusBR: 0,
  cornerRadiusTL: 0,
  cornerRadiusBL: 0
});
```

## Sizing scrollbar

### Width or height

To set scrollbar's height (or width for the vertical scrollbar) we can use its `height` (or `width`) setting.

TypeScript:

```ts
let scrollbarX = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
});
```

JavaScript:

```js
var scrollbarX = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
});
```

There's a caveat, though. By default, each scrollbar has its `minHeight` (or `minWidth`) set to `12`. If we need our scrollbar smaller than that, we'll need to use `minHeight` (or `minWidth`) instead:

TypeScript:

```ts
let scrollbarX = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  minHeight: 3
});
```

JavaScript:

```js
var scrollbarX = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  minHeight: 3
});
```

### Size of the grips

The easiest way to size scrollbar grips is to use their `scale` setting:

TypeScript:

```ts
scrollbarX.startGrip.set("scale", 0.7);
scrollbarX.endGrip.set("scale", 0.7);
```

JavaScript:

```js
scrollbarX.startGrip.set("scale", 0.7);
scrollbarX.endGrip.set("scale", 0.7);
```

Example: [Sizing scrollbar elements](https://docs.amcharts.com/embeds/v5/sizing-scrollbar-elements/)

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
  { date: new Date(2012, 1, 1).getTime(), value: 8 },
  { date: new Date(2012, 1, 2).getTime(), value: 10 },
  { date: new Date(2012, 1, 3).getTime(), value: 12 },
  { date: new Date(2012, 1, 4).getTime(), value: 14 },
  { date: new Date(2012, 1, 5).getTime(), value: 11 },
  { date: new Date(2012, 1, 6).getTime(), value: 6 },
  { date: new Date(2012, 1, 7).getTime(), value: 7 },
  { date: new Date(2012, 1, 8).getTime(), value: 9 },
  { date: new Date(2012, 1, 9).getTime(), value: 13 },
  { date: new Date(2012, 1, 10).getTime(), value: 15 },
  { date: new Date(2012, 1, 11).getTime(), value: 19 },
  { date: new Date(2012, 1, 12).getTime(), value: 21 },
  { date: new Date(2012, 1, 13).getTime(), value: 22 },
  { date: new Date(2012, 1, 14).getTime(), value: 20 },
  { date: new Date(2012, 1, 15).getTime(), value: 18 },
  { date: new Date(2012, 1, 16).getTime(), value: 14 },
  { date: new Date(2012, 1, 17).getTime(), value: 16 },
  { date: new Date(2012, 1, 18).getTime(), value: 18 },
  { date: new Date(2012, 1, 19).getTime(), value: 17 },
  { date: new Date(2012, 1, 20).getTime(), value: 15 },
  { date: new Date(2012, 1, 21).getTime(), value: 12 },
  { date: new Date(2012, 1, 22).getTime(), value: 10 },
  { date: new Date(2012, 1, 23).getTime(), value: 8 }
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
  am5xy.DateAxis.new(root, {
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
var scrollbar = chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal",
    maxHeight: 3
  })
);

scrollbar.startGrip.set("scale", 0.7);
scrollbar.endGrip.set("scale", 0.7);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);
```

## Scrollbar with chart preview

The scrollbar with chart preview acts like a regular one, except it can also display actual XY series in it.

To create a scrollbar like that, we need to use a class `XYChartScrollbar` instead of `Scrollbar`. We will also want to set its `height` setting to something bigger than default to accommodate chart preview in it.

TypeScript:

```ts
let scrollbarX = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
});

chart.set("scrollbarX", scrollbarX);
```

JavaScript:

```js
var scrollbarX = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
});

chart.set("scrollbarX", scrollbarX);
```

That creates a scrollbar with a standalone instance of an XY chart in it, accessible via scrollbar's `chart` property.

It's full on `XYChart` instance, which means that we'll need to configure it like any other XY chart:

* Add axes.
* Add series and their data.

TypeScript:

```ts
var sbxAxis = scrollbarX.chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupIntervals: [{ timeUnit: "year", count: 1 }],
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      opposite: false,
      strokeOpacity: 0
    })
  })
);

var sbyAxis = scrollbarX.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var sbseries = scrollbarX.chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: sbxAxis,
    yAxis: sbyAxis,
    valueYField: "value",
    valueXField: "date"
  })
);
sbseries.data.setAll(data);
```

JavaScript:

```js
let sbxAxis = scrollbarX.chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupIntervals: [{ timeUnit: "year", count: 1 }],
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      opposite: false,
      strokeOpacity: 0
    })
  })
);

let sbyAxis = scrollbarX.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

let sbseries = scrollbarX.chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: sbxAxis,
    yAxis: sbyAxis,
    valueYField: "value",
    valueXField: "date"
  })
);
sbseries.data.setAll(data);
```

The nice thing about this approach is that we can configure the output down to last bit, including [dynamic data point grouping](https://docs.amcharts.com/v5/charts/xy-chart/axes/date-axis/#dynamic-data-item-grouping) of the preview series, to control its granularity.

Example: [Scrollbar with chart preview](https://docs.amcharts.com/embeds/v5/scrollbar-with-chart-preview/)

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
  height: 250px;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panY: "none",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 30
    })
  })
);

xAxis.get("dateFormats")["day"] = "MM/dd";
xAxis.get("periodChangeDateFormats")["day"] = "MMMM";

// Generate random data
var date = new Date(2000);
date.setHours(0, 0, 0, 0);
var value = 100;

function generateData() {
  value = Math.round(Math.random() * 10 - 5 + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
}

function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}
var data = generateDatas(50000);

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {})
    })
  );

  series.strokes.template.set("strokeWidth", 2);

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);

  // Pre-zoom X axis
  series.events.once("datavalidated", function (ev, target) {
    xAxis.zoomToDates(new Date(2021, 0, 1), new Date(2022, 0, 1));
  });
}

createSeries("Series", "value");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomXY",
    xAxis: xAxis
  })
);

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

var scrollbarX = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
});

chart.set("scrollbarX", scrollbarX);

var sbxAxis = scrollbarX.chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupIntervals: [{ timeUnit: "year", count: 1 }],
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      opposite: false,
      strokeOpacity: 0
    })
  })
);

var sbyAxis = scrollbarX.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var sbseries = scrollbarX.chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: sbxAxis,
    yAxis: sbyAxis,
    valueYField: "value",
    valueXField: "date"
  })
);

sbseries.data.setAll(data);
```

## Hiding on small charts

Since version 5.22.0, a scrollbar's `autoHide` hides it where the chart is that many pixels across it or less, so the plot gets the room. While it's hidden, pinching zooms the chart (`pinchZoomX` or `pinchZoomY`), unless that's set in code:

TypeScript:

```ts
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  autoHide: 300
}));
```

JavaScript:

```js
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  autoHide: 300
}));
```

* A horizontal scrollbar goes when the chart is that tall or less, a vertical one when it's that wide or less.
* It works only for a chart's `scrollbarX` and `scrollbarY`. One with `forceHidden` set in code is left alone.
* On a stock chart, the whole stock chart is measured, not the panel.

The [`ResponsiveMax` theme](https://docs.amcharts.com/v5/concepts/responsive-max/) sets it to 400 for vertical scrollbars and 300 for horizontal ones.

## Repositioning scrollbars

Normally, vertical scrollbar will be placed on chart's right, while horizontal one will be positioned on the top.

### Opposite side

To move a scrollbar to the other side of the chart, set its `opposite` setting to `true`. A horizontal scrollbar will go below the plot, and a vertical one to the left of it:

TypeScript:

```ts
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  opposite: true
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical",
  opposite: true
}));
```

JavaScript:

```js
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  opposite: true
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical",
  opposite: true
}));
```

### Inside or outside the axes

If there are axes on the same side as the scrollbar, `outsideAxes` sets where the scrollbar goes relative to them:

* `true` - beyond the axes, at the outer edge of the chart.
* `false` - between the axes and the plot area.

If not set, the chart picks the position itself.

TypeScript:

```ts
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  opposite: true,
  outsideAxes: true
}));
```

JavaScript:

```js
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  opposite: true,
  outsideAxes: true
}));
```

The above puts the horizontal scrollbar at the very bottom of the chart, below the X axis labels.

Both `opposite` and `outsideAxes` can be changed at any time, and the scrollbar will move. They also work in [JSON configs](https://docs.amcharts.com/v5/concepts/serializing/).

> **Note:** `opposite` is available since version 5.20.2, and `outsideAxes` since 5.21.0.

### Other containers

When you assign a `Scrollbar` instance to chart's `scrollbarY` setting, it is automatically assigned as a child of chart's `rightAxesContainer` (or `leftAxesContainer` if `opposite` is set), whereas assigning it to `scrollbarX` will put it into `topAxesContainer` (or `bottomAxesContainer`).

Read more about build in XY chart containers in "[Containers of an XY chart](https://docs.amcharts.com/v5/charts/xy-chart/xy-chart-containers/)" tutorial.

For a placement the settings above don't cover, we can move the scrollbar to some other container ourselves. `opposite` and `outsideAxes` do not apply to a scrollbar moved this way.

TypeScript:

```ts
let scrollbarX = am5.Scrollbar.new(root, {
  orientation: "horizontal"
});

chart.set("scrollbarX", scrollbarX);
chart.plotContainer.children.push(scrollbarX);
```

JavaScript:

```js
var scrollbarX = am5.Scrollbar.new(root, {
  orientation: "horizontal"
});

chart.set("scrollbarX", scrollbarX);
chart.plotContainer.children.push(scrollbarX);
```

Example: [Scrollbar with chart preview](https://docs.amcharts.com/embeds/v5/scrollbar-with-chart-preview-2/)

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
  height: 98vh;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panY: "none",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      opposite: true
    })
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      opposite: true
    })
  })
);

xAxis.get("dateFormats")["day"] = "MM/dd";
xAxis.get("periodChangeDateFormats")["day"] = "MMMM";

// Generate random data
var date = new Date(2000);
date.setHours(0, 0, 0, 0);
var value = 100;

function generateData() {
  value = Math.round(Math.random() * 10 - 5 + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
}

function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}
var data = generateDatas(50000);

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {})
    })
  );

  series.strokes.template.set("strokeWidth", 2);

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);

  // Pre-zoom X axis
  series.events.once("datavalidated", function (ev, target) {
    xAxis.zoomToDates(new Date(2021, 0, 1), new Date(2022, 0, 1));
  });
}

createSeries("Series", "value");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomXY",
    xAxis: xAxis
  })
);

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

// Scrollbar X
var scrollbarX = am5.Scrollbar.new(root, {
  orientation: "horizontal"
});

chart.set("scrollbarX", scrollbarX);
chart.bottomAxesContainer.children.push(scrollbarX);

// Scrollbar Y
var scrollbarY = am5.Scrollbar.new(root, {
  orientation: "vertical"
});

chart.set("scrollbarY", scrollbarX);
chart.leftAxesContainer.children.push(scrollbarY);
```

## Related tutorials

* [Start/end labels on scrollbar grips](https://docs.amcharts.com/v5/tutorials/start-end-labels-on-scrollbar-grips/)
* [Start/end labels on a scrollbar](https://docs.amcharts.com/v5/tutorials/adding-start-and-end-labels-to-a-scrollbar/)
* [Containers of an XY chart](https://docs.amcharts.com/v5/charts/xy-chart/xy-chart-containers/)
