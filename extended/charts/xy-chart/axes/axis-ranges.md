---
title: "Axis ranges"
source: "https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/"
scraped: "2026-11-16"
---

Axis ranges can be used to put lines or bands across plot area, or apply different settings to segments of series.

## Creating a range

Regardless of what we are going to do use the range for (put a grid, band, label, or apply settings to series), we start off by creating it via following process:

1. Create an axis data item via axis' `createDataItem()` method. It will be used to specify range start (and optionally end) value/date/category as well as appearance settings for related elements like grid, fill, or label.
2. Create an axis range object via axis or series `createAxisRange()` method using axis data item.

TypeScript:

```ts
// Create range axis data item
let rangeDataItem = yAxis.makeDataItem({
  value: 100
});

// Create a range
let range = yAxis.createAxisRange(rangeDataItem);
```

JavaScript:

```js
// Create range axis data item
var rangeDataItem = yAxis.makeDataItem({
  value: 100
});

// Create a range
var range = yAxis.createAxisRange(rangeDataItem);
```

> **Note:** `createAxisRange()` creates the necessary range elements such as grid, labels, and fill, and returns **the same data item** passed in to it.

## Range start and end

In the above example we've set a single setting on our range data item: `value`.

On a value axis it would mean that the range will start ant end at the same value, displaying single grid line.

If we would like the range to span a range of values, we would also need to set `endValue`:

TypeScript:

```ts
let rangeDataItem = yAxis.makeDataItem({
  value: 100,
  endValue: 200
});
```

JavaScript:

```js
var rangeDataItem = yAxis.makeDataItem({
  value: 100,
  endValue: 200
});
```

Depending on the axis type, we may need to use different settings keys:

| Axis type          | Start/end key usage                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `ValueAxis`        | `{` ` value: 100,` ` endValue: 200` `}`                                                              |
| `DateAxis`         | `{` ` value: new Date(2021, 0, 1).getTime(),` ` endValue: new Date(2021, 0, 15).getTime()` `}`       |
| `CategoryAxis`     | `{` ` category: "Q2",` ` endCategory: "Q3"` `}`                                                      |
| `CategoryDateAxis` | `{` ` category: new Date(2021, 0, 1).getTime(),` ` endCategory: new Date(2021, 0, 15).getTime()` `}` |

Here's how it might look on a date axis:

TypeScript:

```ts
var rangeDataItem = xAxis.makeDataItem({
  value: new Date(2021, 0, 1).getTime(),
  endValue: new Date(2021, 0, 15).getTime()
});
```

JavaScript:

```js
var rangeDataItem = xAxis.makeDataItem({
  value: new Date(2021, 0, 1).getTime(),
  endValue: new Date(2021, 0, 15).getTime()
});
```

## Range elements

### Grid

The axis data item has a setting `grid` which holds an instance of `Grid` element, that we can use to configure how the grid line (which is placed at precisely at `value` or `category`) looks like:

TypeScript:

```ts
rangeDataItem.get("grid").setAll({
  stroke: color,
  strokeOpacity: 1
});
```

JavaScript:

```js
rangeDataItem.get("grid").setAll({
  stroke: color,
  strokeOpacity: 1
});
```

Grid line is placed on a start value/category by default.

We can change that using grid's `location` setting which is a numeric value from `0` (zero) to `1` (one) indicating relative position between start and end values.

TypeScript:

```ts
rangeDataItem.get("grid").setAll({
  stroke: color,
  strokeOpacity: 1,
  location: 0.5
});
```

JavaScript:

```js
rangeDataItem.get("grid").setAll({
  stroke: color,
  strokeOpacity: 1,
  location: 0.5
});
```

The above will place grid line exactly in the middle of the range.

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/axis-ranges/axis_range_grid_location_0.png "`location: 0` (default)")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/axis-ranges/axis_range_grid_location_1.png "`location: 1`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/axis-ranges/axis_range_grid_location_05.png "`location: 0.5`")

If we don't need axis range to show any grid line, we can simply disable it via `visible` setting:

TypeScript:

```ts
rangeDataItem.get("grid").set("visible", false);
```

JavaScript:

```js
rangeDataItem.get("grid").set("visible", false);
```

### Fill

