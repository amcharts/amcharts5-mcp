---
title: "Candlestick and OHLC series"
source: "https://docs.amcharts.com/v5/charts/xy-chart/series/candlestick-series/"
scraped: "2026-11-16"
---

This tutorial looks at what is involved in creating candlestick and OHLC series.

## Creating

Both series are fairly identical in functionality.

Candlestick series are instantiated using `CandlestickSeries` class, whereas OHLC ones use `OHLCSeries`.

The difference between candlestick/OHLC and other XY series, is that the former require four numeric input data fields, rather than one:

| Data field                             | Comment                            |
| -------------------------------------- | ---------------------------------- |
| `openValueXField` or `openValueYField` | Field for open value.              |
| `highValueXField` or `highValueYField` | Field for high (top wick) value.   |
| `lowValueXField` or `lowValueYField`   | Field for low (bottom wick) value. |
| `valueXField` or `valueYField`         | Field for close value.             |

To create a series, use `new()` method of the respective series class, and push it into chart's `series` list:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.Candlestick.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    openValueYField: "open",
    highValueYField: "high",
    lowValueYField: "low",
    valueYField: "close",
    valueXField: "date"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.Candlestick.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    openValueYField: "open",
    highValueYField: "high",
    lowValueYField: "low",
    valueYField: "close",
    valueXField: "date"
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/candlestick-series/candlestick_series.png "`CandlestickSeries`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/candlestick-series/ohlc_series.png "`OHLCSeries`")

Example: [Candlestick series](https://docs.amcharts.com/embeds/v5/candlestick-series/)

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
    maxtooltipDistance: 0
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    open: 1200,
    high: 1205,
    low: 1198,
    close: 1202
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    open: 1204,
    high: 1204,
    low: 1197,
    close: 1199
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    open: 1188,
    high: 1191,
    low: 1183,
    close: 1189
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    open: 1194,
    high: 1197,
    low: 1189,
    close: 1195
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    open: 1189,
    high: 1198,
    low: 1189,
    close: 1196
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    open: 1197,
    high: 1200,
    low: 1196,
    close: 1196
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    open: 1207,
    high: 1208,
    low: 1202,
    close: 1202
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    open: 1212,
    high: 1213,
    low: 1206,
    close: 1209
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    open: 1206,
    high: 1208,
    low: 1197,
    close: 1201
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
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
var series = chart.series.push(
  am5xy.CandlestickSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    openValueYField: "open",
    highValueYField: "high",
    lowValueYField: "low",
    valueYField: "close",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {})
  })
);

series.columns.template.states.create("riseFromOpen", {
  fill: am5.color(0x76b041),
  stroke: am5.color(0x76b041)
});

series.columns.template.states.create("dropFromOpen", {
  fill: am5.color(0xe4572e),
  stroke: am5.color(0xe4572e)
});

series
  .get("tooltip")
  .label.set(
    "text",
    "[bold]{valueX.formatDate()}[/]\nOpen: {openValueY}\nHigh: {highValueY}\nLow: {lowValueY}\nClose: {valueY}"
  );
series.data.setAll(data);

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

## Configuring appearance

### Stroke and fill colors

Both candlestick and OHLC series have different approach to colors than the rest of the XY chart series.

