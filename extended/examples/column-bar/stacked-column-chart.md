---
title: "Stacked Column Chart"
source: "https://www.amcharts.com/demos/stacked-column-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

A stacked column chart piles the series on top of each other, so each column shows a total and what it is made of. Here, six regions over three years, with each value written on its segment where it fits.

When to stack columns: Stacking shows two things at once: the total of each column and the parts that make it up. The totals and the bottom segments are easy to compare across columns; the segments higher up float on different baselines, so their labels do the work.

Good for:
- Totals that matter, with their parts
- Sales by region, costs by type, votes by party
- A few periods with a few parts each

Think twice when:
- Comparing one part across years: a clustered chart lines them up
- Shares rather than amounts: stack to 100%
- Negative values: they need a chart that stacks both ways

Prompt: Create a stacked column chart of six regions’ values over three years, each segment labeled with its value, with tooltips and a legend. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,                // no panning
  panY: false,
  paddingLeft: 0,             // no gap at the chart's left edge
  layout: root.verticalLayout // the legend goes below the plot
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
var xRenderer = am5xy.AxisRendererX.new(root, {
  minorGridEnabled: true // fainter grid lines between the main ones
});
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "year",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

xRenderer.grid.template.setAll({
  location: 1 // grid lines between the years, not through the middle of each
})

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0, // columns start at zero
  renderer: am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1 // a faint axis line
  })
}));

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50, // centered...
  x: am5.p50        // ...under the chart
}));

// no cursor, so no values for the legend: without the empty value labels its items stay compact
legend.valueLabels.template.set("forceHidden", true);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// adds one region's segments, stacked on the regions added before
function makeSeries(name, fieldName) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    stacked: true, // the main trick: each segment starts where the one below it ends
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: fieldName,
    categoryXField: "year"
  }));

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}: {valueY}", // hover a segment for its region, year and value
    // the tooltip points near the top of the segment, not at its middle
    tooltipY: am5.percent(10)
  });
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();

  // the value in the middle of each segment
  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        fill: root.interfaceColors.get("alternativeText"), // the theme's text color for use on colored fills
        centerY: am5.p50,  // centered on the segment...
        centerX: am5.p50,  // ...both ways
        populateText: true // fill in {valueY} from the data
      })
    });
  });

  // hide the label of a segment too short to hold it; its tooltip still shows the value
  series.columns.template.onPrivate("height", function (height, target) {
    am5.array.each(target.dataItem.bullets || [], function (bullet) {
      if (height > 20) { // 20px or taller: room for the label
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