Unlike grid, fills are not visible by default, so we need to configure them using `axisFill` setting, which is a generic object of type `Graphics`.

TypeScript:

```ts
rangeDataItem.get("axisFill").setAll({
  fill: color,
  fillOpacity: 0.2,
  visible: true
});
```

JavaScript:

```js
rangeDataItem.get("axisFill").setAll({
  fill: color,
  fillOpacity: 0.2,
  visible: true
});
```

> **Note:** Axis fills are hidden by default, hence the need for `visible: true`.

### Label

Like grid and fill, a label is already pre-created with every axis data item. It's accessible via `label` setting and is usually an object of type `AxisLabel`.

For it to become visible, at the very least we need to set its `text` setting, but can also use any `AxisLabel` setting:

TypeScript:

```ts
rangeDataItem.get("label").setAll({
  fill: am5.color(0xffffff),
  text: "Buy",
  background: am5.RoundedRectangle.new(root, {
    fill: color
  })
});
```

JavaScript:

```js
rangeDataItem.get("label").setAll({
  fill: am5.color(0xffffff),
  text: "Buy",
  background: am5.RoundedRectangle.new(root, {
    fill: color
  })
});
```

Similarly to grid, it also supports `location` setting, which can be used to position it within value range of the axis range:

TypeScript:

```ts
rangeDataItem.get("label").setAll({
  fill: am5.color(0xffffff),
  text: "Buy",
  location: 1,
  background: am5.RoundedRectangle.new(root, {
    fill: color
  })
});
```

JavaScript:

```js
rangeDataItem.get("label").setAll({
  fill: am5.color(0xffffff),
  text: "Buy",
  location: 1,
  background: am5.RoundedRectangle.new(root, {
    fill: color
  })
});
```

`0` (zero) means label will be placed on the start value, `1` (one) - end value, while intermediate value will place the label relative to the actual range.

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/axis-ranges/axis_range_label_location_0.png "`location: 0` (default)")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/axis-ranges/axis_range_label_location_05.png "`location: 0.5`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/axis-ranges/axis_range_label_location_1.png "`location: 1`")

