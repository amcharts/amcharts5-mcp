---
title: "Adding bullets at specific dates"
source: "https://docs.amcharts.com/embeds/v5/adding-bullets-at-specific-dates/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/bullets"]
---

A demo from the docs page "Bullets" (get_doc(path: "concepts/common-elements/bullets")).

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

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 94vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
