---
title: "Divergent Stacked Bars"
source: "https://www.amcharts.com/demos/divergent-stacked-bars/"
category: "column-bar"
scraped: "2026-10-08"
---

A diverging stacked bar chart, the usual way to show answers on a scale: negative answers stack to the left of zero, positive ones to the right. Here, how often people turn to eleven sources of information.

When bars diverge: Lining the answers up on zero puts the balance of opinion in the middle of the chart: the further a bar reaches right, the more positive the answers. With the rows sorted, as here, it doubles as a ranking. It works best for scales of four or five answers.

Good for:
- Survey answers on an agree-disagree scale
- The same question asked about many items
- Ratings, from very poor to very good

Think twice when:
- A neutral middle answer: split it across zero, or show it apart
- Comparing the outer answers: only the segments at zero line up
- One question only: a single 100% bar is enough

Prompt: Create a diverging stacked bar chart of survey answers about eleven sources of information: Never and Unlikely stack to the left of zero, Sometimes and Very often to the right. Label the segments with their shares, and add tooltips and a legend. Use the amCharts 5 library with its Responsive theme.

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
    panX: false,                 // the chart doesn't pan or zoom
    panY: false,
    wheelX: "none",              // the mouse wheel scrolls the page
    wheelY: "none",
    layout: root.verticalLayout, // the plot on top, the legend under it
    arrangeTooltips: false,      // keep each tooltip at its own bar instead of spreading them apart
    paddingLeft: 0               // the row names sit at the chart's left edge
  })
);

// Use only absolute numbers
root.numberFormatter.set("numberFormat", "#.#s'%'");

// Data
var data = [{
  category: "Search engines",
  negative1: -0.1,
  negative2: -0.9,
  positive1: 5,
  positive2: 94
}, {
  category: "Online encyclopedias",
  negative1: -2,
  negative2: -4,
  positive1: 19,
  positive2: 75
}, {
  category: "Peers",
  negative1: -2,
  negative2: -10,
  positive1: 46,
  positive2: 42
}, {
  category: "Social media",
  negative1: -2,
  negative2: -13,
  positive1: 33,
  positive2: 52
}, {
  category: "Study guides",
  negative1: -6,
  negative2: -19,
  positive1: 34,
  positive2: 41
}, {
  category: "News websites",
  negative1: -3,
  negative2: -23,
  positive1: 49,
  positive2: 25
}, {
  category: "Textbooks",
  negative1: -5,
  negative2: -28,
  positive1: 49,
  positive2: 18
}, {
  category: "Librarian",
  negative1: -14,
  negative2: -34,
  positive1: 37,
  positive2: 16
}, {
  category: "Printed books",
  negative1: -9,
  negative2: -41,
  positive1: 38,
  positive2: 12
}, {
  category: "Databases",
  negative1: -18,
  negative2: -36,
  positive1: 29,
  positive2: 17
}, {
  category: "Student search engines",
  negative1: -17,
  negative2: -39,
  positive1: 34,
  positive2: 10
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererY.new(root, {
      // the first category at the top
      inversed: true,
      // the gap between rows: each bar takes the middle 80% of its row
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      minGridDistance: 10,   // a label for every row down to 10px apart
      minorGridEnabled: true // a grid line for every row, even one whose label is skipped
    })
  })
);

yAxis.data.setAll(data);

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    min: -100, // 100% on either side of zero
    max: 100,
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50 // at least 50px between labels
    })
  })
);

// Shade every other row, in the theme's contrast color so the bands show on light and dark backgrounds
var yRenderer = yAxis.get("renderer");
yRenderer.axisFills.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 0.05,
  visible: true
});

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function createSeries(field, name, color, labelColor) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      name: name,
      valueXField: field,
      categoryYField: "category",
      sequencedInterpolation: true, // the segments grow one after another
      stacked: true,                // each segment stacks on the one before, outward from zero
      fill: color,                  // the segment color...
      stroke: color                 // ...and an outline in the same color
    })
  );

  series.columns.template.setAll({
    height: am5.p100,                            // the segments fill the bar's row
    tooltipText: "{categoryY}, {name}: {valueX}" // row, answer and share
  });

  series.bullets.push(function(root, series) {
    return am5.Bullet.new(root, {
      locationX: 0.5, // in the middle of the segment
      locationY: 0.5,
      // no padding, so the label fits the bar's height; it hides on segments too short for it
      sprite: am5.Label.new(root, {
        fill: labelColor,
        centerX: am5.p50, // the label centered on that point
        centerY: am5.p50,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        text: "{valueX}",   // the share, without its minus sign (the number format above)
        populateText: true, // fill in {valueX} from the data item
        oversizedBehavior: "hide"
      })
    });
  });

  series.data.setAll(data);
  series.appear();

  return series;
}

var positiveColor = root.interfaceColors.get("positive"); // the theme's positive color...
var negativeColor = root.interfaceColors.get("negative"); // ...and its negative one

// negatives and positives each stack outward from zero in creation order: Unlikely, then Never
// Dark labels on the light segments, white ones on the dark segments
var unlikely = createSeries("negative2", "Unlikely", am5.Color.lighten(negativeColor, 0.5), am5.color(0x000000));
var never = createSeries("negative1", "Never", negativeColor, am5.color(0xffffff));
var sometimes = createSeries("positive1", "Sometimes", am5.Color.lighten(positiveColor, 0.5), am5.color(0x000000));
var veryOften = createSeries("positive2", "Very often", positiveColor, am5.color(0xffffff));

// Add legend under the chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50,
    layout: root.gridLayout, // the items in rows, wrapping on narrow screens
    marginTop: 15            // space between the plot and the legend
  })
);

// no cursor, so no values for the legend: without the empty value labels its items stay compact
legend.valueLabels.template.set("forceHidden", true);

// The legend lists the answers in the order the bars show them, from left to right
legend.data.setAll([never, unlikely, sometimes, veryOften]);

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
