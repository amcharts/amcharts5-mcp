---
title: "Cursor"
source: "https://docs.amcharts.com/v5/charts/xy-chart/cursor/"
scraped: "2026-11-16"
---

Cursor is an optional functional component of an XY chart. It can be used to display crosshair over the hover/touch area, tooltips for some or all nearby series data items, as well as tooltips on axes.

## Adding to chart

To add a cursor to an XY chart, we simply create an instance of an `XYCursor` using its `new()` method, then assign it to chart's `cursor` setting:

TypeScript:

```ts
chart.set("cursor", am5xy.XYCursor.new(root, {}));
```

JavaScript:

```js
chart.set("cursor", am5xy.XYCursor.new(root, {}));
```

## Behavior

Adding a cursor to charts adds a corsshair, shown when hovering the chart.

We can use cursor's `behavior` setting to specify what else it can do.

> **Note:** Enabling cursor behavior will disable chart's [pan settings](https://docs.amcharts.com/v5/charts/xy-chart/zoom-and-pan/#panning).

### Zooming

To enabling zooming using cursor, we can set `behavior` to one of these values:

| Value    | Comment                               |
| -------- | ------------------------------------- |
| `zoomX`  | Enables horizontal selection-zooming. |
| `zoomY`  | Enables vertical selection-zooming.   |
| `zoomXY` | Enables bi-directional zooming.       |

TypeScript:

```ts
chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomX"
}));
```

JavaScript:

```js
chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomX"
}));
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/cursor/zoomX.png "`behavior: 'zoomX'`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/cursor/zoomY.png "`behavior: 'zoomY'`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/cursor/zoomXY.png "`behavior: 'zoomXY'`")

### Selection

We can also make cursor to just select the area of the chart, without actually zooming it using these `behavior` values:

| Value      | Comment                           |
| ---------- | --------------------------------- |
| `selectX`  | Enables horizontal selection.     |
| `selectY`  | Enables vertical selection.       |
| `selectXY` | Enables bi-directional selection. |

It will work the same way as zooming, except the selection area will stay selected after user releases mouse/touch.

It can be useful in conjunction with selection-related [event handlers](https://docs.amcharts.com/v5/charts/xy-chart/cursor/#events).

### Selection tolerance

Normally, cursor selection can start only within the plot area, which may make it hard to include full range very near the edge.

We can enable selection to start outside the plot area using Cursor's `clickTolerance` setting, which accepts numeric pixel values.

TypeScript:

```ts
chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomX",
  clickTolerance: 30
}));
```

JavaScript:

```js
chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomX",
  clickTolerance: 30
}));
```

The above will allow the original pointer down event to originate 30 pixels around the perimeter of the plot area, albeit the selection rectangle itself will still be constrained.

## Relation to series

### Tooltips

#### Adding tooltip info to series

If series has `tooltip` property assigned to it, cursor will try to show multiple tooltips for all series in the currently hovered/touched category/interval.

For information on how to add tooltip to series, please refer to "[XY chart series: Tooltips](https://docs.amcharts.com/v5/charts/xy-chart/series/#tooltips)".

Example: [Series tooltips and cursor](https://docs.amcharts.com/embeds/v5/series-tooltips-and-cursor/)

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
    panY: false,
    wheelY: "zoomX",
    layout: root.verticalLayout,
    maxTooltipDistance: 0
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 1,
    value2: 2.5
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 3,
    value2: 2.1
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 2,
    value2: 3
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1,
    value2: 2
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 1.5,
    value2: 0.5
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    //baseValue: 2,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20
    })
  })
);

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

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");
createSeries("Series #2", "value2");

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
```

#### Limiting number of tooltips shown at a time

If our chart has many series with tooltips enabled, using cursor might result in quite a mess, that does not fit into the chart.

In such cases we can use XY chart's own `maxTooltipDistance` setting to make cursor show only closest tooltips.

It's a numeric value which means "show a tooltip to a closest data item as well as tooltips for data items that are visually no further from it by X pixels".

For example, setting it to `0` (zero) will make it show tooltip for the closest data item only.

TypeScript:

```ts
let chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    maxTooltipDistance: 0
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    maxTooltipDistance: 0
  })
);
```

`maxTooltipDistance` also has a special value: `-1`. Setting it will ensure that only one tooltip will be shown, no matter what. Even in case there are multiple data items in exact space spot.

