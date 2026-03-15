---
title: "Layered Column Chart"
source: "https://www.amcharts.com/demos/layered-column-chart/"
category: "column-bar"
scraped: "2026-03-15"
---

In some scenarios, showing multiple column series side-by-side (clustered) is the best and most "standard" way to display multiple column series. However, when each series has equal and fairly limited number of items, layering series on top of each other presents a much more impactful visualization.
To achieve that with amCharts 5, you just disable clustering on each series and then make columns in one of them wider (or narrower) than the other.
XY chart
Column series
List templates

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
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  paddingLeft: 0,
  layout: root.verticalLayout
}));

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

var data = [{
  "country": "USA",
  "year2004": 3.5,
  "year2005": 4.2
}, {
  "country": "UK",
  "year2004": 1.7,
  "year2005": 3.1
}, {
  "country": "Canada",
  "year2004": 2.8,
  "year2005": 2.9
}, {
  "country": "Japan",
  "year2004": 2.6,
  "year2005": 2.3
}, {
  "country": "France",
  "year2004": 1.4,
  "year2005": 2.1
}, {
  "country": "Brazil",
  "year2004": 2.6,
  "year2005": 4.9
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 70,
  minorGridEnabled: true
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "country",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {
    themeTags: ["axis"],
    animationDuration: 200
  })
}));

xRenderer.grid.template.setAll({
  location: 1
})

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  renderer: am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

var series0 = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Income",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "year2004",
  categoryXField: "country",
  clustered: false,
  tooltip: am5.Tooltip.new(root, {
    labelText: "2004: {valueY}"
  })
}));

series0.columns.template.setAll({
  width: am5.percent(80),
  tooltipY: 0,
  strokeOpacity: 0
});


series0.data.setAll(data);


var series1 = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Income",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "year2005",
  categoryXField: "country",
  clustered: false,
  tooltip: am5.Tooltip.new(root, {
    labelText: "2005: {valueY}"
  })
}));

series1.columns.template.setAll({
  width: am5.percent(50),
  tooltipY: 0,
  strokeOpacity: 0
});

series1.data.setAll(data);

var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);
series0.appear();
series1.appear();
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
