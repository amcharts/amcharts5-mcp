---
title: "Pareto Diagram"
source: "https://www.amcharts.com/demos/pareto-diagram/"
category: "column-bar"
scraped: "2026-03-15"
---

A Pareto chart or Pareto diagram, is a type of chart that contains both column and a line series, where individual values are represented in descending order by columns, and the cumulative total is represented by the line.
XY chart
Line series
Column series
Bullets

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
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  paddingLeft: 0,
  paddingRight: 0,
  layout: root.verticalLayout
}));

var colors = chart.get("colors");

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
  country: "South Korea",
  visits: 93
}, {
  country: "Canada",
  visits: 41
}];

prepareParetoData();

function prepareParetoData() {
  var total = 0;

  for (var i = 0; i < data.length; i++) {
    var value = data[i].visits;
    total += value;
  }

  var sum = 0;
  for (var i = 0; i < data.length; i++) {
    var value = data[i].visits;
    sum += value;
    data[i].pareto = sum / total * 100;
  }
}



// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 85,
  minorGridEnabled: true
})

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "country",
  renderer: xRenderer
}));

xRenderer.grid.template.setAll({
  location: 1
})

xRenderer.labels.template.setAll({
  paddingTop: 20
});

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1
  })
}));

var paretoAxisRenderer = am5xy.AxisRendererY.new(root, { opposite: true });
var paretoAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: paretoAxisRenderer,
  min: 0,
  max: 100,
  strictMinMax: true
}));

paretoAxisRenderer.grid.template.set("forceHidden", true);
paretoAxis.set("numberFormat", "#'%");


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "visits",
  categoryXField: "country"
}));

series.columns.template.setAll({
  tooltipText: "{categoryX}: {valueY}",
  tooltipY: 0,
  strokeOpacity: 0,
  cornerRadiusTL: 6,
  cornerRadiusTR: 6
});

series.columns.template.adapters.add("fill", function (fill, target) {
  return chart.get("colors").getIndex(series.dataItems.indexOf(target.dataItem));
})


// pareto series
var paretoSeries = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: paretoAxis,
  valueYField: "pareto",
  categoryXField: "country",
  stroke: root.interfaceColors.get("alternativeBackground"),
  maskBullets: false
}));

paretoSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 1,
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill"),
      stroke: root.interfaceColors.get("alternativeBackground")
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