![](https://docs.amcharts.com/v5/images/charts/xy-chart/cursor/multiple_tooltips.png "Default behavior")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/cursor/maxtooltipdistance_used.png "`maxTooltipDisatnce: 0`")

The following demo shows how we can use `maxTooltipDistance` to show only single consolidated tooltip for multiple series.

Example: [Consolidated tooltip](https://docs.amcharts.com/embeds/v5/consolidated-tooltip/)

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
  height: 400px;
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

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout,
    maxTooltipDistance: 0
  })
);

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX"
  })
);

cursor.lineY.set("visible", false);

// The data
var data = [
  {
    year: "1930",
    italy: 1,
    germany: 5,
    uk: 3
  },
  {
    year: "1934",
    italy: 1,
    germany: 2,
    uk: 6
  },
  {
    year: "1938",
    italy: 2,
    germany: 3,
    uk: 1
  },
  {
    year: "1950",
    italy: 3,
    germany: 4,
    uk: 1
  },
  {
    year: "1954",
    italy: 5,
    germany: 1,
    uk: 2
  },
  {
    year: "1958",
    italy: 3,
    germany: 2,
    uk: 1
  },
  {
    year: "1962",
    italy: 1,
    germany: 2,
    uk: 3
  },
  {
    year: "1966",
    italy: 2,
    germany: 1,
    uk: 5
  },
  {
    year: "1970",
    italy: 3,
    germany: 5,
    uk: 2
  },
  {
    year: "1974",
    italy: 4,
    germany: 3,
    uk: 6
  },
  {
    year: "1978",
    italy: 1,
    germany: 2,
    uk: 4
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {});
xRenderer.grid.template.set("location", 0.5);
xRenderer.labels.template.setAll({ location: 0.5, multiLocation: 0.5 });

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  })
);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxPrecision: 0,
    renderer: am5xy.AxisRendererY.new(root, {
      inversed: true
    })
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      categoryXField: "year"
    })
  );

  var tooltip = series.set(
    "tooltip",
    am5.Tooltip.new(root, {
      pointerOrientation: "horizontal"
    })
  );

  tooltip.label.setAll({
    text: "[bold]{categoryX}:[/]\n[width: 130px]Italy[/] {italy}\n[width: 130px]Germany[/] {germany}\n[width: 130px]United Kingdom[/] {uk}"
  });

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: series.get("fill")
      })
    });
  });

  series.data.setAll(data);
  series.appear(1000);
}

createSeries("Italy", "italy");
createSeries("Germany", "germany");
createSeries("UK", "uk");

// Add scrollbar
// https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal",
    marginBottom: 20
  })
);

var legend = chart.children.push(am5.Legend.new(root, { centerX: am5.p50, x: am5.p50 }));

legend.data.setAll(chart.series.values);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```

The distance used by `maxTooltipDistance` is measured by both X and Y coordinates by default.

If we'd like to measure only horizontal or vertical distance, we can use another setting: `maxTooltipDistanceBy`:

```ts
let chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    maxTooltipDistance: 10,
    maxTooltipDistanceBy: "x"
  })
);
```

```ts
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    maxTooltipDistance: 10,
    maxTooltipDistanceBy: "x"
  })
);
```

#### Auto-arranging tooltips

When cursor triggers multiple tooltips to be shown, they are automatically arranged to not overlap.

Should we want to disable this check, we can use chart's `arrangeTooltips` setting to `false`:

TypeScript:

```ts
let chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    arrangeTooltips: false
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    arrangeTooltips: false
  })
);
```

### Snapping to series

A cursor can be made to snap to actual series data items.

To enable it we need to assign actual series objects we want cursor to snap to into cursor's `snapToSeries` setting.

TypeScript:

```ts
chart.set("cursor", am5xy.XYCursor.new(root, {
  snapToSeries: [ series1, series2 ]
}));
```

JavaScript:

```js
chart.set("cursor", am5xy.XYCursor.new(root, {
  snapToSeries: [ series1, series2 ]
}));
```

By default, cursor will choose closest data item based on proximity by both X and Y coordinate. If we'd like it to rather snap horizontally or vertically we can set `snapToSeriesBy` to either `"x"` or `"y"`, respectively.

TypeScript:

```ts
chart.set("cursor", am5xy.XYCursor.new(root, {
  snapToSeries: [ series1, series2 ],
  snapToSeriesBy: "x"
}));
```

JavaScript:

```js
chart.set("cursor", am5xy.XYCursor.new(root, {
  snapToSeries: [ series1, series2 ],
  snapToSeriesBy: "x"
}));
```

`snapToSeriesBy` supports two additional values: `"x!"` and `"y!"`.

They work similarly to `"x"` and `"y"` respectively, except they will only snap in intervals there are values in, reverting to free-move on intervals/categories there is no data for series that cursor is being snapped to.

> **Important:** Cursor relies on axis' tooltip for snapping position. This is why above settings won't function as expected if the related axis does not have tooltip enabled.

If we don't want the tooltip to be visible, we can hide it using `forceHidden` setting:

TypeScript:

```ts
xAxis.set("tooltip", am5.Tooltip.new(root, {
  forceHidden: true
}));

