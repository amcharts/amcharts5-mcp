---
title: "Box Plot Chart"
source: "https://www.amcharts.com/demos/box-plot-chart/"
category: "candlestick-ohlc"
scraped: "2026-09-29"
---

Box plot chart (also known as boxplot, box-and-whisker plot, box-and-whisker diagram) is a way of displaying statistical data based on five numbers: minimum, first quartile (25th percentile), median, third quartile (75th percentile) and maximum.
In this JavaScript box plot, each day's distribution is drawn with a CandlestickSeries: the box spans the first to the third quartile, and the whiskers reach the minimum and maximum. The median is a StepLineSeries with noRisers: true, which draws a horizontal line inside each box.
XY chart
Candlestick series
Step line series

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
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      pan: "zoom",
      minorGridEnabled: true,
      minGridDistance: 70
    }),
    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom"
    })
  })
);

var color = root.interfaceColors.get("background");

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.CandlestickSeries.new(root, {
    fill: color,
    stroke: color,
    name: "Distribution",
    xAxis: xAxis,
    yAxis: yAxis,
    // Box: first quartile (Q1) to third quartile (Q3); whiskers: minimum to maximum
    valueYField: "q3",
    openValueYField: "q1",
    lowValueYField: "min",
    highValueYField: "max",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "Max: {highValueY}\nQ3: {valueY}\nMedian: {median}\nQ1: {openValueY}\nMin: {lowValueY}"
    })
  })
);

// Box plots use one colour: override the candlestick rise/drop colouring
var boxColor = chart.get("colors").getIndex(0);
am5.array.each(["riseFromOpen", "dropFromOpen", "riseFromPrevious", "dropFromPrevious"], function(state) {
  series.columns.template.states.create(state, { fill: boxColor, stroke: boxColor });
});

// Median line inside each box
var medianSeries = chart.series.push(
  am5xy.StepLineSeries.new(root, {
    stroke: root.interfaceColors.get("background"),
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "median",
    valueXField: "date",
    noRisers: true
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis
}));
cursor.lineY.set("visible", false);

// Five-number summary for each day: minimum, first quartile, median, third quartile, maximum
var data = [
  {
    date: "2027-08-01",
    min: 124.1,
    q1: 129.6,
    median: 132.2,
    q3: 134.8,
    max: 139.5
  },
  {
    date: "2027-08-02",
    min: 122.8,
    q1: 128.4,
    median: 131.0,
    q3: 133.9,
    max: 140.2
  },
  {
    date: "2027-08-03",
    min: 125.6,
    q1: 130.1,
    median: 133.4,
    q3: 136.2,
    max: 142.8
  },
  {
    date: "2027-08-04",
    min: 127.3,
    q1: 131.8,
    median: 134.0,
    q3: 137.5,
    max: 144.1
  },
  {
    date: "2027-08-05",
    min: 123.9,
    q1: 129.2,
    median: 131.7,
    q3: 134.3,
    max: 138.6
  },
  {
    date: "2027-08-06",
    min: 121.4,
    q1: 127.5,
    median: 130.3,
    q3: 133.1,
    max: 137.9
  },
  {
    date: "2027-08-07",
    min: 124.8,
    q1: 130.6,
    median: 133.9,
    q3: 137.0,
    max: 143.4
  },
  {
    date: "2027-08-08",
    min: 126.2,
    q1: 131.4,
    median: 134.6,
    q3: 138.1,
    max: 145.0
  },
  {
    date: "2027-08-09",
    min: 125.0,
    q1: 130.2,
    median: 132.8,
    q3: 135.9,
    max: 141.7
  }
];

series.data.processor = am5.DataProcessor.new(root, {
  dateFields: ["date"],
  dateFormat: "yyyy-MM-dd"
});

series.data.setAll(data);
medianSeries.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000, 100);
medianSeries.appear(1000, 100);
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
  height: 400px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
