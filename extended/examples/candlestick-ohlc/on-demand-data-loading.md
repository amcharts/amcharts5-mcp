---
title: "On-Demand Data Loading"
source: "https://www.amcharts.com/demos/on-demand-data-loading/"
category: "candlestick-ohlc"
scraped: "2026-10-08"
---

A candlestick chart with volume that fetches its data from the server only as needed: it starts with 50 days and loads more as you drag back in time. The buttons under it switch to hourly or monthly candles.

When to load data on demand: Years of hourly prices are too much to send to every visitor at once. Loading only the stretch in view keeps the first load small: the chart asks the server for more when the reader pans or zooms past what it has, at the granularity the buttons pick.

Good for:
- Long price histories in fine detail
- Data that lives in a database or behind an API
- Dashboards that must open fast

Think twice when:
- A few thousand points: load them once, it is simpler
- Slow connections: the chart is empty until each piece arrives
- Charts that must work offline: bundle the data with the page

Prompt: Create a candlestick chart with a volume panel below that loads its data on demand: it starts with recent daily prices from a server and fetches earlier or later data as users pan and zoom. Add buttons for hourly, daily and monthly data, a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// =========================================================
// Setting up the chart
// =========================================================

// Create root element
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

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,                  // drag the plot sideways to pan; more data loads at the ends
  panY: false,                 // but not up and down
  wheelX: "panX",              // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",             // ...and the vertical wheel zooms in on the dates
  layout: root.verticalLayout, // the chart's parts are stacked top to bottom
  pinchZoomX: true,            // pinch with two fingers to zoom on a touch screen
  paddingLeft: 0               // the value labels sit at the chart's left edge
}));

chart.get("colors").set("step", 2); // every second theme color

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var valueAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom" // drag along the value labels to zoom
  }),
  height: am5.percent(70) // the price axis takes the top 70% of the plot
}));

valueAxis.get("renderer").labels.template.setAll({
  centerY: am5.percent(100), // labels sit just above their grid lines
  maxPosition: 0.98          // hide a label at the very top edge
});

valueAxis.axisHeader.children.push(am5.Label.new(root, { // a header above the axis, with its name
  text: "Value",
  fontWeight: "bold", // bold...
  paddingBottom: 5,   // ...with 5px above...
  paddingTop: 5       // ...and below
}));

var volumeAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom" // drag along the value labels to zoom
  }),
  height: am5.percent(30), // the volume axis takes the bottom 30%
  layer: 5,
  numberFormat: "#a"       // short numbers: 1.5M instead of 1500000
}));

volumeAxis.get("renderer").labels.template.setAll({
  centerY: am5.percent(100), // labels sit just above their grid lines
  maxPosition: 0.98          // hide a label at the very top edge
});

volumeAxis.axisHeader.set("paddingTop", 10);              // a 10px gap above the volume header
volumeAxis.axisHeader.children.push(am5.Label.new(root, { // the axis name in the header
  text: "Volume",
  fontWeight: "bold",
  paddingTop: 5,
  paddingBottom: 5
}));

var dateAxis = chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  // lets the chart pan past the loaded data, which is what makes it load more
  maxDeviation: 1,
  baseInterval: { timeUnit: "day", count: 1 }, // one candle per day; loadData() can switch the unit
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // fainter grid lines between the labeled ones
    pan: "zoom"             // drag along the date labels to zoom
  }),
  tooltip: am5.Tooltip.new(root, {}) // a date label follows the cursor along the axis
}));

dateAxis.get("renderer").labels.template.setAll({
  minPosition: 0.01, // hide labels at the very ends...
  maxPosition: 0.99  // ...of the date axis
});

