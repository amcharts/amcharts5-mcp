---
title: "Crypto Order Book Depth Chart"
source: "https://www.amcharts.com/demos/live-order-book-depth-chart/"
category: "line-area"
scraped: "2026-10-08"
---

A market depth chart built from the live ETH/BTC order book on Binance and reloaded every 30 seconds: buy orders in green, sell orders in red.

Reading market depth: Each line is a running total: the green one adds up buy orders from the best bid outward, the red one sell orders from the best ask outward. Steep walls are large orders that could hold the price back, the gap in the middle is the spread, and the faint columns show the volume at each single price.

Good for:
- Crypto and stock trading dashboards
- Spotting large orders that act as support or resistance
- Showing how much can trade near the current price

Think twice when:
- Price history: use a candlestick or line chart
- Thin markets with few orders: the steps say little
- Audiences new to trading: explain bids and asks first

Prompt: Create a live market depth chart for ETH/BTC from Binance’s public order book API (https://data-api.binance.vision/api/v3/depth?symbol=ETHBTC&limit=50), reloaded every 30 seconds. Show the cumulative bids and asks as step lines with faint fills, and the volume at each price as faint columns. Add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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
    focusable: true, // the chart can be reached with the Tab key
    panX: false,     // no dragging to pan, sideways...
    panY: false,     // ...or up and down...
    wheelX: "none",  // ...and the mouse wheel...
    wheelY: "none"   // ...does nothing: the whole order book stays in view
  })
);

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "value",
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 70 // at least 70px between labels; on narrow screens some are skipped
  }),
  tooltip: am5.Tooltip.new(root, {}) // a price label follows the cursor along the axis
}));

// Prices come in as text: show them as numbers with five decimals
xAxis.get("renderer").labels.template.adapters.add("text", function(text, target) {
  if (target.dataItem) {
    return root.numberFormatter.format(Number(target.dataItem.get("category")), "#.00000");
  }
  return text;
});

// Axis title
xAxis.children.push(am5.Label.new(root, {
  text: "Price (BTC per ETH)",
  x: am5.p50,      // in the middle of the axis...
  centerX: am5.p50 // ...anchored by its center
}));

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Axis title
// unshift makes the title the axis's first child, so it sits left of the labels
yAxis.children.unshift(am5.Label.new(root, {
  text: "Volume (ETH)",
  rotation: -90,   // reads bottom to top
  y: am5.p50,      // halfway up the axis...
  centerX: am5.p50 // ...centered on that point (the label is turned)
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

var bidsTotalVolume = chart.series.push(am5xy.StepLineSeries.new(root, {
  minBulletDistance: 10,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "bidstotalvolume",
  categoryXField: "value",
  stroke: root.interfaceColors.get("positive"), // the theme's color for positive values, green by default
  fill: root.interfaceColors.get("positive"),   // the area below the steps in the same color
  tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "horizontal", // the tooltip sits beside the cursor point, not above it
    // [width: 120px] gives each caption the same width, so the values line up
    labelText: "[width: 120px]Bid:[/][bold]{categoryX}[/]\n[width: 120px]Total volume:[/][bold]{valueY}[/]\n[width: 120px]Volume:[/][bold]{bidsvolume}[/]"
  })
}));
bidsTotalVolume.strokes.template.set("strokeWidth", 2) // a 2px line
bidsTotalVolume.fills.template.setAll({
  visible: true,   // fill the area under the steps...
  fillOpacity: 0.2 // ...faintly
});

var asksTotalVolume = chart.series.push(am5xy.StepLineSeries.new(root, {
  minBulletDistance: 10,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "askstotalvolume",
  categoryXField: "value",
  stroke: root.interfaceColors.get("negative"), // the theme's color for negative values, red by default
  fill: root.interfaceColors.get("negative"),   // the area below the steps in the same color
  tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "horizontal", // the tooltip sits beside the cursor point, not above it
    labelText: "[width: 120px]Ask:[/][bold]{categoryX}[/]\n[width: 120px]Total volume:[/][bold]{valueY}[/]\n[width: 120px]Volume:[/][bold]{asksvolume}[/]"
  })
}));
asksTotalVolume.strokes.template.set("strokeWidth", 2) // a 2px line
asksTotalVolume.fills.template.setAll({
  visible: true,   // fill the area under the steps...
  fillOpacity: 0.2 // ...faintly
});

