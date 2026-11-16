---
title: "Scrollbar with chart preview"
source: "https://docs.amcharts.com/embeds/v5/scrollbar-with-chart-preview-2/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/xy-chart/scrollbars"]
---

A demo from the docs page "Scrollbars" (get_doc(path: "charts/xy-chart/scrollbars")).

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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panY: "none",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      opposite: true
    })
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      opposite: true
    })
  })
);

xAxis.get("dateFormats")["day"] = "MM/dd";
xAxis.get("periodChangeDateFormats")["day"] = "MMMM";

// Generate random data
var date = new Date(2000);
date.setHours(0, 0, 0, 0);
var value = 100;

function generateData() {
  value = Math.round(Math.random() * 10 - 5 + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
}

function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}
var data = generateDatas(50000);

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

  series.strokes.template.set("strokeWidth", 2);

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);

  // Pre-zoom X axis
  series.events.once("datavalidated", function (ev, target) {
    xAxis.zoomToDates(new Date(2021, 0, 1), new Date(2022, 0, 1));
  });
}

createSeries("Series", "value");

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

// Scrollbar X
var scrollbarX = am5.Scrollbar.new(root, {
  orientation: "horizontal"
});

chart.set("scrollbarX", scrollbarX);
chart.bottomAxesContainer.children.push(scrollbarX);

// Scrollbar Y
var scrollbarY = am5.Scrollbar.new(root, {
  orientation: "vertical"
});

chart.set("scrollbarY", scrollbarX);
chart.leftAxesContainer.children.push(scrollbarY);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 98vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