// a base color; the candles still get the theme's rise and fall colors
var color = root.interfaceColors.get("background");

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var valueSeries = chart.series.push(
  am5xy.CandlestickSeries.new(root, {
    fill: color,
    clustered: false,          // not placed side by side with the volume columns
    calculateAggregates: true, // works out values such as the change in the tooltip
    stroke: color,
    name: "STCK",
    xAxis: dateAxis,
    yAxis: valueAxis,
    valueYField: "close",
    openValueYField: "open",
    lowValueYField: "low",
    highValueYField: "high",
    valueXField: "date",
    // a grouped candle takes the lowest low, the highest high, the first open and the last close
    lowValueYGrouped: "low",
    highValueYGrouped: "high",
    openValueYGrouped: "open",
    valueYGrouped: "close",
    // the legend shows the hovered candle's prices...
    legendValueText: "open: {openValueY} low: {lowValueY} high: {highValueY} close: {valueY}",
    legendRangeValueText: "{valueYClose}" // ...and the last close while the cursor is off the chart
  })
);

// the theme's colors for up (positive) and down (negative), for the change in the tooltip
var upColor = root.interfaceColors.get("positive").toCSSHex();
var downColor = root.interfaceColors.get("negative").toCSSHex();

var valueTooltip = valueSeries.set("tooltip", am5.Tooltip.new(root, {
  getFillFromSprite: false,         // the tooltip doesn't take the candle's fill...
  getStrokeFromSprite: true,        // ...but its outline takes the candle's color...
  getLabelFillFromSprite: true,     // ...and so does its text...
  autoTextColor: false,             // ...kept as is, not swapped for black or white
  pointerOrientation: "horizontal", // the tooltip sits beside the candle
  // the change from the previous candle, in the theme's up color when up and its down color when down
  labelText: "{name}: {valueY} {valueYChangePreviousPercent.formatNumber('[" + upColor + "]+#,###.##|[" + downColor + "]#,###.##|0')}%"
}));
// the tooltip box in the background color
valueTooltip.get("background").set("fill", root.interfaceColors.get("background"));

var firstColor = chart.get("colors").getIndex(0); // the theme's first color, for the volume columns
var volumeSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "STCK",
  clustered: false, // not placed side by side with the candles
  fill: firstColor,
  stroke: firstColor,
  valueYField: "volume",
  valueXField: "date",
  valueYGrouped: "sum", // a grouped column adds up the volumes
  xAxis: dateAxis,
  yAxis: volumeAxis,
  legendValueText: "{valueY}", // the legend shows the hovered volume
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // the tooltip shows the volume
  })
}));

// Add legend to axis header
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-headers/
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var valueLegend = valueAxis.axisHeader.children.push(
  am5.Legend.new(root, {
    useDefaultMarker: true // a plain square marker instead of a copy of the series' look
  })
);
valueLegend.data.setAll([valueSeries]);

var volumeLegend = volumeAxis.axisHeader.children.push(
  am5.Legend.new(root, {
    useDefaultMarker: true // a plain square marker instead of a copy of the series' look
  })
);
volumeLegend.data.setAll([volumeSeries]);

// Stack axes vertically
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Stacked_axes
chart.leftAxesContainer.set("layout", root.verticalLayout);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {}))

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = chart.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal", // a bar above the plot to zoom and scroll...
  height: 50                 // ...50px tall, with a small chart of the prices in it
}));

// the small chart inside the scrollbar gets its own axes and series
var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  baseInterval: { // one point per day to start
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true // minor grid lines, hidden by the theme rule at the top
  })
}));

var sbValueAxis = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {

  valueYField: "close",
  valueXField: "date",
  xAxis: sbDateAxis,
  yAxis: sbValueAxis
}));

sbSeries.fills.template.setAll({
  visible: true,   // fill the area under the line...
  fillOpacity: 0.3 // ...30% opaque
});

// =========================================================
// Data loading
// =========================================================

