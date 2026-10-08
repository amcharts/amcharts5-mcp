---
title: "Step Count Chart"
source: "https://www.amcharts.com/demos/step-count-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

A step counter in the style of a fitness app: one column per day, gray below the 6,000-step goal and colored above it. Drag the chart sideways, and the day under the fixed cursor shows its count.

When a goal line helps: Daily figures mean more next to a goal: the reader sees at once which days made it, and the gray columns show the misses without a single number. A fixed cursor with the chart sliding under it is a pattern people know from phone apps, and it works well with touch.

Good for:
- Steps, calories or sleep per day
- Daily sales against a quota
- Charts on phones that people swipe through

Think twice when:
- Long periods: weekly totals or a line give the overview
- Exact comparisons between days: switch on value labels
- Desktop readers: a cursor that follows the mouse is quicker than dragging

Prompt: Create a fitness-app-style step count chart: a month of daily steps as columns, about ten days in view and dragged sideways to scroll, with days under the goal grayed out and lines at the goal and twice the goal. A cursor fixed in the middle shows the day under it. Use the amCharts 5 library with its Responsive theme.

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
    date: "2026-01-02",
    steps: 4561
  },
  {
    date: "2026-01-03",
    steps: 5687
  },
  {
    date: "2026-01-04",
    steps: 6348
  },
  {
    date: "2026-01-05",
    steps: 4878
  },
  {
    date: "2026-01-06",
    steps: 9867
  },
  {
    date: "2026-01-07",
    steps: 7561
  },
  {
    date: "2026-01-08",
    steps: 1287
  },
  {
    date: "2026-01-09",
    steps: 3298
  },
  {
    date: "2026-01-10",
    steps: 5697
  },
  {
    date: "2026-01-11",
    steps: 4878
  },
  {
    date: "2026-01-12",
    steps: 8788
  },
  {
    date: "2026-01-13",
    steps: 9560
  },
  {
    date: "2026-01-14",
    steps: 11687
  },
  {
    date: "2026-01-15",
    steps: 5878
  },
  {
    date: "2026-01-16",
    steps: 9789
  },
  {
    date: "2026-01-17",
    steps: 3987
  },
  {
    date: "2026-01-18",
    steps: 5898
  },
  {
    date: "2026-01-19",
    steps: 9878
  },
  {
    date: "2026-01-20",
    steps: 13687
  },
  {
    date: "2026-01-21",
    steps: 6789
  },
  {
    date: "2026-01-22",
    steps: 4531
  },
  {
    date: "2026-01-23",
    steps: 5856
  },
  {
    date: "2026-01-24",
    steps: 5737
  },
  {
    date: "2026-01-25",
    steps: 9987
  },
  {
    date: "2026-01-26",
    steps: 16457
  },
  {
    date: "2026-01-27",
    steps: 7878
  },
  {
    date: "2026-01-28",
    steps: 6845
  },
  {
    date: "2026-01-29",
    steps: 4659
  },
  {
    date: "2026-01-30",
    steps: 7892
  },
  {
    date: "2026-01-31",
    steps: 7362
  },
  {
    date: "2026-02-01",
    steps: 3268
  }
];

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true, // the chart can be reached with the Tab key
    panX: true,      // a drag scrolls through the days
    panY: false,
    wheelX: "panX",  // a horizontal wheel or trackpad swipe scrolls too...
    wheelY: "none",  // ...but the vertical wheel scrolls the page, not the chart
    paddingLeft: 0,  // no gap at the left edge...
    paddingRight: 0  // ...or the right edge
  })
);


// hide zoomout button
chart.zoomOutButton.set("forceHidden", true);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 50, // at least 50px between the date labels
  strokeOpacity: 0.2,  // a faint axis line
  minorGridEnabled: true
});
xRenderer.grid.template.set("forceHidden", true); // no vertical grid lines

var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.49, // the first and last day can be panned almost to the middle, under the cursor
    snapTooltip: false, // the date tooltip follows the cursor instead of snapping to the day
    baseInterval: {     // one column a day
      timeUnit: "day",
      count: 1
    },
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {}) // shows the cursor's date on the axis
  })
);

