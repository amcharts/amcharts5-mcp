---
title: "Micro Charts & Sparklines"
source: "https://www.amcharts.com/demos/micro-charts-sparklines/"
category: "miscellaneous"
scraped: "2026-10-08"
---

Micro charts are tiny charts with no axes, grid or labels, small enough for a table row. Here, 40 made-up stock tickers, each with a price line and volume columns.

When to use micro charts: A sparkline shows the shape of a trend where a number alone would not: up, down, steady or jumpy, in the space of a word. Many of them side by side, in a table or a dashboard, let readers scan dozens of items and spot the ones that stand out.

Good for:
- Tables of stocks, products or accounts
- Dashboards with many small trends
- The shape of a trend, not its values

Think twice when:
- Exact values or dates: a full chart with axes
- Comparing levels between rows: each line has its own scale
- One trend that matters: give it a proper chart

Prompt: Create a table of about 40 stock tickers as plain HTML rows, each with its change in percent, a small sparkline of the price colored by whether it went up or down, and a micro column chart of the daily volume, from random data. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// the stock tickers, one row each, with random data
var tickers = [
  "AAPL", "ADBE", "ADSK", "AMD", "AMZN", "ARM", "AVGO", "CRM", "CSCO", "COIN",
  "DELL", "DOCU", "EA", "EBAY", "GOOG", "HOOD", "IBM", "INTC", "META", "MSFT",
  "NET", "NFLX", "NVDA", "ORCL", "PLTR", "PYPL", "ROKU", "SAP", "SHOP", "SNAP",
  "SONY", "STX", "T", "TSLA", "TSM", "TXN", "U", "UBER", "WDC", "ZM"
];

var positive = am5.color(0x50b300); // green for rising...
var negative = am5.color(0xdc3545); // ...red for falling

// The rows scroll inside the chart's div
var div = document.getElementById("chartdiv");
div.style.overflow = "auto";

// for each ticker: random data, its change, and a row of text and two micro charts
for (var i = 0; i < tickers.length; i++) {
  var ticker = tickers[i];

  var data = generateData(20);                  // 20 days of random prices and volumes
  // the change from the first day to the last, in percent with one decimal
  var change = Math.round((data[data.length - 1].value / data[0].value - 1) * 1000) / 10;
  var color = change < 0 ? negative : positive; // red when falling, green when rising

  // One row per ticker: name, change, price line, volume columns, laid out
  // as a grid so the columns line up from row to row
  var row = document.createElement("div");
  row.style.display = "grid";
  row.style.gridTemplateColumns = "4.5em 5.5em 1fr 1fr";
  row.style.columnGap = "0.8em";
  row.style.alignItems = "center";
  row.style.padding = "0.3em 0.5em";
  row.style.fontSize = "1.5em";
  div.appendChild(row);

  var col1 = document.createElement("div");
  col1.innerHTML = ticker;
  row.appendChild(col1);

  var col2 = document.createElement("div");
  col2.innerHTML = change + "%";
  col2.style.color = color.toCSSHex(); // the change in red or green...
  col2.style.textAlign = "right";      // ...right-aligned, so the numbers end in line
  row.appendChild(col2);

  var col3 = document.createElement("div");
  col3.style.height = "35px";                     // the micro chart is 35px tall
  row.appendChild(col3);
  var root = createValueChart(col3, data, color); // a price line in the row's color

  var col4 = document.createElement("div");
  col4.style.height = "35px";    // 35px tall too
  row.appendChild(col4);
  createVolumeChart(col4, data); // gray volume columns

  // The ticker and the line under the row take the chart theme's text color,
  // so they show on light and dark backgrounds
  var textColor = root.interfaceColors.get("text");
  col1.style.color = textColor.toCSSHex();
  row.style.borderBottom = "1px solid " + textColor.toCSS(0.12);
}

// Generate random data
function generateData(count) {
  var date = new Date();
  date.setHours(0, 0, 0, 0);
  var value = 20 + Math.round(Math.random() * 80);     // a starting price from 20 to 100
  var volume = 3000 + Math.ceil(Math.random() * 7000); // a starting volume from 3,000 to 10,000

  var data = [];
  for (var i = 0; i < count; ++i) {
    // A random step of up to 3 up or down, so prices rise and fall alike
    value = Math.max(1, Math.round((Math.random() * 6 - 3) + value));
    volume = Math.ceil((Math.random() * 1000 - 500) + volume); // volume moves by up to 500 a day...
    if (volume < 0) { // ...but never below zero
      volume = 0;
    }
    am5.time.add(date, "day", 1);
    data.push({
      date: date.getTime(),
      value: value,
      volume: volume
    });
  }
  return data;
}

// a tiny line chart of the price in the given div
function createValueChart(div, data, color) {
  var root = am5.Root.new(div); // each micro chart is a root of its own, in its own div

  // the Micro theme drops axis labels, grid and padding, to suit a tiny chart
  root.setThemes([
    am5themes_Micro.new(root),
    am5themes_Responsive.new(root)
  ]);

  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,    // no dragging to pan...
    panY: false,    // ...in either direction...
    wheelX: "none", // ...and no wheel zooming...
    wheelY: "none"  // ...at all
  }));

  // the mouse wheel scrolls the rows instead of being caught by the chart
  chart.plotContainer.set("wheelable", false);
  chart.zoomOutButton.set("forceHidden", true); // never show the zoom-out button

  var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    maxDeviation: 0, // no panning past the first or last day
    baseInterval: { timeUnit: "day", count: 1 }, // one point per day
    renderer: am5xy.AxisRendererX.new(root, {})
  }));

  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    // no rounding to nice numbers, so the line fills the height, with 2% to spare
    strictMinMax: true,
    extraMax: 0.02,
    extraMin: 0.02,
    renderer: am5xy.AxisRendererY.new(root, {})
  }));

  var series = chart.series.push(am5xy.LineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    stroke: color // red or green, by the change
  }));

  series.strokes.template.setAll({
    strokeWidth: 2 // a 2px line
  });

  series.data.setAll(data);
  return root; // returned so the row can read the theme's text color
}

// tiny volume columns in the given div, also with a root of its own
function createVolumeChart(div, data) {
  var root = am5.Root.new(div);

  root.setThemes([
    am5themes_Micro.new(root),
    am5themes_Responsive.new(root)
  ]);

  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "none",
    wheelY: "none"
  }));

  chart.plotContainer.set("wheelable", false);  // the mouse wheel scrolls the rows, as above
  chart.zoomOutButton.set("forceHidden", true); // never show the zoom-out button

  var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    maxDeviation: 0, // no panning past the first or last day
    baseInterval: { timeUnit: "day", count: 1 }, // one column per day
    renderer: am5xy.AxisRendererX.new(root, {})
  }));

  // Volume columns start at zero, so a short column means a quiet day
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    min: 0,
    renderer: am5xy.AxisRendererY.new(root, {})
  }));

  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "volume",
    valueXField: "date",
    // the color that contrasts with the background, so the columns show in light and dark themes alike
    fill: root.interfaceColors.get("alternativeBackground")
  }));

  series.columns.template.setAll({
    fillOpacity: 0.35, // faded to a gray...
    strokeOpacity: 0   // ...with no outline
  });

  series.data.setAll(data);
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
- https://cdn.amcharts.com/lib/5/themes/Micro.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
