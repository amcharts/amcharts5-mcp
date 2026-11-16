---
title: "Bullets"
source: "https://docs.amcharts.com/v5/concepts/common-elements/bullets/"
scraped: "2026-11-16"
---

This tutorial will look into all aspects of using bullets on series.

## Creating a series bullet

Each series has a `bullets` property, which is a `List` of functions.

A function is responsible for returning a `Bullet` object.

Whenever series needs to create a bullet for a specific data item, it will call the function and expect it to return a new bullet, which then be displayed on actual chart.

So, creating a bullet involves pushing a custom function into series' `bullets` list:

TypeScript:

```ts
series.bullets.push(function(root) {
  return am5.Bullet.new(root, {});
});
```

JavaScript:

```js
series.bullets.push(function(root) {
  return am5.Bullet.new(root, {});
});
```

> **Note:** Bullet function receives a root object instance as a first parameter. Since bullets can be created in a lot of different places (e.g. external legend), make sure that we use the passed in object to avoid any anomalies.

## Bullet contents

Naturally, empty bullet is useless because it does not have anything to display, so we need to set its contents.

To do that, `Bullet` has a setting `sprite` which can be set to literally any other element: from something as simple as a `Circle` object to another full fledged chart.

TypeScript:

```ts
series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 4,
      fill: series.get("fill")
    })
  });
});
```

JavaScript:

```js
series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 4,
      fill: series.get("fill")
    })
  });
});
```

The above will create a bullet with a circle.

Please note that bullets can be complex and will not inherit series colors automatically, hence we need to explicitly set its color to series color.

Example: [Line series with bullets](https://docs.amcharts.com/embeds/v5/line-series-with-bullets/)

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

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: series.get("fill")
      })
    });
  });

  series.strokes.template.set("strokeWidth", 2);

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

For an example of how to use images as bullets, refer to "[Images](https://docs.amcharts.com/v5/concepts/common-elements/images/#images-as-bullets)" tutorial.

## Adding directly to data item

It is possible to create bullets one by one, by adding them directly to the actual series' data items.

For that, series does have an `addBullet(dataItem, bullet)` method.

It accepts two parameters:

* `dataItem` - a series data item to add bullet to.
* `bullet` - an instance of `Bullet`. Note that this is not a bullet-creating function, but an actual `Bullet` instance.

There are three steps to the process:

1. Waiting for series to process data, i.e. its `datavalidated` event kicks in.
2. Finding series data item to add bullet to.
3. Adding the actual bullet using series method `addBullet()`.

### Waiting for data

In order for data items to be available, we need to wait until series finishes processing its data. For that we'll need to watch for its `datavalidated` event kicking in.

TypeScript:

```ts
series.events.once("datavalidated", function() {
  // Series data ready
});
```

JavaScript:

```js
series.events.once("datavalidated", function() {
  // Series data ready
});
```

### Finding the data item

We will use axis' method `getSeriesItem()` to get the data item from series at specific position in axis.

Before that

On a `DateAxis` we will use its method `dateToPosition()` to convert specific data/time to an axis position, we can then use in `getSeriesItem()`.

TypeScript:

```ts
series.events.once("datavalidated", function() {
  let axisPosition = xAxis.dateToPosition(new Date(2023, 5, 12));
  let seriesDataItem = xAxis.getSeriesItem(series, axisPosition, 0);
  // ...
});
```

JavaScript:

```js
series.events.once("datavalidated", function() {
  var axisPosition = xAxis.dateToPosition(new Date(2023, 5, 12));
  var seriesDataItem = xAxis.getSeriesItem(series, axisPosition, 0);
  // ...
});
```

Similarly, on a `CategoryAxis` we will use `categoryToPosition()` to find out what the position specific category is at.

TypeScript:

```ts
series.events.once("datavalidated", function() {
  let axisPosition = xAxis.categoryToPosition("Research");
  let seriesDataItem = xAxis.getSeriesItem(series, axisPosition, 0);
  // ...
});
```

JavaScript:

```js
series.events.once("datavalidated", function() {
  var axisPosition = xAxis.categoryToPosition("Research");
  var seriesDataItem = xAxis.getSeriesItem(series, axisPosition, 0);
  // ...
});
```

