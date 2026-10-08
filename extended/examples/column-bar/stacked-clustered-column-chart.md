---
title: "Stacked and Clustered Column Chart"
source: "https://www.amcharts.com/demos/stacked-clustered-column-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

Stacks side by side: each year, North America stacks on Europe in one column, and Latin America, the Middle East and Africa stack on Asia in the next. Two groups, and what each is made of.

When to stack and cluster: Combine the two when your series fall into groups: the clusters compare the groups, the stacks show what each is made of. Readers need the legend to tell which series belongs to which stack, so keep the groups few and obvious.

Good for:
- Two or three groups, each made of parts
- Revenue by region, split by product
- Plan against actual, each split by category

Think twice when:
- Comparing the parts across groups: only the bottom segments line up
- More than three stacks per category: the chart gets busy
- Groups readers can’t guess from the legend: label them on the chart

Prompt: Create a column chart that is both stacked and clustered: six regions over three years, shown as two stacked columns side by side for each year. Label the segments with their values, and add tooltips and a legend. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,                // no panning by drag
  panY: false,
  wheelX: "panX",             // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",            // ...and the vertical wheel zooms in on the years
  paddingLeft: 0,             // no gap at the chart's left edge
  layout: root.verticalLayout // the legend goes below the plot
}));

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50, // centered...
  x: am5.p50        // ...under the chart
}));

// no value labels: without them the items stay compact, so the legend sits centered under the chart
legend.valueLabels.template.set("forceHidden", true);

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
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  // each year's columns take the middle 80% of its cell, leaving a gap between years
  cellStartLocation: 0.1,
  cellEndLocation: 0.9
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

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// adds one region's columns; with stacked true they go on top of the series before
function makeSeries(name, fieldName, stacked) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    stacked: stacked,
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: fieldName,
    categoryXField: "year"
  }));

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}: {valueY}", // hover a column for its region, year and value
    width: am5.percent(90),                       // each column takes 90% of its slot
    tooltipY: am5.percent(10),                    // the tooltip points near the column's top
    // a soft shadow under each column
    shadowColor: am5.color(0x000000),
    shadowOpacity: 0.3, // 30% opaque...
    shadowBlur: 6,      // ...blurred 6px...
    shadowOffsetX: 2,   // ...2px to the right...
    shadowOffsetY: 2    // ...and 2px down
  });
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();

  // the value in the middle of each column
  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationY: 0.5, // halfway up the column
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        fill: root.interfaceColors.get("alternativeText"), // the theme's text color for use on colored fills
        centerY: am5.percent(50), // centered on its point...
        centerX: am5.percent(50), // ...both ways
        populateText: true        // fill in {valueY} from the data
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

// a series with stacked false starts a new column; a stacked one goes on top of the one before
makeSeries("Europe", "europe", false);
makeSeries("North America", "namerica", true);
makeSeries("Asia", "asia", false);
makeSeries("Latin America", "lamerica", true);
makeSeries("Middle East", "meast", true);
makeSeries("Africa", "africa", true);

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