While they still get assigned stroke and fill color from the [theme](https://docs.amcharts.com/v5/charts/xy-chart/series/#auto-assigned-colors) that are used for such auxiliary elements as tooltips, they do apply their own colors based on the close value relation to open value.

Basically, if the open value is lower than close, the candle/stick will be green. If it's the other way around, the candle/stick will be red.

Using other themes may introduce different coloring scheme.

Actual color application in these series is done by applying certain [state](https://docs.amcharts.com/v5/concepts/settings/states/) to candle/stick.

It is done by the series based on actual open/close values of each data item.

If close value is bigger than open, a `riseFromOpen` state is applied to the candle/stick.

And vice versa, if close value is lower than open, a `dropFromOpen` state is applied to the candle/stick.

Default theme defines different `fill` and `stroke` colors for these two states. That's how candles/sticks get their value-dependent coloring.

### Modifying colors

If we want to modify these positive/negative colors, we can override default states by creating our own ones on a series' `columns.template`:

TypeScript:

```ts
series.columns.template.states.create("riseFromOpen", {
  fill: am5.color(0x76b041),
  stroke: am5.color(0x76b041)
});

series.columns.template.states.create("dropFromOpen", {
  fill: am5.color(0xe4572e),
  stroke: am5.color(0xe4572e)
});
```

JavaScript:

```js
series.columns.template.states.create("riseFromOpen", {
  fill: am5.color(0x76b041),
  stroke: am5.color(0x76b041)
});

series.columns.template.states.create("dropFromOpen", {
  fill: am5.color(0xe4572e),
  stroke: am5.color(0xe4572e)
});
```

Naturally, we can also create a [quick theme](https://docs.amcharts.com/v5/concepts/themes/#quick-custom-theme):

TypeScript:

```ts
const myTheme = am5.Theme.new(root);

myTheme.rule("Candlestick").states.create("riseFromOpen", {
  fill: am5.color(0x76b041),
  stroke: am5.color(0x76b041)
});

myTheme.rule("Candlestick").states.create("dropFromOpen", {
  fill: am5.color(0xe4572e),
  stroke: am5.color(0xe4572e)
});

root.setThemes([
  myTheme
]);
```

JavaScript:

```js
var myTheme = am5.Theme.new(root);

myTheme.rule("Candlestick").states.create("riseFromOpen", {
  fill: am5.color(0x76b041),
  stroke: am5.color(0x76b041)
});

myTheme.rule("Candlestick").states.create("dropFromOpen", {
  fill: am5.color(0xe4572e),
  stroke: am5.color(0xe4572e)
});

root.setThemes([
  myTheme
]);
```

### Disabling value-dependent coloring

The coloring for the candlestick series comes from default theme. It targets candles/sticks via their `themeTags` setting, which (in case of candlestick series) is preset to `["autocolor"]`.

If we don't want any value-sensitive coloring applied, we can simply remove that setting:

TypeScript:

```ts
series.columns.template.set("themeTags", []);
```

JavaScript:

```js
series.columns.template.set("themeTags", []);
```

### Other appearance settings

We can also use the same `columns.template` to apply other non-color settings, e.g. `strokeWidth`:

TypeScript:

```ts
series.columns.template.setAll({
  strokeWidth: 2
});
```

JavaScript:

```js
series.columns.template.setAll({
  strokeWidth: 2
});
```

## Candle width

Candles/sticks take up 80% of the available width by default.

This can be changed using `columns.template`'s `width` setting which can either be relative percent value, or an absolute pixel value:

TypeScript:

```ts
series.columns.template.setAll({
  width: am5.percent(60)
});
```

JavaScript:

```js
series.columns.template.setAll({
  width: am5.percent(60)
});
```

For more information about this, refer to "[Column series: Column width](https://docs.amcharts.com/v5/charts/xy-chart/series/column-series/#column-width)" tutorial.

## Professional candlesticks

amCharts also supports "professional" or "hollow" candlesticks.

They might look similar to regular ones, but their coloring logic is quite different.

They can be either solid or hollow:

* SOLID candle means that its closing value is LOWER than opening value of the same period.
* HOLLOW candle means that its closing value is HIGHER (or EQUAL) than opening value of the same period.

Coloring is based on closing price in comparison to previous period:

* GREEN (or equivalent as per theme) means that its closing value is HIGHER (or EQUAL) than the closing value of the previous period.
* RED (or equivalent as per theme) means that its closing value is LOWER than the closing value of the previous period.

Default theme has it covered, already. All we have to do is to push a `"pro"` tag into column template's `themeTags`:

TypeScript:

```ts
series.columns.template.get("themeTags").push("pro");
```

JavaScript:

```js
series.columns.template.get("themeTags").push("pro");
```

Example: [Profesional candlesticks](https://docs.amcharts.com/embeds/v5/profesional-candlesticks/)

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
    maxtooltipDistance: 0
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    open: 1200,
    high: 1205,
    low: 1198,
    close: 1202
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    open: 1204,
    high: 1204,
    low: 1197,
    close: 1199
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    open: 1188,
    high: 1191,
    low: 1183,
    close: 1189
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    open: 1194,
    high: 1197,
    low: 1189,
    close: 1195
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    open: 1189,
    high: 1198,
    low: 1189,
    close: 1196
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    open: 1197,
    high: 1200,
    low: 1196,
    close: 1196
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    open: 1207,
    high: 1208,
    low: 1202,
    close: 1202
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    open: 1212,
    high: 1213,
    low: 1206,
    close: 1209
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    open: 1206,
    high: 1208,
    low: 1197,
    close: 1201
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
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
var series = chart.series.push(
  am5xy.CandlestickSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    openValueYField: "open",
    highValueYField: "high",
    lowValueYField: "low",
    valueYField: "close",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {})
  })
);

series.columns.template.states.create("riseFromOpen", {
  fill: am5.color(0x76b041),
  stroke: am5.color(0x76b041)
});

series.columns.template.states.create("dropFromOpen", {
  fill: am5.color(0xe4572e),
  stroke: am5.color(0xe4572e)
});

series.columns.template.get("themeTags").push("pro");

series.columns.template.setAll({
  strokeWidth: 2
});

series
  .get("tooltip")
  .label.set(
    "text",
    "[bold]{valueX.formatDate()}[/]\nOpen: {openValueY}\nHigh: {highValueY}\nLow: {lowValueY}\nClose: {valueY}"
  );
series.data.setAll(data);

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
