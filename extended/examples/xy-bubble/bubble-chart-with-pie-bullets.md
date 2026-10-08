---
title: "Bubble Chart with Pie Bullets"
source: "https://www.amcharts.com/demos/bubble-chart-with-pie-bullets/"
category: "xy-bubble"
scraped: "2026-10-08"
---

A bubble chart where every bubble is a small pie chart: its place and size show three values, and its slices show what it is made of.

When pie bullets help: Pie bullets add a breakdown to every point of a bubble chart, so each item shows where it stands and what it is made of. They work for a handful of points with two to four slices each; with more, the pies get too small to read.

Good for:
- Regions placed by sales and growth, split by product
- A few items, each with its own breakdown
- Infographics about a handful of places or teams

Think twice when:
- Many points: small pies turn into colored dots
- Comparing one slice across all pies: use stacked columns
- Points close together: the pies overlap

Prompt: Create an XY chart with two value axes where each of four data points is drawn as a small pie chart of its own breakdown, sized by its value, with tooltips on the slices. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,       // drag the plot to pan sideways...
  panY: true,       // ...and up and down
  wheelY: "zoomXY", // the mouse wheel zooms in on both axes
  pinchZoomX: true, // pinch to zoom on touch screens, both ways
  pinchZoomY: true
}));

// Add scrollbars, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }), // at least 50px between labels
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series0 = chart.series.push(am5xy.LineSeries.new(root, {
  // finds the lowest and highest value, which the heat rules below size the pies by
  calculateAggregates: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  valueField: "value",
  tooltip: am5.Tooltip.new(root, {
    labelText: "x: {valueX}, y: {valueY}, value: {value}"
  })
}));

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
// one template for all the pie charts, so the heat rules can size them
var pieChartTemplate = am5.Template.new({});

series0.bullets.push(function(root, series, dataItem) {
  // each point's bullet is a whole pie chart, made from the point's own pieData
  if (dataItem.dataContext.pieData) {
    var pieChart = root.container.children.push(am5percent.PieChart.new(root, {
      width: 100,       // the heat rules replace both sizes
      height: 100,
      radius: am5.p100, // the pie fills its box
      centerX: am5.p50, // centered on the point
      centerY: am5.p50
    }, pieChartTemplate));

    var series = pieChart.series.push(am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category"
    }));

    series.labels.template.set("forceHidden", true); // no slice labels...
    series.ticks.template.set("forceHidden", true);  // ...and no lines to them
    series.data.setAll(dataItem.dataContext.pieData);

    return am5.Bullet.new(root, {
      sprite: pieChart
    });
  }
});

// Add heat rules: the bigger the value, the bigger the pie (width and height together, so it stays round)
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
series0.set("heatRules", [{
  target: pieChartTemplate,
  min: 50,  // the smallest pie is 50px wide...
  max: 150, // ...the biggest 150px
  dataField: "value",
  key: "width"
}, {
  target: pieChartTemplate,
  min: 50,
  max: 150,
  dataField: "value",
  key: "height" // and as tall
}]);

// no line between the points: only the pies show
series0.strokes.template.set("strokeOpacity", 0);

var data = [{
  y: 10,
  x: 14,
  value: 20,
  pieData: [{
    category: "Category #1",
    value: 1200
  }, {
    category: "Category #2",
    value: 500
  }, {
    category: "Category #3",
    value: 765
  }, {
    category: "Category #4",
    value: 260
  }]
}, {
  y: 5,
  x: 11,
  value: 80,
  pieData: [{
    category: "Category #1",
    value: 200
  }, {
    category: "Category #2",
    value: 600
  }, {
    category: "Category #3",
    value: 350
  }]
}, {
  y: -10,
  x: 8,
  value: 19,
  pieData: [{
    category: "Category #1",
    value: 352
  }, {
    category: "Category #2",
    value: 266
  }, {
    category: "Category #3",
    value: 512
  }, {
    category: "Category #4",
    value: 199
  }]
}, {
  y: -6,
  x: 5,
  value: 65,
  pieData: [{
    category: "Category #1",
    value: 200
  }, {
    category: "Category #2",
    value: 300
  }, {
    category: "Category #3",
    value: 599
  }, {
    category: "Category #4",
    value: 512
  }]
}]

series0.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series0.appear(1000);
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
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