yAxis.set("tooltip", am5.Tooltip.new(root, {
  forceHidden: true
}));
```

JavaScript:

```js
xAxis.set("tooltip", am5.Tooltip.new(root, {
  forceHidden: true
}));

yAxis.set("tooltip", am5.Tooltip.new(root, {
  forceHidden: true
}));
```

### Irregularly spaced data

The cursor will snap to the closest data item from all the series it is supposed to snap to.

If series contain irregularly spaced data, e.g. series is missing a data item for the same timestamp that tooltip is currently snapped to based on a data item from another series, the tooltip for the former series will not be shown.

To force showing of a tooltip to the closest data item - even if its timestamp does not match currently snapped data item - set `snapTooltip: true` in series settings:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueX}: {valueY}",
    }),
    snapTooltip: true
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueX}: {valueY}",
    }),
    snapTooltip: true
  })
);
```

## Relation to axes

### Axis tooltips

A cursor may display a tooltip with an exact value corresponding to the position of its vertical and horizontal crosshair lines.

To make that happen, we simply need to assign `Tooltip` instances to the `tooltip` setting of the axes we want to show tooltips on:

TypeScript:

```ts
xAxis.set("tooltip", am5.Tooltip.new(root, {}));

yAxis.set("tooltip", am5.Tooltip.new(root, {}));
```

JavaScript:

```js
xAxis.set("tooltip", am5.Tooltip.new(root, {}));

yAxis.set("tooltip", am5.Tooltip.new(root, {}));
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/cursor/without_axis_tooltips.png "Without axis tooltips")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/cursor/axis_tooltips.png "With axis tooltips")

### Snapping to axis cells

The crosshair lines will follow mouse/touch pointer by default.

We can make it rather snap to axis cell by setting cursor's `xAxis` or `yAxis` settings:

TypeScript:

```ts
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis
}));
```

JavaScript:

```js
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis
}));
```

## Appearance

### Lines

An XY cursor has two properties: `lineX` and `lineY` that represent vertical and horizontal crosshair lines respectively.

Those are elements of type `Grid` that we can use to configure cursor's lines:

TypeScript:

```ts
let cursor = chart.get("cursor");

cursor.lineX.setAll({
  stroke: am5.color(0x550000),
  strokeWidth: 2,
  strokeDasharray: []
});

cursor.lineY.setAll({
  visible: false
});
```

JavaScript:

```js
let cursor = chart.get("cursor");

cursor.lineX.setAll({
  stroke: am5.color(0x550000),
  strokeWidth: 2,
  strokeDasharray: []
});

cursor.lineY.setAll({
  visible: false
});
```

The above will apply color, remove dashing, and make vertical line thicker, while completely hide horizontal line.

### Selection

If cursor's `behavior` is set to zoom or select it will draw a shaded area to indicate selection when dragged on plot area.

That shading is done by displaying a custom element (`Graphics`) over plot area. It's accessible via `selection` property, and can be configured as needed:

TypeScript:

```ts
let cursor = chart.get("cursor");

cursor.selection.setAll({
  fill: am5.color(0x000055),
  fillOpacity: 0.2
});
```

JavaScript:

```js
let cursor = chart.get("cursor");