// Volume at each price. The fill is the theme's contrast color (black, or white in
// dark mode), faded, so the columns show on any background.
var bidVolume = chart.series.push(am5xy.ColumnSeries.new(root, {
  minBulletDistance: 10,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "bidsvolume",
  categoryXField: "value",
  fill: root.interfaceColors.get("alternativeBackground")
}));
bidVolume.columns.template.set("fillOpacity", 0.2);

var asksVolume = chart.series.push(am5xy.ColumnSeries.new(root, {
  minBulletDistance: 10,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "asksvolume",
  categoryXField: "value",
  fill: root.interfaceColors.get("alternativeBackground")
}));
asksVolume.columns.template.set("fillOpacity", 0.2);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis // the cursor snaps to the prices on this axis
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// Data loader
function loadData() {
  // the top 50 bids and asks for ETH/BTC from Binance's public API
  am5.net.load("https://data-api.binance.vision/api/v3/depth?symbol=ETHBTC&limit=50").then(function(result) {
    var data = am5.JSONParser.parse(result.response); // turn the response text into an object
    parseData(data);
  }).catch(function() {
    // Failed to load
    // Using drop-in data
    parseData({
      "asks" : [ [ "0.07070", 1.0 ], [ "0.07071", 1.654 ], [ "0.07076", 0.61 ], [ "0.07077", 1.2 ], [ "0.07093", 0.584 ], [ "0.07095", 0.005 ], [ "0.07098", 0.01 ], [ "0.07100", 0.653 ], [ "0.07105", 6.0 ], [ "0.07107", 0.002 ], [ "0.07110", 0.022 ], [ "0.07113", 0.001 ], [ "0.07115", 0.001 ], [ "0.07117", 0.001 ], [ "0.07119", 0.001 ], [ "0.07123", 0.001 ], [ "0.07124", 0.002 ], [ "0.07125", 0.001 ], [ "0.07127", 0.001 ], [ "0.07129", 0.001 ], [ "0.07130", 0.001 ], [ "0.07131", 0.001 ], [ "0.07133", 0.001 ], [ "0.07135", 0.002 ], [ "0.07137", 0.001 ], [ "0.07139", 0.001 ], [ "0.07141", 0.001 ], [ "0.07143", 0.001 ], [ "0.07145", 0.001 ], [ "0.07147", 0.004 ], [ "0.07148", 6.311 ], [ "0.07149", 0.001 ], [ "0.07150", 10.03 ], [ "0.07151", 0.001 ], [ "0.07153", 0.001 ], [ "0.07155", 0.001 ], [ "0.07157", 0.001 ], [ "0.07159", 0.001 ], [ "0.07161", 0.001 ], [ "0.07162", 0.238 ], [ "0.07163", 0.001 ], [ "0.07164", 0.584 ], [ "0.07165", 0.541 ], [ "0.07167", 0.001 ], [ "0.07169", 0.001 ], [ "0.07171", 0.001 ], [ "0.07173", 0.001 ], [ "0.07175", 0.017 ], [ "0.07177", 0.001 ], [ "0.07179", 0.001 ] ],
      "bids" : [ [ "0.07060", 1.001 ], [ "0.07059", 1.544 ], [ "0.07056", 0.61 ], [ "0.07053", 0.002 ], [ "0.07048", 1.2 ], [ "0.07040", 0.05 ], [ "0.07031", 0.663 ], [ "0.07024", 0.005 ], [ "0.07020", 5.99 ], [ "0.07010", 0.022 ], [ "0.07006", 0.001 ], [ "0.07005", 0.003 ], [ "0.07000", 1.0 ], [ "0.06993", 0.002 ], [ "0.06990", 6.15 ], [ "0.06989", 0.519 ], [ "0.06986", 0.001 ], [ "0.06983", 0.024 ], [ "0.06980", 0.031 ], [ "0.06978", 0.01 ], [ "0.06977", 0.81 ], [ "0.06975", 0.053 ], [ "0.06970", 0.022 ], [ "0.06967", 0.531 ], [ "0.06962", 0.017 ], [ "0.06955", 0.004 ], [ "0.06953", 0.002 ], [ "0.06951", 0.031 ], [ "0.06950", 10.0 ], [ "0.06933", 0.301 ], [ "0.06932", 0.606 ], [ "0.06931", 0.022 ], [ "0.06929", 0.015 ], [ "0.06924", 2.48 ], [ "0.06923", 0.5 ], [ "0.06922", 0.2 ], [ "0.06921", 0.5 ], [ "0.06918", 0.03 ], [ "0.06915", 0.001 ], [ "0.06912", 0.069 ], [ "0.06911", 0.002 ], [ "0.06905", 0.003 ], [ "0.06900", 20.39 ], [ "0.06899", 0.002 ], [ "0.06897", 0.242 ], [ "0.06886", 0.808 ], [ "0.06880", 0.026 ], [ "0.06872", 1.0 ], [ "0.06868", 0.005 ], [ "0.06862", 0.584 ] ],
      "isFrozen" : "0",
      "postOnly" : "0",
      "seq" : 67767369
    })
  });
}

