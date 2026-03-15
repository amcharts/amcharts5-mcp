---
title: "Stacked Area"
source: "https://www.amcharts.com/demos/stacked-area/"
category: "line-area"
scraped: "2026-03-15"
---

Stacked Area Chart (also known as Stacked Area Plot) is a variation on a simple Area Chart with multiple areas stacked on top of each other. This allows comparing the evolution of the whole as well as contributions of individual parts over a period.
Stacked line series
Line series can easily be stacked by setting a single property: stacked. That's it - the chart will take care of the rest.
[More about stacking series](https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Stacked_series)
Vertical ranges and guides
Any axis can contain vertical bands or guide lines added, with an optional label, to indicate certain ranges or points in the chart.
[More about axis ranges and guides](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/)

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX",
  pinchZoomX: true,
  paddingLeft: 0
}));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none"
}));
cursor.lineY.set("visible", false);


// The data
var data = [{
  "year": "1994",
  "cars": 1587,
  "motorcycles": 650,
  "bicycles": 121
}, {
  "year": "1995",
  "cars": 1567,
  "motorcycles": 683,
  "bicycles": 146
}, {
  "year": "1996",
  "cars": 1617,
  "motorcycles": 691,
  "bicycles": 138
}, {
  "year": "1997",
  "cars": 1630,
  "motorcycles": 642,
  "bicycles": 127
}, {
  "year": "1998",
  "cars": 1660,
  "motorcycles": 699,
  "bicycles": 105
}, {
  "year": "1999",
  "cars": 1683,
  "motorcycles": 721,
  "bicycles": 109
}, {
  "year": "2000",
  "cars": 1691,
  "motorcycles": 737,
  "bicycles": 112
}, {
  "year": "2001",
  "cars": 1298,
  "motorcycles": 680,
  "bicycles": 101
}, {
  "year": "2002",
  "cars": 1275,
  "motorcycles": 664,
  "bicycles": 97
}, {
  "year": "2003",
  "cars": 1246,
  "motorcycles": 648,
  "bicycles": 93
}, {
  "year": "2004",
  "cars": 1318,
  "motorcycles": 697,
  "bicycles": 111
}, {
  "year": "2005",
  "cars": 1213,
  "motorcycles": 633,
  "bicycles": 87
}, {
  "year": "2006",
  "cars": 1199,
  "motorcycles": 621,
  "bicycles": 79
}, {
  "year": "2007",
  "cars": 1110,
  "motorcycles": 210,
  "bicycles": 81
}, {
  "year": "2008",
  "cars": 1165,
  "motorcycles": 232,
  "bicycles": 75
}, {
  "year": "2009",
  "cars": 1145,
  "motorcycles": 219,
  "bicycles": 88
}, {
  "year": "2010",
  "cars": 1163,
  "motorcycles": 201,
  "bicycles": 82
}, {
  "year": "2011",
  "cars": 1180,
  "motorcycles": 285,
  "bicycles": 87
}, {
  "year": "2012",
  "cars": 1159,
  "motorcycles": 277,
  "bicycles": 71
}];


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "year",
  startLocation: 0.5,
  endLocation: 0.5,
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true,
    minGridDistance: 70
  }),
  tooltip: am5.Tooltip.new(root, {})
}));

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom"
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

function createSeries(name, field) {
  var series = chart.series.push(am5xy.LineSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    stacked: true,
    valueYField: field,
    categoryXField: "year",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "[bold]{name}[/]
{categoryX}: {valueY}"
    })
  }));

  series.fills.template.setAll({
    fillOpacity: 0.5,
    visible: true
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
  orientation: "horizontal"
}));

// Create axis ranges
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
var rangeDataItem = xAxis.makeDataItem({
  category: "2001",
  endCategory: "2003"
});

var range = xAxis.createAxisRange(rangeDataItem);

rangeDataItem.get("grid").setAll({
  stroke: am5.color(0x00ff33),
  strokeOpacity: 0.5,
  strokeDasharray: [3]
});

rangeDataItem.get("axisFill").setAll({
  fill: am5.color(0x00ff33),
  fillOpacity: 0.1,
  visible: true
});

rangeDataItem.get("label").setAll({
  inside: true,
  text: "Fines for speeding increased",
  rotation: 90,
  centerX: am5.p100,
  centerY: am5.p100,
  location: 0,
  paddingBottom: 10,
  paddingRight: 15
});


var rangeDataItem2 = xAxis.makeDataItem({
  category: "2007"
});

var range2 = xAxis.createAxisRange(rangeDataItem2);

rangeDataItem2.get("grid").setAll({
  stroke: am5.color(0x00ff33),
  strokeOpacity: 1,
  strokeDasharray: [3]
});

rangeDataItem2.get("axisFill").setAll({
  fill: am5.color(0x00ff33),
  fillOpacity: 0.1,
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
