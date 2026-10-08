---
title: "No-Gap Date Axis"
source: "https://www.amcharts.com/demos/no-gap-date-axis/"
category: "line-area"
scraped: "2026-10-08"
---

Stock markets close at weekends, leaving holes on a calendar axis. This axis skips days with no data: 200 trading days of price and volume, one after another.

When to skip the gaps: Data that exists only on working days, or during opening hours, looks broken on a calendar axis: the line jumps across every weekend and the columns leave holes. A gapless axis puts the days one after another, so the whole width shows data.

Good for:
- Stock prices and trading volume
- Business-day figures: sales, tickets, calls
- Intraday data that stops overnight

Think twice when:
- Pauses that matter, like outages: a calendar axis shows them
- Readers who might take equal spacing for equal time
- Data with no gaps: a regular date axis does the same job

Prompt: Create a chart of about 200 trading days of price and volume on a date axis that skips the weekends, so the days sit side by side with no gaps. Draw the price as a line and the volume as columns along the bottom of the plot. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  // a drag zooms (the cursor's behavior below), so the chart itself doesn't pan
  panX: false,
  panY: false,
  wheelX: "panX",   // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",  // ...and the vertical wheel zooms in on the days
  pinchZoomX: true, // pinch with two fingers to zoom on a touch screen
  paddingLeft: 0    // the value labels sit at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // drag across the plot to zoom in on those days
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 1000;    // the prices start near 1000
var volume = 100000; // the volumes start near 100,000

// the next weekday's price and volume, each a small random step from the day before
function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);       // the price moves by up to 5...
  volume = Math.round((Math.random() * 1000 - 500) + volume); // ...the volume by up to 500

  am5.time.add(date, "day", 1);
  // add another if it's saturday
  if (date.getDay() == 6) {
    am5.time.add(date, "day", 1);
  }
  // add another if it's sunday
  if (date.getDay() == 0) {
    am5.time.add(date, "day", 1);
  }

  return {
    date: date.getTime(),
    value: value,
    volume: volume
  };
}

// an array of count weekdays
function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// a date axis that skips dates with no data (the weekends here), so the line has no gaps
var xAxis = chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  maxDeviation: 0, // no panning past the first or last day
  baseInterval: {  // one point per day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true // fainter grid lines between the labeled ones
  }),
  tooltip: am5.Tooltip.new(root, {}) // a date label follows the cursor along the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  // no panning or zooming out past the prices
  maxDeviation: 0,
  // 20% extra room below the line, where the volume columns stand
  extraMin: 0.2,
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // the tooltip shows the price
  })
}));

// y axis for volume
var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {});
volumeAxisRenderer.grid.template.set("forceHidden", true);   // no grid lines...
volumeAxisRenderer.labels.template.set("forceHidden", true); // ...and no labels for the volume axis

var volumeAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  // the bottom quarter of the plot area, under the price line
  height: am5.percent(25),
  y: am5.percent(100),
  centerY: am5.percent(100),
  panY: false, // the volume axis never pans up or down
  renderer: volumeAxisRenderer
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var volumeSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Volume Series",
  xAxis: xAxis,
  yAxis: volumeAxis,
  valueYField: "volume",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // the tooltip shows the volume
  })
}));

// slightly see-through, no outline, each column 40% of its day's width
volumeSeries.columns.template.setAll({ fillOpacity: 0.8, strokeOpacity: 0, width: am5.percent(40) })

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // a bar above the plot to zoom and scroll through the days
}));

// Set data
var data = generateDatas(200);
series.data.setAll(data);
volumeSeries.data.setAll(data);

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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
