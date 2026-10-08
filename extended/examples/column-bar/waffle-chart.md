---
title: "Waffle Chart"
source: "https://www.amcharts.com/demos/waffle-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

A waffle chart shows parts of a whole as a grid of 100 squares, one per percent. Here, how visitors reached a website: 52 squares for search, 28 direct, 12 social and 8 email.

When to use a waffle chart: A waffle chart turns percentages into squares you can count, so reading it is more like counting than judging angles. It works best with a few parts and whole numbers, and small shares like 8% still get a block of their own. For close comparisons, a bar chart is clearer.

Good for:
- Shares of a whole, like traffic sources or budgets
- Infographics and reports for a general audience
- “So many out of 100” at a glance

Think twice when:
- More than five or six parts: the colors blur together
- Shares with decimals: each square is a whole percent
- Several wholes side by side: 100% stacked bars

Prompt: Create a waffle chart: a 10 by 10 grid of squares, one per percent, showing how visitors reached a website by search, direct, social or email, each source in its own color. Add tooltips and a legend with each share. Use the amCharts 5 library with its Responsive theme.

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
  panX: false, // no panning or zooming: the grid stays as it is
  panY: false,
  wheelX: "none",
  wheelY: "none",
  layout: root.verticalLayout, // the legend goes under the grid
  paddingLeft:5,               // only 5px at the sides
  paddingRight:5
}));

// Every third color of the palette, so neighboring parts stand apart
chart.get("colors").set("step", 3);

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50, // centered under the grid
    x: am5.p50,
    // as far from the chart above as from the edge below
    marginTop: 15
  })
);

// no cursor, so no values for the legend: without the empty value labels its items stay compact
legend.valueLabels.template.set("forceHidden", true);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  // no axis line: the squares stand on their own
  strokeOpacity: 0,
  minGridDistance: 40,
  minorGridEnabled:true
});
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "x",
  renderer: xRenderer
}));

xRenderer.grid.template.setAll({
  location: 1,
  visible: false // the squares need no grid
})

xRenderer.labels.template.set("forceHidden", true); // no column numbers

// ten columns
xAxis.data.setAll([{ x: "1" }, { x: "2" }, { x: "3" }, { x: "4" }, { x: "5" }, { x: "6" }, { x: "7" }, { x: "8" }, { x: "9" }, { x: "10" }]);

var yRenderer = am5xy.AxisRendererY.new(root, {
  // no axis line: the squares stand on their own
  strokeOpacity: 0,
  minGridDistance: 20,
  minorGridEnabled:true
});

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "y",
  renderer: yRenderer
}));

yRenderer.grid.template.setAll({
  location: 1,
  visible: false // no grid
})

yRenderer.labels.template.set("forceHidden", true); // no row numbers

// ten rows, the first at the bottom
yAxis.data.setAll([{ y: "1" }, { y: "2" }, { y: "3" }, { y: "4" }, { y: "5" }, { y: "6" }, { y: "7" }, { y: "8" }, { y: "9" }, { y: "10" }]);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// Each series fills the next squares of the 10 by 10 grid, column by column from the bottom left:
// one square per percent
var nextSquare = 0;

function makeSeries(name, squares) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name + " (" + squares + "%)",
    xAxis: xAxis,
    yAxis: yAxis,
    // open and close in the same cell on both axes: each column is one square of the grid
    categoryYField: "y",
    openCategoryYField: "y",
    categoryXField: "x",
    openCategoryXField: "x",
    // the series share the grid instead of sitting side by side in each cell
    clustered: false
  }));

  // a stroke in the background color leaves a gap between the squares
  series.columns.template.setAll({
    width: am5.percent(100), // each square fills its whole cell
    height: am5.percent(100),
    stroke: root.interfaceColors.get("background"),
    tooltipText: "{name}"
  });

  var data = [];
  for (var i = 0; i < squares; i++) {
    data.push({
      x: String(Math.floor(nextSquare / 10) + 1), // every 10 squares start the next column...
      y: String(nextSquare % 10 + 1)              // ...and fill it from the bottom up
    });
    nextSquare++;
  }
  series.data.setAll(data);

  series.appear();
  legend.data.push(series); // each part gets its legend item as it's made

  return series;
}

// How visitors reached a website
makeSeries("Search", 52);
makeSeries("Direct", 28);
makeSeries("Social", 12);
makeSeries("Email", 8);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
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