cursor.selection.setAll({
  fill: am5.color(0x000055),
  fillOpacity: 0.2
});
```

## Events

Cursor defines a few [events](https://docs.amcharts.com/v5/concepts/events/) that are dispatched when something happens.

For example, we can use its `selectstarted` and `selectended` events to track when selection using the cursor began and ended. There's also `cursormoved` event which we can use to [track cursor movement](https://docs.amcharts.com/v5/charts/xy-chart/cursor/#tracking-cursor-movement).

For a complete list of events supported by `XYCursor`, check its [class reference](https://docs.amcharts.com/v5/reference/xycursor/#events).

## Tracking/setting position

### Tracking cursor movement

We can use cursor's `cursormoved` event to invoke custom handler whenever cursor position on the plot area changes.

In event handler we can access its [private properties](https://docs.amcharts.com/v5/concepts/settings/#private-settings) `positionX` and `positionY` wich in turn can be converted to real position on axis using axis' methods:

TypeScript:

```ts
cursor.events.on("cursormoved", function(ev) {
  let x = ev.target.getPrivate("positionX");
  let y = ev.target.getPrivate("positionY");
  
  let dateX = xAxis.positionToDate(x);
  let valueY = yAxis.positionToValue(y);
});
```

JavaScript:

```js
cursor.events.on("cursormoved", function(ev) {
  var x = ev.target.getPrivate("positionX");
  var y = ev.target.getPrivate("positionY");
  
  var dateX = xAxis.positionToDate(x);
  var valueY = yAxis.positionToValue(y);
});
```

Please note, that the above will work correctly only when axis is fully zoomed out. To be on the safe side, and account for zoomed-in sates, we should also use axis' `toAxisPosition()` method:

TypeScript:

```ts
cursor.events.on("cursormoved", function(ev) {
  let x = ev.target.getPrivate("positionX");
  let y = ev.target.getPrivate("positionY");
  
  let dateX = xAxis.positionToDate(xAxis.toAxisPosition(x));
  let valueY = yAxis.positionToValue(xAxis.toAxisPosition(y));
});
```

JavaScript:

```js
cursor.events.on("cursormoved", function(ev) {
  var x = ev.target.getPrivate("positionX");
  var y = ev.target.getPrivate("positionY");
  
  var dateX = xAxis.positionToDate(xAxis.toAxisPosition(x));
  var valueY = yAxis.positionToValue(xAxis.toAxisPosition(y));
});
```

Example: [Tracking XYCursor position](https://docs.amcharts.com/embeds/v5/tracking-xycursor-position/)

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

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
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

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

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
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomXY",
    xAxis: xAxis
  })
);

cursor.events.on("cursormoved", function (ev) {
  var x = ev.target.getPrivate("positionX");
  var y = ev.target.getPrivate("positionY");

  var dateX = xAxis.positionToDate(xAxis.toAxisPosition(x));
  var valueY = yAxis.positionToValue(xAxis.toAxisPosition(y));
  console.log(dateX, valueY);
});
```

### Manually positioning cursor

We can manually position the cursor using its `positionX` and `positionY` settings.

We also want the cursor to display without hovering over plot area (which is default behavior), so we need to set `alwaysShow` to `true` as well.

Position is a numeric value relative to plot area, with `0` (zero) denoting beginning, and `1` (one) - the end.

So if we'd like to place the cursor in the exact middle of the chart, we'd use `0.5` for the setting value:

TypeScript:

```ts
cursor.setAll({
  positionX: 0.5,
  positionY: 0.5,
  alwaysShow: true
});
```

JavaScript:

```js
cursor.setAll({
  positionX: 0.5,
  positionY: 0.5,
  alwaysShow: true
});
```

And, since we are using axes, we can use their methods to find out positions for specific values, e.g. on a date axis.

For that we need to use two functions:

* Axis' `dateToPosition()` - converts a `Date` object into a position. (similarly for `CategoryAxis` use `categoryToPosition()`, and for `ValueAxis` - `valueToPosition()`)
* Axis renderer's `toGlobalPosition()` - converts the position to a "global" position, which accounts for a possible axis zoom.

TypeScript:

```ts
cursor.set("positionX", xAxis.get("renderer").toGlobalPosition(
  xAxis.dateToPosition(new Date(2021, 6, 12))
));
```

JavaScript:

```js
cursor.set("positionX", xAxis.get("renderer").toGlobalPosition(
  xAxis.dateToPosition(new Date(2021, 6, 12))
));
```

Setting cursor position requires respective axes to have a scale.

If we are setting cursor on chart load, we will need to use series `datavalidated` event:

TypeScript:

```ts
series.events.on("datavalidated", function() {
  chart.get("cursor").setAll({
    positionX: 0.5,
    positionY: 0.5,
    alwaysShow: true
  });
});
```

JavaScript:

```js
series.events.on("datavalidated", function() {
  chart.get("cursor").setAll({
    positionX: 0.5,
    positionY: 0.5,
    alwaysShow: true
  });
});
```

Example: [Setting xycursor position](https://docs.amcharts.com/embeds/v5/setting-xycursor-position/)

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
    panY: false,
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
    (xAxis.zoomToDates(new Date(2021, 0, 1), new Date(2022, 0, 1)), 0);
  });

  return series;
}

