---
title: "Syncing cursors across several charts"
source: "https://docs.amcharts.com/embeds/v5/syncing-cursors-across-several-charts/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/xy-chart/cursor"]
---

A demo from the docs page "Cursor" (get_doc(path: "charts/xy-chart/cursor")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

## HTML

```html
<div id="chartdiv1"></div>
<div id="chartdiv2"></div>
<div id="chartdiv3"></div>
```

## CSS

```css
#chartdiv1,
#chartdiv2,
#chartdiv3 {
  width: 100%;
  height: 200px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
