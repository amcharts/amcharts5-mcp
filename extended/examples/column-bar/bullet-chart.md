---
title: "Bullet Chart"
source: "https://www.amcharts.com/demos/bullet-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

A bullet chart says what a gauge says in a strip: the black bar is the actual value, the short line is the target, and the colors behind say how good each level is. Two styles: a smooth gradient and five bands.

When a bullet chart works: Bullet charts do what dashboard gauges do in a fraction of the space: one value, its target and the ranges that say good or bad, all read along one scale. Several of them stack neatly, one measure per row, where gauges would need a grid of circles.

Good for:
- KPIs against a target on a dashboard
- Scores and ratings with set ranges
- Many measures in a small space, one row each

Think twice when:
- A value with no target or ranges: a plain bar is enough
- Change over time: a line with a target line keeps the history
- Readers who don’t know what the colors mean: label the ranges

Prompt: Create a pair of bullet charts, one above the other, each with an actual value as a bar and a target as a short line over a scale colored from poor to good: a smooth gradient in the first, five solid bands in the second. Use the amCharts 5 library with its Responsive theme.

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

// Two bullet charts in one root, one above the other
root.container.set("layout", root.verticalLayout);

// The qualitative ranges, from poor (orange) to good (green): the higher, the better
var colors = [
  am5.color(0xfb7116),
  am5.color(0xf6d32b),
  am5.color(0xf4fb16),
  am5.color(0xb4dd1e),
  am5.color(0x19d228)
];

// one bullet chart: a gradient behind the bar when gradient is true, solid bands if not
function createBulletChart(gradient) {
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,    // the chart doesn't pan or zoom
      panY: false,
      wheelX: "none", // the mouse wheel scrolls the page
      wheelY: "none",
      // keep each tooltip at its own point instead of spreading them apart
      arrangeTooltips: false,
      // room for the "100%" label at the end of the scale
      paddingRight: 25
    })
  );

  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: am5xy.AxisRendererY.new(root, {})
    })
  );

  yAxis.data.setAll([{ category: "Evaluation" }]); // a single row

  var xRenderer = am5xy.AxisRendererX.new(root, {});
  xRenderer.grid.template.set("forceHidden", true); // no vertical grid lines

  var xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: xRenderer,
      min: 0,              // the scale runs from 0...
      max: 100,            // ...to 100
      numberFormat: "#'%'" // whole numbers with a % sign
    })
  );

  // Color the ranges behind the bar with axis ranges
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
  if (gradient) {
    // one range across the whole scale, with a gradient from orange to green
    var rangeDataItem = xAxis.makeDataItem({ value: 0, endValue: 100 });
    xAxis.createAxisRange(rangeDataItem);

    var stops = [];
    for (var i = 0; i < colors.length; i++) {
      stops.push({ color: colors[i] }); // one gradient stop per color, spread evenly
    }

    rangeDataItem.get("axisFill").setAll({
      visible: true,  // axis fills are hidden by default
      fillOpacity: 1, // solid
      fillGradient: am5.LinearGradient.new(root, {
        rotation: 0, // the gradient runs left to right
        stops: stops
      })
    });
  } else {
    // five ranges, one solid color each
    var count = colors.length;
    for (var i = 0; i < count; i++) {
      var rangeDataItem = xAxis.makeDataItem({
        value: (i / count) * 100, // each band takes a fifth of the scale
        endValue: ((i + 1) / count) * 100
      });
      xAxis.createAxisRange(rangeDataItem);

      rangeDataItem.get("axisFill").setAll({
        visible: true,     // axis fills are hidden by default
        fill: colors[i],
        stroke: colors[i], // an outline in the same color, so no gaps show between bands
        fillOpacity: 1     // solid
      });
    }
  }

  // The actual value: a bar
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/column-series/
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "value",
      categoryYField: "category",
      fill: am5.color(0x000000), // a black bar
      stroke: am5.color(0x000000),
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "left",    // the tooltip sits to the right, pointing left
        labelText: "Actual: {valueX}%" // the actual value
      })
    })
  );

  series.columns.template.setAll({
    height: am5.p50 // half the row tall
  });

  series.data.setAll([{ category: "Evaluation", value: 65 }]);

  // The target: a short vertical line, drawn by a step line series with no risers
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/step-line-series/
  var stepSeries = chart.series.push(
    am5xy.StepLineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "value",
      categoryYField: "category",
      stroke: am5.color(0x000000), // a black line
      fill: am5.color(0x000000),
      noRisers: true,
      // half the row tall, the same as the bar
      stepWidth: am5.p50,
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "left",    // the tooltip sits to the right, pointing left
        labelText: "Target: {valueX}%" // the target value
      })
    })
  );

  stepSeries.strokes.template.set("strokeWidth", 3); // a 3px target line
  stepSeries.data.setAll([{ category: "Evaluation", value: 83 }]);

  // Add cursor, with its lines hidden: it only shows the tooltips
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "none" // dragging doesn't select or zoom
  }));
  cursor.lineY.set("visible", false);
  cursor.lineX.set("visible", false);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  chart.appear(1000, 100);
  series.appear();
  stepSeries.appear();
}

createBulletChart(true);  // the top chart, with a gradient...
createBulletChart(false); // ...and the bottom one, with solid bands
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
