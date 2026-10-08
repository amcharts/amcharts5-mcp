---
title: "Duration on Value Axis"
source: "https://www.amcharts.com/demos/duration-on-value-axis/"
category: "line-area"
scraped: "2026-10-08"
---

A two-week road trip in one chart: miles driven each day, hours behind the wheel and how far north each stop is. The right-hand axis is a duration axis: the data is in minutes, the labels read as hours and minutes.

When to use a duration axis: Times stored as minutes or seconds are hard to read as plain numbers: 482 means little, 8:02 is clear at once. A duration axis keeps the data as numbers, so lines and columns are drawn to scale, and formats only the labels and tooltips.

Good for:
- Travel, call or delivery times
- Race and lap times
- Time spent per task, day or user

Think twice when:
- Times of day, like 9:30 am: use a date axis
- Readers who might take 08:00 for a clock time: name the axis
- More than two scales in one chart: split it in two

Prompt: Create a chart of a two-week road trip with three measures on one date axis: miles driven each day as columns, the latitude of each night’s town as a line with bullets sized by the town’s size, and the driving time as a line on a duration axis that shows hours and minutes. Add a cursor, tooltips and a legend. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
var data = [{
  "date": "2026-01-01",
  "distance": 227,
  "townName": "New York",
  "townSize": 12,
  "latitude": 40.71,
  "duration": 408
}, {
  "date": "2026-01-02",
  "distance": 371,
  "townName": "Washington",
  "townSize": 7,
  "latitude": 38.89,
  "duration": 482
}, {
  "date": "2026-01-03",
  "distance": 433,
  "townName": "Wilmington",
  "townSize": 3,
  "latitude": 34.22,
  "duration": 562
}, {
  "date": "2026-01-04",
  "distance": 345,
  "townName": "Jacksonville",
  "townSize": 3.5,
  "latitude": 30.35,
  "duration": 379
}, {
  "date": "2026-01-05",
  "distance": 480,
  "townName": "Miami",
  "townSize": 5,
  "latitude": 25.83,
  "duration": 501
}, {
  "date": "2026-01-06",
  "distance": 386,
  "townName": "Tallahassee",
  "townSize": 3.5,
  "latitude": 30.46,
  "duration": 443
}, {
  "date": "2026-01-07",
  "distance": 348,
  "townName": "New Orleans",
  "townSize": 5,
  "latitude": 29.94,
  "duration": 405
}, {
  "date": "2026-01-08",
  "distance": 238,
  "townName": "Houston",
  "townSize": 8,
  "latitude": 29.76,
  "duration": 309
}, {
  "date": "2026-01-09",
  "distance": 218,
  "townName": "Dallas",
  "townSize": 8,
  "latitude": 32.8,
  "duration": 287
}, {
  "date": "2026-01-10",
  "distance": 349,
  "townName": "Oklahoma City",
  "townSize": 5,
  "latitude": 35.49,
  "duration": 485
}, {
  "date": "2026-01-11",
  "distance": 603,
  "townName": "Kansas City",
  "townSize": 5,
  "latitude": 39.1,
  "duration": 890
}, {
  "date": "2026-01-12",
  "distance": 534,
  "townName": "Denver",
  "townSize": 9,
  "latitude": 39.74,
  "duration": 810
}, {
  "date": "2026-01-13",
  "distance": 425,
  "townName": "Salt Lake City",
  "townSize": 6,
  "latitude": 40.75,
  "duration": 670
}, {
  "date": "2026-01-14",
  "distance": 420,
  "townName": "Las Vegas",
  "townSize": 6,
  "latitude": 36.1,
  "duration": 470
}];

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
  panX: true, // drag the plot to scroll along the dates
  panY: false,
  wheelY: "none",             // the mouse wheel scrolls the page, not the chart
  layout: root.verticalLayout // the legend goes below the chart
}));

chart.zoomOutButton.set("forceHidden", true); // no zoom-out button

