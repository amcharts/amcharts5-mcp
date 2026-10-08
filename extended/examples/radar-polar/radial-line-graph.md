---
title: "Radial Line Graph"
source: "https://www.amcharts.com/demos/radial-line-graph/"
category: "radar-polar"
scraped: "2026-10-08"
---

A line chart wrapped around a circle, January at the top and the months running clockwise. Heating and cooling at home peak in opposite seasons, so the two lines point opposite ways.

When a radial line graph works: Wrapping a year around a circle puts December next to January, so a season that runs over New Year stays in one piece. Seasonal patterns become shapes that lean towards their months. To follow a trend across many years, a straight line chart is easier to read.

Good for:
- Seasons: energy use, sales, visitors
- Comparing two things that peak at different times
- Daily cycles: traffic or temperature by hour

Think twice when:
- Trends over many years: use a straight line chart
- Data with no repeating cycle
- Precise values: distances on a circle are hard to judge

Prompt: Create a radial line graph of a house’s monthly energy use over a year (sample data), with one line for heating and one for cooling, the month names around the circle, round bullets and a legend. Use the amCharts 5 library with its Responsive theme.

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
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false, // no dragging the plot around
  // a vertical layout puts the legend under the chart
  layout: root.verticalLayout,
  panY: false,
  wheelX: "panX", // a horizontal wheel or trackpad swipe moves a zoomed view around...
  wheelY: "zoomX" // ...and the vertical wheel zooms in on some months
}));

// heating and cooling two colors apart, not neighbors in the theme
chart.get("colors").set("step", 3);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX" // drag around the circle to zoom in on some months
}));

cursor.lineY.set("visible", false); // no circle through the pointer, only the line from the center

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.1, // can be panned only 10% past the first and last month
  groupData: false,  // every month is shown, never merged into longer periods
  baseInterval: {    // one point per month
    timeUnit: "month",
    count: 1
  },
  renderer: am5radar.AxisRendererCircular.new(root, {
    minGridDistance: 30 // at least 30px between the month labels
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the month under the pointer at the edge
}));

// month names only: the year doesn't matter on a ring that repeats every year
xAxis.get("periodChangeDateFormats")["month"] = "MMM";
xAxis.get("tooltipDateFormats")["month"] = "MMMM"; // the full month name in the axis tooltip

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,                  // the center is zero
  numberFormat: "#' kWh'", // values shown as "500 kWh"
  // the value labels run between December and January, clear of the month names
  renderer: am5radar.AxisRendererRadial.new(root, { axisAngle: -105 })
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
function createSeries(name, field) {
  var series = chart.series.push(am5radar.RadarLineSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: field,
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{name}: {valueY} kWh" // the series name and its value
    })
  }));

  series.strokes.template.setAll({
    strokeWidth: 2 // a 2px line
  });

  // a dot on each month
  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,               // 5px dots
        fill: series.get("fill") // the series color
      })
    });
  });

  return series;
}

var series1 = createSeries("Heating", "heating");
var series2 = createSeries("Cooling", "cooling");

// Add legend: click a name to hide its line
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Legend
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50, // the legend's middle...
  x: am5.p50        // ...at the middle of the chart
}));
legend.data.setAll(chart.series.values);

// Set data: energy a house used for heating and for cooling each month, in kWh (sample data)
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data
var heating = [820, 700, 520, 300, 120, 30, 10, 15, 80, 280, 540, 760];
var cooling = [0, 0, 10, 40, 120, 320, 480, 450, 230, 60, 10, 0];
var data = [];

// one data item per month of 2025, with both values
for (var i = 0; i < 12; i++) {
  data.push({
    date: new Date(2025, i, 1).getTime(),
    heating: heating[i],
    cooling: cooling[i]
  });
}

series1.data.setAll(data);
series2.data.setAll(data);

// Animate chart and series in
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
series1.appear(1000);
series2.appear(1000);
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
