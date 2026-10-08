---
title: "Pareto Diagram"
source: "https://www.amcharts.com/demos/pareto-diagram/"
category: "column-bar"
scraped: "2026-10-08"
---

A Pareto chart sorts the columns from largest to smallest and adds a line that sums them up as it goes. Here, visits from 10 countries: the first four bring two thirds of all visits.

When a Pareto chart helps: A Pareto chart shows which few causes make up most of the total, so you know where to act first. Read the line against the right-hand axis: where it passes 80%, the columns to its left are the vital few, and the ones to its right add little.

Good for:
- Defects or complaints by cause
- Sales by product or customer
- Choosing what to fix first

Think twice when:
- Categories with an order of their own, like months: keep that order
- Negative values: the running total stops making sense
- Only three or four categories: a sorted bar chart says enough

Prompt: Create a Pareto chart of website visits from ten countries: columns sorted from most to fewest visits, each in its own color, and a line of the running share of the total on a second, percentage axis. Add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,                // no dragging to pan...
  panY: false,                // ...in either direction
  wheelX: "panX",             // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",            // ...and the vertical wheel zooms in on the countries
  paddingLeft: 0,             // the value labels sit at the chart's left edge...
  paddingRight: 0,            // ...and the percent labels at its right edge
  layout: root.verticalLayout // the chart's parts are stacked top to bottom
}));

// Add cursor: drag across the plot to zoom in on a few countries
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one


var data = [{
  country: "US",
  visits: 725
}, {
  country: "UK",
  visits: 625
}, {
  country: "China",
  visits: 602
}, {
  country: "Japan",
  visits: 509
}, {
  country: "Germany",
  visits: 322
}, {
  country: "France",
  visits: 214
}, {
  country: "India",
  visits: 204
}, {
  country: "Spain",
  visits: 198
}, {
  country: "Netherlands",
  visits: 165
}, {
  country: "Canada",
  visits: 41
}];

prepareParetoData(); // adds a pareto field to each row

// each country's running total, as a percent of all visits
function prepareParetoData() {
  var total = 0;

  for (var i = 0; i < data.length; i++) { // the total of all visits...
    var value = data[i].visits;
    total += value;
  }

  var sum = 0;
  for (var i = 0; i < data.length; i++) { // ...then each country's running total, in percent
    var value = data[i].visits;
    sum += value;
    data[i].pareto = sum / total * 100;
  }
}

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  // a label under every column
  minGridDistance: 20,
  minorGridEnabled: true // fainter grid lines between the labeled ones
})

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "country",
  renderer: xRenderer
}));

xRenderer.grid.template.setAll({
  location: 1 // grid lines between the countries, not through their middle
})

xRenderer.labels.template.setAll({
  paddingTop: 20, // 20px below the axis
  // long names wrap onto a second line instead of running into the next one
  oversizedBehavior: "wrap-no-break",
  textAlign: "center" // wrapped lines centered
});

// each label may be as wide as its category's cell
xAxis.onPrivate("cellWidth", function (cellWidth) {
  xRenderer.labels.template.set("maxWidth", cellWidth);
});

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1 // a faint axis line
  })
}));

var paretoAxisRenderer = am5xy.AxisRendererY.new(root, { opposite: true }); // on the right side
var paretoAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: paretoAxisRenderer,
  min: 0,
  max: 100,
  // the percent scale stays exactly 0 to 100, without rounding
  strictMinMax: true
}));

paretoAxisRenderer.grid.template.set("forceHidden", true); // no grid lines of its own: the left axis draws them
paretoAxis.set("numberFormat", "#'%");                     // whole numbers with a percent sign

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Visits",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "visits",
  categoryXField: "country",
  // Each column takes its own color from the series palette
  colorByDataItem: true
}));

series.columns.template.setAll({
  tooltipText: "{categoryX}: {valueY}", // the country and its visits on hover
  tooltipY: 0, // the tooltip points at the top of the column
  strokeOpacity: 0, // no outline
  cornerRadiusTL: 6, // rounded top corners
  cornerRadiusTR: 6
});

// pareto series
var paretoSeries = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Cumulative share",
  xAxis: xAxis,
  yAxis: paretoAxis,
  valueYField: "pareto",
  categoryXField: "country",
  stroke: root.interfaceColors.get("alternativeBackground"), // a line in the contrast color
  // the last dot, at 100%, may draw past the top of the plot instead of being cut
  maskBullets: false
}));

// a dot on each country's running total
paretoSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 1,
    sprite: am5.Circle.new(root, {
      radius: 5, // 5px radius
      fill: series.get("fill"), // filled in the column series' color...
      stroke: root.interfaceColors.get("alternativeBackground") // ...and outlined in the contrast color
    })
  })
})

series.data.setAll(data);
paretoSeries.data.setAll(data);

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
