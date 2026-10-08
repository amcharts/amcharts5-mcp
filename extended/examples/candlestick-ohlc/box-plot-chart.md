---
title: "Box Plot Chart"
source: "https://www.amcharts.com/demos/box-plot-chart/"
category: "candlestick-ohlc"
scraped: "2026-10-08"
---

A box plot sums up a spread of values in one mark: the box holds the middle half, the line across it is the median, and the whiskers reach the lowest and highest values. Here, nine days side by side.

When a box plot works: A box plot compares how values spread, not just their averages: where the middle half sits, how wide it is and how far the extremes reach. Nine boxes side by side show at a glance which days ran higher and which varied more.

Good for:
- Response times, test scores, prices per day
- Comparing spread across groups or periods
- Spotting days with unusual extremes

Think twice when:
- Readers who don’t know quartiles: add a short key
- Only a few values per group: show the points themselves
- Data with two peaks: a box hides them, a histogram shows them

Prompt: Create a box plot of nine days of values, each day a box from the first to the third quartile, with whiskers to the minimum and maximum and a line at the median. Add a cursor and tooltips with all five values. Use the amCharts 5 library with its Responsive theme.

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
    focusable: true, // the chart can take keyboard focus, for keyboard users
    panX: true,      // drag the plot sideways to pan...
    panY: true,      // ...or up and down
    wheelX: "panX",  // a horizontal wheel or trackpad swipe pans
    wheelY: "zoomX"  // the vertical wheel zooms in on the dates
  })
);

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 }, // one box per day
    renderer: am5xy.AxisRendererX.new(root, {
      // drag along the axis labels to zoom the axis in and out
      pan: "zoom",
      minorGridEnabled: true, // fainter grid lines between the labeled dates
      minGridDistance: 70     // at least 70px between labels; on narrow screens some are skipped
    }),
    tooltip: am5.Tooltip.new(root, {}) // the cursor shows the date on the axis
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom" // drag along the value labels to zoom them too
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
      pointerOrientation: "horizontal", // the tooltip points sideways at the box
      // the five numbers, top to bottom
      labelText: "Max: {highValueY}\nQ3: {valueY}\nMedian: {median}\nQ1: {openValueY}\nMin: {lowValueY}"
    })
  })
);

// Box plots use one colour: override the candlestick rise/drop colouring
var boxColor = chart.get("colors").getIndex(0); // the theme's first color
am5.array.each(["riseFromOpen", "dropFromOpen", "riseFromPrevious", "dropFromPrevious"], function(state) {
  series.columns.template.states.create(state, { fill: boxColor, stroke: boxColor });
});

// Median line inside each box: as wide as the box (candles are 50% of a day), with no risers between the days
var medianSeries = chart.series.push(
  am5xy.StepLineSeries.new(root, {
    stroke: root.interfaceColors.get("background"), // a line in the background color across the box
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "median",
    valueXField: "date",
    stepWidth: am5.percent(50),
    noRisers: true
  })
);
medianSeries.strokes.template.set("strokeWidth", 2); // a 2px median line

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis // the cursor snaps to whole days
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// Five-number summary for each day: minimum, first quartile, median, third quartile, maximum
var data = [
  {
    date: "2025-08-01",
    min: 124.1,
    q1: 129.6,
    median: 132.2,
    q3: 134.8,
    max: 139.5
  },
  {
    date: "2025-08-02",
    min: 122.8,
    q1: 128.4,
    median: 131.0,
    q3: 133.9,
    max: 140.2
  },
  {
    date: "2025-08-03",
    min: 125.6,
    q1: 130.1,
    median: 133.4,
    q3: 136.2,
    max: 142.8
  },
  {
    date: "2025-08-04",
    min: 127.3,
    q1: 131.8,
    median: 134.0,
    q3: 137.5,
    max: 144.1
  },
  {
    date: "2025-08-05",
    min: 123.9,
    q1: 129.2,
    median: 131.7,
    q3: 134.3,
    max: 138.6
  },
  {
    date: "2025-08-06",
    min: 121.4,
    q1: 127.5,
    median: 130.3,
    q3: 133.1,
    max: 137.9
  },
  {
    date: "2025-08-07",
    min: 124.8,
    q1: 130.6,
    median: 133.9,
    q3: 137.0,
    max: 143.4
  },
  {
    date: "2025-08-08",
    min: 126.2,
    q1: 131.4,
    median: 134.6,
    q3: 138.1,
    max: 145.0
  },
  {
    date: "2025-08-09",
    min: 125.0,
    q1: 130.2,
    median: 132.8,
    q3: 135.9,
    max: 141.7
  }
];

// turns the date strings into timestamps, in the data itself, so the median series gets them too
series.data.processor = am5.DataProcessor.new(root, {
  dateFields: ["date"],    // the field that holds dates...
  dateFormat: "yyyy-MM-dd" // ...written like 2025-08-01
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
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
