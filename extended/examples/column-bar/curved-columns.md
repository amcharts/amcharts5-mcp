---
title: "Curved Columns"
source: "https://www.amcharts.com/demos/curved-columns/"
category: "column-bar"
scraped: "2026-10-08"
---

Columns with a shape of their own: each is drawn as two curves meeting at a peak, wider than its slot, so neighbors overlap like a row of hills. Nine countries, each in its own color.

When to draw your own shapes: Any column can take a shape you draw in a few lines of code; here it is two curves, so the chart looks like a row of hills. It suits infographics and landing pages, where the look sets the mood; in a report, plain columns are easier to compare.

Good for:
- Infographics and landing pages
- A playful take on a ranking
- Brands with soft, rounded shapes

Think twice when:
- Exact comparisons: a peak is harder to read than a flat top
- Many categories: the overlapping curves blur together
- Formal reports: plain columns are calmer

Prompt: Create a column chart comparing nine countries, where each column is drawn as a curved hill and neighboring columns overlap a little, each in its own color. Add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,      // drag the plot sideways to pan...
    panY: true,      // ...or up and down
    wheelX: "panX",  // a horizontal wheel or trackpad swipe pans
    wheelY: "zoomX", // the vertical wheel zooms in on the countries
    paddingLeft: 5,  // a little room at both sides
    paddingRight:5
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 60,   // at least 60px between labels; on narrow screens some are skipped
  minorGridEnabled: true // a grid line for every country, even one whose label is skipped
});

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.3,                 // pan up to 30% of the visible range past the first and last country
    categoryField: "country",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {}) // the cursor shows the country on the axis
  })
);

xRenderer.grid.template.setAll({
  // draw each grid line at the end of its country's cell instead of at its start
  location: 1
})

// long names wrap onto a second line instead of running into the next one
xRenderer.labels.template.setAll({
  oversizedBehavior: "wrap-no-break", // wrap between words, never inside one
  textAlign: "center"                 // lines centered under the curve
});

// each label may be as wide as its category's cell
xAxis.onPrivate("cellWidth", function (cellWidth) {
  xRenderer.labels.template.set("maxWidth", cellWidth);
});

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.3, // the values can be panned 30% past their range too
    // the curves rise from zero, so their heights compare truly
    min: 0,
    renderer: am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1 // a faint axis line
    })
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    sequencedInterpolation: true, // the curves grow one after another
    categoryXField: "country",
    // Each column takes its own color from the series palette
    colorByDataItem: true,
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}" // the hovered country's value
    })
  })
);

series.columns.template.setAll({
  // wider than the cell, so the feet of neighboring curves overlap
  width: am5.percent(120),
  fillOpacity: 0.9, // a little see-through, so the overlaps show
  strokeOpacity: 0  // no outline
});
// draw each column as a hump instead of a rectangle: two curves up to the top middle and down again
series.columns.template.set("draw", function(display, target) {
  var w = target.getPrivate("width", 0); // the column's size in pixels
  var h = target.getPrivate("height", 0);
  display.moveTo(0, h); // start at the bottom left...
  display.bezierCurveTo(w / 4, h, w / 4, 0, w / 2, 0); // ...curve up to the top middle...
  display.bezierCurveTo(w - w / 4, 0, w - w / 4, h, w, h); // ...and down to the bottom right
});

// Set data
var data = [{
  country: "USA",
  value: 2025
}, {
  country: "China",
  value: 1882
}, {
  country: "Japan",
  value: 1809
}, {
  country: "Germany",
  value: 1322
}, {
  country: "UK",
  value: 1122
}, {
  country: "France",
  value: 1114
}, {
  country: "India",
  value: 984
}, {
  country: "Spain",
  value: 711
}, {
  country: "South Korea",
  value: 443
}];

xAxis.data.setAll(data);
series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
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
