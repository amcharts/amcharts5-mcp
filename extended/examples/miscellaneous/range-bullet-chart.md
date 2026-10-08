---
title: "Range Bullet Chart"
source: "https://www.amcharts.com/demos/range-bullet-chart/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A range bullet chart shows the spread of a score as a bar from its lowest to its highest value, with a marker for the average. Here, the scores two options got: a circle at each end and a triangle at the average.

When a range bullet chart works: A range with an average marker shows how far the answers spread and where their average sits, which a single average hides. With a few rows, it compares options at a glance: a short bar means people agree, a long one that they don’t.

Good for:
- Survey scores: lowest, highest and average
- Price or salary ranges
- A handful of options side by side

Think twice when:
- How the values spread inside the range: a box plot or a violin
- Many rows: a dumbbell plot is lighter
- A target to compare against: a bullet chart

Prompt: Create a range bullet chart of the scores of two options, Reduce Expenses and Increase Expenses: each a bar from the lowest to the highest score with a circle at each end and a triangle marking the average, with a legend above the chart. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,                // no dragging...
  panY: false,
  wheelX: "none",             // ...and no wheel zoom: the page scrolls past the chart
  wheelY: "none",
  layout: root.verticalLayout // the legend above, the plot under it
}));

var data = [{
  category: "Reduce Expenses",
  open: 0.05,
  close: 2.8,
  average: 1.6
}, {
  category: "Increase Expenses",
  open: 0.4,
  close: 3,
  average: 1.6
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererY.new(root, {
    cellStartLocation: 0.1, // each row's bar and circles use the middle 80%...
    cellEndLocation: 0.9    // ...of its height
  }),
  tooltip: am5.Tooltip.new(root, {})
}));

yAxis.data.setAll(data);

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 40 // at least 40px between the value labels
  })
}));

xAxis.get("renderer").grid.template.set("visible", false); // no vertical grid lines

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  openValueXField: "open", // the bar runs from open...
  valueXField: "close",    // ...to close, floating instead of starting at zero
  categoryYField: "category",
  fill: root.interfaceColors.get("alternativeBackground") // the theme's contrast color...
}));

series.columns.template.setAll({
  fillOpacity: 0.3, // ...faint, so the circles stand out
  height: 5         // a thin 5px bar between the two circles
});

series.data.setAll(data);

// Add bullets: a circle at each end of the range
// https://www.amcharts.com/docs/v5/concepts/common-elements/bullets/
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationX: 0, // at the bar's start, the open value
    sprite: am5.Circle.new(root, {
      fill: chart.get("colors").getIndex(0), // the first theme color
      radius: 10, // 10px circles
      tooltipText: "{categoryY}\nMinimum: {openValueX}"
    })
  });
});

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationX: 1, // at the bar's end, the close value
    sprite: am5.Circle.new(root, {
      fill: chart.get("colors").getIndex(0), // the first theme color
      radius: 10, // 10px circles
      tooltipText: "{categoryY}\nMaximum: {valueX}"
    })
  });
});

var series2 = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Average Score",
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "average",
  categoryYField: "category"
}));

// no line, only the average triangles
series2.strokes.template.setAll({
  visible: false
});

series2.data.setAll(data);

// Add bullets: a triangle pointing down at the average
series2.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Triangle.new(root, {
      fill: chart.get("colors").getIndex(2), // the third theme color
      rotation: 180, // upside down, so it points down
      width: 24,     // a 24px triangle
      height: 24,
      tooltipText: "{categoryY}\nAverage: {valueX}"
    })
  });
});

// A series with no values of its own: it only gives the circles their legend item
var series3 = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Minimum Score / Maximum Score",
  xAxis: xAxis,
  yAxis: yAxis
}));

series3.strokes.template.setAll({
  visible: false // no line
});

series3.data.setAll(data);

// Add bullets
series3.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationX: 0,
    sprite: am5.Circle.new(root, {
      fill: chart.get("colors").getIndex(0), // the same circle as on the bars, for the legend marker
      radius: 10
    })
  });
});

// Add legend above the chart
var legend = chart.children.unshift(am5.Legend.new(root, {
  layout: root.horizontalLayout, // legend items in a row
  centerX: am5.p50,              // the legend's middle...
  x: am5.p50,                    // ...at the middle of the chart
  marginBottom: 15,              // 15px of space under the legend
  clickTarget: "none"            // clicking a legend item does nothing
}));

// no cursor, so no values for the legend: without the empty value labels its items stay compact
legend.valueLabels.template.set("forceHidden", true);

legend.data.setAll([series3, series2]);

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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
