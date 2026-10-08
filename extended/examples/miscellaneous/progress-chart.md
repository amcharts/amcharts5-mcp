---
title: "Progress Chart"
source: "https://www.amcharts.com/demos/progress-chart/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A progress chart shows how far something has come on one bar from 0 to 100%, here in five stages of different lengths, each with its own color and start mark.

When a progress chart works: A single bar split into stages shows both how far along something is and how much each stage takes of the whole: a project plan, a funnel of steps, a budget used up. It reads best with a handful of stages, each with a color and a name in the legend.

Good for:
- Project phases and their share of the time
- Steps of a process
- Budgets or quotas used so far

Think twice when:
- Many stages: the narrow ones become slivers
- Several projects to compare: a bar per project
- Stages that overlap in time: a Gantt chart

Prompt: Create a progress chart: one horizontal bar from 0 to 100% split into five stages of different lengths, each in its own color, with the percentage where each stage starts marked under the bar and a legend of the stages. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,                 // no dragging the bar around
  panY: false,
  layout: root.verticalLayout, // the legend goes under the bar
  // a bar, not a wall of color: the chart is 170px tall, in the middle of the space, with the labels and the
  // legend right under the bar
  height: 170,
  y: am5.p50,
  centerY: am5.p50
}));

var data = [{
  category: "",
  from: 0,
  to: 15,
  name: "Stage #1",
  columnSettings: {
    fill: am5.color(0x0ca948)
  }
}, {
  category: "",
  from: 15,
  to: 75,
  name: "Stage #2",
  columnSettings: {
    fill: am5.color(0x93da49)
  }
}, {
  category: "",
  from: 75,
  to: 90,
  name: "Stage #3",
  columnSettings: {
    fill: am5.color(0xffd100)
  }
}, {
  category: "",
  from: 90,
  to: 95,
  name: "Stage #4",
  columnSettings: {
    fill: am5.color(0xcd213b)
  }
}, {
  category: "",
  from: 95,
  to: 100,
  name: "Stage #5",
  columnSettings: {
    fill: am5.color(0x9e9e9e)
  }
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererY.new(root, {})
}));
// one unnamed row: all the stages sit end to end in a single bar
yAxis.data.setAll([{ category: "" }]);

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,               // the bar always runs from 0...
  max: 100,             // ...to 100%
  numberFormat: "#'%'", // the value plus a % sign; quoted, so it isn't multiplied by 100
  renderer: am5xy.AxisRendererX.new(root, {})
}));

xAxis.get("renderer").labels.template.set("forceHidden", true); // no axis labels; addLabel adds its own

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "to",
  openValueXField: "from",
  categoryYField: "category",
  // not plotted: it gives the tooltip and the legend each stage's name as {categoryX}
  categoryXField: "name"
}));

series.columns.template.setAll({
  strokeWidth: 0,           // no outline
  strokeOpacity: 0,
  height: am5.percent(100), // each stage fills the row's full height
  // each stage's color comes from columnSettings in its data
  templateField: "columnSettings",
  tooltipText: "{categoryX}: {openValueX}% to {valueX}%" // the stage name, where it starts and where it ends
});

series.data.setAll(data);

// A percent label where each stage starts
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
function addLabel(value) {
  var rangeDataItem = xAxis.makeDataItem({
    value: value
  });

  xAxis.createAxisRange(rangeDataItem);

  rangeDataItem.get("grid").set("forceHidden", true); // no grid line, only a tick and a label

  rangeDataItem.get("tick").setAll({
    visible: true,     // ticks are hidden by default
    length: 18,        // 18px long
    strokeOpacity: 0.2 // faint
  });

  rangeDataItem.get("label").setAll({
    centerX: am5.p0, // the label starts at the tick and runs right
    // range labels copy the hidden axis labels, so they are shown again here
    forceHidden: false,
    fontSize: 11, // small text, in pixels
    text: value + "%"
  });
}

// a label at the start of each stage
for (var i = 0; i < data.length; i++) {
  addLabel(data[i].from);
}

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  nameField: "categoryX",   // legend items take their name from categoryX, the stage name
  centerX: am5.percent(50), // the legend's middle...
  x: am5.percent(50),       // ...at the middle of the chart
  clickTarget: "none"       // clicking a legend item does nothing
}));

// no cursor, so no values for the legend: without the empty value labels its items stay compact
legend.valueLabels.template.set("forceHidden", true);

legend.markerRectangles.template.setAll({
  strokeOpacity: 0 // no outline on the markers
});

legend.data.setAll(series.dataItems);

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
