---
title: "Chart with annotator support"
source: "https://docs.amcharts.com/embeds/v5/chart-with-annotator-support/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/exporting/annotator"]
---

A demo from the docs page "Annotator" (get_doc(path: "concepts/exporting/annotator")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
  { date: "2012-01-01", value: 8 },
  { date: "2012-01-02", value: 10 },
  { date: "2012-01-03", value: 12 },
  { date: "2012-01-04", value: 14 },
  { date: "2012-01-05", value: 11 },
  { date: "2012-01-06", value: 6 },
  { date: "2012-01-07", value: 7 },
  { date: "2012-01-08", value: 9 },
  { date: "2012-01-09", value: 13 },
  { date: "2012-01-10", value: 15 },
  { date: "2012-01-11", value: 19 },
  { date: "2012-01-12", value: 21 },
  { date: "2012-01-13", value: 22 },
  { date: "2012-01-14", value: 20 },
  { date: "2012-01-15", value: 18 },
  { date: "2012-01-16", value: 14 },
  { date: "2012-01-17", value: 16 },
  { date: "2012-01-18", value: 18 },
  { date: "2012-01-19", value: 17 },
  { date: "2012-01-20", value: 15 },
  { date: "2012-01-21", value: 12 },
  { date: "2012-01-22", value: 10 },
  { date: "2012-01-23", value: 8 }
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

// Set up data processor to parse string dates
// https://docs.amcharts.com/v5/concepts/data/#pre-processing-data
series.data.processor = am5.DataProcessor.new(root, {
  dateFormat: "yyyy-MM-dd",
  dateFields: ["date"]
});

series.data.setAll(data);

var tooltip = am5.Tooltip.new(root, {
  pointerOrientation: "horizontal"
});

tooltip.label.set("text", "{valueY}");
series.set("tooltip", tooltip);

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

// Set up export and annotation
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

var annotator = am5plugins_exporting.Annotator.new(root, {});

var menuitems = exporting.get("menu").get("items");

menuitems.push({
  type: "separator"
});

menuitems.push({
  type: "custom",
  label: "Annotate",
  callback: function () {
    this.close();
    annotator.toggle();
  }
});
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 85vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/plugins/exporting.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
