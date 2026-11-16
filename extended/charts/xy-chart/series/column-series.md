---
title: "Column series"
source: "https://docs.amcharts.com/v5/charts/xy-chart/series/column-series/"
scraped: "2026-11-16"
---

This tutorial looks at various aspects of creating column series.

## Creating

Column series is created by instantiating `ColumnSeries` object using `new()` method, and pushing it into chart's `series` list:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);
```

## Configuring appearance

### Stroke and fill colors

Like with any series, it comes with stroke and fill color [pre-set from the theme](https://docs.amcharts.com/v5/charts/xy-chart/series/#auto-assigned-colors).

Should we want to override theme's color, we can set it's `stroke` (column outline) and/or `fill` settings.

TypeScript:

```ts
let series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    fill: am5.color(0x095256),
    stroke: am5.color(0x095256)
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    fill: am5.color(0x095256),
    stroke: am5.color(0x095256)
  })
);
```

### Column appearance settings

Stroke (column border) and fill colors are automatically used from series settings. All other options can be configured using series' element templates.

In column series there's only one element template: `columns.template`.

Let's make column fill semi-transparent using `fillOpacity` setting, as well as the border heavier, with rounded top corners:

TypeScript:

```ts
series.columns.template.setAll({
  fillOpacity: 0.5,
  strokeWidth: 2,
  cornerRadiusTL: 5,
  cornerRadiusTR: 5
});
```

JavaScript:

```js
series.columns.template.setAll({
  fillOpacity: 0.5,
  strokeWidth: 2,
  cornerRadiusTL: 5,
  cornerRadiusTR: 5
});
```

Example: [Styling ColumnSeries](https://docs.amcharts.com/embeds/v5/styling-columnseries/)

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

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 1000
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 800
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 700
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1200
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 740
  }
];

// Craete Y-axis
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
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date"
    })
  );

  series.columns.template.setAll({
    fillOpacity: 0.5,
    strokeWidth: 2,
    cornerRadiusTL: 5,
    cornerRadiusTR: 5
  });

  series.data.setAll(data);
}

createSeries("Series", "value");
```

## Clustering

Normally, multiple column series will "cluster", i.e. will show their columns reduced in width side by side.

We can use setting `clustered` to disable clustering for particular series. It can be useful in a number of situations, most commonly when creating Gantt or similar charts using [floating columns](#floating-columns).

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/column-series/column_clustered.png "Regular clustered columns")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/column-series/column_unclustered.png "Clustering disabled")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/column-series/floating_clustered.png "Floating clustered columns")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/column-series/floating_non_clustered.png "Floating columns with clustering disabled")

## Stacking

### Enabling stacking

[Stacking](https://docs.amcharts.com/v5/charts/xy-chart/series/#stacked-series) for column series is enabled just like for any other XY series: by setting its `stacked` setting to `true`.

TypeScript:

```ts
let series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: name,
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value", 
    valueXField: "date",
    stacked: true
  }) 
);
```

JavaScript:

```js
var series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: name,
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value", 
    valueXField: "date",
    stacked: true
  }) 
);
```

> **More info:** For more information about negative and 100% stacking, please refer to "[XY chart series: Stacked series](https://docs.amcharts.com/v5/charts/xy-chart/series/#stacked-series)".

## Column width

Columns in series take up 80% of available space by default.

It can be controlled via series `columns.template` and its `width` setting (or `height` if we have a chart with horizontal bars).

`width` (or `height`) can either be set in percent value relative to the space available for the series:

TypeScript:

```ts
series.columns.template.setAll({
  width: am5.percent(100)
});
```

JavaScript:

```js
series.columns.template.setAll({
  width: am5.percent(100)
});
```

It can also be set in absolute pixel value:

TypeScript:

```ts
series.columns.template.setAll({
  width: 5
});
```

JavaScript:

```js
series.columns.template.setAll({
  width: 5
});
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/column-series/column_relative_80.png "`width: am5.percent(80)` (default)")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/column-series/column_relative_100.png "`width: am5.percent(100)`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/column-series/column_fixed_width_20.png "`width: 20`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/column-series/column_fixed_width_5.png "`width: 5`")

## Floating columns

Normally, columns start at base value (zero). We can make columns start at different values using [open data fields](https://docs.amcharts.com/v5/charts/xy-chart/series/#open-data-input-fields): `openValueXField` or `openValueYField`.

TypeScript:

```ts
let series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: name,
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value", 
    valueXField: "date",
    openValueYField: "openValue"
  }) 
);
```

JavaScript:

```js
var series = chart.series.push( 
  am5xy.ColumnSeries.new(root, { 
    name: name,
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value", 
    valueXField: "date",
    openValueYField: "openValue"
  }) 
);
```

The above will mean that columns bottom will start at whatever number is in "openValue" in data, and will end at "value".

Example: [Clustering ColumnSeries](https://docs.amcharts.com/embeds/v5/clustering-columnseries/)

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

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 1000,
    openValue: 400,
    value2: 1420,
    openValue2: 1300
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 800,
    openValue: 500,
    value2: 450,
    openValue2: 200
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 700,
    openValue: 600,
    value2: 1000,
    openValue2: 850
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1200,
    openValue: 880,
    value2: 800,
    openValue2: 260
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 740,
    openValue: 400,
    value2: 920,
    openValue2: 800
  }
];

// Craete Y-axis
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
function createSeries(name, field, openField) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      openValueYField: openField,
      clustered: false
    })
  );

  series.data.setAll(data);
}

createSeries("Series #1", "value", "openValue");
createSeries("Series #2", "value2", "openValue2");
```

