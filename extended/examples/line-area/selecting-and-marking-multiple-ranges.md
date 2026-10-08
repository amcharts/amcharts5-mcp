---
title: "Selecting and Marking Multiple Ranges"
source: "https://www.amcharts.com/demos/selecting-and-marking-multiple-ranges/"
category: "line-area"
scraped: "2026-10-08"
---

Drag across this line chart to mark a stretch of dates, then mark another, and another. A new mark that runs into an old one stops at its edge, so marks never overlap.

When to let people mark ranges: Marking turns a chart into a tool: people pick out the periods that matter to them, like campaigns, outages or holidays, and see them against the whole line. The marked dates are there for your code to save or to filter other data with.

Good for:
- Tagging events, campaigns or outages
- Choosing periods to compare or export
- Annotating data before a report

Think twice when:
- Marks that must be kept: the chart doesn’t save them, so store them yourself
- Phones: dragging across a small chart is fiddly
- Fixed periods everyone needs: draw them as axis ranges in code

Prompt: Create a line chart of about three years of daily values where dragging across the plot marks a date range as a shaded band. Several ranges can be marked: a new one stops at the edge of an earlier one, or replaces a range it covers. Add tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,      // a drag doesn't pan: the cursor uses it to select
  panY: false,
  wheelX: "panX",   // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",  // ...and the vertical wheel zooms in on the dates
  pinchZoomX: true, // pinch to zoom the dates on a touch screen
  paddingLeft: 0    // no gap at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // a drag across the plot selects a span of dates instead of zooming
  behavior: "selectX"
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// where the drag started, as a position across the plot (0 to 1)
var selectStatedX;

// remember where the drag started
cursor.events.on("selectstarted", function () {
  selectStatedX = cursor.getPrivate("positionX");
})

// when the drag ends, turn its two ends into dates and mark that range
cursor.events.on("selectended", function () {

  var selectEndedX = cursor.getPrivate("positionX");

  // from a position across the plot to one along the whole axis (zoom counts), then to a date
  var startValue = xAxis.positionToValue(xAxis.toAxisPosition(selectStatedX));
  var endValue = xAxis.positionToValue(xAxis.toAxisPosition(selectEndedX));

  markRange(startValue, endValue);

  cursor.selection.hide(); // hide the cursor's selection box: the marked range shows instead
})

// Marks the dates from startValue to endValue, fitting the new range around the ranges marked before
function markRange(startValue, endValue) {
  // flip if start > end
  if (startValue > endValue) {
    [startValue, endValue] = [endValue, startValue];
  }

  var skip = false; // set when the new range lies inside one marked before
  // check for overlapping
  var len = xAxis.axisRanges.length;
  for (var i = len - 1; i >= 0; i--) {
    var axisRange = xAxis.axisRanges.getIndex(i);
    var axisRangeStartValue = axisRange.get("value");
    var axisRangeEndValue = axisRange.get("endValue");
    // flip if start > end
    if (axisRangeStartValue > axisRangeEndValue) {
      [axisRangeStartValue, axisRangeEndValue] = [axisRangeEndValue, axisRangeStartValue];
    }

    // if both end and start values are within old range, do not do anything
    if (startValue >= axisRangeStartValue && startValue <= axisRangeEndValue && endValue >= axisRangeStartValue && endValue <= axisRangeEndValue) {
      skip = true
    }
    else {
      if (startValue >= axisRangeStartValue && startValue <= axisRangeEndValue) {
        startValue = axisRangeEndValue; // trim the new range to start where the old one ends...
      }

      if (endValue >= axisRangeStartValue && endValue <= axisRangeEndValue) {
        endValue = axisRangeStartValue; // ...or to end where the old one starts
      }
    }

    // if a new range takes within itself whole old range, remove old range
    if (startValue <= axisRangeStartValue && endValue >= axisRangeEndValue) {
      xAxis.axisRanges.removeValue(axisRange);
    }
  }

  if (!skip) {
    // the main trick: each marked span is an axis range, a band from one date to another
    var dataItem = xAxis.makeDataItem({});
    dataItem.set("value", startValue);
    dataItem.set("endValue", endValue);

    xAxis.createAxisRange(dataItem);
    dataItem.get("axisFill").set("visible", true); // show its fill: a band across the plot
    // only the fill shows, no grid line at the range's start
    dataItem.get("grid").set("forceHidden", true);
  }
}

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0); // start at midnight
var value = 100;           // the first value

// one day of data: the value moves up to 5 up or down from the day before
function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);
  am5.time.add(date, "day", 1); // the next day
  return {
    date: date.getTime(),
    value: value
  };
}

// a list of count days of data
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
  maxDeviation: 0.2, // pan or zoom out past the data's ends by up to 20% of the view
  baseInterval: {    // one data point a day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 80,   // at least 80px between the date labels
    minorGridEnabled: true // fainter grid lines between the labeled ones
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's date on the axis
}));

// Hide a date label that would stick out past the right edge of the chart
xAxis.get("renderer").labels.template.set("maxPosition", 0.98);

// The look of the marked ranges
xAxis.get("renderer").axisFills.template.setAll({
  fill: chart.get("colors").getIndex(7), // the eighth theme color...
  fillOpacity: 0.4                       // ...see-through, so the line shows
});

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
    labelText: "{valueY}" // hover for the day's value
  })
}));

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // above the plot; zooms the dates
}));

// Set data
var data = generateDatas(1200); // 1,200 days
series.data.setAll(data);

// Mark one range to start with
markRange(data[300].date, data[420].date);

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