Example: [Axis ranges](https://docs.amcharts.com/embeds/v5/axis-ranges/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/radar.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    wheelY: "zoomX"
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100,
    value2: 220
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320,
    value2: 300
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216,
    value2: 120
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150,
    value2: 190
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156,
    value2: 190
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199,
    value2: 120
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114,
    value2: 300
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269,
    value2: 290
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190,
    value2: 290
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380,
    value2: 170
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250,
    value2: 200
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110,
    value2: 210
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185,
    value2: 85
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105,
    value2: 244
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
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
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");
createSeries("Series #2", "value2");

// Create axis ranges
function createRange(value, endValue, color) {
  var rangeDataItem = yAxis.makeDataItem({
    value: value,
    endValue: endValue
  });

  var range = yAxis.createAxisRange(rangeDataItem);

  if (endValue) {
    range.get("axisFill").setAll({
      fill: color,
      fillOpacity: 0.2,
      visible: true
    });

    range.get("label").setAll({
      fill: am5.color(0xffffff),
      text: value + "-" + endValue,
      location: 1,
      background: am5.RoundedRectangle.new(root, {
        fill: color
      })
    });
  } else {
    range.get("label").setAll({
      fill: am5.color(0xffffff),
      text: value,
      background: am5.RoundedRectangle.new(root, {
        fill: color
      })
    });
  }

  range.get("grid").setAll({
    stroke: color,
    strokeOpacity: 1,
    location: 1
  });
}

createRange(175, 275, am5.color(0xff621f));
createRange(120, undefined, am5.color(0x297373));

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX",
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

> **Note:** Labels are shown on the axis itself by default. For tips on how to move them on the opposite side of the chart, refer to "[Aligning axis range labels](https://docs.amcharts.com/v5/tutorials/aligning-axis-range-labels/)" tutorial.

### Bullet

It's also possible to show a bullet with any element in it by setting range data item's `bullet` property:

TypeScript:

```ts
rangeDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: am5.Picture.new(root, {
    width: 50,
    height: 50,
    centerX: am5.percent(0),
    centerY: am5.percent(100),
    src: "path/to/icon.svg"
  })
}));
```

JavaScript:

```js
rangeDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: am5.Picture.new(root, {
    width: 50,
    height: 50,
    centerX: am5.percent(0),
    centerY: am5.percent(100),
    src: "path/to/icon.svg"
  })
}));
```

Example: [Axis icons via ranges](https://docs.amcharts.com/embeds/v5/axis-icons-via-ranges/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/radar.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    wheelY: "zoomX"
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100,
    value2: 220
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320,
    value2: 300
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216,
    value2: 120
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150,
    value2: 190
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156,
    value2: 190
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199,
    value2: 120
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114,
    value2: 300
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269,
    value2: 290
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190,
    value2: 290
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380,
    value2: 170
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250,
    value2: 200
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110,
    value2: 210
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185,
    value2: 85
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105,
    value2: 244
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
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
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 2
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");
createSeries("Series #2", "value2");

// Create axis ranges
function createRange(value, bullet) {
  var rangeDataItem = xAxis.makeDataItem({
    value: value
  });

  var range = xAxis.createAxisRange(rangeDataItem);

  rangeDataItem.get("grid").set("visible", false);

  rangeDataItem.set(
    "bullet",
    am5xy.AxisBullet.new(root, {
      sprite: am5.Picture.new(root, {
        width: 50,
        height: 50,
        centerX: am5.percent(0),
        centerY: am5.percent(100),
        src: bullet
      })
    })
  );
}

createRange(new Date(2021, 0, 3).getTime(), "https://docs.amcharts.com/assets/icon_flag_red.svg");
createRange(new Date(2021, 0, 10).getTime(), "https://docs.amcharts.com/assets/icon_flag_green.svg");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX",
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

Axis bullets will be placed directly on the axis. If we would like to move those somewhere else, like for instance on top of plot container, we will need to adjust their `y` setting using an adapter:

TypeScript:

```ts
let bullet = am5.Picture.new(root, {
  width: 24,
  height: 24,
  centerX: am5.percent(0),
  centerY: am5.percent(100),
  src: bullet
});

bullet.adapters.add("y", function(y, target) {
  return -1 * chart.plotContainer.getPrivate("height");
});

rangeDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: bullet
}));
```

JavaScript:

```js
var bullet = am5.Picture.new(root, {
  width: 24,
  height: 24,
  centerX: am5.percent(0),
  centerY: am5.percent(100),
  src: bullet
});

bullet.adapters.add("y", function(y, target) {
  return -1 * chart.plotContainer.getPrivate("height");
});

rangeDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: bullet
}));
```

Example: [Axis icons via ranges](https://docs.amcharts.com/embeds/v5/axis-icons-via-ranges-2/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/radar.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    wheelY: "zoomX",
    paddingTop: 30
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100,
    value2: 220
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320,
    value2: 300
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216,
    value2: 120
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150,
    value2: 190
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156,
    value2: 190
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199,
    value2: 120
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114,
    value2: 300
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269,
    value2: 290
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190,
    value2: 290
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380,
    value2: 170
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250,
    value2: 200
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110,
    value2: 210
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185,
    value2: 85
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105,
    value2: 244
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
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
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 2
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");
createSeries("Series #2", "value2");

// Create axis ranges
function createRange(value, bullet) {
  var rangeDataItem = xAxis.makeDataItem({
    value: value
  });

  var range = xAxis.createAxisRange(rangeDataItem);

  rangeDataItem.get("grid").set("visible", false);

  var bullet = am5.Picture.new(root, {
    width: 24,
    height: 24,
    centerX: am5.percent(0),
    centerY: am5.percent(100),
    src: bullet
  });

  bullet.adapters.add("y", function (dy, target) {
    return -1 * chart.plotContainer.getPrivate("height");
  });

  rangeDataItem.set(
    "bullet",
    am5xy.AxisBullet.new(root, {
      sprite: bullet
    })
  );
}

createRange(new Date(2021, 0, 3).getTime(), "https://docs.amcharts.com/assets/icon_flag_red.svg");
createRange(new Date(2021, 0, 10).getTime(), "https://docs.amcharts.com/assets/icon_flag_green.svg");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX",
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

For more information about bullets, refer to "[Bullets](https://docs.amcharts.com/v5/concepts/common-elements/bullets/)" tutorial.

### Grid/fill above series

Normally, axis range's grid and fill will be drawn behind series.

If we'd like to move it in front of series, we can do so by setting `above` to `true` in a related data item:

TypeScript:

```ts
// Create range axis data item
let rangeDataItem = yAxis.makeDataItem({
  value: 100,
  above: true
});

// Create a range
let range = yAxis.createAxisRange(rangeDataItem);
```

JavaScript:

```js
// Create range axis data item
var rangeDataItem = yAxis.makeDataItem({
  value: 100,
  above: true
});

// Create a range
var range = yAxis.createAxisRange(rangeDataItem);
```

> **Note:** The setting `above` is not dynamic. It needs to be set before actual axis range is created. Subsequent changes to this setting will have no effect.

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/axis-ranges/axisrange_behind_series.png "Default behavior")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/axes/axis-ranges/axisrange_in_front_series.png "`above: true`")

### Including in min/max

Normally, axis ranges are not included in the calculation of the scope of values of the value axis.

If we'd like particular axis range to influence that scale, we can set `affectsMinMax: true` in its data item:

TypeScript:

```ts
// Create range axis data item
let rangeDataItem = yAxis.makeDataItem({
  value: 100,
  affectsMinMax: true
});

// Create a range
let range = yAxis.createAxisRange(rangeDataItem);
```

JavaScript:

```js
// Create range axis data item
var rangeDataItem = yAxis.makeDataItem({
  value: 100,
  affectsMinMax: true
});

// Create a range
var range = yAxis.createAxisRange(rangeDataItem);
```

## Series axis ranges

Axis ranges can also be used to modify appearance of segments of series that fall within specific specific value/date/category range.

Creating a series axis range is similar to one of create a regular range with two exceptions:

* `createAxisRange()` method should be called on a series, instead of the axis itself.
* Series-specific settings need to be set on a range.

### Creating series axis range

TypeScript:

```ts
// Create range axis data item
let rangeDataItem = yAxis.makeDataItem({
  value: 100,
  endvalue: 200
});

// Create a range on series
let range = series.createAxisRange(rangeDataItem);
```

JavaScript:

```js
// Create range axis data item
var rangeDataItem = yAxis.makeDataItem({
  value: 100,
  endvalue: 200
});

// Create a range on series
var range = series.createAxisRange(rangeDataItem);
```

> **Note:** `createAxisRange()` creates the necessary range elements such as grid, labels, and fill, and returns **the same data item** passed in to it.

### Setting series appearance

Configuring appearance of a series segment within a range is done very similarly to [configuring the series](https://docs.amcharts.com/v5/charts/xy-chart/series/#configuring-appearance) itself: via templates of specific elements.

For example we would configure column series columns, via its `columns.template`. Or line series via its `strokes.template` and `fills.template`.

Configuring series look within a range is identical to that, except we use element templates on an axis range object returned by series `createAxisRange()` method.

Here's an example for `ColumnSeries`:

TypeScript:

```ts
range.columns.template.setAll({
  fill: am5.color(0xff621f),
  stroke: am5.color(0xff621f)
});
```

JavaScript:

```js
range.columns.template.setAll({
  fill: am5.color(0xff621f),
  stroke: am5.color(0xff621f)
});
```

Example: [Axis ranges with series](https://docs.amcharts.com/embeds/v5/axis-ranges-with-series/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/radar.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    wheelY: "zoomX"
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
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
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);

  return series;
}

var series1 = createSeries("Series #1", "value");

// Create axis ranges
function createRange(series, value, endValue, color) {
  var range = series.createAxisRange(
    yAxis.makeDataItem({
      value: value,
      endValue: endValue
    })
  );

  range.columns.template.setAll({
    fill: color,
    stroke: color
  });

  range.axisDataItem.get("axisFill").setAll({
    fill: color,
    fillOpacity: 0.05,
    visible: true
  });
}

createRange(series1, 125, 275, am5.color(0xff621f));

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX",
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

And here's for `LineSeries`:

TypeScript:

```ts
range.fills.template.setAll({
  fill: am5.color(0xff621f),
  stroke: am5.color(0xff621f)
});
```

JavaScript:

```js
range.fills.template.setAll({
  fill: am5.color(0xff621f),
  stroke: am5.color(0xff621f)
});
```

Example: [Axis ranges with line series](https://docs.amcharts.com/embeds/v5/axis-ranges-with-line-series/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/radar.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    wheelY: "zoomX"
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
    })
  })
);

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.SmoothedXLineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 3
  });

  series.fills.template.setAll({
    fillOpacity: 0.5,
    visible: true
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);

  return series;
}

