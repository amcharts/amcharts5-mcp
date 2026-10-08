---
title: "100% Stacked Column Chart"
source: "https://www.amcharts.com/demos/100-stacked-column-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

In a 100% stacked column chart every column is a whole, split into shares. Here, six regions over three years: the chart works out the percentages from the raw numbers in the data.

When to stack to 100%: A 100% stacked chart answers one question: how is each whole split, and how does the split change? Every column is the same height, so shares compare easily from year to year, while the totals are left out. Only the bottom segment sits on a common baseline, so read the middle ones by their labels.

Good for:
- Market or revenue share over time
- Survey answers by group or year
- Budgets split by department

Think twice when:
- Totals that matter: a plain stacked chart keeps them
- Many small shares: they become slivers, so group them as Other
- Following one middle segment over time: give it its own line

Prompt: Create a 100% stacked column chart of six world regions over three years, where the chart works out each region’s share of the year from raw values. Label every segment with its percentage, and add tooltips and a legend. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,                // the plot doesn't pan when dragged
  panY: false,
  paddingLeft: 0,             // the value labels sit at the chart's left edge
  layout: root.verticalLayout // the plot on top, the legend under it
}));

var data = [{
  "year": "2023",
  "europe": 2.5,
  "namerica": 2.5,
  "asia": 2.1,
  "lamerica": 1,
  "meast": 0.8,
  "africa": 0.4
}, {
  "year": "2024",
  "europe": 2.6,
  "namerica": 2.7,
  "asia": 2.2,
  "lamerica": 0.5,
  "meast": 0.4,
  "africa": 0.3
}, {
  "year": "2025",
  "europe": 2.8,
  "namerica": 2.9,
  "asia": 2.4,
  "lamerica": 0.3,
  "meast": 0.9,
  "africa": 0.5
}]

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// The years run along the top, the legend along the bottom
var xRenderer = am5xy.AxisRendererX.new(root, {
  opposite: true,        // the year labels go above the plot
  minorGridEnabled: true // a grid line for every year, even one whose label is skipped
});
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "year",
  renderer: xRenderer
}));

xRenderer.grid.template.setAll({
  // draw each grid line at the end of its year's cell instead of at its start
  location: 1
})

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,               // the axis runs from 0%...
  max: 100,             // ...to 100%
  numberFormat: "#'%'", // whole numbers with a % sign
  // keep the axis at exactly 0 to 100%, with no extra room added past them
  strictMinMax: true,
  calculateTotals: true, // sums each year's values for valueYTotalPercent
  renderer: am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1 // a faint line along the axis
  })
}));

// Add legend, under the plot
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50,
  marginTop: 15 // space between the plot and the legend
}));

// no cursor, so no values for the legend: without the empty value labels its items stay compact
legend.valueLabels.template.set("forceHidden", true);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function makeSeries(name, fieldName) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    stacked: true, // each segment sits on top of the one before it
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: fieldName,
    // plot each value as its share of the year's total (calculateTotals on the Y axis sums them)
    valueYShow: "valueYTotalPercent",
    categoryXField: "year"
  }));

  series.columns.template.setAll({
    // region, year and its share with one decimal
    tooltipText: "{name}, {categoryX}: {valueYTotalPercent.formatNumber('#.#')}%",
    tooltipY: am5.percent(10), // the tooltip points near the top of the segment
    // a thin line in the background color between segments
    stroke: root.interfaceColors.get("background"),
    strokeWidth: 1
  });
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();

  // a label with the share in the middle of each segment
  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text: "{valueYTotalPercent.formatNumber('#.#')}%", // the segment's share with one decimal
        fill: root.interfaceColors.get("alternativeText"), // a text color that reads on the colored columns
        centerY: am5.p50, // center the label on the segment
        centerX: am5.p50,
        populateText: true // fill in the {placeholders} from the data item
      })
    });
  });

  // hide the label of a segment too short to hold it; its tooltip still shows the value
  series.columns.template.onPrivate("height", function (height, target) {
    am5.array.each(target.dataItem.bullets || [], function (bullet) {
      if (height > 20) {
        bullet.get("sprite").show();
      } else {
        bullet.get("sprite").hide();
      }
    });
  });

  legend.data.push(series);
}

makeSeries("Europe", "europe");
makeSeries("North America", "namerica");
makeSeries("Asia", "asia");
makeSeries("Latin America", "lamerica");
makeSeries("Middle East", "meast");
makeSeries("Africa", "africa");

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
