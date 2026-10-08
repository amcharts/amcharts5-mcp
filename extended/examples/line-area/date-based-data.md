---
title: "Date Based Data"
source: "https://www.amcharts.com/demos/date-based-data/"
category: "line-area"
scraped: "2026-10-08"
---

Half a year of daily values, July 2025 to January 2026. The dates come in as plain text, like 2025-07-27, and the chart turns them into a real timeline.

Dates written as text: Data often arrives with dates as text, from a spreadsheet, a CSV file or an API. Instead of converting them yourself, you tell the chart the format once, here year-month-day, and it does the rest, month lengths and leap years included.

Good for:
- Exports and feeds you’d rather not rewrite
- Daily figures over months or years
- Dates in any order of year, month and day

Think twice when:
- Dates already stored as timestamps: no parsing needed
- Times of day: put the hours and minutes in the format too
- Data without dates: use a category axis

Prompt: Create a line chart of about six months of daily values whose dates come as text strings, with a soft fill under the line and circle bullets that appear only once you zoom in far enough to space them out. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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

var data = [{
  "date": "2025-07-27",
  "value": 13
}, {
  "date": "2025-07-28",
  "value": 11
}, {
  "date": "2025-07-29",
  "value": 15
}, {
  "date": "2025-07-30",
  "value": 16
}, {
  "date": "2025-07-31",
  "value": 18
}, {
  "date": "2025-08-01",
  "value": 13
}, {
  "date": "2025-08-02",
  "value": 22
}, {
  "date": "2025-08-03",
  "value": 23
}, {
  "date": "2025-08-04",
  "value": 20
}, {
  "date": "2025-08-05",
  "value": 17
}, {
  "date": "2025-08-06",
  "value": 16
}, {
  "date": "2025-08-07",
  "value": 18
}, {
  "date": "2025-08-08",
  "value": 21
}, {
  "date": "2025-08-09",
  "value": 26
}, {
  "date": "2025-08-10",
  "value": 24
}, {
  "date": "2025-08-11",
  "value": 29
}, {
  "date": "2025-08-12",
  "value": 32
}, {
  "date": "2025-08-13",
  "value": 18
}, {
  "date": "2025-08-14",
  "value": 24
}, {
  "date": "2025-08-15",
  "value": 22
}, {
  "date": "2025-08-16",
  "value": 18
}, {
  "date": "2025-08-17",
  "value": 19
}, {
  "date": "2025-08-18",
  "value": 14
}, {
  "date": "2025-08-19",
  "value": 15
}, {
  "date": "2025-08-20",
  "value": 12
}, {
  "date": "2025-08-21",
  "value": 8
}, {
  "date": "2025-08-22",
  "value": 9
}, {
  "date": "2025-08-23",
  "value": 8
}, {
  "date": "2025-08-24",
  "value": 7
}, {
  "date": "2025-08-25",
  "value": 5
}, {
  "date": "2025-08-26",
  "value": 11
}, {
  "date": "2025-08-27",
  "value": 13
}, {
  "date": "2025-08-28",
  "value": 18
}, {
  "date": "2025-08-29",
  "value": 20
}, {
  "date": "2025-08-30",
  "value": 29
}, {
  "date": "2025-08-31",
  "value": 33
}, {
  "date": "2025-09-01",
  "value": 42
}, {
  "date": "2025-09-02",
  "value": 35
}, {
  "date": "2025-09-03",
  "value": 31
}, {
  "date": "2025-09-04",
  "value": 47
}, {
  "date": "2025-09-05",
  "value": 52
}, {
  "date": "2025-09-06",
  "value": 46
}, {
  "date": "2025-09-07",
  "value": 41
}, {
  "date": "2025-09-08",
  "value": 43
}, {
  "date": "2025-09-09",
  "value": 40
}, {
  "date": "2025-09-10",
  "value": 39
}, {
  "date": "2025-09-11",
  "value": 34
}, {
  "date": "2025-09-12",
  "value": 29
}, {
  "date": "2025-09-13",
  "value": 34
}, {
  "date": "2025-09-14",
  "value": 37
}, {
  "date": "2025-09-15",
  "value": 42
}, {
  "date": "2025-09-16",
  "value": 49
}, {
  "date": "2025-09-17",
  "value": 46
}, {
  "date": "2025-09-18",
  "value": 47
}, {
  "date": "2025-09-19",
  "value": 55
}, {
  "date": "2025-09-20",
  "value": 59
}, {
  "date": "2025-09-21",
  "value": 58
}, {
  "date": "2025-09-22",
  "value": 57
}, {
  "date": "2025-09-23",
  "value": 61
}, {
  "date": "2025-09-24",
  "value": 59
}, {
  "date": "2025-09-25",
  "value": 67
}, {
  "date": "2025-09-26",
  "value": 65
}, {
  "date": "2025-09-27",
  "value": 61
}, {
  "date": "2025-09-28",
  "value": 66
}, {
  "date": "2025-09-29",
  "value": 69
}, {
  "date": "2025-09-30",
  "value": 71
}, {
  "date": "2025-10-01",
  "value": 67
}, {
  "date": "2025-10-02",
  "value": 63
}, {
  "date": "2025-10-03",
  "value": 46
}, {
  "date": "2025-10-04",
  "value": 32
}, {
  "date": "2025-10-05",
  "value": 21
}, {
  "date": "2025-10-06",
  "value": 18
}, {
  "date": "2025-10-07",
  "value": 21
}, {
  "date": "2025-10-08",
  "value": 28
}, {
  "date": "2025-10-09",
  "value": 27
}, {
  "date": "2025-10-10",
  "value": 36
}, {
  "date": "2025-10-11",
  "value": 33
}, {
  "date": "2025-10-12",
  "value": 31
}, {
  "date": "2025-10-13",
  "value": 30
}, {
  "date": "2025-10-14",
  "value": 34
}, {
  "date": "2025-10-15",
  "value": 38
}, {
  "date": "2025-10-16",
  "value": 37
}, {
  "date": "2025-10-17",
  "value": 44
}, {
  "date": "2025-10-18",
  "value": 49
}, {
  "date": "2025-10-19",
  "value": 53
}, {
  "date": "2025-10-20",
  "value": 57
}, {
  "date": "2025-10-21",
  "value": 60
}, {
  "date": "2025-10-22",
  "value": 61
}, {
  "date": "2025-10-23",
  "value": 69
}, {
  "date": "2025-10-24",
  "value": 67
}, {
  "date": "2025-10-25",
  "value": 72
}, {
  "date": "2025-10-26",
  "value": 77
}, {
  "date": "2025-10-27",
  "value": 75
}, {
  "date": "2025-10-28",
  "value": 70
}, {
  "date": "2025-10-29",
  "value": 72
}, {
  "date": "2025-10-30",
  "value": 70
}, {
  "date": "2025-10-31",
  "value": 72
}, {
  "date": "2025-11-01",
  "value": 73
}, {
  "date": "2025-11-02",
  "value": 67
}, {
  "date": "2025-11-03",
  "value": 68
}, {
  "date": "2025-11-04",
  "value": 65
}, {
  "date": "2025-11-05",
  "value": 71
}, {
  "date": "2025-11-06",
  "value": 75
}, {
  "date": "2025-11-07",
  "value": 74
}, {
  "date": "2025-11-08",
  "value": 71
}, {
  "date": "2025-11-09",
  "value": 76
}, {
  "date": "2025-11-10",
  "value": 77
}, {
  "date": "2025-11-11",
  "value": 81
}, {
  "date": "2025-11-12",
  "value": 83
}, {
  "date": "2025-11-13",
  "value": 80
}, {
  "date": "2025-11-14",
  "value": 81
}, {
  "date": "2025-11-15",
  "value": 87
}, {
  "date": "2025-11-16",
  "value": 82
}, {
  "date": "2025-11-17",
  "value": 86
}, {
  "date": "2025-11-18",
  "value": 80
}, {
  "date": "2025-11-19",
  "value": 87
}, {
  "date": "2025-11-20",
  "value": 83
}, {
  "date": "2025-11-21",
  "value": 85
}, {
  "date": "2025-11-22",
  "value": 84
}, {
  "date": "2025-11-23",
  "value": 82
}, {
  "date": "2025-11-24",
  "value": 73
}, {
  "date": "2025-11-25",
  "value": 71
}, {
  "date": "2025-11-26",
  "value": 75
}, {
  "date": "2025-11-27",
  "value": 79
}, {
  "date": "2025-11-28",
  "value": 70
}, {
  "date": "2025-11-29",
  "value": 73
}, {
  "date": "2025-11-30",
  "value": 61
}, {
  "date": "2025-12-01",
  "value": 62
}, {
  "date": "2025-12-02",
  "value": 66
}, {
  "date": "2025-12-03",
  "value": 65
}, {
  "date": "2025-12-04",
  "value": 73
}, {
  "date": "2025-12-05",
  "value": 79
}, {
  "date": "2025-12-06",
  "value": 78
}, {
  "date": "2025-12-07",
  "value": 78
}, {
  "date": "2025-12-08",
  "value": 78
}, {
  "date": "2025-12-09",
  "value": 74
}, {
  "date": "2025-12-10",
  "value": 73
}, {
  "date": "2025-12-11",
  "value": 75
}, {
  "date": "2025-12-12",
  "value": 70
}, {
  "date": "2025-12-13",
  "value": 77
}, {
  "date": "2025-12-14",
  "value": 67
}, {
  "date": "2025-12-15",
  "value": 62
}, {
  "date": "2025-12-16",
  "value": 64
}, {
  "date": "2025-12-17",
  "value": 61
}, {
  "date": "2025-12-18",
  "value": 59
}, {
  "date": "2025-12-19",
  "value": 53
}, {
  "date": "2025-12-20",
  "value": 54
}, {
  "date": "2025-12-21",
  "value": 56
}, {
  "date": "2025-12-22",
  "value": 59
}, {
  "date": "2025-12-23",
  "value": 58
}, {
  "date": "2025-12-24",
  "value": 55
}, {
  "date": "2025-12-25",
  "value": 52
}, {
  "date": "2025-12-26",
  "value": 54
}, {
  "date": "2025-12-27",
  "value": 50
}, {
  "date": "2025-12-28",
  "value": 50
}, {
  "date": "2025-12-29",
  "value": 51
}, {
  "date": "2025-12-30",
  "value": 52
}, {
  "date": "2025-12-31",
  "value": 58
}, {
  "date": "2026-01-01",
  "value": 60
}, {
  "date": "2026-01-02",
  "value": 67
}, {
  "date": "2026-01-03",
  "value": 64
}, {
  "date": "2026-01-04",
  "value": 66
}, {
  "date": "2026-01-05",
  "value": 60
}, {
  "date": "2026-01-06",
  "value": 63
}, {
  "date": "2026-01-07",
  "value": 61
}, {
  "date": "2026-01-08",
  "value": 60
}, {
  "date": "2026-01-09",
  "value": 65
}, {
  "date": "2026-01-10",
  "value": 75
}, {
  "date": "2026-01-11",
  "value": 77
}, {
  "date": "2026-01-12",
  "value": 78
}, {
  "date": "2026-01-13",
  "value": 70
}, {
  "date": "2026-01-14",
  "value": 70
}, {
  "date": "2026-01-15",
  "value": 73
}, {
  "date": "2026-01-16",
  "value": 71
}, {
  "date": "2026-01-17",
  "value": 74
}, {
  "date": "2026-01-18",
  "value": 78
}, {
  "date": "2026-01-19",
  "value": 85
}, {
  "date": "2026-01-20",
  "value": 82
}, {
  "date": "2026-01-21",
  "value": 83
}, {
  "date": "2026-01-22",
  "value": 88
}, {
  "date": "2026-01-23",
  "value": 85
}, {
  "date": "2026-01-24",
  "value": 85
}, {
  "date": "2026-01-25",
  "value": 80
}, {
  "date": "2026-01-26",
  "value": 87
}, {
  "date": "2026-01-27",
  "value": 84
}, {
  "date": "2026-01-28",
  "value": 83
}, {
  "date": "2026-01-29",
  "value": 84
}, {
  "date": "2026-01-30",
  "value": 81
}];

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  focusable: true, // the chart can take keyboard focus, for keyboard users
  panX: true,      // drag the plot sideways to pan...
  panY: true,      // ...or up and down
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans
  wheelY: "zoomX", // the vertical wheel zooms in on the dates
  pinchZoomX:true, // pinch to zoom on touch screens
  paddingLeft: 0   // the value labels sit at the chart's left edge
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.1, // pan up to 10% of the visible range past the first and last day
  groupData: false,  // every day is drawn, also when zoomed out
  baseInterval: {    // one point per day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // fainter grid lines between the labeled dates
    minGridDistance: 70     // at least 70px between labels; on narrow screens some are skipped
  }),
  tooltip: am5.Tooltip.new(root, {}) // the cursor shows the date on the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.2, // the values can be panned 20% past their range too
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  // bullets show only while the points are at least 10px apart
  minBulletDistance: 10,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "horizontal", // the tooltip points sideways at the line
    labelText: "{valueY}"             // the hovered day's value
  })
}));

series.fills.template.setAll({
  fillOpacity: 0.2, // a faint fill under the line...
  visible: true     // ...which line series hide by default
});

series.strokes.template.setAll({
  strokeWidth: 2 // a 2px line
});

// Set up data processor to parse string dates
// https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
series.data.processor = am5.DataProcessor.new(root, {
  dateFormat: "yyyy-MM-dd", // the dates are strings like "2026-01-30"...
  dateFields: ["date"]      // ...in the date field
});

series.data.setAll(data);

series.bullets.push(function() {
  var circle = am5.Circle.new(root, {
    radius: 4, // 4px dots...
    fill: root.interfaceColors.get("background"), // ...filled with the background color...
    stroke: series.get("fill"), // ...and outlined in the series color...
    strokeWidth: 2 // ...2px wide
  })

  return am5.Bullet.new(root, {
    sprite: circle
  })
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis, // the cursor snaps to whole days
  // dragging across the plot pans the chart instead of zooming it
  behavior: "none"
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// add scrollbar
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // drag its grips to zoom in on a range of dates
}));

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
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