var series1 = createSeries("Series #1", "value");

// Create axis ranges
function createRange(series, value, endValue, color) {
  var rangeDataItem = yAxis.makeDataItem({
    value: value,
    endValue: endValue
  });

  var range = series.createAxisRange(rangeDataItem);

  range.strokes.template.setAll({
    stroke: color,
    strokeWidth: 3
  });

  range.fills.template.setAll({
    fill: color,
    fillOpacity: 0.8,
    visible: true
  });

  rangeDataItem.get("axisFill").setAll({
    fill: color,
    fillOpacity: 0.05,
    visible: true
  });
}

createRange(series1, 125, 275, am5.color(0xff621f));

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX",
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

And here's another demo that uses date axis for is range:

Example: [Axis ranges with line series](https://docs.amcharts.com/embeds/v5/axis-ranges-with-line-series-2/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/radar.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    wheelY: "zoomX"
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
    })
  })
);

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.SmoothedXLineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 3
  });

  series.fills.template.setAll({
    fillOpacity: 0.5,
    visible: true
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);

  return series;
}

var series1 = createSeries("Series #1", "value");

// Create axis ranges
function createRange(series, value, endValue, color) {
  var rangeDataItem = xAxis.makeDataItem({
    value: new Date(2021, 0, 4).getTime(),
    endValue: new Date(2021, 0, 10).getTime()
  });

  var range = series.createAxisRange(rangeDataItem);

  range.strokes.template.setAll({
    stroke: color,
    strokeWidth: 3
  });

  range.fills.template.setAll({
    fill: color,
    fillOpacity: 0.8,
    visible: true
  });

  rangeDataItem.get("axisFill").setAll({
    fill: color,
    fillOpacity: 0.05,
    visible: true
  });
}

