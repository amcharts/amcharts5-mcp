---
title: "Stacked Area"
source: "https://www.amcharts.com/demos/stacked-area/"
category: "line-area"
scraped: "2026-10-08"
---

Cars, motorcycles and bicycles from 2007 to 2025 as three stacked areas, so the top edge is the total. Shaded bands mark two events at the biggest drops.

When to stack areas: A stacked area shows a total and what it is made of, over time. The top edge tracks the total and each band one part, so a fall in the whole shows which part caused it. Notes on the time axis, like the shaded bands here, explain the turns.

Good for:
- Totals with a few parts, like sales by region
- Showing which part drove a change
- Telling a story with notes on the timeline

Think twice when:
- Comparing the upper bands: they have no flat base, so use lines
- Many thin parts: group the small ones
- Shares rather than amounts: use a 100% stacked area

Prompt: Create a stacked area chart of yearly values for cars, motorcycles and bicycles from 2007 to 2025, with two events marked as shaded bands with vertical labels: higher fines for speeding and a new motorcycle fee. Add tooltips, a cursor, a legend and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
  // a drag zooms (the cursor's behavior), so the chart itself doesn't pan
  panX: false,
  panY: false,
  wheelX: "panX",             // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",            // ...and the vertical wheel zooms in on the years
  pinchZoomX: true,           // pinch to zoom the years on a touch screen
  paddingLeft: 0,             // no gap at the chart's left edge
  layout: root.verticalLayout // the legend goes below the plot
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // drag across the plot to zoom in on those years
  behavior: "zoomX"
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
  // the axis starts and ends in the middle of the first and last year, so no half cells stay empty
  startLocation: 0.5,
  endLocation: 0.5,
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // fainter grid lines between the labeled years
    minGridDistance: 70     // at least 70px between the labels
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's year on the axis
}));

xAxis.data.setAll(data);

// The stack starts at zero, so each band's height shows its true size
var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom" // drag along the axis to zoom it
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

// adds one stacked area for a field of the data
function createSeries(name, field) {
  var series = chart.series.push(am5xy.LineSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    stacked: true, // the main trick: each area sits on top of the ones before it
    valueYField: field,
    categoryXField: "year",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",                   // the tooltip points sideways at the area
      labelText: "[bold]{name}[/]\n{categoryX}: {valueY}" // the area's name, then the year and its value
    })
  }));

  series.fills.template.setAll({
    fillOpacity: 0.5, // half see-through...
    visible: true     // ...and turned on: line series have no fill by default
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
  orientation: "horizontal" // above the plot; zooms the years
}));

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50, // centered...
  x: am5.p50        // ...under the chart
}));

legend.data.setAll(chart.series.values);

// Create axis ranges
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
// in the theme's text color, so they show in every theme and in dark mode
var rangeColor = root.interfaceColors.get("alternativeBackground");

var rangeDataItem = xAxis.makeDataItem({
  category: "2014",   // a range from 2014...
  endCategory: "2016" // ...through 2016
});

var range = xAxis.createAxisRange(rangeDataItem);

rangeDataItem.get("grid").setAll({
  stroke: rangeColor,  // a grid line at the range's start...
  strokeOpacity: 0.5,  // ...half see-through...
  strokeDasharray: [3] // ...and dashed
});

rangeDataItem.get("axisFill").setAll({
  fill: rangeColor,  // a faint band over the range...
  fillOpacity: 0.08,
  visible: true      // ...shown: axis fills are hidden by default
});

// a vertical label inside the plot, at the start of the range
rangeDataItem.get("label").setAll({
  inside: true,
  text: "Fines for speeding increased",
  rotation: 90, // turned to read from top to bottom
  centerX: am5.p100,
  centerY: am5.p100,
  location: 0,
  paddingBottom: 10,
  paddingRight: 15
});

var rangeDataItem2 = xAxis.makeDataItem({
  category: "2020" // a single year
});

var range2 = xAxis.createAxisRange(rangeDataItem2);

rangeDataItem2.get("grid").setAll({
  stroke: rangeColor,
  strokeOpacity: 1, // a fully opaque dashed line
  strokeDasharray: [3]
});

rangeDataItem2.get("axisFill").setAll({
  fill: rangeColor, // the same faint band
  fillOpacity: 0.08,
  visible: true
});

rangeDataItem2.get("label").setAll({
  inside: true,
  text: "Motorcycle fee introduced",
  rotation: 90,
  centerX: am5.p100,
  centerY: am5.p100,
  location: 0,
  paddingBottom: 10,
  paddingRight: 15
});

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
