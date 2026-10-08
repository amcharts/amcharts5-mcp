---
title: "Stacked Bar Chart"
source: "https://www.amcharts.com/demos/stacked-bar-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

A stacked chart on its side: each bar is a year’s total, split into six regions and labeled segment by segment. Bars leave room for long names and long lists.

When to stack bars: Stacked bars do what stacked columns do, with the categories down the side: easier for long names and long lists, and natural for rankings read from top to bottom. As in any stack, the totals and the first segments compare easily, the segments further along less so.

Good for:
- Long category names, like products or survey questions
- Rankings with a breakdown
- Survey answers per question

Think twice when:
- Years or months: time reads more naturally left to right, as columns
- Shares rather than amounts: stack to 100%
- Comparing one middle segment across bars: cluster the bars

Prompt: Create a horizontal stacked bar chart of six regions’ values over three years, with the years down the side, each segment labeled with its value, and tooltips and a legend. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

var myTheme = am5.Theme.new(root);

// the grid line at zero, normally darker, as faint as the others
myTheme.rule("Grid", ["base"]).setAll({
  strokeOpacity: 0.1
});

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  myTheme,
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,                // no panning
  panY: false,
  paddingLeft: 0,             // no gap at the chart's left edge
  layout: root.verticalLayout // the legend goes below the plot
}));

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
var yRenderer = am5xy.AxisRendererY.new(root, {});
var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "year",
  renderer: yRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

yRenderer.grid.template.setAll({
  location: 1 // grid lines between the years, not through the middle of each
})

yAxis.data.setAll(data);

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: 0, // the bars start at zero
  // whole numbers only in the axis labels
  maxPrecision: 0,
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 40, // at least 40px between the labels
    strokeOpacity: 0.1   // a faint axis line
  })
}));

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50, // centered...
  x: am5.p50        // ...under the chart
}));

// no cursor, so no values for the legend: without the empty value labels its items stay compact
legend.valueLabels.template.set("forceHidden", true);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// adds the bars of one region, stacked on the regions added before
function makeSeries(name, fieldName) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    stacked: true, // the main trick: each bar starts where the one before it ends
    xAxis: xAxis,
    yAxis: yAxis,
    // the bars grow sideways from the year axis, and stack along X
    baseAxis: yAxis,
    valueXField: fieldName,
    categoryYField: "year"
  }));

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryY}: {valueX}", // hover a bar for its region, year and value
    tooltipY: am5.percent(90) // the tooltip points near the bar's bottom edge, not its middle
  });
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();

  // the value in the middle of each bar
  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text: "{valueX}",
        fill: root.interfaceColors.get("alternativeText"), // the theme's text color for use on colored fills
        centerY: am5.p50,  // centered on the bar...
        centerX: am5.p50,  // ...both ways
        populateText: true // fill in {valueX} from the data
      })
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
