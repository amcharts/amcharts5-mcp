---
title: "Sorted Bar Chart"
source: "https://www.amcharts.com/demos/sorted-bar-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

A bar chart that keeps its ranking up to date. Every second and a half, twelve social networks get new user counts, and the bars slide into their new order, the longest on top.

When a sorted bar chart works: Sorting turns a bar chart into a ranking: the leader is on top, and each bar’s place says as much as its length. Horizontal bars leave room for names of any length, and sorting again after each update keeps the ranking true while the numbers move.

Good for:
- Rankings that change: users, sales, votes
- Long names, like products or networks
- Leaderboards on monitoring screens

Think twice when:
- Items people look up by name: a fixed order is easier to scan
- Updates faster than the slide: the bars never settle
- How the ranking changed over time: a bar chart race keeps the history

Prompt: Create a horizontal bar chart of user counts for twelve social networks that re-sorts itself live: every second or two the values change at random and the bars slide into their new order, longest on top, each in its own color. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Group large numbers into M (millions) and B (billions)
var bigNumberPrefixes = [
  { number: 1e6, suffix: "M" },
  { number: 1e9, suffix: "B" }
];
root.numberFormatter.setAll({
  bigNumberPrefixes: bigNumberPrefixes
});

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,    // no panning...
  panY: false,
  wheelX: "none", // ...and no zooming with the mouse wheel
  wheelY: "none",
  paddingLeft: 0  // no gap at the chart's left edge
}));

// We don't want zoom-out button to appear while animating, so we hide it
chart.zoomOutButton.set("forceHidden", true);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
  minGridDistance: 30,   // at least 30px between the names
  minorGridEnabled: true // fainter grid lines between the main ones
});

yRenderer.grid.template.set("location", 1); // grid lines between the bars, not through the middle of each

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,                   // no panning past the first and last bar
  categoryField: "network",
  renderer: yRenderer,
  tooltip: am5.Tooltip.new(root, {}) // shows the name at the cursor on the axis
}));

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0, // no panning past the data
  min: 0,          // bars start at zero, so their lengths compare fairly
  numberFormatter: am5.NumberFormatter.new(root, {
    "numberFormat": "#,###a",              // short numbers: 2B, 430M
    "bigNumberPrefixes": bigNumberPrefixes // with the M and B prefixes from the top
  }),
  // 10% more room past the longest bar
  extraMax: 0.1,
  renderer: am5xy.AxisRendererX.new(root, {
    strokeOpacity: 0.1, // a faint axis line
    minGridDistance: 80 // at least 80px between the labels

  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "value",
  categoryYField: "network",
  tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "left", // the tooltip sits right of the bar's end, pointing left at it
    labelText: "{valueX}"       // the value
  }),
  // Each column takes its own color from the series palette
  colorByDataItem: true
}));

// Rounded corners for columns
series.columns.template.setAll({
  cornerRadiusTR: 5, // rounded top right...
  cornerRadiusBR: 5, // ...and bottom right corners: the bar's end
  strokeOpacity: 0   // no outline
});

// Set data
var data = [
  {
    "network": "Facebook",
    "value": 2255250000
  },
  {
    "network": "Instagram",
    "value": 1000000000
  },
  {
    "network": "Pinterest",
    "value": 246500000
  },
  {
    "network": "Reddit",
    "value": 355000000
  },
  {
    "network": "Snapchat",
    "value": 430000000
  },
  {
    "network": "TikTok",
    "value": 500000000
  },
  {
    "network": "Tumblr",
    "value": 624000000
  },
  {
    "network": "Twitter",
    "value": 329500000
  },
  {
    "network": "WeChat",
    "value": 1000000000
  },
  {
    "network": "Weibo",
    "value": 431000000
  },
  {
    "network": "Whatsapp",
    "value": 1433333333
  },
  {
    "network": "YouTube",
    "value": 1900000000
  }
];

yAxis.data.setAll(data);
series.data.setAll(data);
sortCategoryAxis(); // put the bars in order right away

// Get series item by category
function getSeriesItem(category) {
  for (var i = 0; i < series.dataItems.length; i++) {
    var dataItem = series.dataItems[i];
    if (dataItem.get("categoryY") == category) {
      return dataItem;
    }
  }
}

chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none", // a drag does nothing; the cursor only shows the axis tooltips
  xAxis: xAxis,
  yAxis: yAxis
}));

// Axis sorting
function sortCategoryAxis() {

  // Sort by value, smallest first: the axis counts up from the bottom,
  // so the longest bar ends up on top
  series.dataItems.sort(function (x, y) {
    return x.get("valueX") - y.get("valueX");
  });

  // Go through each axis item
  am5.array.each(yAxis.dataItems, function (dataItem) {
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
  yAxis.dataItems.sort(function (x, y) {
    return x.get("index") - y.get("index");
  });
}

// update data with random values each 1.5 sec
setInterval(function () {
  updateData();
}, 1500)

function updateData() {
  am5.array.each(series.dataItems, function (dataItem) {
    // a random change of up to 500 million either way
    var value = dataItem.get("valueX") + Math.round(Math.random() * 1000000000 - 500000000);
    if (value < 0) {
      value = 500000000; // a value below zero starts again at 500 million
    }
    // both valueX and valueXWorking should be changed, we only animate valueXWorking
    dataItem.set("valueX", value);
    dataItem.animate({
      key: "valueXWorking",
      to: value,
      duration: 600, // the bars grow or shrink over 0.6 seconds
      easing: am5.ease.out(am5.ease.cubic)
    });
  })

  sortCategoryAxis();
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
