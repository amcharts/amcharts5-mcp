---
title: "Zoomable Value Axis"
source: "https://www.amcharts.com/demos/zoomable-value-axis/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart that zooms up and down as well as across. Pick a band of values to see the small moves inside it; the scrollbar on the right shows where you are.

When to zoom the value axis: Most charts zoom only along time. Zooming the values helps when a line covers a wide range but the detail you care about sits in a narrow band, like small swings around one level. Each selection rescales the axis so those moves fill the chart.

Good for:
- Long series with a wide range of values
- Small swings around a level
- Measurements where a few peaks squash the rest

Think twice when:
- Short series that already fit: zooming adds nothing
- Charts read without the full range: a zoomed axis can mislead
- Two series on very different scales: use two value axes

Prompt: Create a line chart of about 2,000 daily values that zooms along the value axis: drag up or down on the plot to zoom to a band of values, use the mouse wheel, or move the band with a vertical scrollbar. Add a fill under the line, a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false, // no panning by dragging
    panY: false,
    wheelX: "panX",  // a horizontal wheel or trackpad swipe pans the dates...
    wheelY: "zoomY", // ...and the vertical wheel zooms the value axis
    paddingLeft: 0   // the value labels sit at the chart's left edge
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // drag up or down over the plot to zoom the value axis to that range
  behavior: "zoomY"
}));
cursor.lineX.set("visible", false); // no vertical cursor line

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 100;

function generateData() {
  value = Math.round(Math.random() * 10 - 5 + value); // a random step of up to 5 up or down

  am5.time.add(date, "day", 1); // the next day
  return { date: date.getTime(), value: value };
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
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 }, // one point per day
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 70 // at least 70px between date labels
    }),
    tooltip: am5.Tooltip.new(root, {}) // shows the cursor's date on the axis
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}" // just the value
    })
  })
);

series.fills.template.setAll({ fillOpacity: 0.3, visible: true }); // a light fill under the line

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = chart.set("scrollbarY", am5.Scrollbar.new(root, { // a vertical scrollbar zooms the values too
  orientation: "vertical"
}));

var data = generateDatas(2000); // 2,000 days of data
series.data.setAll(data);

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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