createRange(series1, 125, 275, am5.color(0xff621f));

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX",
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

### Elements on a series range

Note that axis range elements (grid, fill, label, tick) is disabled by default on a series range. If you need to enable them, set `visible: true` on them:

TypeScript:

```ts
rangeDataItem.get("grid").setAll({
  visible: true
});

rangeDataItem.get("axisFill").setAll({
  fill: color,
  fillOpacity: 0.2,
  visible: true
});
```

JavaScript:

```js
rangeDataItem.get("grid").setAll({
  visible: true
});

rangeDataItem.get("axisFill").setAll({
  fill: color,
  fillOpacity: 0.2,
  visible: true
});
```

## Removing

To remove an existing axis range, all we need to do is simply remove it from `axisRanges` list.

For simple axis ranges, we would do that on axis' `axisRanges`:

TypeScript:

```ts
axis.axisRanges.removeValue(range);
```

JavaScript:

```js
axis.axisRanges.removeValue(range);
```

For a range attached to series, we'd rather use series' `axisRanges`:

TypeScript:

```ts
series.axisRanges.removeValue(range);
```

JavaScript:

```js
series.axisRanges.removeValue(range);
```

## Related tutorials

* [Range selector with draggable axis range](https://docs.amcharts.com/v5/tutorials/range-selector-with-draggable-axis-range/)
* [Using axis ranges to place labels at arbitrary values or dates](https://docs.amcharts.com/v5/tutorials/using-axis-ranges-to-place-labels-at-arbitrary-values-or-dates/)
* [Force the last label on a DateAxis using axis range](https://docs.amcharts.com/v5/tutorials/force-the-last-label-on-a-dateaxis-using-axis-range/)
* [Using axis ranges to highlight weekends](https://docs.amcharts.com/v5/tutorials/using-axis-ranges-to-highlight-weekends/)
* [Automatically grouping date axis months into years using axis ranges](https://docs.amcharts.com/v5/tutorials/automatically-grouping-date-axis-months-into-years-using-axis-ranges/)
* [Adding axis ranges to a legend](https://docs.amcharts.com/v5/tutorials/adding-axis-ranges-to-a-legend/)
