---
title: "Mekko Chart"
source: "https://www.amcharts.com/demos/mekko/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A Mekko chart is a stacked column chart whose columns have different widths: the width shows how big each column is, the height how it splits up. Here, five columns of different sizes, each stacked from trucks, SUVs and cars.

When a Mekko chart works: A Mekko chart shows two things at once: how big each group is, by its width, and what it is made of, by its stack. It suits market maps, where each column is a market, as wide as its share, and the stack shows its products.

Good for:
- Market size and share in one chart
- Groups of very different sizes
- Spotting the biggest blocks at a glance

Think twice when:
- Exact comparisons of middle segments: they have no common baseline
- Many columns or segments: the thin ones become unreadable
- Readers new to the form: explain what the width means

Prompt: Create a Mekko chart of trucks, SUVs and cars: stacked columns of different widths, so both the width and the height of each block carry meaning, with each block’s value in its middle and a legend that hides a series. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,                // no dragging to pan...
  panY: false,                // ...in either direction
  layout: root.verticalLayout // the plot and the legend stacked top to bottom
}));

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50, // the legend's middle...
    x: am5.p50        // ...at the middle of the chart's width
  })
);

// no cursor, so no values for the legend: without the empty value labels its items stay compact
legend.valueLabels.template.set("forceHidden", true);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// The horizontal axis runs from 0 to 100: each column's width is its share of the whole
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  max: 100,
  renderer: am5xy.AxisRendererX.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0, // the stacks start at zero
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// Each segment is a stacked step line: every point starts a column at "ax" with
// a height of "ay", so the steps draw columns of different widths
function createSeries(name, data) {
  var series = chart.series.push(am5xy.StepLineSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    baseAxis: xAxis, // x is the base, so the values stack upward
    valueYField: "ay",
    valueXField: "ax",
    stacked: true // each series sits on top of the one before
  }));

  series.strokes.template.setAll({
    strokeWidth: 3 // a 3px line along the steps
  });

  series.fills.template.setAll({
    fillOpacity: 0.2, // a faint fill...
    visible: true     // ...under the steps
  });

  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();

  // A hidden column series, stacked the same way, holds a label in the middle of each block
  var bulletSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    baseAxis: xAxis, // x is the base, as for the step line
    valueYField: "ay",
    valueXField: "ax",
    stacked: true // stacked like the step lines, so the labels land in their blocks
  }));

  bulletSeries.columns.template.setAll({
    forceHidden: true // the columns themselves never show
  });

  // one label per block: in the middle of its width, with the block's height as value
  var bulletSeriesData = [];
  for(var i = 1; i < data.length; i++) {
    bulletSeriesData.push({
      "ax": data[i].ax - (data[i].ax - data[i-1].ax) / 2, // halfway between this point and the one before
      "ay": data[i-1].ay // the block's height
    })
  }

  bulletSeries.data.setAll(bulletSeriesData);

  // a value label in the middle of each block
  bulletSeries.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 0.5, // in the middle of the column...
      locationY: 0.5, // ...halfway up
      sprite: am5.Label.new(root, {
        text: "{valueY}", // the block's height...
        centerY: am5.p50, // ...centered on that point...
        centerX: am5.p50, // ...both ways...
        populateText: true, // ...filled in from the data item
        background: am5.RoundedRectangle.new(root, { // on a box in the background color
          fill: root.interfaceColors.get("background")
        })
      })
    });
  });

  // the labels hide and show with their series, as its legend item is clicked
  series.on("visible", function(visible, series) {
    if (visible) {
      bulletSeries.show();
    }
    else {
      bulletSeries.hide();
    }
  })

  legend.data.push(series); // a legend item for the step line only
  return series;
}

var series1 = createSeries(
  "Trucks",
  [
    { "ax": 0, "ay": 20 },
    { "ax": 30, "ay": 10 },
    { "ax": 40, "ay": 35 },
    { "ax": 55, "ay": 43 },
    { "ax": 80, "ay": 33 },
    { "ax": 100, "ay": 33 }
  ]
);

var series2 = createSeries(
  "SUVs",
  [
    { "ax": 0, "ay": 10 },
    { "ax": 30, "ay": 39 },
    { "ax": 40, "ay": 22 },
    { "ax": 55, "ay": 26 },
    { "ax": 80, "ay": 15 },
    { "ax": 100, "ay": 15 }
  ]
);

var series3 = createSeries(
  "Cars",
  [
    { "ax": 0, "ay": 25 },
    { "ax": 30, "ay": 25 },
    { "ax": 40, "ay": 22 },
    { "ax": 55, "ay": 19 },
    { "ax": 80, "ay": 30 },
    { "ax": 100, "ay": 30 }
  ]
);

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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
