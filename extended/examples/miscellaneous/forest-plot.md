---
title: "Forest Plot"
source: "https://www.amcharts.com/demos/forest-plot/"
category: "miscellaneous"
scraped: "2026-03-15"
---

This demo shows a basic Forest Plot chart.
This relatively simple demo utilizes a bunch of amCharts 5 concepts: template fields, heat rules, axis ranges, and adapters.
 	Axis ranges (used to display vertical comparison guide)
 	Heat rules (used to size bullets based on their value)
 	Adapters (used to dynamically update content of axis labels)
 	Template fields (used to override bullet settings via data)

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


// Data
var data = [{
  category: "Smith et al. 1991",
  measure: 1.3,
  bulletSize: 25,
  high: 3.4,
  low: 1.0
}, {
  category: "Jones et al. 1993",
  measure: 2.1,
  bulletSize: 15,
  high: 2.6,
  low: 0.5
}, {
  category: "Smith et al. 1999",
  measure: 1.8,
  bulletSize: 10,
  high: 3.2,
  low: 0.9
}, {
  category: "Ng et al. 2004",
  measure: 2.3,
  bulletSize: 30,
  high: 2.7,
  low: 1.9
}, {
  category: "Chu et al. 2009",
  measure: 2.1,
  bulletSize: 35,
  high: 2.5,
  low: 1.8
}, {
  category: "Summary measure",
  measure: 2.2,
  bulletSize: 55,
  high: 2.4,
  low: 1.9,
  bulletSettings: {
    rotation: 45,
    fill: am5.color(0xffffff)
  },
  textSettings: {
    text: "{valueX}"
  }
}];


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
  inversed: true,
  minorGridEnabled: true
});
var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: yRenderer
}));

yAxis.data.setAll(data);

var yRenderer2 = am5xy.AxisRendererY.new(root, {
  opposite: true,
  inversed: true
})
var yAxis2 = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: yRenderer2
}));

yRenderer2.grid.template.setAll({
  forceHidden: true
})

yRenderer2.labels.template.setAll({
  populateText: true
})
yRenderer2.labels.template.adapters.add("text", function(text, target) {
  return "[bold]{measure}[/] ({low}-{high})";
})
yAxis2.data.setAll(data);

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, {
    strokeOpacity: 0.1
  })
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

// Column/line series
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "high",
  openValueXField: "low",
  categoryYField: "category"
}));

series.columns.template.setAll({
  height: 1,
  strokeWidth: 1
});

series.data.setAll(data);


// Series for bullets
var series2 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "measure",
  categoryYField: "category",
  valueField: "bulletSize",
  calculateAggregates: true,
  fill: series.get("fill"),
  tooltip: am5.Tooltip.new(root, {
    labelText: "[bold]{valueX}[/] ({low}-{high})"
  })
}));

series2.strokes.template.setAll({
  forceHidden: true
});

var rectangleTemplate = am5.Template.new({
  stroke: series.get("fill"),
  fill: series.get("fill"),
  centerY: am5.p50,
  centerX: am5.p50,
  strokeWidth: 2,
  templateField: "bulletSettings"
});

series2.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Rectangle.new(root, {}, rectangleTemplate)
  });
});

series2.set("heatRules", [{
  target: rectangleTemplate,
  key: "width",
  min: 10,
  max: 40,
  dataField: "value"
}, {
  target: rectangleTemplate,
  key: "height",
  min: 10,
  max: 40,
  dataField: "value"
}]);

series2.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      centerX: am5.p50,
      centerY: am5.p50,
      templateField: "textSettings",
      populateText: true
    })
  });
});

series2.data.setAll(data);

// Create a summary line
var rangeDataItem = xAxis.makeDataItem({
  value: 2.2
});

var range = xAxis.createAxisRange(rangeDataItem);

rangeDataItem.get("grid").setAll({
  stroke: am5.color(0x000000),
  strokeOpacity: 0.3,
  strokeDasharray: [3, 3]
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis
}));
cursor.lineY.set("visible", false);
cursor.lineX.set("visible", false);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear();
series2.appear();
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
