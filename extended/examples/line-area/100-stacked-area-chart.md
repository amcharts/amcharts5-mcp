---
title: "100% Stacked Area Chart"
source: "https://www.amcharts.com/demos/100-stacked-area-chart/"
category: "line-area"
scraped: "2026-10-08"
---

Every year adds up to 100%, so the chart shows shares instead of amounts: how a total splits between cars, motorcycles and bicycles from 2007 to 2025.

When a 100% stacked area works: When totals change a lot, a plain stacked area hides how the mix shifts. Scaling every year to 100% takes the total out and leaves only the shares, so a change in the mix is plain to see: here, motorcycles losing more than half their share in 2020.

Good for:
- Market share over the years
- How a budget or a day is split, year by year
- Mix changes while the total also moves

Think twice when:
- When the totals matter: use a stacked area
- Very small parts: thin bands are hard to read
- Comparing the middle bands: lines show them better

Prompt: Create a 100% stacked area chart of yearly values for cars, motorcycles and bicycles from 2007 to 2025, showing each as its share of the year’s total, with tooltips that show both the share and the actual value. Add a legend, a cursor and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,                  // drag the plot sideways to pan
  panY: true,                  // ...or up and down
  wheelX: "panX",              // a horizontal wheel or trackpad swipe pans
  wheelY: "zoomX",             // the vertical wheel zooms in on the years
  layout: root.verticalLayout, // the plot on top, the legend under it
  pinchZoomX:true              // pinch to zoom on touch screens
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none" // dragging pans the plot instead of selecting a range
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// The data
var data = [{
  "year": "2007",
  "cars": 1587,
  "motorcycles": 650,
  "bicycles": 121
}, {
  "year": "2008",
  "cars": 1567,
  "motorcycles": 683,
  "bicycles": 146
}, {
  "year": "2009",
  "cars": 1617,
  "motorcycles": 691,
  "bicycles": 138
}, {
  "year": "2010",
  "cars": 1630,
  "motorcycles": 642,
  "bicycles": 127
}, {
  "year": "2011",
  "cars": 1660,
  "motorcycles": 699,
  "bicycles": 105
}, {
  "year": "2012",
  "cars": 1683,
  "motorcycles": 721,
  "bicycles": 109
}, {
  "year": "2013",
  "cars": 1691,
  "motorcycles": 737,
  "bicycles": 112
}, {
  "year": "2014",
  "cars": 1298,
  "motorcycles": 680,
  "bicycles": 101
}, {
  "year": "2015",
  "cars": 1275,
  "motorcycles": 664,
  "bicycles": 97
}, {
  "year": "2016",
  "cars": 1246,
  "motorcycles": 648,
  "bicycles": 93
}, {
  "year": "2017",
  "cars": 1318,
  "motorcycles": 697,
  "bicycles": 111
}, {
  "year": "2018",
  "cars": 1213,
  "motorcycles": 633,
  "bicycles": 87
}, {
  "year": "2019",
  "cars": 1199,
  "motorcycles": 621,
  "bicycles": 79
}, {
  "year": "2020",
  "cars": 1110,
  "motorcycles": 210,
  "bicycles": 81
}, {
  "year": "2021",
  "cars": 1165,
  "motorcycles": 232,
  "bicycles": 75
}, {
  "year": "2022",
  "cars": 1145,
  "motorcycles": 219,
  "bicycles": 88
}, {
  "year": "2023",
  "cars": 1163,
  "motorcycles": 201,
  "bicycles": 82
}, {
  "year": "2024",
  "cars": 1180,
  "motorcycles": 285,
  "bicycles": 87
}, {
  "year": "2025",
  "cars": 1159,
  "motorcycles": 277,
  "bicycles": 71
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "year",
  // start and end the axis in the middle of the first and last year, so the areas reach the edges
  startLocation: 0.5,
  endLocation: 0.5,
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // a grid line for every year, even one whose label is skipped
    minGridDistance: 80     // at least 80px between labels; on narrow screens some are skipped
  }),
  tooltip: am5.Tooltip.new(root, {}) // the cursor shows the year on the axis
}));

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,   // the axis runs from 0%...
  max: 100, // ...to 100%
  // sums each year's values, which the series need for valueYTotalPercent
  calculateTotals: true,
  numberFormat: "#'%'", // whole numbers with a % sign
  renderer: am5xy.AxisRendererY.new(root, {
    pan:"zoom" // drag along the axis labels to zoom the values
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function createSeries(name, field) {
  var series = chart.series.push(am5xy.LineSeries.new(root, {
    name: name,
    stacked: true, // each area sits on top of the one before it
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: field,
    categoryXField: "year",
    // plot each value as its share of the year's total, so the stack always adds up to 100%
    valueYShow: "valueYTotalPercent",
    legendValueText: "{valueY}", // the legend shows the hovered year's value
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal", // the tooltip points sideways at the line
      // name in bold, then the year, its share and the value
      labelText: "[bold]{name}[/]\n{categoryX}: {valueYTotalPercent.formatNumber('#.0')}% ({valueY})"
    })
  }));

  series.fills.template.setAll({
    fillOpacity: 0.5, // half-transparent fills
    visible: true     // line series don't fill by default; this turns it on
  });

  series.data.setAll(data);
  series.appear(1000);
}

createSeries("Cars", "cars");
createSeries("Motorcycles", "motorcycles");
createSeries("Bicycles", "bicycles");

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // drag its grips to zoom in on a range of years
}));

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50, // the legend's middle...
  x: am5.p50        // ...at the middle of the chart
}));

legend.data.setAll(chart.series.values);

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