// one data row per price, from both bids and asks, for the axis and all four series
function parseData(data) {
  // The chart may have been removed while the data was on its way
  if (root.isDisposed()) {
    return;
  }
  var res = [];
  processData(data.bids, "bids", true, res);  // bids first, in rising price order...
  processData(data.asks, "asks", false, res); // ...then the asks above them
  xAxis.data.setAll(res);                     // one category per price
  bidsTotalVolume.data.setAll(res);
  asksTotalVolume.data.setAll(res);
  bidVolume.data.setAll(res);
  asksVolume.data.setAll(res);
}

loadData();

// Load fresh data every 30 seconds
setInterval(loadData, 30000);

// Function to process (sort and calculate cumulative volume)
function processData(list, type, desc, res) {

  // Convert to data points
  for(var i = 0; i < list.length; i++) {
    list[i] = {
      value: Number(list[i][0]),
      volume: Number(list[i][1]),
    }
  }

  // Sort list just in case
  list.sort(function(a, b) {
    if (a.value > b.value) {
      return 1;
    }
    else if (a.value < b.value) {
      return -1;
    }
    else {
      return 0;
    }
  });

  // Calculate cumulative volume
  if (desc) {
    // bids add up from the highest price down, each one put in front of the last
    for(var i = list.length - 1; i >= 0; i--) {
      if (i < (list.length - 1)) {
        list[i].totalvolume = list[i+1].totalvolume + list[i].volume;
      }
      else {
        list[i].totalvolume = list[i].volume;
      }
      var dp = {};
      dp["value"] = list[i].value;
      dp[type + "volume"] = list[i].volume;
      dp[type + "totalvolume"] = list[i].totalvolume;
      res.unshift(dp);
    }
  }
  else {
    // asks add up from the lowest price up, each one put after the last
    for(var i = 0; i < list.length; i++) {
      if (i > 0) {
        list[i].totalvolume = list[i-1].totalvolume + list[i].volume;
      }
      else {
        list[i].totalvolume = list[i].volume;
      }
      var dp = {};
      dp["value"] = list[i].value;
      dp[type + "volume"] = list[i].volume;
      dp[type + "totalvolume"] = list[i].totalvolume;
      res.push(dp);
    }
  }

}
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
