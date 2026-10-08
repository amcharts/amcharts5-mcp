---
title: "Live Sorting of Radar Columns"
source: "https://www.amcharts.com/demos/live-sorting-of-radar-columns/"
category: "radar-polar"
scraped: "2026-10-08"
---

A column chart bent into a ring that keeps itself sorted. Every 1.5 seconds, eleven countries get new values, and the columns slide into their new places, biggest first.

Why sort a chart live: Sorting turns values that keep changing into a ranking people can follow: the leader always starts at the top, and a column that climbs or falls slides past its neighbors. It suits scores, votes or sales that update while people watch. Bent into a ring, the chart also fits a square space, like a dashboard tile.

Good for:
- Live rankings: votes, scores, sales
- Dashboards on a wall screen
- Showing who overtakes whom

Think twice when:
- Reading exact values: the columns keep moving
- Long names: there is little room around the ring
- Printed reports: use a sorted bar chart

Prompt: Create a radar column chart of eleven countries around most of a circle that sorts itself live: every 1.5 seconds the values change at random, the columns grow or shrink, and then they move into their new order, largest first. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,    // no dragging to pan, sideways...
  panY: false,    // ...or up and down...
  wheelX: "none", // ...and the mouse wheel...
  wheelY: "none", // ...does nothing
  // a gap at the top leaves room for the value labels
  startAngle: -84,
  endAngle: 264,               // the circle runs 348 degrees, leaving a 12-degree gap
  innerRadius: am5.percent(40) // a hole in the middle, 40% of the radius
}));

// We don't want zoom-out button to appear while animating, so we hide it
chart.zoomOutButton.set("forceHidden", true);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  minGridDistance: 30 // at least 30px between the country labels around the circle
});

xRenderer.grid.template.set("visible", false); // no lines from the center between the countries

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0.3,
  categoryField: "country",
  renderer: xRenderer
}));

var yRenderer = am5radar.AxisRendererRadial.new(root, {});
// value labels centered in the gap at the top
yRenderer.labels.template.set("centerX", am5.p50);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  min: 0, // the columns start at zero
  renderer: yRenderer
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5radar.RadarColumnSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "country",
  // Each column takes its own color from the series palette
  colorByDataItem: true
}));

// Rounded corners for columns
series.columns.template.setAll({
  cornerRadius: 5,
  tooltipText:"{categoryX}: {valueY}" // hover a column to see its country and value
});

// Set data
var data = [{
  "country": "USA",
  "value": 2025
}, {
  "country": "China",
  "value": 1882
}, {
  "country": "Japan",
  "value": 1809
}, {
  "country": "Germany",
  "value": 1322
}, {
  "country": "UK",
  "value": 1122
}, {
  "country": "France",
  "value": 1114
}, {
  "country": "India",
  "value": 984
}, {
  "country": "Spain",
  "value": 711
}, {
  "country": "Netherlands",
  "value": 665
}, {
  "country": "South Korea",
  "value": 443
}, {
  "country": "Canada",
  "value": 441
}];

xAxis.data.setAll(data);
series.data.setAll(data);

// update data with random values each 1.5 sec
setInterval(function () {
  updateData();
}, 1500)

// moves every value randomly by up to 200, then re-sorts the columns
function updateData() {
  am5.array.each(series.dataItems, function (dataItem) {
    var value = dataItem.get("valueY") + Math.round(Math.random() * 400 - 200);
    if (value < 0) { // no negative values
      value = 10;
    }
    // both valueY and valueYWorking change; only valueYWorking is animated
    dataItem.set("valueY", value);
    dataItem.animate({
      key: "valueYWorking",
      to: value,
      duration: 600,                       // 0.6 seconds...
      easing: am5.ease.out(am5.ease.cubic) // ...slowing down at the end
    });
  })

  sortCategoryAxis();
}

// Get series item by category
function getSeriesItem(category) {
  for (var i = 0; i < series.dataItems.length; i++) {
    var dataItem = series.dataItems[i];
    if (dataItem.get("categoryX") == category) {
      return dataItem;
    }
  }
}

// Axis sorting
function sortCategoryAxis() {

  // Sort by value
  series.dataItems.sort(function (x, y) {
    return y.get("valueY") - x.get("valueY"); // descending
  })

  // Go through each axis item
  am5.array.each(xAxis.dataItems, function (dataItem) {
    // get corresponding series item
    var seriesDataItem = getSeriesItem(dataItem.get("category"));

    if (seriesDataItem) {
      // get index of series data item
      var index = series.dataItems.indexOf(seriesDataItem);
      // calculate delta position
      var deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
      // set index to be the same as series data item index
      dataItem.set("index", index);
      // set deltaPosition instantly
      dataItem.set("deltaPosition", -deltaPosition);
      // animate delta position to 0
      dataItem.animate({
        key: "deltaPosition",
        to: 0,
        duration: 1000,
        easing: am5.ease.out(am5.ease.cubic)
      })
    }
  });

  // Sort axis items by index.
  // This changes the order instantly, but as deltaPosition is set,
  // they keep in the same places and then animate to true positions.
  xAxis.dataItems.sort(function (x, y) {
    return x.get("index") - y.get("index");
  });
}

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
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
