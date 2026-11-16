---
title: "Line series"
source: "https://docs.amcharts.com/v5/charts/xy-chart/series/line-series/"
scraped: "2026-11-16"
---

Line series is the most basic of all XY series. It is used to draw line and/or area plots.

## Creating

Line series is created by instantiating `LineSeries` object using `new()` method, and pushing it into chart's `series` list:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
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
  am5xy.LineSeries.new(root, {
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

Should we want to override theme's color, we can set it's `stroke` and/or `fill` settings.

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
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
  am5xy.LineSeries.new(root, {
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

### Line/fill settings

Stroke and fill colors are automatically used from series settings. All other options can be configured using series' element templates.

Line series has two of those: `strokes.template` (used to configure lines) and `fills.template` (used to configure fills).

The following code will set line width to 3 pixels and make it dashed, as well as make the line series into an area series, by setting fill opacity on fill template:

TypeScript:

```ts
series.strokes.template.setAll({
  strokeWidth: 3,
  strokeDasharray: [10,5]
});
series.fills.template.setAll({
  fillOpacity: 0.5,
  visible: true
});
```

JavaScript:

```js
series.strokes.template.setAll({
  strokeWidth: 3,
  strokeDasharray: [10,5]
});
series.fills.template.setAll({
  fillOpacity: 0.5,
  visible: true
});
```

> **Note:** Note the `visible: true` in `fills.template` settings. It is needed because fills are disabled for line series by default.

Example: [Configuring LineSeries appearance](https://docs.amcharts.com/embeds/v5/configuring-lineseries-appearance/)

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
    year: "2021",
    europe: 5,
    namerica: 2.5,
    asia: 1
  },
  {
    year: "2022",
    europe: 2.6,
    namerica: 6.7,
    asia: 2.2
  },
  {
    year: "2023",
    europe: 4.8,
    namerica: 1.9,
    asia: 4.4
  }
];

// Craete Y-axis
let yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),
    categoryField: "year"
  })
);

xAxis.data.setAll(data);

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      categoryXField: "year",
      stacked: true
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 3,
    strokeDasharray: [10, 5]
  });

  series.fills.template.setAll({
    fillOpacity: 0.5,
    visible: true
  });

  series.data.setAll(data);
}

createSeries("Europe", "europe");
createSeries("North America", "namerica");
createSeries("Asia", "asia");
```

### Simplifying the lines

If the line series has a lot of data points, they might get all crammed together, and make series look messy.

We can make line series skip some points that are closer than X pixels, by setting its `minDistance` setting:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    minDistance: 10
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    minDistance: 10
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/line-series/mindistance_0.png "`minDistance: 0` (default)")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/line-series/mindistance_20.png "`minDistance: 20`")

## Gaps

### Enabling breaks

A line series is normally displayed as a continuous line, jumping over gaps in data by connecting two data items that do have data.

To make it break in cases where data is missing, we need to set series `connect` setting to `false`:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    connect: false
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    connect: false
  })
);
```

Now, the line will break in two cases:

* Empty data items (data is missing a key for data field or has `null` in it).
* The two data items are further apart than set number of base intervals (only on charts where base axis is a date axis).

### Empty data points

The data for chart can contain data items that do not have a value for the series as defined by its data fields:

```json
[{
  date: new Date(2021, 0, 1).getTime(),
  value: 1000
}, {
  date: new Date(2021, 0, 2).getTime(),
  value: 800
}, {
  date: new Date(2021, 0, 3).getTime()
  // value is missing
}, {
  date: new Date(2021, 0, 4).getTime(),
  value: 800
}, {
  date: new Date(2021, 0, 5).getTime(),
  value: 800
}]
```

The value is missing for January 3rd, so the line will break over it displaying two separate segments: from Jan 1st to 2nd, and from 4th to 5th.

Example: [LineSeries with breaks](https://docs.amcharts.com/embeds/v5/lineseries-with-breaks/)

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
    date: new Date(2021, 0, 3).getTime()
    // value is missing
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
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      connect: false
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 3
  });

  series.fills.template.setAll({
    fillOpacity: 0.5,
    visible: true
  });

  series.data.setAll(data);
}

