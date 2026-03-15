---
title: "Selecting and Marking Multiple Ranges"
source: "https://www.amcharts.com/demos/selecting-and-marking-multiple-ranges/"
category: "line-area"
scraped: "2026-03-15"
---

Click and drag on plot area to select a range on a chart. Chart creates an axis range in the place of a selection and also checks if a new range is not overlapping with previously created.
Key implementation details
We use cursor events here (selectstarted and selectended) to track selection start and end positions and then transform these positions to values using axis' positionToValue() method. Then create (or adjust) axis ranges based on these values.
Tracking cursor movementAxis ranges

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
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  pinchZoomX: true,
  paddingLeft: 0
}));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "selectX"
}));
cursor.lineY.set("visible", false);

var selectStatedX;

cursor.events.on("selectstarted", function () {
  selectStatedX = cursor.getPrivate("positionX");
})

cursor.events.on("selectended", function () {

  var selectEndedX = cursor.getPrivate("positionX");

  var startValue = xAxis.positionToValue(xAxis.toAxisPosition(selectStatedX));
  var endValue = xAxis.positionToValue(xAxis.toAxisPosition(selectEndedX));

  // flip if start > end
  if (startValue > endValue) {
    [startValue, endValue] = [endValue, startValue];
  }

  var skip = false;
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
        startValue = axisRangeEndValue;
      }

      if (endValue >= axisRangeStartValue && endValue <= axisRangeEndValue) {
        endValue = axisRangeStartValue;
      }
    }

    // if a new range takes within itself whole old range, remove old range
    if (startValue <= axisRangeStartValue && endValue >= axisRangeEndValue) {
      xAxis.axisRanges.removeValue(axisRange);
    }
  }

  if (!skip) {
    var dataItem = xAxis.makeDataItem({});
    dataItem.set("value", startValue);
    dataItem.set("endValue", endValue);

    xAxis.createAxisRange(dataItem);
    dataItem.get("axisFill").setAll({ fill: chart.get("colors").getIndex(7), fillOpacity: 0.4, visible: true });
    dataItem.get("grid").set("forceHidden", true);
  }

  cursor.selection.hide();
})


// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 100;

function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
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
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.2,
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 80,
    minorGridEnabled: true
  }),
  tooltip: am5.Tooltip.new(root, {})
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
    labelText: "{valueY}"
  })
}));


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));


// Set data
var data = generateDatas(1200);
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
max-width: 100%
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
