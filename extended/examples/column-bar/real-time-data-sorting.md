---
title: "Real-Time Data Sorting"
source: "https://www.amcharts.com/demos/real-time-data-sorting/"
category: "column-bar"
scraped: "2026-10-08"
---

A column chart that keeps itself sorted. Every second and a half, eleven countries get new values, and the columns slide into their new order, tallest first, with the numbers counting as they go.

When to sort live: When values keep changing, a fixed order hides the story: the reader has to hunt for the leader after every update. Re-sorting keeps the ranking readable, and the slide shows who moved up and who fell back.

Good for:
- Live leaderboards: sales teams, votes, games
- Rankings on monitoring screens
- Results coming in on election night

Think twice when:
- Values people look up by name: a fixed order is easier
- Updates faster than the slide: the columns never settle
- Trends over time: a line chart keeps the history

Prompt: Create a column chart of eleven countries that re-sorts itself live: every second or two the values change at random, and the columns slide into their new order, largest first, with value labels counting up or down. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,     // drag the plot to pan sideways...
  panY: true,     // ...and up and down
  wheelX: "none", // the wheel doesn't zoom...
  wheelY: "none", // ...so the page scrolls past the chart
  paddingLeft: 0  // the value labels sit at the chart's left edge
}));

// We don't want zoom-out button to appear while animating, so we hide it
chart.zoomOutButton.set("forceHidden", true);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 30, // at least 30px between labels; on narrow screens some are skipped
  minorGridEnabled: true
});
xRenderer.labels.template.setAll({
  rotation: -90,    // labels turned on their side
  centerY: am5.p50, // each label centered on its column
  centerX: 0,
  paddingRight: 15
});
xRenderer.grid.template.set("visible", false); // no vertical grid lines

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0.3, // can be panned 30% past the first or last column
  categoryField: "country",
  renderer: xRenderer
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  min: 0, // the columns start at zero
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
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
  cornerRadiusTL: 5,
  cornerRadiusTR: 5,
  strokeOpacity: 0, // no outline
  // a soft shadow under each column
  shadowColor: am5.color(0x000000),
  shadowOpacity: 0.3, // 30% opaque
  shadowBlur: 6,      // blurred over 6px
  shadowOffsetX: 2,   // moved 2px to the right...
  shadowOffsetY: 2    // ...and 2px down
});

// Add Label bullet
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    // at the top of the column, with the text hanging down inside it (centerY: 0)
    locationY: 1,
    sprite: am5.Label.new(root, {
      // the animated value, so the number counts along as the column grows or shrinks
      text: "{valueYWorking.formatNumber('#.')}",
      fill: root.interfaceColors.get("alternativeText"), // white by default, for text on colored fills
      centerY: 0,
      centerX: am5.p50,  // centered on the column
      populateText: true // fills in the {valueYWorking} placeholder from the column's data
    })
  });
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

// a random change for every column, then sort the axis by the new values
function updateData() {
  am5.array.each(series.dataItems, function (dataItem) {
    var value = dataItem.get("valueY") + Math.round(Math.random() * 300 - 150);
    if (value < 0) { // a negative value becomes 10
      value = 10;
    }
    // both valueY and valueYWorking change; only valueYWorking is animated
    dataItem.set("valueY", value);
    dataItem.animate({
      key: "valueYWorking",
      to: value,
      duration: 600,                       // the value animates over 0.6 seconds...
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
        duration: 1000,                      // the columns slide to their new places in one second...
        easing: am5.ease.out(am5.ease.cubic) // ...slowing down at the end
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
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
