---
title: "Custom button to add data items"
source: "https://docs.amcharts.com/embeds/v5/custom-button-to-add-data-items-3/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/buttons"]
---

A demo from the docs page "Buttons" (get_doc(path: "concepts/common-elements/buttons")).

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
    valueXField: "date"
  })
);

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

// Add custom button
var button = chart.plotContainer.children.push(
  am5.Button.new(root, {
    dx: 10,
    dy: 10,
    layer: 40,
    icon: am5.Picture.new(root, {
      width: 32,
      height: 32,
      src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTQuMDAwMDAwLCAtMi4wMDAwMDApIj48ZyBpZD0iYWRkLWNpcmNsZS1vdXRsaW5lIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNTQuMDAwMDAwLCAyLjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMSw1IEw5LDUgTDksOSBMNSw5IEw1LDExIEw5LDExIEw5LDE1IEwxMSwxNSBMMTEsMTEgTDE1LDExIEwxNSw5IEwxMSw5IEwxMSw1IEwxMSw1IFogTTEwLDAgQzQuNSwwIDAsNC41IDAsMTAgQzAsMTUuNSA0LjUsMjAgMTAsMjAgQzE1LjUsMjAgMjAsMTUuNSAyMCwxMCBDMjAsNC41IDE1LjUsMCAxMCwwIEwxMCwwIFogTTEwLDE4IEM1LjYsMTggMiwxNC40IDIsMTAgQzIsNS42IDUuNiwyIDEwLDIgQzE0LjQsMiAxOCw1LjYgMTgsMTAgQzE4LDE0LjQgMTQuNCwxOCAxMCwxOCBMMTAsMTggWiIgaWQ9IlNoYXBlIi8+PC9nPjwvZz48L2c+PC9zdmc+",
      cursorOverStyle: "pointer"
    })
  })
);

button.events.on("click", function (ev) {
  var last = series.data.getIndex(series.data.length - 1);
  var newDate = new Date(last.date);
  newDate.setDate(newDate.getDate() + 1);
  series.data.push({
    date: newDate.getTime(),
    value: last.value + Math.random() * 5 - 2
  });
});

button.get("background").setAll({
  cornerRadiusTL: 0,
  cornerRadiusTR: 0,
  cornerRadiusBR: 0,
  cornerRadiusBL: 0,
  fill: am5.color(0x000000),
  fillOpacity: 0.4
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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
