---
title: "HTML content"
source: "https://docs.amcharts.com/v5/concepts/common-elements/html-content/"
scraped: "2026-11-16"
---

> amCharts 5 using HTML as content for its Container elements. This tutorial will show various ways this can be used.

amCharts 5 using HTML as content for its `Container` elements. This tutorial will show various ways this can be used.

## Common elements

To make a container (or any other element that extends `Container`) display HTML content, simply use its `html` setting.

The below code adds an HTML-enabled title to the chart:

TypeScript:

```ts
chart.children.unshift(am5.Label.new(root, {
  html: "<h2>Chart title</h2><h4>And a smaller sub-title</h4>",
  x: am5.percent(50),
  centerX: am5.percent(50),
  paddingTop: 0,
  paddingBottom: 0
}));
```

JavaScript:

```js
chart.children.unshift(am5.Label.new(root, {
  html: "<h2>Chart title</h2><h4>And a smaller sub-title</h4>",
  x: am5.percent(50),
  centerX: am5.percent(50),
  paddingTop: 0,
  paddingBottom: 0
}));
```

Example: [Chart with an HTML title](https://docs.amcharts.com/embeds/v5/chart-with-an-html-title/)

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
    category: "Research",
    value1: 1000,
    value2: 588
  },
  {
    category: "Marketing",
    value1: 1200,
    value2: 1800
  },
  {
    category: "Sales",
    value1: 850,
    value2: 1230
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
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),

    categoryField: "category"
  })
);

xAxis.data.setAll(data);

// Create series
var series1 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series #1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value1",
    categoryXField: "category",
    tooltip: am5.Tooltip.new(root, {})
  })
);

series1.data.setAll(data);

var series2 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series #2",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value2",
    categoryXField: "category"
  })
);

series2.data.setAll(data);

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);

// Add an HTML-enabled title
chart.children.unshift(
  am5.Label.new(root, {
    html: '<div style="text-align: center;"><img src="https://www.amcharts.com/lib/amcharts.svg" width="100" /><p style="font-size: 20px;">Investment breakdown</p></div>',
    x: am5.percent(50),
    centerX: am5.percent(50),
    paddingTop: 0,
    paddingBottom: 0
  })
);
```

## Tooltips

### Tooltip contents

There are couple of ways to set HTML content for tooltips:

* Via `tooltipHTML` setting of an element.
* Via `labelHTML` setting of a `Tooltip` object.

If we'd like some HTML content to be shown in a tooltip when hovered over an element, e.g. a column, we can use its `tooltipHTML` setting:

TypeScript:

```ts
series.columns.template.setAll({
  tooltipHTML: "<strong>{categoryX}</strong>: {valueY}"
});
```

JavaScript:

```js
series.columns.template.setAll({
  tooltipHTML: "<strong>{categoryX}</strong>: {valueY}"
});
```

Example: [HTML tooltips](https://docs.amcharts.com/embeds/v5/html-tooltips/)

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
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    pinchZoomX: true
  })
);

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.3,
    categoryField: "country",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.3,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    sequencedInterpolation: true,
    categoryXField: "country"
  })
);

series.columns.template.setAll({
  tooltipHTML: "<strong>{categoryX}</strong>: {valueY}"
});

// Set data
var data = [
  {
    country: "USA",
    value: 2025
  },
  {
    country: "China",
    value: 1882
  },
  {
    country: "Japan",
    value: 1809
  },
  {
    country: "Germany",
    value: 1322
  },
  {
    country: "UK",
    value: 1122
  }
];

xAxis.data.setAll(data);
series.data.setAll(data);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
```

If we do have a `Tooltip` instance, e.g. on a series, we can use its `labelHTML` setting instead:

TypeScript:

```ts
let series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  sequencedInterpolation: true,
  categoryXField: "country",
  tooltip: am5.Tooltip.new(root, {
    labelHTML: "<strong>{categoryX}</strong>: {valueY}"
  })
}));
```

JavaScript:

```js
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  sequencedInterpolation: true,
  categoryXField: "country",
  tooltip: am5.Tooltip.new(root, {
    labelHTML: "<strong>{categoryX}</strong>: {valueY}"
  })
}));
```