> **Note:** For horizontal bars, we would use `openValueXField` instead.

## Value-dependent coloring

We can use states to apply different coloring to `columns.template` based on whether value of the column is higher or lower than the previous column in series.

If the value is higher, the series will attempt to apply a `riseFromPrevious` state to the column.

If the value is lower, a `dropFromPrevious` will be applied instead.

We can create those states for our `columns.template` to make use of this feature:

TypeScript:

```ts
series.columns.template.states.create("riseFromPrevious", {
  fill: am5.color(0x76b041),
  stroke: am5.color(0x76b041)
});

series.columns.template.states.create("dropFromPrevious", {
  fill: am5.color(0xe4572e),
  stroke: am5.color(0xe4572e)
});
```

JavaScript:

```js
series.columns.template.states.create("riseFromPrevious", {
  fill: am5.color(0x76b041),
  stroke: am5.color(0x76b041)
});

series.columns.template.states.create("dropFromPrevious", {
  fill: am5.color(0xe4572e),
  stroke: am5.color(0xe4572e)
});
```

Naturally, we can also [modify global theme](https://docs.amcharts.com/v5/concepts/themes/#quick-custom-theme) as well:

TypeScript:

```ts
root.defaultTheme.rule("RoundedRectangle", ["series", "column"]).create("riseFromPrevious", {
  fill: am5.color(0x76b041),
  stroke: am5.color(0x76b041)
});

root.defaultTheme.rule("RoundedRectangle", ["series", "column"]).create("dropFromPrevious", {
  fill: am5.color(0xe4572e),
  stroke: am5.color(0xe4572e)
});
```

JavaScript:

```js
root.defaultTheme.rule("RoundedRectangle", ["series", "column"]).create("riseFromPrevious", {
  fill: am5.color(0x76b041),
  stroke: am5.color(0x76b041)
});

root.defaultTheme.rule("RoundedRectangle", ["series", "column"]).create("dropFromPrevious", {
  fill: am5.color(0xe4572e),
  stroke: am5.color(0xe4572e)
});
```

Example: [Value-dependent coloring of ColumnSeries](https://docs.amcharts.com/embeds/v5/value-dependent-coloring-of-columnseries/)

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

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 1000
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 800
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 700
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1200
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 740
  }
];

// Craete Y-axis
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
function createSeries(name, field, openField) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date"
    })
  );

  series.columns.template.setAll({
    fillOpacity: 0.5,
    strokeWidth: 2
  });

  series.data.setAll(data);

  series.columns.template.states.create("riseFromPrevious", {
    fill: am5.color(0x76b041),
    stroke: am5.color(0x76b041)
  });

  series.columns.template.states.create("dropFromPrevious", {
    fill: am5.color(0xe4572e),
    stroke: am5.color(0xe4572e)
  });
}

createSeries("Series with breaks", "value", "openValue");
```

## Adding links to columns

Columns can act as links, navigating to a URL when clicked. To enable it, set series' `urlField` to the name of a data field that holds the target URL. Links are off until `urlField` is set.

TypeScript:

```ts
let series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    urlField: "url"
  })
);

series.data.setAll([{
  date: 1672531200000,
  value: 100,
  url: "https://en.wikipedia.org/wiki/January"
}, {
  date: 1675209600000,
  value: 120,
  url: "https://en.wikipedia.org/wiki/February"
}, {
  date: 1677628800000,
  value: 90,
  url: "https://en.wikipedia.org/wiki/March"
}]);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    urlField: "url"
  })
);

series.data.setAll([{
  date: 1672531200000,
  value: 100,
  url: "https://en.wikipedia.org/wiki/January"
}, {
  date: 1675209600000,
  value: 120,
  url: "https://en.wikipedia.org/wiki/February"
}, {
  date: 1677628800000,
  value: 90,
  url: "https://en.wikipedia.org/wiki/March"
}]);
```

Columns with a URL in their data are automatically made clickable and show a pointer cursor. Those without a URL stay unaffected.

By default the URL opens in the same window. Use `linkTarget` to control where it opens, e.g. `"_blank"` for a new tab (handy when the chart is embedded in an iframe):

TypeScript:

```ts
let series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    urlField: "url",
    linkTarget: "_blank"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    urlField: "url",
    linkTarget: "_blank"
  })
);
```

## Events

The most convenient way to add events to a column series is to set those on its column template.

The following will add a click event to a series columns:

TypeScript:

```ts
series.columns.template.events.on("click", function(ev) {
  // column id
  console.log("Clicked on a column", ev.target.uid);
  // data item
  console.log(ev.target.dataItem);
  // your original data object
  console.log(ev.target.dataItem.dataContext);
  // series
  console.log(ev.target.dataItem.component)
});
```

JavaScript:

```js
series.columns.template.events.on("click", function(ev) {
  // column id
  console.log("Clicked on a column", ev.target.uid);
  // data item
  console.log(ev.target.dataItem);
  // your original data object
  console.log(ev.target.dataItem.dataContext);
  // series
  console.log(ev.target.dataItem.component)
});
```

## Turbo mode

Data-heavy Column series (and derivatives like Candlestick series) can get sluggish when rendering them.

For such setups, "turbo" mode can be enabled. It will simplify rendering process, drawing columns directly on canvas, speeding it significantly in the process.

TypeScript:

```ts
let series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    turboMode: true
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    turboMode: true
  })
);
```

The drawbacks of the "turbo mode" is that some of the functionality will not be available:

* Adding interactive events to columns, like `pointerover` events.
* Rounded corners are not supported.
