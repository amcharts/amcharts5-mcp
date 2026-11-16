---
title: "Shadows"
source: "https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/shadows/"
scraped: "2026-11-16"
---

This tutorial looks at how we can add shadows to graphic elements.

## Enabling

Shadows can be enabled on any `Graphics`, `Picture`, and `Label` elements.

To do that, we need to set shadow-related settings:

| Setting key     | Comment                                                                                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shadowColor`   | Shadow color.                                                                                                                                                                   |
| `shadowBlur`    | Blurriness of the shadow. The bigger the number, the blurrier and wider shadow will be. `0` will mean completely sharp shadow, ideally replicating lines of the target element. |
| `shadowOffsetX` | Horizontal offset in pixels. Can accept negative number to move it left.                                                                                                        |
| `shadowOffsetY` | Vertical offset in pixels. Can accept negative number to move it up.                                                                                                            |
| `shadowOpacity` | Opacity of the shadow. If not set, will use elements `fillOpacity`.                                                                                                             |

For shadow to work `shadowColor` and at least one of the `shadowBlur`, `shadowOffsetX`, and/or `shadowOffsetY` needs to be set.

## Examples

### Standalone objects

The following will add shadow to the chart's plot container using its background element:

TypeScript:

```ts
chart.plotContainer.get("background").setAll({
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});
```

JavaScript:

```js
chart.plotContainer.get("background").setAll({
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});
```

### Column series

TypeScript:

```ts
series.columns.template.setAll({
  strokeOpacity: 0,
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});
```

JavaScript:

```js
series.columns.template.setAll({
  strokeOpacity: 0,
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});
```

Example: [Column series with shadows](https://docs.amcharts.com/embeds/v5/column-series-with-shadows/)

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
    cornerRadiusTL: 5,
    cornerRadiusTR: 5,
    shadowColor: am5.color(0x000000),
    shadowBlur: 10,
    shadowOffsetX: 4,
    shadowOffsetY: 4,
    shadowOpacity: 0.5
  });

  series.data.setAll(data);
}

createSeries("Series", "value");
```

### Line series and bullets

TypeScript:

```ts
series.strokes.template.setAll({
  strokeWidth: 2,
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 10,
  shadowOffsetY: 10,
  shadowOpacity: 0.5
});

series.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill"),
      shadowColor: am5.color(0x000000),
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowOpacity: 0.3
    })
  })
});
```

JavaScript:

```js
series.strokes.template.setAll({
  strokeWidth: 2,
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 10,
  shadowOffsetY: 10,
  shadowOpacity: 0.5
});

series.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill"),
      shadowColor: am5.color(0x000000),
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowOpacity: 0.3
    })
  })
});
```

Example: [Smoothed line series](https://docs.amcharts.com/embeds/v5/smoothed-line-series-2/)

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
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 1.7,
    value2: 0.9
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 1.5,
    value2: 2.5
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
    am5xy.SmoothedXLineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {})
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 2,
    shadowColor: am5.color(0x000000),
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.5
  });

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: series.get("fill"),
        shadowColor: am5.color(0x000000),
        shadowBlur: 10,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
        shadowOpacity: 0.3
      })
    });
  });

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

### Tooltips

We can enable shadows on tooltips using specific tooltip's settings:

TypeScript:

```ts
series.get("tooltip").get("background").setAll({
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});
```

JavaScript:

```js
series.get("tooltip").get("background").setAll({
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});
```

Or, we can use default theme to apply tooltip to all tooltips:

TypeScript:

```ts
// Add shadow to all tooltips...
root.defaultTheme.rule("PointedRectangle", ["tooltip", "background"]).setAll({
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});

// ... except axis
root.defaultTheme.rule("PointedRectangle", ["tooltip", "background", "axis"]).setAll({
  shadowColor: null
});
```

JavaScript:

```js
// Add shadow to all tooltips...
root.defaultTheme.rule("PointedRectangle", ["tooltip", "background"]).setAll({
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});

// ... except axis
root.defaultTheme.rule("PointedRectangle", ["tooltip", "background", "axis"]).setAll({
  shadowColor: null
});
```

Example: [Tooltip shadows](https://docs.amcharts.com/embeds/v5/tooltip-shadows/)

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

// Create custom theme
// https://docs.amcharts.com/v5/concepts/themes/#quick-custom-theme
var myTheme = am5.Theme.new(root);

// Add shadow to all tooltips...
myTheme.rule("PointedRectangle", ["tooltip", "background"]).setAll({
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});

// ... except axis
myTheme.rule("PointedRectangle", ["tooltip", "background", "axis"]).setAll({
  shadowColor: null
});

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), myTheme]);

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

  series.bullets.push(() => {
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