### Adding data item bullet

Now that we know the specific data item, we can use series' `addBullet()` method to add a bullet to it.

TypeScript:

```ts
series.events.once("datavalidated", function() {
  let axisPosition = xAxis.categoryToPosition("Research");
  let seriesDataItem = xAxis.getSeriesItem(series, axisPosition, 0);

  series.addBullet(seriesDataItem, am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 10,
      fill: am5.color(0xffffff),
      stroke: series.get("stroke")
    });
  }));
});
```

JavaScript:

```js
series.events.once("datavalidated", function() {
  var axisPosition = xAxis.categoryToPosition("Research");
  var seriesDataItem = xAxis.getSeriesItem(series, axisPosition, 0);

  series.addBullet(seriesDataItem, am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 10,
      fill: am5.color(0xffffff),
      stroke: series.get("stroke")
    });
  }));
});
```

Below example adds several bullets at specific points on chart:

Example: [Adding bullets at specific dates](https://docs.amcharts.com/embeds/v5/adding-bullets-at-specific-dates/)

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
  height: 94vh;
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

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1,
    extraMax: 0.1,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {
      //minGridDistance: 50,
      minorGridEnabled: true
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0,
    max: 25,
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
  strokeWidth: 3
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

// Add cistom bullets

function addBullet(date, name) {
  series.events.once("datavalidated", function () {
    // Find series data item
    var axisPosition = xAxis.dateToPosition(date);
    var seriesDataItem = xAxis.getSeriesItem(series, axisPosition, 0);

    // Crate bullet
    if (seriesDataItem) {
      var bullet = am5.Container.new(root, {});

      if (name == "Low") {
        var triangle = bullet.children.push(
          am5.Triangle.new(root, {
            width: 22,
            height: 18,
            fill: am5.color(0xff0000),
            stroke: am5.color(0xffffff),
            strokeWidth: 2,
            centerY: am5.p50,
            centerX: am5.p50,
            rotation: 180
          })
        );

        var label = bullet.children.push(
          am5.Label.new(root, {
            text: name,
            centerX: am5.p50,
            centerY: am5.p0,
            dy: 5
          })
        );
      } else if (name == "High") {
        var triangle = bullet.children.push(
          am5.Triangle.new(root, {
            width: 22,
            height: 18,
            fill: am5.color(0x00ff00),
            stroke: am5.color(0xffffff),
            strokeWidth: 2,
            centerY: am5.p50,
            centerX: am5.p50,
            rotation: 0
          })
        );

        var label = bullet.children.push(
          am5.Label.new(root, {
            text: name,
            centerX: am5.p50,
            centerY: am5.p100,
            dy: -5
          })
        );
      } else if (name == "Close") {
        var circle = bullet.children.push(
          am5.Circle.new(root, {
            radius: 12,
            fill: am5.color(0xffffff),
            stroke: series.get("stroke"),
            strokeWidth: 3,
            centerY: am5.p50,
            centerX: am5.p50
          })
        );

        var label = bullet.children.push(
          am5.Label.new(root, {
            text: name,
            centerX: am5.p0,
            centerY: am5.p50,
            dx: 10
          })
        );
      }

      series.addBullet(
        seriesDataItem,
        am5.Bullet.new(root, {
          sprite: bullet
        })
      );
    }
  });
}

addBullet(new Date(2012, 1, 6), "Low");
addBullet(new Date(2012, 1, 13), "High");
addBullet(new Date(2012, 1, 23), "Close");
```

## Positioning

### By relative location

A `Bullet` object has two properties that help position them within the parent element/data item: `locationX` and `locationY`.

Those accept numeric values from `0` (zero) to `1` (one) indicating relative position within target element, with zero indicating beginning and one the end.

Some series (e.g. line series) do not have any dimension, so location settings will be ignored.

However in those series that do have elements with actual shapes (e.g. column series), location settings are super useful as it gives us flexibility over positioning of a bullet.

Let's put a `Label` bullet in the middle of a column in a column series:

TypeScript:

```ts
series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    locationX: 0.5,
    locationY: 0.5,
    sprite: am5.Label.new(root, {
      text: "{valueY}",
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      populateText: true
    })
  });
});
```

JavaScript:

```js
series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    locationX: 0.5,
    locationY: 0.5,
    sprite: am5.Label.new(root, {
      text: "{valueY}",
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      populateText: true
    })
  });
});
```

> **Note:** Please note the `populateText` use above. This is needed to force `Label` to populate data placeholders with actual data.

Example: [Column series with label bullets](https://docs.amcharts.com/embeds/v5/column-series-with-label-bullets/)

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
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {})
    })
  );

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        populateText: true
      })
    });
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");

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

Some series are represented by a single line. For example `Chord`, `Sankey`, or `MapLineSeries`.

In those cases, only `locationX` or `locationY` is used. I.e. on a horizontal Sankey diagram, `locationX` will be used, and `locationY` will be ignored altogether.

### By data field

> **Important:** Positioning bullets by data fields works only on an `XYChart`.

Some XY series can have multiple values - like for instance Candlesticks have open, high, low, close. We can instruct the bullet to attach to that specific value by using bullet's `field` setting.

It accepts these values: `"open"`, `"high"`, `"low"`, `"value"` (default).

TypeScript:

```ts
series.bullets.push(function(root, series) {
  return am5.Bullet.new(root, {
    field: "open",
    sprite: am5.Circle.new(root, {
      radius: 8,
      stroke: am5.color(0x000000),
      strokeWidth: 4,
      fill: am5.color(0xffffff)
    })
  });
});
```

JavaScript:

```js
series.bullets.push(function(root, series) {
  return am5.Bullet.new(root, {
    field: "open",
    sprite: am5.Circle.new(root, {
      radius: 8,
      stroke: am5.color(0x000000),
      strokeWidth: 4,
      fill: am5.color(0xffffff)
    })
  });
});
```

> **Note:** Setting `field` makes the bullet completely ignore the `locationX` and `locationY` settings.

![](https://docs.amcharts.com/v5/images/concepts/common-elements/bullets/bullet_dield_open-1024x768.png "`field: 'open'`")

![](https://docs.amcharts.com/v5/images/concepts/common-elements/bullets/bullet_dield_value-1024x768.png "`field: 'value'` (default)")

![](https://docs.amcharts.com/v5/images/concepts/common-elements/bullets/bullet_dield_high-1024x767.png "`field: 'high'`")

![](https://docs.amcharts.com/v5/images/concepts/common-elements/bullets/bullet_dield_low-1024x768.png "`field: 'low'`")

Example: [Positioning series bullets by data field](https://docs.amcharts.com/embeds/v5/positioning-series-bullets-by-data-field/)

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
  height: 94vh;
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
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var color = root.interfaceColors.get("background");

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.CandlestickSeries.new(root, {
    fill: color,
    stroke: color,
    name: "MDXI",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "close",
    openValueYField: "open",
    lowValueYField: "low",
    highValueYField: "high",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText:
        "open: {openValueY}\nlow: {lowValueY}\nhigh: {highValueY}\nclose: {valueY},\nmediana: {mediana}"
    })
  })
);

series.bullets.push(function (root, series) {
  return am5.Bullet.new(root, {
    field: "open",
    sprite: am5.Circle.new(root, {
      radius: 8,
      stroke: am5.color(0x000000),
      strokeWidth: 4,
      fill: am5.color(0xffffff)
    })
  });
});

var data = [
  {
    date: new Date(2019, 8, 2).getTime(),
    open: 135.26,
    high: 135.95,
    low: 131.5,
    close: 131.85
  },
  {
    date: new Date(2019, 8, 3).getTime(),
    open: 129.9,
    high: 133.27,
    low: 128.3,
    close: 132.25
  },
  {
    date: new Date(2019, 8, 4).getTime(),
    open: 132.94,
    high: 136.24,
    low: 132.63,
    close: 135.03
  },
  {
    date: new Date(2019, 8, 5).getTime(),
    open: 136.76,
    high: 137.86,
    low: 132.0,
    close: 134.01
  },
  {
    date: new Date(2019, 8, 6).getTime(),
    open: 131.11,
    high: 133.0,
    low: 125.09,
    close: 126.39
  },
  {
    date: new Date(2019, 8, 7).getTime(),
    open: 130.11,
    high: 133.0,
    low: 125.09,
    close: 127.39
  },
  {
    date: new Date(2019, 8, 8).getTime(),
    open: 125.11,
    high: 126.0,
    low: 121.09,
    close: 122.39
  },
  {
    date: new Date(2019, 8, 9).getTime(),
    open: 131.11,
    high: 133.0,
    low: 122.09,
    close: 124.39
  }
];

series.data.setAll(data);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);
```

