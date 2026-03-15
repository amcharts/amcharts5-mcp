---
title: "Evenly Spaced Date Axis"
source: "https://www.amcharts.com/demos/evenly-spaced-date-axis/"
category: "line-area"
scraped: "2026-03-15"
---

Note: this demo uses CategoryDateAxis which is now deprecated in favor of more advanced GaplessDateAxis. Checkout the No-gap Date Axis demo to see GaplessDateAxis in action.
Sometimes you have date-based data with gaps in it. For example, you may have trading data from an exchange that doesn't work on the weekends. In cases like this, you may not want to have a gap in your chart on those days or for a line chart to stretch over the empty days. amCharts has a solution for this issue.
Key implementation details
We use CategoryDateAxis to solve the issue of "empty" days. Note: you should use GaplessDateAxis in your newly created charts as it is a more powerful implementation of the same concept.
Category date axis
Gapless date axis

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  pinchZoomX:true
}));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none"
}));
cursor.lineY.set("visible", false);

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 1;

function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);
  if (date.getDay() == 5) {
    am5.time.add(date, "day", 3);
  } else {
    am5.time.add(date, "day", 1);
  }

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


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/category-date-axis/
var xRenderer = am5xy.AxisRendererX.new(root, {});
xRenderer.labels.template.set("minPosition", 0.01);
xRenderer.labels.template.set("maxPosition", 0.99);

var xAxis = chart.xAxes.push(
  am5xy.CategoryDateAxis.new(root, {
    categoryField: "date",
    baseInterval: {
      timeUnit: "day",
      count: 1
    },
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "date"
}));

var tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
tooltip.label.set("text", "{valueY}");

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));


// Set data
var data = generateDatas(200);
series.data.setAll(data);
xAxis.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
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
  height: 500px;
  max-width: 100%;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