// labels inside the plot: the goal labels below are placed by the plot's width
var yRenderer = am5xy.AxisRendererY.new(root, { inside: true });
yRenderer.grid.template.set("forceHidden", true); // no horizontal grid lines
// no value labels, which the first column would cover: the goal lines give the scale,
// the tooltip the exact count
yRenderer.labels.template.set("forceHidden", true);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0, // no panning up or down past the data
    // columns start at zero, so their heights compare truly
    min: 0,
    renderer: yRenderer
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "steps",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "vertical", // the tooltip sits above or below its point
      labelText: "{valueY}"           // the day's step count
    })
  })
);

series.columns.template.setAll({
  cornerRadiusTL: 15, // rounded top corners...
  cornerRadiusTR: 15, // ...on both sides
  maxWidth: 30,       // columns at most 30px wide
  strokeOpacity: 0    // no outline
});

// days under the 6,000-step goal are gray
series.columns.template.adapters.add("fill", function (fill, target) {
  if (target.dataItem.get("valueY") < 6000) {
    // the theme's disabled color, so the misses stay gray in dark mode too
    return root.interfaceColors.get("disabled");
  }
  return fill;
});

// Set up data processor to parse string dates
// https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
series.data.processor = am5.DataProcessor.new(root, {
  dateFormat: "yyyy-MM-dd",
  dateFields: ["date"]
});

series.data.setAll(data);

// do not allow tooltip  to move horizontally
series.get("tooltip").adapters.add("x", function (x) {
  return chart.plotContainer.toGlobal({
    x: chart.plotContainer.width() / 2,
    y: 0
  }).x;
});

// add ranges
var goalRange = yAxis.createAxisRange(yAxis.makeDataItem({
  value: 6000 // a goal line at 6,000 steps
}));

goalRange.get("grid").setAll({
  forceHidden: false, // shown, though the axis grid lines are hidden
  strokeOpacity: 0.2  // faint
});

var goalLabel = goalRange.get("label");

goalLabel.setAll({
  forceHidden: false, // shown, though the axis labels are hidden
  centerY: am5.p100,  // the label sits on the line...
  centerX: am5.p100,  // ...and ends where it is placed: at the plot's right edge, by the adapter below
  text: "Goal"
});

// put to other side
goalLabel.adapters.add("x", function (x) {
  return chart.plotContainer.width();
});

var goalRange2 = yAxis.createAxisRange(yAxis.makeDataItem({
  value: 12000 // a second line at twice the goal
}));

goalRange2.get("grid").setAll({
  forceHidden: false, // shown...
  strokeOpacity: 0.2  // ...and faint
});

var goalLabel2 = goalRange2.get("label");

goalLabel2.setAll({
  forceHidden: false, // shown, on the line, ending at the plot's right edge
  centerY: am5.p100,
  centerX: am5.p100,
  text: "2 x Goal"
});

// put to other side
goalLabel2.adapters.add("x", function (x) {
  return chart.plotContainer.width();
});

// reposition when width changes
chart.plotContainer.onPrivate("width", function () {
  goalLabel.markDirtyPosition();
  goalLabel2.markDirtyPosition();
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // the cursor stays on when the pointer leaves the chart, so the middle day's tooltip always shows
  alwaysShow: true,
  behavior: "none", // a drag pans the chart; the cursor doesn't zoom
  positionX: 0.5 // make it always be at the center
}));
cursor.lineY.set("visible", false); // no horizontal cursor line

// zoom to last 11 days
series.events.on("datavalidated", function () {
  var toTime =
    series.dataItems[series.dataItems.length - 1].get("valueX") +
    am5.time.getDuration("day", 1);
  var fromTime = series.dataItems[series.dataItems.length - 11].get("valueX");

  xAxis.zoomToValues(fromTime, toTime);
});

// when plot area is released, round zoom to nearest days
chart.plotContainer.events.on("globalpointerup", function () {
  var dayDuration = am5.time.getDuration("day", 1);

  var firstTime = am5.time
    .round(new Date(series.dataItems[0].get("valueX")), "day", 1)
    .getTime();
  var lastTime =
    series.dataItems[series.dataItems.length - 1].get("valueX") + dayDuration;
  var totalTime = lastTime - firstTime;
  var days = totalTime / dayDuration;

  var roundedStart =
    firstTime + Math.round(days * xAxis.get("start")) * dayDuration; // start rounded to a whole day...
  var roundedEnd =
    firstTime + Math.round(days * xAxis.get("end")) * dayDuration; // ...and the end too

  xAxis.zoomToValues(roundedStart, roundedEnd);
});

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 50);
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