## Stacked bullets

Normally, bullets will be displayed at the specific location, regardless if there are any other bullets present in the same position.

We can instruct them to stack instead by setting bullet's `stacked` setting.

It accepts three values:

* `"up"` - will stack bullets upwards.
* `"down"` - will stack bullets downards.
* `"auto"` - will stack bullets upwards or downwards depending on their relative vertical position in the chart.

Example: [Stacked bullets](https://docs.amcharts.com/embeds/v5/stacked-bullets/)

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
  height: 94vh;
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
    layout: root.verticalLayout
  })
);

// Add data
var data = [
  {
    category: "Marketing",
    value: 250
  },
  {
    category: "Sales",
    value: 350
  },
  {
    category: "Research & Development",
    value: 310
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

xAxis.get("renderer").labels.template.set("forceHidden", true);
xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraMax: 0.3,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

yAxis.get("renderer").labels.template.set("forceHidden", true);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/

var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "budget",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category"
  })
);

series.strokes.template.setAll({
  strokeWidth: 3
});

// Bullet #1
series.bullets.push(function (root, series) {
  return am5.Bullet.new(root, {
    locationY: 0.5,
    stacked: "up",
    sprite: am5.Circle.new(root, {
      radius: 8,
      stroke: series.get("fill"),
      strokeWidth: 3,
      fill: am5.color(0xffffff)
    })
  });
});

