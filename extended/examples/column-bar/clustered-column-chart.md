---
title: "Clustered Column Chart"
source: "https://www.amcharts.com/demos/clustered-column-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

A clustered column chart puts the series side by side in each category, so you compare them group by group. Here, six regions over three years, each column labeled with its value.

When to cluster columns: Clustering keeps every column on the same baseline, so each value can be read and compared exactly: across regions within a year, or for one region across years. It gets crowded fast: with six series and three years, this chart is near the limit.

Good for:
- A few series across a few categories
- Comparing exact values side by side
- Plan against actual, this year against last

Think twice when:
- Totals per year: stack the columns instead
- More than six series or ten groups: the clusters blur together
- A trend over many years: draw one line per series

Prompt: Create a clustered column chart comparing six regions over three years, with each year’s columns side by side in a group and a value label on every column. Add tooltips and a legend. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,                // the plot doesn't pan when dragged
  panY: false,
  paddingLeft: 0,             // the value labels sit at the chart's left edge
  wheelX: "panX",             // a horizontal wheel or trackpad swipe pans the years
  wheelY: "zoomX",            // the vertical wheel zooms in on them
  layout: root.verticalLayout // the plot on top, the legend under it
}));

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50, // the legend's middle...
    x: am5.p50        // ...at the middle of the chart
  })
);

// no cursor, so no values for the legend: without the empty value labels its items stay compact
legend.valueLabels.template.set("forceHidden", true);

var data = [{
  "year": "2023",
  "europe": 2.5,
  "namerica": 2.5,
  "asia": 2.1,
  "lamerica": 1,
  "meast": 0.8,
  "africa": 0.4
}, {
  "year": "2024",
  "europe": 2.6,
  "namerica": 2.7,
  "asia": 2.2,
  "lamerica": 0.5,
  "meast": 0.4,
  "africa": 0.3
}, {
  "year": "2025",
  "europe": 2.8,
  "namerica": 2.9,
  "asia": 2.4,
  "lamerica": 0.3,
  "meast": 0.9,
  "africa": 0.5
}]

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  // the gap between year groups: each group takes the middle 80% of its category
  cellStartLocation: 0.1,
  cellEndLocation: 0.9,
  minorGridEnabled: true // a grid line for every year, even one whose label is skipped
})

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "year",
  renderer: xRenderer
}));

xRenderer.grid.template.setAll({
  // draw each grid line at the end of its year's cell instead of at its start
  location: 1
})

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1 // a faint axis line
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// Where the value labels sit on the columns: 0 at the bottom, 0.5 in the middle, 1 at the top
var labelLocation = 1;

// All value labels share one template, so a change to it reaches every label at once
var labelTemplate = am5.Template.new({
  text: "{valueY}", // the column's value
  // above the column, in the color of text on the background
  fill: root.interfaceColors.get("alternativeBackground"),
  centerY: am5.p100, // the label's bottom on the bullet point...
  centerX: am5.p50,  // ...centered over the column
  populateText: true // fill in {valueY} from the data item
});

function makeSeries(name, fieldName) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: fieldName,
    categoryXField: "year",
    // labels moved to the top of a column may stand above the plot, so they are not cut off at its edge
    maskBullets: false
  }));

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}: {valueY}", // region, year and value
    width: am5.percent(90), // each column takes 90% of its slot, leaving thin gaps
    tooltipY: 0, // the tooltip points at the top of the column
    strokeOpacity: 0 // no outline
  });

  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationY: labelLocation,                      // where on the column, from labelLocation above
      sprite: am5.Label.new(root, {}, labelTemplate) // the shared settings
    });
  });

  legend.data.push(series);
}

makeSeries("Europe", "europe");
makeSeries("North America", "namerica");
makeSeries("Asia", "asia");
makeSeries("Latin America", "lamerica");
makeSeries("Middle East", "meast");
makeSeries("Africa", "africa");

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
