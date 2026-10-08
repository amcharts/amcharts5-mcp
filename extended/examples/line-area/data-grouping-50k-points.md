---
title: "Data Grouping 50K Points"
source: "https://www.amcharts.com/demos/data-grouping-50k-points/"
category: "line-area"
scraped: "2026-10-08"
---

50,000 daily values, about 137 years, in one line chart. Zoomed out, it shows one point per year; zoom in and it switches to months, weeks and finally days.

When to group data: A chart is only so many pixels wide, so 50,000 points can’t all be told apart. Grouping draws one point per year, month or week while zoomed out and the daily values once you zoom in, so the chart stays fast and the line stays readable. Switch Group data off to compare.

Good for:
- Years of daily, hourly or minute data
- Sensor logs and price histories
- An overview first, the detail on zoom

Think twice when:
- Every spike matters: a group keeps one value per period and can hide short peaks
- A few hundred points: no need to group
- Data that isn’t over time: grouping needs a date axis

Prompt: Create a zoomable line chart of 50,000 daily values that groups the data into weeks, months or years when zoomed out and shows the daily values when zoomed in. Add a light fill under the line, a cursor, tooltips and a scrollbar with a preview of the whole series. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,     // the plot doesn't pan when dragged
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans the dates
  wheelY: "zoomX", // the vertical wheel zooms in on them
  paddingLeft: 0   // the value labels sit at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // drag across the plot to zoom into that stretch of time
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// Generate random data
var date = new Date();
date.setDate(date.getDate() - 50000); // start 50,000 days back, so the data ends today
date.setHours(0, 0, 0, 0);
var value = 100;

// the next day's point: a random step of up to 5 from the last value
function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
}

// that many days in a row
function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  // zoomed out, the days are combined into weeks, months or years, so far fewer points are drawn
  groupData: true,
  maxDeviation: 0, // no panning past the first and last day
  baseInterval: {  // one point per day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 60,   // at least 60px between labels; on narrow screens some are skipped
    minorGridEnabled: true // fainter grid lines between the labeled dates
  }),
  tooltip: am5.Tooltip.new(root, {}) // the cursor shows the date on the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
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
    labelText: "{valueY}" // the hovered point's value
  })
}));

// A faint area under the line
series.fills.template.setAll({
  visible: true,
  fillOpacity: 0.08
});

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal", // drag its grips to zoom in on a stretch of time
  height: 50                 // 50px tall, with a preview of the line
});
chart.set("scrollbarX", scrollbar);

var sbxAxis = scrollbar.chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    // the scrollbar's preview always shows one point a month
    groupIntervals: [{ timeUnit: "month", count: 1 }],
    baseInterval: { timeUnit: "day", count: 1 }, // the data has one point per day
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true, // fainter grid lines between the labeled dates
      opposite: false,        // labels under the preview
      strokeOpacity: 0        // no axis line
    })
  })
);

var sbyAxis = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// the preview line
var sbseries = scrollbar.chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: sbxAxis,
    yAxis: sbyAxis,
    valueYField: "value",
    valueXField: "date"
  })
);

var data = generateDatas(50000); // 50,000 days of data
series.data.setAll(data);
sbseries.data.setAll(data);

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
