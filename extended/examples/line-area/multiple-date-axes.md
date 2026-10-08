---
title: "Multiple Date Axes"
source: "https://www.amcharts.com/demos/multiple-date-axes/"
category: "line-area"
scraped: "2026-10-08"
---

Two years on one chart: 2023 and 2025 each get their own date axis, so both start at the left edge and line up day by day. Each axis is labeled in the color of its line.

When to give each series its own date axis: Laying two periods over each other is the clearest way to compare this year with last: the same day of the year sits at the same spot, so seasonal patterns line up. Each line keeps its real dates, on its own axis and in the tooltips.

Good for:
- This year against last, or any two periods
- Seasonal patterns: holidays, weather, school terms
- Before and after a change, lined up by day

Think twice when:
- Periods of different length: the shorter line stops early
- More than two or three periods: the date axes stack up
- Weekly patterns: a date falls on a different weekday each year

Prompt: Create a line chart comparing a year of daily prices in 2023 with a year in 2025, each series on its own date axis, one under the other, both sharing one value axis. Color each date axis’s labels like its line. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Random daily prices for two years. Each day moves the price by up to 5%,
// so it wanders but never drops below zero.
var data0 = [];
var data1 = [];

var price = 1000;                // the 2023 prices start at 1000
for (var i = 1; i <= 360; i++) { // 360 days from January 1, 2023
  price += Math.round((Math.random() - 0.5) * price / 10);
  data0.push({ date: new Date(2023, 0, i).getTime(), price: price });
}

var price = 1200;                // the 2025 prices start at 1200
for (var i = 1; i <= 360; i++) { // 360 days from January 1, 2025
  price += Math.round((Math.random() - 0.5) * price / 10);
  data1.push({ date: new Date(2025, 0, i).getTime(), price: price });
}

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
    panX: false,    // dragging the plot doesn't pan...
    panY: false,    // ...in either direction
    wheelX: "panX", // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX" // ...and the vertical wheel zooms in on the days
  })
);

// Skip two colors between series, so the two years are easy to tell apart
chart.get("colors").set("step", 3);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // drag across the plot to zoom into that stretch of days
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis0 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 }, // one point per day
    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {}),          // a date label follows the cursor along this axis...
    tooltipDateFormat: "yyyy-MM-dd"              // ...with the full date
  })
);

var xAxis1 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    marginTop: 10, // a 10px gap above the second date axis
    baseInterval: { timeUnit: "day", count: 1 }, // one point per day
    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {}), // a date label follows the cursor along this axis...
    tooltipDateFormat: "yyyy-MM-dd" // ...with the full date
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Hide the label at the very bottom of the value axis: it would run into
// the first date label in the corner
yAxis.get("renderer").labels.template.set("minPosition", 0.05);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// Each series uses its own date axis, so both years start at the left edge
var series0 = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "2023",
    xAxis: xAxis0,
    yAxis: yAxis,
    valueYField: "price",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{name}: {valueY}" // the year and the price
    })
  })
);

var series1 = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "2025",
    xAxis: xAxis1,
    yAxis: yAxis,
    valueYField: "price",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{name}: {valueY}" // the year and the price
    })
  })
);

// Color each date axis's labels like its line, to show which is which
xAxis0.get("renderer").labels.template.set("fill", series0.get("stroke"));
xAxis1.get("renderer").labels.template.set("fill", series1.get("stroke"));

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = chart.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal", // a bar above the plot to zoom and scroll, with a small chart in it
  height: 60                 // 60px tall
}));

// the small chart inside the scrollbar gets its own axes and series
var sbDateAxis = scrollbar.chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { // one point per day
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

var sbValueAxis = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// The scrollbar previews the first year
var sbSeries = scrollbar.chart.series.push(
  am5xy.LineSeries.new(root, {
    valueYField: "price",
    valueXField: "date",
    xAxis: sbDateAxis,
    yAxis: sbValueAxis
  })
);

series0.data.setAll(data0);
series1.data.setAll(data1);
sbSeries.data.setAll(data0);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series0.appear(1000);
series1.appear(1000);
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
