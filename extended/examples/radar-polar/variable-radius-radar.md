---
title: "Variable-Radius Radar"
source: "https://www.amcharts.com/demos/variable-radius-radar/"
category: "radar-polar"
scraped: "2026-10-08"
---

One chart, three shapes: the Arc slider bends stacked columns from a flat bar chart into a half circle or a full ring. Here, a shop’s sales of six products, by quarter.

One chart, many shapes: A radar chart is an XY chart bent around a circle, and its start and end angles decide how far it bends. Here one slider sets both, so the same stacked columns turn from a bar chart into a fan and then a ring. A half circle often fits a wide dashboard slot better than a full ring.

Good for:
- Fitting a chart into wide or square spaces
- Showing that radial and straight charts hold the same data
- Gauge-like half circles on dashboards

Think twice when:
- Exact comparisons: keep the bars straight
- Long category names on a tight arc
- A printed report: pick one shape and drop the slider

Prompt: Create a half-circle radar chart of stacked columns, open at the bottom, showing a shop’s quarterly sales of six products (sample data), with one stacked series per quarter and a legend of the quarters. Use the amCharts 5 library with its Responsive theme.

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

// Data: a shop's sales of six products, in thousands of units, by quarter (sample data)
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data
var data = [
  { product: "Phones", q1: 65, q2: 58, q3: 62, q4: 88 },
  { product: "Laptops", q1: 42, q2: 38, q3: 45, q4: 61 },
  { product: "Tablets", q1: 28, q2: 24, q3: 30, q4: 41 },
  { product: "Monitors", q1: 22, q2: 20, q3: 23, q4: 27 },
  { product: "Cameras", q1: 9, q2: 12, q3: 14, q4: 17 },
  { product: "Printers", q1: 12, q2: 11, q3: 10, q4: 14 }
];

// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    panX: false, // dragging doesn't pan the chart
    panY: false,
    wheelX: "panX",       // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX",      // ...and the vertical wheel zooms in on some of the products
    innerRadius: am5.p50, // the columns start halfway out from the center
    // a half circle, open at the bottom
    startAngle: 180,
    endAngle: 360,
    layout: root.verticalLayout // the legend goes under the chart
  })
);

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
var xRenderer = am5radar.AxisRendererCircular.new(root, {});
// product names stay horizontal instead of curving along the arc
xRenderer.labels.template.setAll({
  textType:"adjusted"
});

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0, // no panning past the first or last product
    categoryField: "product",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5radar.AxisRendererRadial.new(root, {
      // the value axis runs along the start of the arc
      axisAngle: 180
    })
  })
);

// Create series: one per quarter, stacked into a year
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
function createSeries(name, field) {
  var series = chart.series.push(
    am5radar.RadarColumnSeries.new(root, {
      stacked: true, // each quarter sits on top of the one before
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      categoryXField: "product"
    })
  );

  series.columns.template.setAll({
    tooltipText: "{categoryX}, {name}: {valueY}k sold"
  });

  series.data.setAll(data);
  series.appear(1000);
}

createSeries("Q1", "q1");
createSeries("Q2", "q2");
createSeries("Q3", "q3");
createSeries("Q4", "q4");

// Add legend: the quarters; click one to leave it out
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50, // centered under the chart
  x: am5.p50,
  marginTop: 10 // 10px of room above
}));
legend.data.setAll(chart.series.values);

xAxis.data.setAll(data);

// Animate chart
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
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
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