var series = createSeries("Series", "value");

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

series.events.on("datavalidated", function () {
  setTimeout(function () {
    chart.get("cursor").setAll({
      positionX: 0.5,
      positionY: 0.5,
      alwaysShow: true
    });
  }, 1500);
});

chart.plotContainer.events.on("pointerover", function () {
  chart.get("cursor").setAll({
    positionX: undefined,
    positionY: undefined
  });
});

chart.plotContainer.events.on("pointerout", function () {
  chart.get("cursor").setAll({
    positionX: 0.5,
    positionY: 0.5
  });
});
```

## Syncing cursors

amCharts allows automatically syncing positions of cursors from several charts.

To enable this feature, all we need to do is to set cursor's `syncWith` setting with an array of cursor objects to sync it with:

TypeScript:

```ts
let cursor1 = am5xy.XYCursor.new(root1, {});
let cursor2 = am5xy.XYCursor.new(root2, {});
let cursor3 = am5xy.XYCursor.new(root3, {});

cursor1.set("syncWith", [cursor2, cursor3]);
cursor2.set("syncWith", [cursor1, cursor3]);
cursor3.set("syncWith", [cursor1, cursor2]);

chart1.set("cursor", cursor1);
chart2.set("cursor", cursor2);
chart3.set("cursor", cursor3);
```

JavaScript:

```js
var cursor1 = am5xy.XYCursor.new(root1, {});
var cursor2 = am5xy.XYCursor.new(root2, {});
var cursor3 = am5xy.XYCursor.new(root3, {});

cursor1.set("syncWith", [cursor2, cursor3]);
cursor2.set("syncWith", [cursor1, cursor3]);
cursor3.set("syncWith", [cursor1, cursor2]);

chart1.set("cursor", cursor1);
chart2.set("cursor", cursor2);
chart3.set("cursor", cursor3);
```

> **Important:** Syncing is performed using actual X/Y coordinates of the point of mouse cursor's position or touch. It means that they will not sync by axis positions, but rather by screen coordinates. For example vertical lines will not sync across horizontally laid out charts, and vice versa.

Example: [Syncing cursors across several charts](https://docs.amcharts.com/embeds/v5/syncing-cursors-across-several-charts/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv1"></div>
<div id="chartdiv2"></div>
<div id="chartdiv3"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv1,
#chartdiv2,
#chartdiv3 {
  width: 100%;
  height: 200px;
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

function createChart(div) {
  // Create root element
  // https://docs.amcharts.com/v5/getting-started/#root-element
  var root = am5.Root.new(div);

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

  // Make stuff animate on load
  // https://docs.amcharts.com/v5/concepts/animations/
  series.appear(1000, 100);
  chart.appear(1000, 100);

  return chart;
}

// Create charts
var chart1 = createChart("chartdiv1");
var chart2 = createChart("chartdiv2");
var chart3 = createChart("chartdiv3");

// Sync cursors
chart1.get("cursor").set("syncWith", [chart2.get("cursor"), chart3.get("cursor")]);
chart2.get("cursor").set("syncWith", [chart1.get("cursor"), chart3.get("cursor")]);
chart3.get("cursor").set("syncWith", [chart1.get("cursor"), chart2.get("cursor")]);
```

> **More info:** For syncing cursors across non-vertically arranged charts, refer to "[Syncing cursors across multiple horizontally-arranged charts](https://docs.amcharts.com/v5/tutorials/syncing-cursors-across-multiple-horizontally-arranged-charts/)".

## Keyboard control

Cursor can also be controlled using directional keys on a keyboard.

For more information, refer to "[Accessibility: XY cursor](https://docs.amcharts.com/v5/concepts/accessibility/#xy-cursor)" tutorial.

## Related tutorials

* [Triggering bullet hover with an XY cursor](https://docs.amcharts.com/v5/tutorials/triggering-bullet-hover-with-an-xy-cursor/)
* [Getting data items within cursor selection](https://docs.amcharts.com/v5/tutorials/getting-data-items-within-cursor-selection/)
* [Cursor with “corner” crosshair lines](https://docs.amcharts.com/v5/tutorials/cursor-with-corner-crosshair-lines/)
* [Changing XYCursor's behavior based on SHIFT key](https://docs.amcharts.com/v5/tutorials/changing-xycursors-behavior-based-on-shift-key/)
* [Syncing cursors across multiple horizontally-arranged charts](https://docs.amcharts.com/v5/tutorials/syncing-cursors-across-multiple-horizontally-arranged-charts/)