// actual data loading and handling when it is loaded
function loadData(unit, min, max, side) {

  // round min so that selected unit would be included
  min = am5.time.round(new Date(min), unit, 1).getTime();

  // Load external data
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data
  var url = "https://www.amcharts.com/tools/data/?unit=" + unit + "&start=" + min + "&end=" + max;

  // Handle loaded data
  am5.net.load(url).then(function (result) {

    // Parse loaded data
    var data = am5.CSVParser.parse(result.response, {
      delimiter: ",",      // comma-separated...
      reverse: false,      // ...rows in the order they come...
      skipEmpty: true,     // ...empty lines skipped...
      useColumnNames: true // ...and the first row names the fields
    });

    // Process data (convert dates and values)
    var processor = am5.DataProcessor.new(root, {
      numericFields: ["date", "open", "high", "low", "close", "volume"] // these columns are numbers, not text
    });
    processor.processMany(data);

    var start = dateAxis.get("start"); // the current zoom, to keep it after adding data
    var end = dateAxis.get("end");

    // will hold first/last dates of each series
    var seriesFirst = {};
    var seriesLast = {};

    // Set data
    if (side == "none") {
      if (data.length > 0) {
        // change base interval if it's different
        if (dateAxis.get("baseInterval").timeUnit != unit) {
          dateAxis.set("baseInterval", { timeUnit: unit, count: 1 });
          sbDateAxis.set("baseInterval", { timeUnit: unit, count: 1 });
        }

        dateAxis.set("min", min); // the axis runs exactly over the loaded range...
        dateAxis.set("max", max); // ...from min to max
        dateAxis.setPrivate("min", min);   // needed in order not to animate
        dateAxis.setPrivate("max", max);   // needed in order not to animate

        valueSeries.data.setAll(data);
        volumeSeries.data.setAll(data);
        sbSeries.data.setAll(data);

        dateAxis.zoom(0, 1, 0); // show all of it, without animating
      }
    }
    else if (side == "left") {
      // save dates of first items so that duplicates would not be added
      seriesFirst[valueSeries.uid] = valueSeries.data.getIndex(0).date;
      seriesFirst[volumeSeries.uid] = volumeSeries.data.getIndex(0).date;
      seriesFirst[sbSeries.uid] = sbSeries.data.getIndex(0).date;

      for (var i = data.length - 1; i >= 0; i--) { // the older rows, from the newest back, each added in front
        var date = data[i].date;
        // only add if first items date is bigger then newly added items date
        if (seriesFirst[valueSeries.uid] > date) {
          valueSeries.data.unshift(data[i]);
        }
        if (seriesFirst[volumeSeries.uid] > date) {
          volumeSeries.data.unshift(data[i]);
        }
        if (seriesFirst[sbSeries.uid] > date) {
          sbSeries.data.unshift(data[i]);
        }
      }

      // update axis min
      min = Math.max(min, absoluteMin);
      dateAxis.set("min", min);
      dateAxis.setPrivate("min", min); // needed in order not to animate
      // recalculate start and end so that the selection would remain
      dateAxis.set("start", 0);
      dateAxis.set("end", (end - start) / (1 - start));
    }
    else if (side == "right") {
      // save dates of last items so that duplicates would not be added
      seriesLast[valueSeries.uid] = valueSeries.data.getIndex(valueSeries.data.length - 1).date;
      seriesLast[volumeSeries.uid] = volumeSeries.data.getIndex(volumeSeries.data.length - 1).date;
      seriesLast[sbSeries.uid] = sbSeries.data.getIndex(sbSeries.data.length - 1).date;

      for (var i = 0; i < data.length; i++) { // the newer rows in order, each added at the end
        var date = data[i].date;
        // only add if last items date is smaller then newly added items date
        if (seriesLast[valueSeries.uid] < date) {
          valueSeries.data.push(data[i]);
        }
        if (seriesLast[volumeSeries.uid] < date) {
          volumeSeries.data.push(data[i]);
        }
        if (seriesLast[sbSeries.uid] < date) {
          sbSeries.data.push(data[i]);
        }
      }
      // update axis max
      max = Math.min(max, absoluteMax);
      dateAxis.set("max", max);
      dateAxis.setPrivate("max", max); // needed in order not to animate

      // recalculate start and end so that the selection would remain
      dateAxis.set("start", start / end);
      dateAxis.set("end", 1);
    }
  });
}

