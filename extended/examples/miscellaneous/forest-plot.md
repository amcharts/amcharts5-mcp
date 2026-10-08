---
title: "Forest Plot"
source: "https://www.amcharts.com/demos/forest-plot/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A forest plot sums up the studies on one question: each row shows a study’s result as a square, sized by how much it counts, with a line for its range of uncertainty. The diamond at the bottom is all the studies combined.

When a forest plot works: A forest plot is how meta-analyses show their evidence: each study’s estimate and interval in its own row, the weight of each by the size of its square, and the pooled result as a diamond. Readers see at once whether the studies agree and which ones carry the result.

Good for:
- Meta-analyses and systematic reviews
- Comparing estimates with their intervals
- Subgroup results from one study

Think twice when:
- Ratios drawn on a linear scale: a log scale is fairer
- Dozens of studies: group them or split the plot
- Readers outside research: explain the squares and the diamond

Prompt: Create a forest plot for a meta-analysis of five studies and their summary: each study’s interval as a line with a square sized by its weight, the summary as a diamond with a dashed line through its value, and each estimate with its interval listed on the right. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,     // no dragging the plot
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the values
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
  // The summary is a hollow diamond: a square turned 45 degrees, filled with the background color
  bulletSettings: {
    rotation: 45,
    fill: root.interfaceColors.get("background")
  },
  textSettings: {
    text: "{valueX}"
  }
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
  inversed: true,        // the first study at the top
  minorGridEnabled: true // a skipped study still gets a faint grid line
});
var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: yRenderer
}));

yAxis.data.setAll(data);

// a second category axis on the right, its labels showing each study's measure and interval
var yRenderer2 = am5xy.AxisRendererY.new(root, {
  opposite: true, // on the right side...
  inversed: true  // ...in the same top-down order
})
var yAxis2 = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: yRenderer2
}));

yRenderer2.grid.template.setAll({
  forceHidden: true // no grid lines from this axis
})

yRenderer2.labels.template.setAll({
  populateText: true // fills in the {placeholders} from each study's data
})
yRenderer2.labels.template.adapters.add("text", function(text, target) {
  return "[bold]{measure}[/] ({low}-{high})"; // the measure in bold, then the interval
})
yAxis2.data.setAll(data);

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, {
    strokeOpacity: 0.1 // a faint line along the value axis
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

// Column series: a thin bar from the low to the high end of each confidence interval
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "high",
  openValueXField: "low",
  categoryYField: "category"
}));

series.columns.template.setAll({
  height: 1,     // 1px tall...
  strokeWidth: 1 // ...plus a 1px outline: a thin line
});

series.data.setAll(data);

// Line series with no line, for the markers: each square is sized by the study's weight
var series2 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "measure",
  categoryYField: "category",
  valueField: "bulletSize", // the value the heat rules size the squares by
  // works out the lowest and highest bulletSize, which the heat rules below scale between
  calculateAggregates: true,
  fill: series.get("fill"), // in the same color as the bars
  tooltip: am5.Tooltip.new(root, {
    labelText: "[bold]{valueX}[/] ({low}-{high})" // the measure in bold, then the interval
  })
}));

series2.strokes.template.setAll({
  forceHidden: true
});

var rectangleTemplate = am5.Template.new({
  stroke: series.get("fill"),     // an outline...
  fill: series.get("fill"),       // ...and a fill in the bars' color
  centerY: am5.p50,               // centered on the point
  centerX: am5.p50,
  strokeWidth: 2,                 // a 2px outline, which shows on the hollow diamond
  templateField: "bulletSettings" // the summary's diamond look, from bulletSettings in its data
});

series2.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Rectangle.new(root, {}, rectangleTemplate)
  });
});

// squares from 10 to 40px on a side, scaled by each study's bulletSize
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

// a value label, with text only where the data has textSettings: in the summary's diamond
series2.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      centerX: am5.p50,  // centered on the point
      centerY: am5.p50,
      templateField: "textSettings",
      populateText: true // fills in {valueX} from the data
    })
  });
});

series2.data.setAll(data);

// Create a summary line
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
var rangeDataItem = xAxis.makeDataItem({
  value: 2.2 // at the summary measure
});

var range = xAxis.createAxisRange(rangeDataItem);

// A dashed line at the summary value, in the theme's alternative background color (dark on light, light on dark), so it shows on light and dark backgrounds
rangeDataItem.get("grid").setAll({
  stroke: root.interfaceColors.get("alternativeBackground"),
  strokeOpacity: 0.3,
  strokeDasharray: [3, 3]
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis
}));
cursor.lineY.set("visible", false); // no horizontal cursor line...
cursor.lineX.set("visible", false); // ...and no vertical one: the cursor just shows the tooltip

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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
