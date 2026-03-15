---
title: "Progress Chart"
source: "https://www.amcharts.com/demos/progress-chart/"
category: "miscellaneous"
scraped: "2026-03-15"
---

In this demo we use a single-category CatergoryAxis with a ColumnSeries that uses floating columns as well as "template fields".
[Axis range docs](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/) [Template fields docs](https://www.amcharts.com/docs/v5/concepts/settings/template-fields/)

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
  layout: root.verticalLayout
}));


// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50
  })
);

var data = [{
  category: "",
  from: 0,
  to: 15,
  name: "Stage #1",
  columnSettings: {
    fill: am5.color(0x0ca948)
  }
}, {
  category: "",
  from: 15,
  to: 75,
  name: "Stage #2",
  columnSettings: {
    fill: am5.color(0x93da49)
  }
}, {
  category: "",
  from: 75,
  to: 90,
  name: "Stage #3",
  columnSettings: {
    fill: am5.color(0xffd100)
  }
}, {
  category: "",
  from: 90,
  to: 95,
  name: "Stage #4",
  columnSettings: {
    fill: am5.color(0xcd213b)
  }
}, {
  category: "",
  from: 95,
  to: 100,
  name: "Stage #5",
  columnSettings: {
    fill: am5.color(0x9e9e9e)
  }
}];


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererY.new(root, {})
}));
yAxis.data.setAll([{ category: "" }]);


var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  max: 100,
  numberFormat: "#'%'",
  renderer: am5xy.AxisRendererX.new(root, {})
}));

xAxis.get("renderer").labels.template.set("forceHidden", true);


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "to",
  openValueXField: "from",
  categoryYField: "category",
  categoryXField: "name"
}));

series.columns.template.setAll({
  strokeWidth: 0,
  strokeOpacity: 0,
  height: am5.percent(100),
  templateField: "columnSettings"
});

series.data.setAll(data);

// Create axis ranges for each column
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
for(var i = 0; i < data.length; i++) {
  var rangeDataItem = xAxis.makeDataItem({
    value: data[i].from
  });
  
  var range = xAxis.createAxisRange(rangeDataItem);
  
  rangeDataItem.get("grid").set("forceHidden", true);
  
  rangeDataItem.get("tick").setAll({
    visible: true,
    length: 18,
    strokeOpacity: 0.2
  });
  
  rangeDataItem.get("label").setAll({
    centerX: am5.p0,
    forceHidden: false,
    fontSize: 10,
    text: data[i].from + "%"
  });
}

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  nameField: "categoryX",
  centerX: am5.percent(50),
  x: am5.percent(50),
  clickTarget: "none"
}));

legend.markerRectangles.template.setAll({
  strokeOpacity: 0
});

legend.data.setAll(series.dataItems);


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
  height: 100px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
