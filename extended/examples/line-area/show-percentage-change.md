---
title: "Show Percentage Change"
source: "https://www.amcharts.com/demos/show-percentage-change/"
category: "line-area"
scraped: "2026-10-08"
---

Two prices drawn as percent change, so both start from the same zero and you see which grew faster. Change since sets where the change is counted from: the first day in view, or the first day of the data.

When to show change instead of value: Percent change puts series of different sizes on one scale: a $20 stock and a $200 one both start at 0%, so the faster riser is plain to see. Counting from the first day in view tells how each did over the stretch you are looking at; counting from the start shows the whole history.

Good for:
- Comparing stocks, funds or currencies
- Growth of products or regions of different size
- How each did since a chosen date

Think twice when:
- When the actual levels matter more than growth
- Values close to zero: tiny bases give huge percentages
- Data that can go negative, like profit

Prompt: Create a line chart of two price series over about two years, shown as percent change from the first visible day, so the change counts again from the new start as you zoom or scroll. The legend and tooltips show each price and its change, colored for a gain or a loss. Add a cursor and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,       // a drag pans the dates...
  panY: true,       // ...and the values
  wheelX: "panX",   // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",  // ...and the vertical wheel zooms in on the dates
  pinchZoomX: true, // pinch to zoom the dates on a touch screen
  paddingLeft: 0    // no gap at the chart's left edge
}));

chart.get("colors").set("step", 5); // every fifth theme color, so the two lines differ more

// Text for tooltips and the legend: the value, then its change in percent,
// in the theme's colors for up (positive) and down (negative)
var upColor = root.interfaceColors.get("positive").toCSSHex();
var downColor = root.interfaceColors.get("negative").toCSSHex();

// the number format has three parts, for positive, negative and zero values
function changeText(field) {
  return "${valueY} {" + field + ".formatNumber('[" + upColor + "]+0.00|[" + downColor + "]0.00|0.00')}%";
}

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none" // a drag pans the chart instead of zooming
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// Generate random data
var date = new Date();
var value;

// one day of data: the value moves up to 1 up or down from the day before
function generateData() {
  value = am5.math.round((Math.random() * 2 - 1) + value, 2);
  am5.time.add(date, "day", 1); // the next day
  return {
    date: date.getTime(),
    value: value
  };
}

// count days of random data, from January 1, 2023
function generateDatas(count) {
  // start somewhere between 50 and 100
  value = 50 + Math.random() * 50;
  date.setFullYear(2023, 0, 1);
  date.setHours(0, 0, 0, 0);
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.2, // pan or zoom out past the data's ends by up to 20% of the view
  baseInterval: {    // one data point a day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 70 // at least 70px between the date labels
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's date on the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom" // drag along the axis to zoom it
  }),
  numberFormat: "#'%'" // a percent sign after each label; quoted, so it doesn't multiply by 100
}));

// Add legend in the plot area, at the top left: it shows the values at the cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.plotContainer.children.push(am5.Legend.new(root, {
  x: 10,                       // 10px in from the plot's left edge...
  y: 10,                       // ...and top edge
  layout: root.verticalLayout, // one series per row
  paddingTop: 4,               // space between the text and the legend's box
  paddingBottom: 4,
  paddingLeft: 8,
  paddingRight: 8,
  // a see-through box in the background color keeps the text readable over the lines
  background: am5.RoundedRectangle.new(root, {
    fill: root.interfaceColors.get("background"),
    fillOpacity: 0.7
  })
}));

// a fixed width, so the legend doesn't change size as the numbers change
legend.valueLabels.template.set("width", 120);

// adds a line series with its own tooltip and random data, and lists it in the legend
function createSeries(name) {
  var tooltip = am5.Tooltip.new(root, {
    getStrokeFromSprite: true, // the tooltip's outline takes the line's color...
    getFillFromSprite: false,  // ...but not its fill
    autoTextColor: false,      // the text color is set below, not picked automatically
    labelText: changeText("valueYChangeSelectionPercent") // value and change since the first day in view
  });

  // plain background and text colors, so the green and red numbers stay readable
  tooltip.get("background").setAll({
    fill: root.interfaceColors.get("background")
  });
  tooltip.label.set("fill", root.interfaceColors.get("text"));

  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.LineSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    // works out the change values, like valueYChangeSelectionPercent
    calculateAggregates: true,
    valueYField: "value",
    valueXField: "date",
    // the line shows the change in percent from the first day in view, not the value itself
    valueYShow: "valueYChangeSelectionPercent",
    legendValueText: changeText("valueYChangeSelectionPercent"), // the same text in the legend
    tooltip: tooltip
  }));

  // The legend and the tooltip show the change the series shows: valueYChangeSelectionPercent counts from the first
  // day in view, valueYChangePercent from the first day of the data
  series.on("valueYShow", function (field) {
    series.set("legendValueText", changeText(field));
    tooltip.set("labelText", changeText(field));
  });

  // Set data
  var data = generateDatas(800); // 800 days
  series.data.setAll(data);
  series.appear(1000);

  legend.data.push(series);
}

createSeries("Series one");
createSeries("Series two");

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // above the plot; zooms the dates
}));

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
  max-width: 100%;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