// Bullet #2
series.bullets.push(function (root, series) {
  // Bullet container
  var container = am5.Container.new(root, {
    rotation: 0
  });

  // Circle
  var circle = container.children.push(
    am5.Container.new(root, {
      centerX: am5.p50,
      centerY: am5.p100,
      dy: -15,
      width: 40,
      height: 40,
      background: am5.RoundedRectangle.new(root, {
        stroke: am5.color(0x000000),
        strokeOpacity: 1,
        strokeWidth: 1,
        fill: am5.color(0xffffff),
        fillOpacity: 0.8,
        cornerRadiusTL: 20,
        cornerRadiusTR: 20,
        cornerRadiusBR: 20,
        cornerRadiusBL: 20
      })
    })
  );

  // Label
  circle.children.push(
    am5.Label.new(root, {
      text: "{valueY}",
      oversizedBehavior: "wrap",
      maxWidth: 40,
      fontSize: 15,
      fontWeight: "bold",
      x: am5.p50,
      centerX: am5.p50,
      y: am5.p50,
      centerY: am5.p50,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      populateText: true
    })
  );

  // Stem
  container.children.push(
    am5.Line.new(root, {
      stroke: am5.color(0x000000),
      strokeOpacity: 1,
      strokeWidth: 1,
      points: [
        { x: 0, y: 0 },
        { x: 0, y: -15 }
      ]
    })
  );

  return am5.Bullet.new(root, {
    locationY: 0.5,
    stacked: "up",
    sprite: container
  });
});

