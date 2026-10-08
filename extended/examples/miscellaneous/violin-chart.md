---
title: "Violin Chart"
source: "https://www.amcharts.com/demos/violin-chart/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A violin chart shows how values are spread: the shape is widest where most values fall and thin where few do, mirrored around its middle line. Here, about 200 values in each of four regions, one violin per row.

When a violin chart works: A violin shows the whole spread of a group, so you can see where values bunch up, whether there are two peaks, and how far the tails reach, all of which an average hides. It needs a fair number of values per group, a hundred or more, to draw a shape worth reading.

Good for:
- Comparing the spread of a few groups
- Spotting two peaks or long tails
- Large samples: scores, ages, measurements

Think twice when:
- A few dozen values: a strip plot shows each one
- Readers who want medians and quartiles: a box plot
- Many groups: the rows get thin

Prompt: Create a violin chart that compares how values are spread in four regions: count the values in bins and draw each region as a mirrored smoothed shape in its own row, whose width shows how many values fall in each bin, labeled with the region’s name. Use the amCharts 5 library with its Responsive theme.

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

// Source data
var sourceData = {
  Americas: [75, 69, 76, 85, 68, 68, 86, 78, 65, 75, 65, 80, 72, 81, 69, 68, 88, 65, 74, 63, 83, 74, 83, 76, 67, 73, 77, 65, 70, 64, 66, 74, 68, 68, 75, 80, 79, 67, 79, 77, 78, 67, 67, 74, 70, 68, 76, 72, 70, 79, 72, 72, 70, 70, 83, 77, 67, 81, 69, 80, 64, 63, 68, 80, 68, 73, 79, 82, 62, 68, 66, 65, 74, 83, 71, 68, 69, 69, 83, 72, 75, 71, 71, 82, 64, 73, 61, 61, 61, 64, 66, 67, 82, 79, 78, 65, 79, 71, 74, 63, 66, 80, 70, 70, 76, 66, 70, 68, 71, 75, 81, 71, 69, 81, 71, 66, 66, 64, 65, 70, 66, 83, 72, 73, 60, 83, 82, 61, 70, 74, 66, 61, 67, 70, 72, 68, 62, 79, 72, 69, 64, 69, 69, 79, 69, 74, 70, 67, 73, 74, 78, 60, 72, 70, 66, 63, 65, 73, 65, 64, 69, 59, 77, 76, 61, 74, 65, 83, 79, 80, 69, 59, 66, 59, 60, 79, 67, 69, 71, 69, 69, 69, 64, 73, 83, 73, 68, 70, 70, 78, 72, 75, 65, 78, 73, 74, 80, 62, 82, 81, 62, 71, 80, 69, 60, 79, 67, 74],
  Europe: [70, 53, 59, 73, 76, 78, 65, 59, 82, 65, 77, 84, 61, 62, 80, 63, 58, 64, 52, 50, 76, 65, 48, 47, 73, 64, 68, 60, 75, 84, 60, 50, 48, 67, 84, 67, 74, 82, 67, 63, 71, 49, 83, 82, 56, 61, 76, 87, 52, 57, 73, 65, 66, 48, 66, 66, 66, 46, 64, 55, 63, 63, 55, 57, 60, 67, 53, 63, 48, 58, 72, 69, 49, 52, 55, 49, 48, 61, 84, 56, 80, 79, 49, 58, 58, 73, 48, 63, 79, 84, 79, 58, 67, 64, 47, 74, 66, 54, 46, 67, 71, 62, 69, 61, 47, 73, 66, 56, 82, 50, 52, 63, 68, 71, 74, 64, 74, 67, 46, 60, 72, 58, 56, 59, 56, 79, 74, 49, 47, 58, 69, 63, 56, 73, 76, 65, 57, 77, 76, 64, 69, 76, 63, 68, 72, 63, 65, 73, 52, 66, 46, 49, 84, 47, 67, 70, 67, 70, 54, 60, 78, 49, 73, 73, 47, 60, 66, 65, 65, 59, 66, 72, 61, 50, 57, 77, 77, 49, 54, 54, 76, 58, 59, 80, 64, 61, 84, 56, 63, 68],
  Asia: [80, 76, 79, 83, 81, 85, 76, 82, 78, 83, 83, 84, 87, 77, 77, 76, 78, 84, 81, 85, 81, 80, 81, 86, 81, 77, 82, 85, 84, 80, 79, 81, 84, 84, 82, 78, 83, 85, 80, 83, 84, 79, 79, 80, 82, 84, 83, 80, 83, 80, 85, 84, 77, 81, 78, 84, 84, 83, 83, 80, 85, 85, 83, 82, 81, 85, 82, 81, 85, 77, 81, 79, 83, 85, 86, 80, 81, 84, 84, 81, 80, 83, 84, 83, 83, 77, 80, 80, 81, 82, 82, 82, 80, 84, 80, 84, 80, 83, 85, 81, 84, 83, 82, 82, 86, 82, 80, 82, 82, 80, 79, 84, 79, 83, 79, 80, 80, 84, 80, 81, 84, 85, 83, 84, 83, 79, 80, 82, 82, 82, 83, 85, 84, 85, 79, 80, 81, 83, 85, 80, 79, 79, 84, 83, 83, 85, 83, 79, 85, 78, 82, 85, 79, 81, 85, 86, 84, 85, 81, 83, 80, 84, 83, 79, 82, 78, 79, 85, 82, 83, 85, 81, 82, 80, 79, 83, 82, 82, 78, 85, 80, 85, 85, 79, 83, 83, 80, 83, 84, 85, 80, 81],
  Africa: [78, 76, 84, 79, 81, 72, 78, 76, 79, 74, 69, 73, 76, 78, 77, 82, 74, 75, 77, 77, 75, 78, 74, 75, 77, 70, 77, 72, 79, 70, 79, 74, 73, 78, 77, 73, 81, 74, 69, 69, 71, 76, 72, 69, 75, 68, 68, 74, 83, 76, 77, 78, 70, 71, 74, 76, 73, 74, 76, 76, 79, 79, 72, 81, 73, 81, 78, 74, 71, 73, 69, 80, 74, 75, 81, 76, 78, 73, 72, 73, 77, 77, 74, 71, 81, 80, 71, 82, 72, 77, 79, 75, 69, 76, 80, 69, 77, 82, 75, 76, 82, 71, 78, 71, 77, 83, 81, 75, 81, 69, 78, 76, 71, 75, 71, 72, 83, 78, 75, 75, 79, 71, 75, 69, 75, 80, 81, 76, 80, 73, 72, 79, 72, 69, 70, 74, 71, 73, 69, 72, 75, 81, 72, 69, 82, 71, 72, 74, 76, 75, 72, 80, 77, 74, 79, 78, 73, 72, 71, 82, 81, 72, 77, 75, 80, 79, 75, 80, 73, 73, 71, 77, 79, 71, 75, 72, 74, 75, 80, 77, 77, 81, 71, 71, 77, 77, 70, 75, 82, 78]
};

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
// Pans sideways only: panning up or down would push the violins out of their rows
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,
    panY: false,
    wheelX: "panX", // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX" // ...and the vertical wheel zooms in on part of the ranges
  })
);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0, // no panning past the first or last range
  categoryField: "range",
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 20 // ranges can be 20px apart before labels are skipped
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's range on the axis
}));

