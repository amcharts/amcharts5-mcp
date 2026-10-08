---
title: "Live Stock Data"
source: "https://www.amcharts.com/demos/live-stock-data/"
category: "stock"
scraped: "2026-10-08"
---

A candlestick chart fed by a simulated live feed: a new price every second, a new candle every minute. The label on the price axis follows the latest price, green while it is above the minute’s open and red below.

When a chart updates live: Live prices change by the second, and the chart keeps up by changing only its newest candle: each tick moves its close and stretches its high or low, and the first tick of a new minute opens the next candle. Here the ticks are random; in your app they would come from a WebSocket or a call to your server.

Good for:
- Trading and crypto dashboards
- Live auctions, sensor readings or any ticking value
- Screens left open all day

Think twice when:
- Prices that change once a day: load them once
- Many charts on one page: feed them from one connection
- Long sessions: drop old candles so the data doesn’t grow forever

Prompt: Create a live stock chart of one-minute candles of random prices for a made-up ticker, updated every second: the last candle moves, and a new one starts each minute. Mark the latest price on the value axis with a line and a label that follows it. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

const myTheme = am5.Theme.new(root); // a theme of our own, for the rule below

// hide the minor grid lines in the scrollbar's small chart
myTheme.rule("Grid", ["scrollbar", "minor"]).setAll({
  visible:false
});

root.setThemes([
  am5themes_Animated.new(root),
  myTheme,
  am5themes_Responsive.new(root)
]);

// Create a stock chart
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Instantiating_the_chart
var stockChart = root.container.children.push(
  am5stock.StockChart.new(root, {
    paddingRight: 0 // no gap at the right edge
  })
);

// Set global number format
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/
root.numberFormatter.set("numberFormat", "#,###.00"); // thousands separators, always two decimals

// Create a main stock panel (chart)
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Adding_panels
var mainPanel = stockChart.panels.push(
  am5stock.StockPanel.new(root, {
    wheelY: "zoomX", // the mouse wheel zooms in on the time
    panX: true,      // drag the plot sideways to pan
    panY: true       // and up and down
  })
);

// Create value axis
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var valueAxis = mainPanel.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom" // drag along the value labels to zoom the axis
    }),
    extraMin: 0.1, // adds some space for the main series
    tooltip: am5.Tooltip.new(root, {}), // a price label follows the cursor along the axis
    numberFormat: "#,###.00",           // two decimals on the labels...
    extraTooltipPrecision: 2            // ...and two more in the axis tooltip
  })
);

var dateAxis = mainPanel.xAxes.push(
  am5xy.GaplessDateAxis.new(root, { // no empty space for minutes without data
    baseInterval: { // one candle per minute
      timeUnit: "minute",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      pan: "zoom",           // drag along the time labels to zoom
      minorGridEnabled: true // fainter grid lines between the labeled ones
    }),
    tooltip: am5.Tooltip.new(root, {}) // a time label follows the cursor along the axis
  })
);

// add range which will show current value
var currentValueDataItem = valueAxis.createAxisRange(valueAxis.makeDataItem({ value: 0 }));
var currentLabel = currentValueDataItem.get("label");
if (currentLabel) {
  currentLabel.setAll({
    fill: am5.color(0xffffff), // white text on a box that turns red or green with the price
    background: am5.Rectangle.new(root, { fill: am5.color(0x000000) })
  })
}

var currentGrid = currentValueDataItem.get("grid");
if (currentGrid) {
  currentGrid.setAll({ strokeOpacity: 0.5, strokeDasharray: [2, 5] }); // faint, 2px dashes, 5px gaps
}

// Add series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var valueSeries = mainPanel.series.push(
  am5xy.CandlestickSeries.new(root, {
    // draws the candles straight onto the canvas, faster (no rounded corners or column events)
    turboMode: true,
    name: "AMCH",
    clustered: false, // not placed side by side with other column series
    valueXField: "Date",
    valueYField: "Close",
    highValueYField: "High",
    lowValueYField: "Low",
    openValueYField: "Open",
    calculateAggregates: true, // works out change, high, low and such for the stock tools
    xAxis: dateAxis,
    yAxis: valueAxis,
    legendValueText: // the legend shows the hovered candle's prices
      "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
    legendRangeValueText: "" // and no values while the cursor is off the chart
  })
);

// Set main value series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Setting_main_series
stockChart.set("stockSeries", valueSeries);

// Add a stock legend
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/stock-legend/
var valueLegend = mainPanel.plotContainer.children.push(
  am5stock.StockLegend.new(root, {
    stockChart: stockChart
  })
);

// Set main series
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/stock/#Setting_main_series
valueLegend.data.setAll([valueSeries]);