createSeries("Series with breaks", "value");
```

### Auto-gaps with dates

When using date axis as base axis for series, the line will also break if the distance between to data items is greater than granularity (as defined with `baseInterval` setting of the date axis) of the data, e.g. a day.

The above data example can be refactored to skip Jan 3rd altogether:

```json
[{
  date: new Date(2021, 0, 1).getTime(),
  value: 1000
}, {
  date: new Date(2021, 0, 2).getTime(),
  value: 800
}, {
  date: new Date(2021, 0, 4).getTime(),
  value: 800
}, {
  date: new Date(2021, 0, 5).getTime(),
  value: 800
}]
```

The line will still break between Jan 2nd and 4th, because there's more than a day between them.

We can control the size of the gap that auto-break occurs on using series' `autoGapCount` setting.

For example, if we would want the line to break only when the data items are 3 days apart, we'd set it to something like 3.1.

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    connect: false,
    autoGapCount: 3.1
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    connect: false,
    autoGapCount: 3.1
  })
);
```

## Open data fields

Line series is plotted on values we specify with input and display data fields. If we set up fills for the series, it will also fill the area all the way to the base axis.

If we'd like it to rather fill to some other values, we can use [open data fields](https://docs.amcharts.com/v5/charts/xy-chart/series/#open-data-input-fields) to point to values such fill should occur to.

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    openValueYField: "valueOpen"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    openValueYField: "valueOpen"
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/line-series/regular_line_series.png "Regular line series")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/line-series/line_series_open_field.png "Line series with `openValueYField` set")

Example: [LineSeries with open data fields](https://docs.amcharts.com/embeds/v5/lineseries-with-open-data-fields/)

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
    openValue: 200
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 800,
    openValue: 400
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 700,
    openValue: 950
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1200,
    openValue: 700
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 740,
    openValue: 720
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
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      openValueYField: openField
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 3
  });

  series.fills.template.setAll({
    fillOpacity: 0.5,
    visible: true
  });

  series.data.setAll(data);
}

createSeries("Series with breaks", "value", "openValue");
```

## Data item location

Normally, line series places its data item (point) in the middle of axis cell.

We can modify that behavior using `locationX` and `locationY` settings.

Those are numeric values indicating relative position to the data item's axis cell: `0` - beginning, `0.5` - middle, `1` - end.

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    locationX: 0
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    locationX: 0
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/line-series/location_default.png "`locationX: 0.5` (default)")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/line-series/location_0.png "`locationX: 0`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/line-series/location_08.png "`locationX: 0.8`")

## Using template fields

[Template fields](https://docs.amcharts.com/v5/concepts/settings/template-fields/) is a powerful concept allowing binding data values to settings of specific series elements.

We can use those to modify appearance of certain sections of line series.

Let's make our line series switch to dashed red line midway.

We will need to specify `templateField` for series' our strokes template: (we learned how strokes are set up using template earlier in this tutorial)

TypeScript:

```ts
series.strokes.template.setAll({
  templateField: "strokeSettings"
});
```

JavaScript:

```js
series.strokes.template.setAll({
  templateField: "strokeSettings"
});
```

Then we add `strokeSettings` objects in our data at the data point we want the switch to occur:

```json
[{
  date: new Date(2012, 1, 1).getTime(),
  value: 8
}, {
  date: new Date(2012, 1, 2).getTime(),
  value: 5
}, {
  date: new Date(2012, 1, 3).getTime(),
  value: 12,
  strokeSettings: {
    stroke: am5.color(0x990000),
    strokeDasharray: [3, 3]
  }
}, {
  date: new Date(2012, 1, 4).getTime(),
  value: 14
}, {
  date: new Date(2012, 1, 5).getTime(),
  value: 11
}]
```

Whenever template field value is encountered in data, the "current" style of line will become the one specified in the template field value, meaning all subsequent sections will be drawn using these additional settings.

Example: [Using templateField on LineSeries troke](https://docs.amcharts.com/embeds/v5/using-templatefield-on-lineseries-troke/)

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
  {
    date: new Date(2012, 1, 1).getTime(),
    value: 8
  },
  {
    date: new Date(2012, 1, 2).getTime(),
    value: 5
  },
  {
    date: new Date(2012, 1, 3).getTime(),
    value: 12,
    strokeSettings: {
      stroke: am5.color(0x990000),
      strokeDasharray: [3, 3]
    }
  },

  {
    date: new Date(2012, 1, 4).getTime(),
    value: 14
  },
  {
    date: new Date(2012, 1, 5).getTime(),
    value: 11
  }
];

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
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

series.strokes.template.setAll({
  strokeWidth: 3,
  templateField: "strokeSettings"
});

series.data.setAll(data);

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

## Related tutorials

* [Line series with a border](https://docs.amcharts.com/v5/tutorials/line-series-with-a-border/)