var xRenderer = xAxis.get("renderer");

xRenderer.labels.template.setAll({
  rotation: -45, // slanted, so more of them fit
  location: 0.5, // in the middle of each range's cell
  multiLocation: 0.5,
  centerX: am5.p100, // the label ends at its range and runs down to the left
  centerY: am5.p50,
});

xRenderer.grid.template.setAll({
  location: 0.5, // grid lines through the middle of each range
  multiLocation: 0.5
});

// Set categories
// every region's values together, so the axis gets every range that any region has
var combinedValues = [];
Object.keys(sourceData).map(function(category) {
  combinedValues = combinedValues.concat(sourceData[category]);
});
xAxis.data.setAll(calculateData(combinedValues, 2)); // ranges 2 wide: 60-61, 62-63 and so on

// Make Y-axes stacked
chart.leftAxesContainer.setAll({
  layout: root.verticalLayout
});

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function createSeries(category) {
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0, // no panning past the violin
    // the range fits the violin exactly, plus 5% above and below
    strictMinMax: true,
    extraMin: 0.05,
    extraMax: 0.05,
    renderer: am5xy.AxisRendererY.new(root, {})
  }));

  var yRenderer = yAxis.get("renderer");

  yRenderer.labels.template.setAll({
    forceHidden: true // no value labels: the shape is what counts
  });

  var series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "high",    // the top edge, half the count above 0...
    openValueYField: "low", // ...and the bottom edge, half below
    categoryXField: "range",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal", // the tooltip sits beside the point
      labelText: "{categoryX}: [bold]{count}[/]"
    })
  }));

  // filling the area between low and high draws the violin's body
  series.fills.template.setAll({
    fillOpacity: 1, // solid
    visible: true   // a line series' fill is hidden until shown
  });

  series.data.setAll(calculateData(sourceData[category], 2));

  // The region name on a badge in the series color, left of its row
  yAxis.children.unshift(am5.Label.new(root, {
    text: category,
    y: am5.p50, // halfway up the row
    centerY: am5.p50,
    // black or white text, whichever stands out on the series color
    fill: am5.Color.alternative(series.get("fill"), am5.color(0xffffff), am5.color(0x000000)),
    fontWeight: "500",         // medium weight
    background: am5.RoundedRectangle.new(root, {
      fill: series.get("fill")
    })
  }));
}

// counts the values in each range; low and high put half of each count on either side of 0
function calculateData(values, incrementSize) {
  // sorted from low to high, so the ranges come out in order
  values.sort(function(a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });

  var increments = {};

  values.forEach(function(value) {
    // Determine the increment range
    var range = Math.floor(value / incrementSize) * incrementSize;
    var rangeLabel = `${range}-${range + incrementSize - 1}`;

    // Increment the count for this range
    if (increments[rangeLabel]) {
      increments[rangeLabel]++;
    } else {
      increments[rangeLabel] = 1;
    }
  });

  // Convert the increments object into an array of objects
  return Object.keys(increments).map(range => ({
    range: range,
    low: increments[range] / -2,
    high: increments[range] / 2,
    count: increments[range]
  }));
}

createSeries("Americas");
createSeries("Europe");
createSeries("Asia");
createSeries("Africa");

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis
}));
cursor.lineY.set("visible", false); // no horizontal cursor line

// add scrollbar, hidden at first
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  forceHidden: true
}));

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
