---
title: "Floating Bar Chart"
source: "https://www.amcharts.com/demos/floating-bar-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

Floating bars start and end wherever the data says, not at zero: here, four people’s working hours on one day, from John’s 8:00 start to Eaton’s 19:00 finish.

When bars float: Floating bars show spans: a shift from start to finish, a price from low to high, a stage of a project from one date to the next. Where bars overlap, as Joe’s and Susan’s do, they show who is at work at the same time. For many tasks with dates and links between them, a Gantt chart does more.

Good for:
- Shifts, opening hours and schedules
- Spans, like the lowest to the highest price
- Spotting overlaps between people or tasks

Think twice when:
- Values that count up from zero: plain bars
- Many tasks with dates and links: a Gantt chart
- The two ends matter more than the span: a dumbbell plot

Prompt: Create a floating bar chart of four people’s working hours on one day, each bar running from the hour they start to the hour they finish, in its own color. Add tooltips with the start and end. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,     // no panning: a drag over the plot zooms instead
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the hours
  layout: root.verticalLayout,
  paddingLeft:0    // the names sit at the chart's left edge
}));

// Add cursor: drag across the plot to zoom in on a few hours
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false); // no horizontal cursor line

var colors = chart.get("colors");

// Data
var data = [{
  name: "John",
  startTime: 8,
  endTime: 11,
  columnSettings: {
    stroke: colors.getIndex(1),
    fill: colors.getIndex(1)
  }
}, {
  name: "Joe",
  startTime: 10,
  endTime: 13,
  columnSettings: {
    stroke: colors.getIndex(3),
    fill: colors.getIndex(3)
  }
}, {
  name: "Susan",
  startTime: 11,
  endTime: 18,
  columnSettings: {
    stroke: colors.getIndex(5),
    fill: colors.getIndex(5)
  }
}, {
  name: "Eaton",
  startTime: 15,
  endTime: 19,
  columnSettings: {
    stroke: colors.getIndex(7),
    fill: colors.getIndex(7)
  }
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
  minorGridEnabled: true // a skipped name would still get a faint grid line
});
var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "name",
    renderer: yRenderer,
    tooltip: am5.Tooltip.new(root, {}) // shows the hovered name on the axis
  })
);

yRenderer.grid.template.setAll({
  location: 1 // grid lines at the end of each name's row, between the bars
})

yAxis.data.setAll(data);

// The values are hours of the day, shown as 8:00, 9:00 and so on
var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    numberFormat: "#':00'",
    renderer: am5xy.AxisRendererX.new(root, {
      strokeOpacity: 0.1, // a faint line along the hour axis
      minGridDistance:60  // at least 60px between hour labels
    })
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Shifts",
  xAxis: xAxis,
  yAxis: yAxis,
  // each bar starts at its startTime instead of at zero
  openValueXField: "startTime",
  valueXField: "endTime",
  categoryYField: "name",
  sequencedInterpolation: true // on load, the bars grow one after another
}));

series.columns.template.setAll({
  height: am5.percent(100), // each bar fills its row's full height
  // each bar's fill and stroke come from columnSettings in its data row
  templateField: "columnSettings",
  tooltipText: "[bold]{categoryY}[/]: {openValueX}:00 to {valueX}:00" // as "John: 8:00 to 11:00"
});

series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear();
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
