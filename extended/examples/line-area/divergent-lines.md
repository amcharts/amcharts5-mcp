---
title: "Divergent Lines"
source: "https://www.amcharts.com/demos/divergent-lines/"
category: "line-area"
scraped: "2026-10-08"
---

One solid line for what has happened, then three dashed lines for what might: a projection, and what easing or tightening the rules could do by December.

When lines divide: A divergent line chart shows one history and several futures. Starting every scenario from the last real value makes clear where the facts end and the guesses begin, and the dashes keep the forecasts from passing as data.

Good for:
- Forecasts with best and worst cases
- Budget or sales plans under different assumptions
- Showing what a decision could change

Think twice when:
- More than three or four scenarios: the fan gets crowded
- Forecasts with a known margin of error: a shaded band shows it better
- Readers who may take a forecast for fact: label it clearly

Prompt: Create a smoothed line chart of monthly values for 2025: a solid line of observed data from January to July, then three dashed lines that start from July and diverge until December (easing rules, stricter rules and a projection). Add a legend, a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,                  // drag the plot sideways to pan...
  panY: true,                  // ...or up and down
  wheelX: "panX",              // a horizontal wheel or trackpad swipe pans
  wheelY: "zoomX",             // the vertical wheel zooms in on the months
  layout: root.verticalLayout, // the legend on top, the plot under it
  pinchZoomX:true              // pinch to zoom on touch screens
}));

// Data
var data = [{
  "date": new Date(2025, 0, 1).getTime(),
  "observed": 0
}, {
  "date": new Date(2025, 1, 1).getTime(),
  "observed": 4000
}, {
  "date": new Date(2025, 2, 1).getTime(),
  "observed": 55000
}, {
  "date": new Date(2025, 3, 1).getTime(),
  "observed": 220000
}, {
  "date": new Date(2025, 4, 1).getTime(),
  "observed": 390000
}, {
  "date": new Date(2025, 5, 1).getTime(),
  "observed": 550000
}, {
  "date": new Date(2025, 6, 1).getTime(),
  "observed": 720000,
  // the three outlooks start at the last observed value, so their lines branch off here
  "easing": 720000,
  "projection": 720000,
  "stricter": 720000
}, {
  "date": new Date(2025, 7, 1).getTime(),
  "easing": 900000,
  "projection": 900000,
  "stricter": 900000
}, {
  "date": new Date(2025, 8, 1).getTime(),
  "easing": 1053000,
  "projection": 1053000,
  "stricter": 1053000
}, {
  "date": new Date(2025, 9, 1).getTime(),
  "easing": 1252000,
  "projection": 1249000,
  "stricter": 1232000
}, {
  "date": new Date(2025, 10, 1).getTime(),
  "easing": 1674000,
  "projection": 1604000,
  "stricter": 1415000
}, {
  "date": new Date(2025, 11, 1).getTime(),
  "easing": 3212000,
  "projection": 2342000,
  "stricter": 1751000
}];

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.3, // pan up to 30% of the visible range past the first and last month
  baseInterval: {    // one point per month
    timeUnit: "month",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // fainter grid lines between the labeled months
    minGridDistance: 60     // at least 60px between labels; on narrow screens some are skipped
  }),
  tooltip: am5.Tooltip.new(root, {}) // the cursor shows the month on the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3, // the values can be panned 30% past their range too
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function createSeries(field, name, color, dashed) {
  var series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: field,
    valueXField: "date",
    stroke: color, // the line's own color
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal", // the tooltip sits beside the line
      // the tooltip takes the line's color, set below, rather than the series' fill
      getFillFromSprite: false,
      // the name in bold, then the month and the value
      labelText: "[bold]{name}[/]\n{valueX}: [bold]{valueY}[/]"
    })
  }));

  series.get("tooltip").get("background").setAll({
    fillOpacity: 0.7, // a see-through box...
    fill: color,      // ...in the line's color
    // no pointer: a plain box beside the cursor
    pointerBaseWidth: 0
  });

  series.strokes.template.setAll({
    strokeWidth: 2 // a 2px line
  });

  if (dashed) {
    series.strokes.template.set("strokeDasharray", [5, 5]); // dashed: 5px dash, 5px gap
  }

  series.data.setAll(data);
  series.appear(1000);

  return series;
}

// Colors from the theme, every third one so the lines are easy to tell apart. Observed and Projection share a
// color: the projection carries the observed line on
var colors = chart.get("colors");
createSeries("observed", "Observed", colors.getIndex(0));
createSeries("easing", "Easing rules", colors.getIndex(3), true);
createSeries("stricter", "Stricter rules", colors.getIndex(6), true);
createSeries("projection", "Projection", colors.getIndex(0), true);

// Show dates in tooltips as month and year
// https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/
root.dateFormatter.setAll({
  dateFormat: "MMM yyyy",
  dateFields: ["valueX"]
});

// Add legend above the chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.unshift(
  am5.Legend.new(root, {
    centerX: am5.p50, // the legend's middle...
    x: am5.p50,       // ...at the middle of the chart
    marginBottom: 15  // space between the legend and the plot
  })
);

legend.data.setAll(chart.series.values);

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
