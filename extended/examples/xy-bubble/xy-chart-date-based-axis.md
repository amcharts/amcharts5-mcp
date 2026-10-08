---
title: "XY Chart with Date-Based Axis"
source: "https://www.amcharts.com/demos/xy-chart-date-based-axis/"
category: "xy-bubble"
scraped: "2026-10-08"
---

A bubble chart over time: the horizontal axis holds dates, here 12 days in January 2026, and each point is sized by a third value. Circles and diamonds mark two series.

Bubbles on a date axis: Dates on the horizontal axis turn a bubble chart into a timeline of events, each with a value and a size: deals by amount, incidents by impact, posts by reach. The axis spaces the points by real time, so a quiet stretch shows up as a gap.

Good for:
- Events with a size: sales deals, incidents, earthquakes
- Two kinds of event on one timeline
- Events on irregular dates

Think twice when:
- One value per day: a line or column chart is simpler
- Many events on the same day: the bubbles cover each other
- Thousands of events: the sizes stop being readable

Prompt: Create a bubble chart of 12 days on a date axis with two series, one drawn as circles and the other as diamonds, each bubble sized by its own value, with tooltips. Use the amCharts 5 library with its Responsive theme.

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

// {valueX} in the tooltips is a date, shown as 2026-01-05
root.dateFormatter.setAll({
  dateFormat: "yyyy-MM-dd",
  dateFields: ["valueX"]
});

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false, // no panning by dragging
  panY: false,
  wheelY: "zoomXY" // the mouse wheel zooms both axes at once
}));

chart.get("colors").set("step", 2); // every second theme color, so the two series differ more

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "day", count: 1 }, // one point per day
  autoZoom: false,
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 50,  // at least 50px between date labels
    minorGridEnabled:true // fainter grid lines between the labeled ones
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's date on the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {}),
  // zooming the dates doesn't rescale this axis to the bubbles left in view
  autoZoom: false,
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's value on the axis
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series0 = chart.series.push(am5xy.LineSeries.new(root, {
  // works out the lowest and highest value, which the heat rule sizes the bubbles by
  calculateAggregates: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "ay",
  valueXField: "date",
  valueField: "aValue", // the bubble size, which the heat rule reads
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueX}, y: {valueY}, value: {value}"
  })
}));

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
// Both shapes cast a soft shadow, set on their templates
var circleTemplate = am5.Template.new({
  shadowColor: am5.color(0x000000), // a black shadow...
  shadowOpacity: 0.3,               // ...at 30%...
  shadowBlur: 6,                    // ...blurred 6px...
  shadowOffsetX: 2,                 // ...and moved 2px right and down
  shadowOffsetY: 2
});
series0.bullets.push(function() {
  var graphics = am5.Circle.new(root, {
    fill: series0.get("fill"), // the series color
  }, circleTemplate);
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Add heat rule
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
series0.set("heatRules", [{
  target: circleTemplate,
  min: 3,             // the smallest value gets a 3px radius...
  max: 35,            // ...the largest 35px
  dataField: "value", // sized by the series' valueField
  key: "radius"       // the setting the rule changes
}]);

var starTemplate = am5.Template.new({
  shadowColor: am5.color(0x000000),
  shadowOpacity: 0.3,
  shadowBlur: 6,
  shadowOffsetX: 2,
  shadowOffsetY: 2
});
// Create second series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series1 = chart.series.push(am5xy.LineSeries.new(root, {
  calculateAggregates: true, // the lowest and highest value, for this series' heat rule
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "by",
  valueXField: "date",
  valueField: "bValue", // the star size
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueX}, y: {valueY}, value: {value}"
  })
}));

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
series1.bullets.push(function() {
  var graphics = am5.Star.new(root, {
    fill: series1.get("fill"),    // the series color
    spikes: 4,                    // a four-pointed star...
    innerRadius: am5.percent(70), // ...with its inner corners at 70% of the radius: a diamond
  }, starTemplate);
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Add heat rule
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
series1.set("heatRules", [{
  target: starTemplate,
  min: 3,  // the stars range from a 3px radius...
  max: 50, // ...to 50px
  dataField: "value",
  key: "radius"
}]);

// no lines between the points: only the bubbles show
series0.strokes.template.set("strokeOpacity", 0);
series1.strokes.template.set("strokeOpacity", 0);

// the dates in the data are strings: the processors turn them into dates
series0.data.processor = am5.DataProcessor.new(root, {
  dateFields: ["date"], dateFormat: "yyyy-MM-dd"
});

series1.data.processor = am5.DataProcessor.new(root, {
  dateFields: ["date"], dateFormat: "yyyy-MM-dd"
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  behavior: "zoomXY",              // drag over the plot to zoom both axes to the box you draw
  snapToSeries: [series0, series1] // the cursor jumps to the nearest point of either series
}));

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

var data = [{
  "date": "2026-01-01",
  "ay": 6.5,
  "by": 2.2,
  "aValue": 15,
  "bValue": 10
}, {
  "date": "2026-01-02",
  "ay": 12.3,
  "by": 4.9,
  "aValue": 8,
  "bValue": 3
}, {
  "date": "2026-01-03",
  "ay": 12.3,
  "by": 5.1,
  "aValue": 16,
  "bValue": 4
}, {
  "date": "2026-01-04",
  "ay": 2.8,
  "by": 13.3,
  "aValue": 9,
  "bValue": 13
}, {
  "date": "2026-01-05",
  "ay": 3.5,
  "by": 6.1,
  "aValue": 5,
  "bValue": 2
}, {
  "date": "2026-01-06",
  "ay": 5.1,
  "by": 8.3,
  "aValue": 10,
  "bValue": 17
}, {
  "date": "2026-01-07",
  "ay": 6.7,
  "by": 10.5,
  "aValue": 3,
  "bValue": 10
}, {
  "date": "2026-01-08",
  "ay": 8,
  "by": 12.3,
  "aValue": 5,
  "bValue": 13
}, {
  "date": "2026-01-09",
  "ay": 8.9,
  "by": 4.5,
  "aValue": 8,
  "bValue": 11
}, {
  "date": "2026-01-10",
  "ay": 9.7,
  "by": 15,
  "aValue": 15,
  "bValue": 10
}, {
  "date": "2026-01-11",
  "ay": 10.4,
  "by": 10.8,
  "aValue": 1,
  "bValue": 11
}, {
  "date": "2026-01-12",
  "ay": 1.7,
  "by": 19,
  "aValue": 12,
  "bValue": 3
}]

series0.data.setAll(data);
series1.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series0.appear(1000);
series1.appear(1000);

chart.appear(1000, 100);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

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