// loads more data when the chart has been panned or zoomed past what is loaded
function loadSomeData() {
  var start = dateAxis.get("start"); // the zoom: below 0 or above 1 means panned past the loaded data
  var end = dateAxis.get("end");

  // the dates in view, kept between absoluteMin and absoluteMax
  var selectionMin = Math.max(dateAxis.getPrivate("selectionMin"), absoluteMin);
  var selectionMax = Math.min(dateAxis.getPrivate("selectionMax"), absoluteMax);

  var min = dateAxis.getPrivate("min"); // the loaded range
  var max = dateAxis.getPrivate("max");

  // if start is less than 0, means we are panning to the right, need to load data to the left (earlier days)
  if (start < 0) {
    loadData(currentUnit, selectionMin, min, "left");
  }
  // if end is bigger than 1, means we are panning to the left, need to load data to the right (later days)
  if (end > 1) {
    loadData(currentUnit, max, selectionMax, "right");
  }
}

// The buttons under the chart take the chart's text color, so they follow its theme, light or dark
document.getElementById("tools").style.color = root.interfaceColors.get("text").toCSS();

// Button handlers
var activeButton = document.getElementById("btn_d"); // the button of the current unit
document.getElementById("btn_h").addEventListener("click", function () {
  if (currentUnit != "hour") {
    setActiveButton(this);
    currentUnit = "hour";
    loadData("hour", dateAxis.getPrivate("selectionMin"), dateAxis.getPrivate("selectionMax"), "none");
  }
})

document.getElementById("btn_d").addEventListener("click", function () {
  if (currentUnit != "day") {
    setActiveButton(this);
    currentUnit = "day";
    loadData("day", dateAxis.getPrivate("selectionMin"), dateAxis.getPrivate("selectionMax"), "none");
  }
})

document.getElementById("btn_m").addEventListener("click", function () {
  if (currentUnit != "month") {
    setActiveButton(this);
    currentUnit = "month";
    loadData("month", dateAxis.getPrivate("selectionMin"), dateAxis.getPrivate("selectionMax"), "none");
  }
})

// marks the clicked button as the active one
function setActiveButton(button) {
  if (activeButton) {
    activeButton.className = "";
  }
  activeButton = button;
  button.className = "active";
}

var currentDate = new Date(); // now
var currentUnit = "day";      // the time unit of the data on screen

// initially load 50 days
var min = currentDate.getTime() - am5.time.getDuration("day", 50);
var max = currentDate.getTime();

// limit to the data's extremes
var absoluteMax = max;
var absoluteMin = new Date(2000, 0, 1, 0, 0, 0, 0);

// load data when panning ends
chart.events.on("panended", function () {
  loadSomeData();
});

var wheelTimeout;
chart.events.on("wheelended", function () {
  // load data with some delay when wheel ends, as this is event is fired a lot
  // if we already set timeout for loading, dispose it
  if (wheelTimeout) {
    wheelTimeout.dispose();
  }

  wheelTimeout = chart.setTimeout(function () { // cleared on its own if the chart is disposed
    loadSomeData();
  }, 50);
});

// load some initial data
loadData("day", min, max, "none");

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 500);
```

## HTML

```html
<div id="chartdiv"></div>
<div id="tools">
  Select data granularity
  <input type="button" value="1 hour" id="btn_h">
  <input type="button" value="1 day" id="btn_d" class="active">
  <input type="button" value="1 month" id="btn_m">
</div>
```

## CSS

```css
/* the demo page sets --chart-h to fit the window; elsewhere the chart is 500px tall */
#chartdiv {
  width: 100%;
  height: var(--chart-h, 500px);
  max-width: 100%;
  font-size: 0.875rem;
}

#tools {
  padding: 0.3em 1em;
  text-align: right;
  max-width: 100%;
}

#tools input {
  margin-left: 4px;
  padding: 4px 10px;
  font: inherit;
  color: inherit;
  background: none;
  border: 1px solid rgba(128, 128, 128, 0.5);
  border-radius: 6px;
  cursor: pointer;
}

#tools input.active {
  font-weight: bold;
  border-color: currentColor;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