chart.get("colors").set("step", 2); // each series skips a palette color, so the three contrast more

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.2,                           // panning can go up to 20% past the first and last day
  baseInterval: { timeUnit: "day", count: 1 }, // one data point per day
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 70,   // at least 70px between date labels
    minorGridEnabled: true // faint grid lines between the main ones
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the hovered date on the axis
}));

var distanceAxisRenderer = am5xy.AxisRendererY.new(root, {});
distanceAxisRenderer.grid.template.set("forceHidden", true); // no grid lines from this axis
var distanceAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0, // columns start at zero, so their heights compare
  renderer: distanceAxisRenderer,
  tooltip: am5.Tooltip.new(root, {}) // shows the distance at the cursor's height
}));

// latitude gets a scale of its own, hidden, so its line spreads over the full height
var latitudeAxisRenderer = am5xy.AxisRendererY.new(root, {});
latitudeAxisRenderer.grid.template.set("forceHidden", true); // no grid lines from this axis
var latitudeAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: latitudeAxisRenderer,
  forceHidden: true
}));

var durationAxisRenderer = am5xy.AxisRendererY.new(root, {
  opposite: true // on the right side
});
durationAxisRenderer.grid.template.set("forceHidden", true); // no grid lines from this axis
var durationAxis = chart.yAxes.push(am5xy.DurationAxis.new(root, {
  // the durations in the data are minutes; the axis labels them as hours and minutes
  baseUnit:"minute",
  renderer: durationAxisRenderer,
  extraMax:0.3 // 30% more room above the longest duration
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var distanceSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Distance",
  xAxis: xAxis,
  yAxis: distanceAxis,
  valueYField: "distance",
  valueXField: "date",
  tooltip:am5.Tooltip.new(root, {
    labelText:"{valueY} miles" // as "227 miles"
  })
}));

// turns the date strings into timestamps, in the rows the other two series share
distanceSeries.data.processor = am5.DataProcessor.new(root, {
  dateFields: ["date"],    // the fields that hold dates...
  dateFormat: "yyyy-MM-dd" // ...and how their strings are written
});

var latitudeSeries = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Latitude",
  xAxis: xAxis,
  yAxis: latitudeAxis,
  valueYField: "latitude",
  valueXField: "date",
  tooltip:am5.Tooltip.new(root, {
    labelText:"latitude: {valueY} ({townName})" // as "latitude: 40.71 (New York)"
  })
}));

latitudeSeries.strokes.template.setAll({ strokeWidth: 2 }); // a 2px line

// Add circle bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
latitudeSeries.bullets.push(function() {
  var graphics = am5.Circle.new(root, {
    strokeWidth: 2, // a 2px outline
    radius: 5,      // replaced by the town size (see the adapter below)
    stroke: latitudeSeries.get("stroke"), // in the line's color
    fill: root.interfaceColors.get("background"), // filled with the background color
  });

  // each dot's size comes from the town's townSize in the data
  graphics.adapters.add("radius", function(radius, target) {
    return target.dataItem.dataContext.townSize;
  })

  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

var durationSeries = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Duration",
  xAxis: xAxis,
  yAxis: durationAxis,
  valueYField: "duration",
  valueXField: "date",
  tooltip:am5.Tooltip.new(root, {
    labelText:"duration: {valueY.formatDuration()}" // the value written as a duration
  })
}));

durationSeries.strokes.template.setAll({ strokeWidth: 2 }); // a 2px line

// Add square bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
durationSeries.bullets.push(function() {
  var graphics = am5.Rectangle.new(root, {
    width:10,                          // a 10px square...
    height:10,
    centerX:am5.p50,                   // ...centered on the data point...
    centerY:am5.p50,
    fill: durationSeries.get("stroke") // ...in the line's color
  });

  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: distanceAxis
}));

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // a scrollbar above the plot, to zoom and pan the dates
}));

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50, // the legend's middle...
  x: am5.p50        // ...at the middle of the chart
}));
legend.data.setAll(chart.series.values);

distanceSeries.data.setAll(data);
latitudeSeries.data.setAll(data);
durationSeries.data.setAll(data);
xAxis.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
distanceSeries.appear(1000);
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