// Bullet #3
series.bullets.push(function (root, series) {
  // Bullet container
  var container = am5.Container.new(root, {
    rotation: 0
  });

  // Box
  var box = container.children.push(
    am5.Container.new(root, {
      centerX: am5.p50,
      centerY: am5.p100,
      dy: -15,
      background: am5.RoundedRectangle.new(root, {
        stroke: am5.color(0x000000),
        strokeOpacity: 1,
        strokeWidth: 1,
        fill: am5.color(0xffffff),
        fillOpacity: 0.8,
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        cornerRadiusBR: 5,
        cornerRadiusBL: 5
      })
    })
  );

  // Label
  box.children.push(
    am5.Label.new(root, {
      text: "{categoryX}",
      oversizedBehavior: "wrap",
      maxWidth: 120,
      fontSize: 15,
      textAlign: "center",
      x: am5.p50,
      centerX: am5.p50,
      y: am5.p50,
      centerY: am5.p50,
      populateText: true
    })
  );

  // Stem
  container.children.push(
    am5.Line.new(root, {
      stroke: am5.color(0x000000),
      strokeOpacity: 1,
      strokeWidth: 1,
      points: [
        { x: 0, y: 0 },
        { x: 0, y: -15 }
      ]
    })
  );

  return am5.Bullet.new(root, {
    locationY: 0.5,
    stacked: "up",
    sprite: container
  });
});

series.data.setAll(data);
series.appear();

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```

## Relation to data

Among other things, series will also pass relevant data item to the bullet.

That's why bullets can use [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) to populate text, as well as [heat rules](https://docs.amcharts.com/v5/concepts/settings/heat-rules/#bullets).

### Data placeholders

Bullets that use `Label` as their `sprite` property can have its text populated using curly bracket enclosed data placeholders.

TypeScript:

```ts
series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "{valueY}",
      populateText: true
    })
  });
});
```

JavaScript:

```js
series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "{valueY}",
      populateText: true
    })
  });
});
```

The above label will be replaced by the actual Y value of the related data item.

For more information on how data placeholders work, refer to "[Data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/)" tutorial.

### Heat rules

Bullets can also benefit from heat rules.

For example circle bullet can have its radius assigned dynamically, according to range of values in the series.

For more information and examples, visit "Heat rules: [Bullets](https://docs.amcharts.com/v5/concepts/settings/heat-rules/#bullets)".

### Template fields

Template fields are way to override some settings for a series item, such as a bullet, via data.

It works by specifying `templateField` setting on an object, which should point to a key in data that holds that element's settings we want to override.

For an in-depth explanation how this works, refer to "[Template fields](https://docs.amcharts.com/v5/concepts/settings/template-fields/)" tutorial.

That said, there are some caveats when using template fields with a bullet.

The main one is that bullets are different from any other series object in that they are not created via template, but rather by custom function as a new element. This means that settings supplied during its creations will take precedence over ones that would be inherited via a template field.

The below code **will not function correctly**:

TypeScript:

```ts
series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      // ERROR:
      // "fill" set directly on a new element will take precedence over one pulled in via templateField
      fill: am5.color(0xff0000),
      templateField: "bulletSettings"
    })
  });
});

series.data.setAll([{
  category: "C1",
  value: 100,
  bulletSettings: {
    fill: am5.color(0x00ff00)
  }
}, {
  category: "C2",
  value: 200,
  bulletSettings: {
    fill: am5.color(0x0000ff)
  }
}]);
```

JavaScript:

```js
series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      // ERROR:
      // "fill" set directly on a new element will take precedence over one pulled in via templateField
      fill: am5.color(0xff0000),
      templateField: "bulletSettings"
    })
  });
});

series.data.setAll([{
  category: "C1",
  value: 100,
  bulletSettings: {
    fill: am5.color(0x00ff00)
  }
}, {
  category: "C2",
  value: 200,
  bulletSettings: {
    fill: am5.color(0x0000ff)
  }
}]);
```

The correct workaround is to use a separate template to set bullet's "default" settings, and pass it in as a third parameter to its `new()` method.

The following code **will function correctly**:

TypeScript:

```ts
let bulletTemplate = am5.Template.new({
  // This will be default fill for bullets that do not have
  // it set via templateField
  fill: am5.color(0xE6E6E6)
});

series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      templateField: "bulletSettings"
    }, bulletTemplate)
  });
});

series.data.setAll([{
  category: "C1",
  value: 100,
  bulletSettings: {
    fill: am5.color(0x00ff00)
  }
}, {
  category: "C2",
  value: 200,
  bulletSettings: {
    fill: am5.color(0x0000ff)
  }
}]);
```

JavaScript:

```js
var bulletTemplate = am5.Template.new({
  // This will be default fill for bullets that do not have
  // it set via templateField
  fill: am5.color(0xE6E6E6)
});

