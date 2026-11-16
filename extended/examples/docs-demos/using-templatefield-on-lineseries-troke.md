---
title: "Using templateField on LineSeries troke"
source: "https://docs.amcharts.com/embeds/v5/using-templatefield-on-lineseries-troke/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/xy-chart/series/line-series"]
---

A demo from the docs page "Line series" (get_doc(path: "charts/xy-chart/series/line-series")).

## JavaScript

```javascript
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

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
