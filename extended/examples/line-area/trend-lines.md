---
title: "Trend Lines"
source: "https://www.amcharts.com/demos/trend-lines/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart with two trend lines drawn over it: green along a rise, red along a fall. Each trend line is simply its own line series with two points.

When to draw trend lines: A trend line turns a run of ups and downs into one direction you can see at a glance. Placing them yourself, as here, lets you mark the stretches that matter, like a growth phase and the slide after it.

Good for:
- Marking rises and falls in prices or sales
- Pointing out a phase in a presentation
- Simple technical analysis without a stock chart

Think twice when:
- Lines that should follow new data: calculate a moving average
- Noisy data with no clear direction
- Letting readers draw their own: the Stock Chart has drawing tools

Prompt: Create a line chart of about three weeks of daily values with round bullets, and two straight trend lines drawn over it, one along a rise and one along a fall. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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

var data = [
  {
    date: "2026-01-01",
    value: 8
  },
  {
    date: "2026-01-02",
    value: 10
  },
  {
    date: "2026-01-03",
    value: 12
  },
  {
    date: "2026-01-04",
    value: 14
  },
  {
    date: "2026-01-05",
    value: 11
  },
  {
    date: "2026-01-06",
    value: 6
  },
  {
    date: "2026-01-07",
    value: 7
  },
  {
    date: "2026-01-08",
    value: 9
  },
  {
    date: "2026-01-09",
    value: 13
  },
  {
    date: "2026-01-10",
    value: 15
  },
  {
    date: "2026-01-11",
    value: 19
  },
  {
    date: "2026-01-12",
    value: 21
  },
  {
    date: "2026-01-13",
    value: 22
  },
  {
    date: "2026-01-14",
    value: 20
  },
  {
    date: "2026-01-15",
    value: 18
  },
  {
    date: "2026-01-16",
    value: 14
  },
  {
    date: "2026-01-17",
    value: 16
  },
  {
    date: "2026-01-18",
    value: 18
  },
  {
    date: "2026-01-19",
    value: 17
  },
  {
    date: "2026-01-20",
    value: 15
  },
  {
    date: "2026-01-21",
    value: 12
  },
  {
    date: "2026-01-22",
    value: 10
  },
  {
    date: "2026-01-23",
    value: 8
  }
];

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,  // the chart can be reached with the Tab key
    panX: true,       // drag the plot to pan sideways...
    panY: true,       // ...and up and down
    wheelX: "panX",   // a horizontal wheel or trackpad swipe pans
    wheelY: "zoomX",  // the vertical wheel zooms in on the dates
    pinchZoomX: true, // pinch on a touch screen to zoom the dates
    paddingLeft: 0    // the value labels sit at the chart's left edge
  })
);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    // the axis can be panned up to half its length past the first or last date
    maxDeviation: 0.5,
    groupData: false, // every day stays its own point, never grouped into weeks
    baseInterval: {   // one point per day
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      // drag along the axis labels to zoom the axis
      pan: "zoom",
      minGridDistance: 70,   // at least 70px between date labels
      minorGridEnabled: true // fainter grid lines between the labeled ones
    }),
    tooltip: am5.Tooltip.new(root, {}) // shows the cursor's date on the axis
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 1, // can be panned up to its whole height past the values
    renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }) // drag along the value labels to zoom
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    // bullets hide when the points get closer than 10px, as when zoomed out
    minBulletDistance: 10,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal", // the tooltip points sideways at the line
      labelText: "{valueY}"             // just the value
    })
  })
);

// Set up data processor to parse string dates
// https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
series.data.processor = am5.DataProcessor.new(root, {
  dateFormat: "yyyy-MM-dd",
  dateFields: ["date"]
});

series.data.setAll(data);

// All bullets share one template, so setting its radius resizes them at once
var bulletTemplate = am5.Template.new({
  radius: 4
});

series.bullets.push(function () {
  var circle = am5.Circle.new(root, {
    fill: series.get("fill"),                       // the line's color
    stroke: root.interfaceColors.get("background"), // a ring in the background color sets the dot off the line
    strokeWidth: 2
  }, bulletTemplate);

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

// a rising trend from January 2 to 11, in the theme's positive color (green)
createTrendLine(
  [
    { date: "2026-01-02", value: 10 },
    { date: "2026-01-11", value: 19 }
  ],
  root.interfaceColors.get("positive")
);

// a falling trend from January 17 to 22, in the theme's negative color (red)
createTrendLine(
  [
    { date: "2026-01-17", value: 16 },
    { date: "2026-01-22", value: 10 }
  ],
  root.interfaceColors.get("negative")
);

// a trend line is a separate line series with two points: where it starts and where it ends
function createTrendLine(data, color) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "date",
      stroke: color, // the trend line's own color
      valueYField: "value"
    })
  );

  series.data.processor = am5.DataProcessor.new(root, {
    dateFormat: "yyyy-MM-dd",
    dateFields: ["date"]
  });

  series.data.setAll(data);
  series.appear(1000, 100);
}

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis
}));
cursor.lineY.set("visible", false); // no horizontal cursor line

// add scrollbar
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000, 100);
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