// Add cursor(s)
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
mainPanel.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    yAxis: valueAxis,            // the cursor works with these axes...
    xAxis: dateAxis,             // ...and snaps to the minutes
    snapToSeries: [valueSeries], // the cursor snaps to the candles...
    snapToSeriesBy: "y!"         // ...the horizontal line to the close of the candle under it
  })
);

// Add scrollbar
// -------------------------------------------------------------------------------
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = mainPanel.set(
  "scrollbarX",
  am5xy.XYChartScrollbar.new(root, {
    orientation: "horizontal", // a strip under the chart...
    height: 50                 // ...50px tall, with a small chart of the price in it
  })
);
// move the scrollbar out of the panel, to the bottom of the stock chart
stockChart.toolsContainer.children.push(scrollbar);

// the small chart inside the scrollbar gets its own axes and series
var sbDateAxis = scrollbar.chart.xAxes.push(
  am5xy.GaplessDateAxis.new(root, {
    baseInterval: {
      timeUnit: "minute", // one point per minute
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true // minor grid lines, hidden by the theme rule at the top
    })
  })
);

var sbValueAxis = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var sbSeries = scrollbar.chart.series.push(
  am5xy.LineSeries.new(root, {
    valueYField: "Close",
    valueXField: "Date",
    xAxis: sbDateAxis,
    yAxis: sbValueAxis
  })
);

sbSeries.fills.template.setAll({
  visible: true,   // fill the area under the line...
  fillOpacity: 0.3 // ...30% opaque
});

// Data generator
var firstDate = new Date(); // the data ends now
var lastDate;
var value = 1200;           // the price starts around 1200

// data
function generateChartData() {
  var chartData = [];

  // 50 candles, one per minute going back from now (unshift keeps them in time order)
  for (var i = 0; i < 50; i++) {
    var newDate = new Date(firstDate);
    newDate.setMinutes(newDate.getMinutes() - i);

    value += Math.round((Math.random() < 0.49 ? 1 : -1) * Math.random() * 10); // a random step of up to 10

    var open = value + Math.round(Math.random() * 16 - 8);            // open within 8 of the close
    var low = Math.min(value, open) - Math.round(Math.random() * 5);  // low a little under both
    var high = Math.max(value, open) + Math.round(Math.random() * 5); // high a little over both

    chartData.unshift({
      Date: newDate.getTime(),
      Close: value,
      Open: open,
      Low: low,
      High: high
    });

    lastDate = newDate;
  }
  return chartData;
}

var data = generateChartData();

// set data to all series
valueSeries.data.setAll(data);
sbSeries.data.setAll(data);

// update data
var previousDate;

// every second: a new price, added to the current minute's candle or starting a new one
setInterval(function () {
  var valueSeries = stockChart.get("stockSeries"); // the stock chart's main series
  var date = Date.now(); // time now
  var lastDataObject = valueSeries.data.getIndex(valueSeries.data.length - 1); // the latest candle
  if (lastDataObject) {
    var previousDate = lastDataObject.Date;
    var previousValue = lastDataObject.Close;

    // the price moves randomly by up to 2 from the last close, rounded to 2 decimals
    value = am5.math.round(previousValue + (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2, 2);

    var high = lastDataObject.High;
    var low = lastDataObject.Low;
    var open = lastDataObject.Open;

    // a new minute starts a new candle, otherwise the last candle is updated
    if (am5.time.checkChange(date, previousDate, "minute")) {
      open = value;
      high = value;
      low = value;

      var dObj1 = {
        Date: date,
        Close: value,
        Open: value,
        Low: value,
        High: value
      };

      valueSeries.data.push(dObj1);
      sbSeries.data.push(dObj1);
      previousDate = date;
    } else {
      if (value > high) { // a new high for this minute
        high = value;
      }

      if (value < low) { // a new low for this minute
        low = value;
      }

      var dObj2 = {
        Date: date,
        Close: value,
        Open: open,
        Low: low,
        High: high
      };

      valueSeries.data.setIndex(valueSeries.data.length - 1, dObj2); // replace the last candle
      sbSeries.data.setIndex(sbSeries.data.length - 1, dObj2);
    }
    // update current value
    if (currentLabel) {
      // the price line glides to the new price, and its label shows it
      currentValueDataItem.animate({ key: "value", to: value, duration: 500, easing: am5.ease.out(am5.ease.cubic) });
      currentLabel.set("text", stockChart.getNumberFormatter().format(value));
      var bg = currentLabel.get("background");
      if (bg) {
        if (value < open) { // below the candle's open: red box, otherwise green
          bg.set("fill", root.interfaceColors.get("negative"));
        }
        else {
          bg.set("fill", root.interfaceColors.get("positive"));
        }
      }
    }
  }
}, 1000);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 600px;
  max-width: 100%;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/stock.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
