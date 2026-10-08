---
title: "Line Chart with Horizontal Target"
source: "https://www.amcharts.com/demos/line-chart-with-horizontal-target/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart with a dotted target line at 40. Whatever falls below the target changes color, so the days that missed it stand out at once.

When a target line helps: A target line gives every value a yardstick: readers see at once whether the line is above or below where it should be, and for how long. It suits any goal set in advance, like a sales quota, an uptime promise or a safe limit.

Good for:
- KPIs with a set goal
- Limits: temperature, budget, response time
- Showing how often a target was missed

Think twice when:
- A goal that changes over time: draw it as a second line
- Upper and lower limits: shade the band between them
- Several targets on one chart: the dashed lines get confusing

Prompt: Create a line chart of about 300 daily values with a dotted horizontal target line and its label. The part of the line below the target is drawn in a different color. Add a fill under the line, a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
    panX: true,       // drag the plot to pan...
    panY: true,       // ...in any direction
    wheelX: "panX",   // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX",  // ...and the vertical wheel zooms in on the dates
    pinchZoomX: true, // pinch with two fingers to zoom on touch screens
    paddingLeft: 0    // the value labels sit at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineX.set("forceHidden", true); // no vertical cursor line...
cursor.lineY.set("forceHidden", true); // ...and no horizontal one: the cursor just shows the tooltip

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);

var value = 20;
// a random walk: each day moves a little from the day before, kept within 0 to 100
function generateData() {
    value = am5.math.round(Math.random() * 10 - 4.8 + value, 1);
    if (value < 0) {
        value = am5.math.round(Math.random() * 10, 1);
    }

    if (value > 100) {
        value = am5.math.round(100 - Math.random() * 10, 1);
    }
    am5.time.add(date, "day", 1);
    return {
        date: date.getTime(),
        value: value
    };
}

// count days of data in a row
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
    baseInterval: { // one data point per day
        timeUnit: "day",
        count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 80 // at least 80px between date labels
    })
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
        labelText: "{valueY}" // the hovered value
    })
}));

series.fills.template.setAll({
    fillOpacity: 0.2, // a light fill under the line...
    visible: true     // ...switched on (line series fills are hidden by default)
});

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
    orientation: "horizontal" // a scrollbar above the plot, to zoom and pan the dates
}));

// Set data
var data = generateDatas(300);

// move the whole line up or down so the target (40) is halfway between its lowest and highest day, but no
// value below 0: whatever the random walk did, the line crosses the target
var values = data.map(function (item) { return item.value; });
var low = Math.min.apply(null, values);
var high = Math.max.apply(null, values);
var shift = Math.max(40 - (low + high) / 2, -low);
data.forEach(function (item) {
  item.value = am5.math.round(item.value + shift, 1); // one decimal, like the generated values
});

series.data.setAll(data);

// add series range: the part of the series below the target
var seriesRangeDataItem = yAxis.makeDataItem({ value: 40, endValue: 0 }); // the target at 40, down to 0
var seriesRange = series.createAxisRange(seriesRangeDataItem);
seriesRange.fills.template.setAll({
    visible: true, // the range's own fill shows...
    opacity: 0.3   // ...faded
});

// the text color: black on a light background, white on a dark one
var targetColor = root.interfaceColors.get("text");

seriesRange.fills.template.set("fill", targetColor);     // the part below the target fills...
seriesRange.strokes.template.set("stroke", targetColor); // ...and draws its line in the text color

seriesRangeDataItem.get("grid").setAll({
    strokeOpacity: 1,       // an opaque...
    visible: true,
    stroke: targetColor,    // ...line in the text color...
    strokeDasharray: [2, 2] // ...dashed: 2px dashes, 2px gaps
})

// "Target" sits just above the line, inside the plot at its left edge
seriesRangeDataItem.get("label").setAll({
    location:0,
    visible:true,
    text:"Target",
    inside:true,
    centerX:0,
    centerY:am5.p100,
    fontWeight:"bold"
})

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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