Example: [HTML tooltips](https://docs.amcharts.com/embeds/v5/html-tooltips-2/)

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
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    pinchZoomX: true
  })
);

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.3,
    categoryField: "country",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.3,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    sequencedInterpolation: true,
    categoryXField: "country",
    tooltip: am5.Tooltip.new(root, {
      labelHTML: "<strong>{categoryX}</strong>: {valueY}"
    })
  })
);

// Set data
var data = [
  {
    country: "USA",
    value: 2025
  },
  {
    country: "China",
    value: 1882
  },
  {
    country: "Japan",
    value: 1809
  },
  {
    country: "Germany",
    value: 1322
  },
  {
    country: "UK",
    value: 1122
  }
];

xAxis.data.setAll(data);
series.data.setAll(data);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
```

### Interactive elements

If you have interactive elements in tooltip, like buttons or links, you will need to explicitly enable tooltip interactivity by setting `interactive: true` on its label.

It's also recommended to use `keepTargetHover: true` on the tooltip, so that tooltip does not go away until the pointer goes outside its area.

TypeScript:

```ts
let series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  sequencedInterpolation: true,
  categoryXField: "country",
  tooltip: am5.Tooltip.new(root, {
    labelHTML: "<strong>{categoryX}</strong>: {valueY}",
    keepTargetHover: true
  })
}));

series.get("tooltip").label.set("interactive", true);
```

JavaScript:

```js
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  sequencedInterpolation: true,
  categoryXField: "country",
  tooltip: am5.Tooltip.new(root, {
    labelHTML: "<strong>{categoryX}</strong>: {valueY}",
    keepTargetHover: true
  })
}));

series.get("tooltip").label.set("interactive", true);
```

## Axis labels

We will need to use an adapter to dynamically override content for an axis label:

TypeScript:

```ts
xAxis.get("renderer").labels.template.adapters.add("html", function(html, target) {
  return "<div style=\"text-align: center; font-weight: bold;\">{value.formatDate('d MMM')}</div><div style=\"text-align: center;\">{value.formatDate('EEE')}</div>";
});
```

JavaScript:

```js
xAxis.get("renderer").labels.template.adapters.add("html", function(html, target) {
  return "<div style=\"text-align: center; font-weight: bold;\">{value.formatDate('d MMM')}</div><div style=\"text-align: center;\">{value.formatDate('EEE')}</div>";
});
```

Example: [HTML labels on a DateAxis](https://docs.amcharts.com/embeds/v5/html-labels-on-a-dateaxis/)

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
      //minGridDistance: 50
    }),
    tooltip: am5.Tooltip.new(root, {})
  })
);

xAxis.get("renderer").labels.template.adapters.add("html", function (html, target) {
  return "<div style=\"text-align: center; font-weight: bold;\">{value.formatDate('d MMM')}</div><div style=\"text-align: center;\">{value.formatDate('EEE')}</div>";
});

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

### Exporting

HTML content will not be included when exporting chart snapshot to images or PDF.

### Layer order

HTML content does not follow regular "z-index" order in regards to other elements - it will always be in front.

### Tooltips on HTML elements

There's currently no way to set rollover tooltip to be displayed on HTML-enabled elements, e.g. via `tooltipText` settings.

### Images

All images included in HTML content need to be sized via either `width` and `height` attributes, or CSS.

If un-sized images are used, the element will not be sized properly, which will be especially prominent if used in tooltips.

TypeScript:

```ts
// Incorrect!
label.set("html", "<img src=\"flag.png\">");

// Correct
label.set("html", "<img src=\"flag.png\" width=\"32\" width=\"32\">");

// Also correct
label.set("html", "<img src=\"flag.png\" style=\"width: 32px; height: 32px\">");
```

JavaScript:

```js
// Incorrect!
label.set("html", "<img src=\"flag.png\">");

// Correct
label.set("html", "<img src=\"flag.png\" width=\"32\" width=\"32\">");

// Also correct
label.set("html", "<img src=\"flag.png\" style=\"width: 32px; height: 32px\">");
```