series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      templateField: "bulletSettings"
    }, bulletTemplate)
  });
});

series.data.setAll([{
  category: "C1",
  value: 100,
  bulletSettings: {
    fill: am5.color(0x00ff00)
  }
}, {
  category: "C2",
  value: 200,
  bulletSettings: {
    fill: am5.color(0x0000ff)
  }
}]);
```

Example: [Using templateField with bullets](https://docs.amcharts.com/embeds/v5/using-templatefield-with-bullets/)

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

    tooltip: am5.Tooltip.new(root, {
      themeTags: ["axis"],
      animationDuration: 300
    })
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
    valueXField: "date"
  })
);

var bulletTemplate = am5.Template.new({
  // This will be default fill for bullets that do not have
  // it set via templateField
  fill: am5.color(0xe6e6e6)
});

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(
      root,
      {
        radius: 10,
        templateField: "bulletSettings"
      },
      bulletTemplate
    )
  });
});

series.data.setAll([
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100,
    bulletSettings: {
      fill: am5.color(0x297373)
    }
  },

  {
    date: new Date(2021, 0, 2).getTime(),
    value: 200,
    bulletSettings: {
      fill: am5.color(0x946b49)
    }
  },

  {
    date: new Date(2021, 0, 3).getTime(),
    value: 150,
    bulletSettings: {
      fill: am5.color(0xff621f)
    }
  },

  {
    date: new Date(2021, 0, 4).getTime(),
    value: 160,
    bulletSettings: {
      //fill: am5.color(0x85FFC4)
    }
  }
]);

var tooltip = am5.Tooltip.new(root, {
  pointerOrientation: "horizontal"
});

tooltip.label.set("text", "{valueY}");
series.set("tooltip", tooltip);

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
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);
```

## Selectively displaying bullets

The function that returns a bullet, can also return nothing.

If this happens, the bullet is not displayed.

This allows us to include our own logic into bullet function to display bullets only in places where we want them.

The following code will only show bullets if data for the data item contains `showBullets: true`:

TypeScript:

```ts
series.bullets.push(function(root, series, dataItem) {
  if (dataItem.dataContext.showBullets == true) {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 7,
        fill: series.get("fill")
      })
    });
  }
});
```

JavaScript:

```js
series.bullets.push(function(root, series, dataItem) {
  if (dataItem.dataContext.showBullets == true) {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 7,
        fill: series.get("fill")
      })
    });
  }
});
```

The demo below uses this approach to display a dot and a label on the last data item of the line series:

Example: [Selectively displaying bullets](https://docs.amcharts.com/embeds/v5/selectively-displaying-bullets/)

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

    tooltip: am5.Tooltip.new(root, {
      themeTags: ["axis"],
      animationDuration: 300
    })
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
    valueXField: "date"
  })
);

series.bullets.push(function (root, series, dataItem) {
  if (dataItem.dataContext.showBullets == true) {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 7,
        fill: series.get("fill")
      })
    });
  }
});

series.bullets.push(function (root, series, dataItem) {
  if (dataItem.dataContext.showBullets == true) {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text: dataItem.get("valueY"),
        fill: series.get("fill"),
        centerX: am5.p0,
        centerY: am5.p50,
        dx: 5
      })
    });
  }
});

series.data.setAll([
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 200
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 150
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 160,
    showBullets: true
  }
]);

var tooltip = am5.Tooltip.new(root, {
  pointerOrientation: "horizontal"
});

tooltip.label.set("text", "{valueY}");
series.set("tooltip", tooltip);

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

## Multiple bullets

Series can contain any number of bullets. Each function pushed into `bullets` will create a separate bullet for each data item.

TypeScript:

```ts
series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    locationX: 0.5,
    locationY: 0.5,
    sprite: am5.Circle.new(root, {
      radius: 15,
      fill: am5.color(0xffffff)
    })
  });
});

series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    locationX: 0.5,
    locationY: 0.5,
    sprite: am5.Label.new(root, {
      text: "{valueY}",
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      populateText: true
    })
  });
});
```

JavaScript:

```js
series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    locationX: 0.5,
    locationY: 0.5,
    sprite: am5.Circle.new(root, {
      radius: 15,
      fill: am5.color(0xffffff)
    })
  });
});

series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    locationX: 0.5,
    locationY: 0.5,
    sprite: am5.Label.new(root, {
      text: "{valueY}",
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      populateText: true
    })
  });
});
```

Example: [Column series with multiple bullets](https://docs.amcharts.com/embeds/v5/column-series-with-multiple-bullets/)

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
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {})
    })
  );

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 0.5,
      locationY: 0.5,
      sprite: am5.Circle.new(root, {
        radius: 15,
        fill: am5.color(0xffffff)
      })
    });
  });

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 0.5,
      locationY: 0.5,
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        textAlign: "center",
        populateText: true
      })
    });
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");

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

## Auto-hiding bullets

We can set up series to automatically hide its bullets if there are a lot of data points and bullets would just overcrowd the chart.

For that purpose, XY chart series has a setting `minBulletDistance`.

It's a numeric value which means this: if the distance between data items in series is less than X pixels, hide all bullets.

This setting is dynamic, and will react to changing conditions. I.e. when chart is zoomed in and distances between data items increase, hidden bullets may reappear.

## Hiding overlapping labels

Since version 5.22.0, a series' `autoLabels` hides a label in its bullets where it would overlap a label shown before it, or be cut off at the edge:

TypeScript:

```ts
series.set("autoLabels", true);
```

JavaScript:

```js
series.set("autoLabels", true);
```

* Labels of earlier series come first, then those of earlier data items. A hidden label comes back once it fits.
* Only labels are hidden. A bullet's circle or other shape stays.
* A label with its own `forceHidden`, or in a bullet with `stacked` set, is left as it is.
* Labels of series without the setting are never hidden. The others make room for them.

The [`ResponsiveMax` theme](https://docs.amcharts.com/v5/concepts/responsive-max/) turns it on.

## Bullet masking

Normally, bullets are constrained to the plot area of the chart.

If some bullet or part of it goes outside, it's clipped.

To disable such clipping, set `maskBullets` to `false` in your series settings:

TypeScript:

```ts
let series = chart.series.push(am5xy.ColumnSeries.new(root, { 
  xAxis: xAxis, 
  yAxis: yAxis, 
  valueYField: field, 
  valueXField: "date",
  maskBullets: false
}));
```

JavaScript:

```js
var series = chart.series.push(am5xy.ColumnSeries.new(root, { 
  xAxis: xAxis, 
  yAxis: yAxis, 
  valueYField: field, 
  valueXField: "date",
  maskBullets: false
}));
```

![](https://docs.amcharts.com/v5/images/concepts/common-elements/bullets/masked_bullets.png "`maskBullets: true` (default)")

![](https://docs.amcharts.com/v5/images/concepts/common-elements/bullets/unmasked_bullets.png "`maskBullets: false`")

Example: [Column series with bullet masking disabled](https://docs.amcharts.com/embeds/v5/column-series-with-bullet-masking-disabled/)

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
    value: 1
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 3.9
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 2
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 1.5
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
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
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      maskBullets: false
    })
  );

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 0.5,
      locationY: 1,
      sprite: am5.Circle.new(root, {
        radius: 15,
        fill: am5.Color.lighten(series.get("fill"), 0.7)
      })
    });
  });

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 0.5,
      locationY: 1,
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        textAlign: "center",
        populateText: true
      })
    });
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");

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

> **More info:** For more information on how to work around bullet masking and related issues, refer to "[Handling bullet masking](https://docs.amcharts.com/v5/tutorials/handling-bullet-masking/)" tutorial.

## Event handlers

### Adding events

There is a couple of ways to attach event handlers to bullets:

* Creating a standalone template, adding event handlers to it, then using that template to create bullet sprite element.
* Attaching events to each sprite element in bullet function.

The following snippet adds a `click` event to a bullet using template:

TypeScript:

```ts
let bulletTemplate = am5.Template.new({});

bulletTemplate.events.on("click", function(ev) {
  console.log("Clicked on a bullet!", ev.target);
});

series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill")
    }, bulletTemplate)
  });
});
```

JavaScript:

```js
var bulletTemplate = am5.Template.new({});

bulletTemplate.events.on("click", function(ev) {
  console.log("Clicked on a bullet!", ev.target);
});

series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill")
    }, bulletTemplate)
  });
});
```

And below is the snippet that will achieve the same behavior, albeit by attaching an event to each new bullet being created:

TypeScript:

```ts
series.bullets.push(function(root) {
  const circle = am5.Circle.new(root, {
    radius: 5,
    fill: series.get("fill")
  });
  circle.events.on("click", function(ev) {
    console.log("Clicked on a bullet!", ev.target);
  });
  return am5.Bullet.new(root, {
    sprite: circle
  });
});
```

JavaScript:

```js
series.bullets.push(function(root) {
  var circle = am5.Circle.new(root, {
    radius: 5,
    fill: series.get("fill")
  });
  circle.events.on("click", function(ev) {
    console.log("Clicked on a bullet!", ev.target);
  });
  return am5.Bullet.new(root, {
    sprite: circle
  });
});
```

Example: [Adding events to bullets](https://docs.amcharts.com/embeds/v5/adding-events-to-bullets/)

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

  series.bullets.push(function () {
    var circle = am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill")
    });

    circle.events.on("click", function (ev) {
      console.log(ev.target);
    });
    return am5.Bullet.new(root, {
      sprite: circle
    });
  });

  series.strokes.template.set("strokeWidth", 2);

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

### Events on series bullets

A series bullet event handler will contain all the information about target data item and series:

TypeScript:

```ts
let bulletTemplate = am5.Template.new({});

bulletTemplate.events.on("click", function(ev) {
  // Bullet id
  console.log("Clicked on a column", ev.target.uid);

  // Data item
  console.log(ev.target.dataItem);

  // Original data object
  console.log(ev.target.dataItem.dataContext);

  // Series
  console.log(ev.target.dataItem.component)
});

series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill")
    }, bulletTemplate)
  });
});
```

JavaScript:

```js
var bulletTemplate = am5.Template.new({});

bulletTemplate.events.on("click", function(ev) {
  // Bullet id
  console.log("Clicked on a column", ev.target.uid);

  // Data item
  console.log(ev.target.dataItem);

  // Original data object
  console.log(ev.target.dataItem.dataContext);

  // Series
  console.log(ev.target.dataItem.component)
});

series.bullets.push(function(root) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill")
    }, bulletTemplate)
  });
});
```

## Removing series bullets

There are two steps to completely remove bullets from series:

* Clear series' `bulletsContainer`.
* Clear series' `bullets` list.

TypeScript:

```ts
series.bulletsContainer.children.clear();
series.bullets.clear();
```

JavaScript:

```js
series.bulletsContainer.children.clear();
series.bullets.clear();
```

## Related tutorials

* [Axis range bullets](https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/#bullet)
* [Hide or relocate label bullets for small columns](https://docs.amcharts.com/v5/tutorials/hide-or-relocate-label-bullets-for-small-columns/)
* [Triggering bullet hover with an XY cursor](https://docs.amcharts.com/v5/tutorials/triggering-bullet-hover-with-an-xy-cursor/)
* [Totals on column stacks](https://docs.amcharts.com/v5/tutorials/totals-on-column-stacks/)
* [Totals on clustered column stacks](https://docs.amcharts.com/v5/tutorials/totals-on-clustered-column-stacks/)
* [Handling bullet masking](https://docs.amcharts.com/v5/tutorials/handling-bullet-masking/)
* [Different bullet styling of grouped data items](https://docs.amcharts.com/v5/tutorials/different-bullet-styling-of-grouped-data-items/)
* [Solving overlapping bullets](https://docs.amcharts.com/v5/tutorials/solving-overlapping-bullets/)
* [Complex bullets with hover effect](https://docs.amcharts.com/v5/tutorials/complex-bullets-with-hover-effect/)
* [Column labels as categories](https://docs.amcharts.com/v5/tutorials/column-labels-as-categories/)
* [Map with custom markers and data-bound colors](https://docs.amcharts.com/v5/tutorials/map-with-custom-markers-and-data-bound-colors/)
