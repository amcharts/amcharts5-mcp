---
title: "Grouped Stacks"
source: "https://www.amcharts.com/demos/grouped-stacks/"
category: "column-bar"
scraped: "2026-03-15"
---

This demo uses multiple stacked series to create virtual groups.
While the categories are all unique in data, the axis label adapters are used to modify them to be the same sets.
Finally, empty categories in data are used to create a gap between virtual groups.
Related docs:
XY Chart
Column Series
Category Axis
Adapters

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
  category: ""
}, {
  category: "g1-2021",
  s10: 20,
  s11: 12
}, {
  category: "g1-2022",
  s10: 15,
  s11: 8
}, {
  category: "g1-2023",
  s10: 12,
  s11: 16
}, {
  category: "g1-2024",
  s10: 9,
  s11: 12
}, {
  category: ""
}, {
  category: "g2-2021",
  s20: 15,
  s21: 16
}, {
  category: "g2-2022",
  s20: 20,
  s21: 6
}, {
  category: "g2-2023",
  s20: 14,
  s21: 11
}, {
  category: "g2-2024",
  s20: 19,
  s21: 12
}, {
  category: ""
}, {
  category: "g3-2021",
  s30: 5,
  s31: 10
}, {
  category: "g3-2022",
  s30: 7,
  s31: 12
}, {
  category: "g3-2023",
  s30: 15,
  s31: 10
}, {
  category: "g3-2024",
  s30: 13,
  s31: 14
}];


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererX.new(root, {
    cellStartLocation: 0.1,
    cellEndLocation: 0.9,
    minGridDistance: 10
  }),
  tooltip: am5.Tooltip.new(root, {})
}));

xAxis.get("renderer").labels.template.adapters.add("text", function(text, target) {
  if (target.dataItem) {
    return target.dataItem.get("category").split("-")[1];
  }
  return text;
});

xAxis.get("renderer").grid.template.set("forceHidden", true);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function makeSeries(name, fieldName, color) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    stacked: true,
    valueYField: fieldName,
    categoryXField: "category",
    stroke: color,
    fill: color
  }));

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}:{valueY}",
    width: am5.percent(90),
    tooltipY: 0
  });

  series.data.setAll(data);
  series.appear();
  legend.data.push(series);
}

makeSeries("Series #1", "s10", am5.color(0x133F3D));
makeSeries("Series #2", "s11", am5.color(0x216E6A));

makeSeries("Series #3", "s20", am5.color(0x20320C));
makeSeries("Series #4", "s21", am5.color(0x4A731C));

makeSeries("Series #5", "s30", am5.color(0x3A1603));
makeSeries("Series #6", "s31", am5.color(0x883407));

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
