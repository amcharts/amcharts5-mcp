---
title: "Animated XY Bubble Timeline Chart"
source: "https://www.amcharts.com/demos/animated-xy-bubble-timeline-chart/"
category: "xy-bubble"
scraped: "2026-10-08"
---

Fifty bubbles with made-up values wander across four colored quadrants as the years run from 1953 to 2025. Press play to watch them move and grow, or drag the slider to any year.

When to animate a bubble chart: Animation adds time to a bubble chart, and quadrants give the movement a meaning: crossing a line means moving into another group, like from low growth to high. It suits a story told in a talk or on a page. To compare two years exactly, show them side by side instead.

Good for:
- Portfolio maps: growth against market share
- Items that move from one quadrant to another
- Telling a story year by year

Think twice when:
- Exact values for a given year: use a table or a still chart
- Many more bubbles: the motion turns into noise
- Quadrant lines with no real meaning: plain axes are more honest

Prompt: Create an animated bubble chart of 50 bubbles with made-up values that drift from 1953 to 2025, on a plot split into four colored quadrants, with the year in large faint text and a play button and a slider that run through the years. Use the amCharts 5 library with its Responsive theme.

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

var yearData = {};
var firstYear = 1953;
var lastYear = 2025;
var currentYear = firstYear; // the year on show

// random data: 50 bubbles a year, each moving a little from where it was the year before
for (var year = firstYear; year <= lastYear; year++) {
  var data = [];
  yearData[year] = data;

  for (var i = 0; i < 50; i++) {
    if (year == firstYear) {
      data.push({
        x: Math.round(Math.random() * 100 - 90), // a random start between -90 and 10
        y: Math.round(Math.random() * 100 - 90),
        value: Math.round(Math.random() * 1000)
      });
    } else {
      var previous = yearData[year - 1][i];
      data.push({
        // a small random step, drifting up and to the right
        x: previous.x + Math.round(Math.random() * 5 - 2 + i / 50),
        y: previous.y + Math.round(Math.random() * 5 - 2 + i / 50),
        // the size changes a little too, never below zero
        value: Math.abs(previous.value + Math.round(Math.random() * 100 - 45))
      });
    }
  }
}

// Stack the chart and the play controls under it
root.container.set("layout", root.verticalLayout);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,       // drag the plot to pan sideways...
  panY: true,       // ...and up and down
  wheelY: "zoomXY", // the mouse wheel zooms in on both axes
  pinchZoomX:true,  // pinch to zoom on touch screens, both ways
  pinchZoomY:true
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: -100, // the axis runs from -100...
  max: 100, // ...to 100
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }), // at least 50px between labels
  tooltip: am5.Tooltip.new(root, {}) // the cursor shows its x value on the axis
}));

// Skip the first label, which would run into the Y axis label in the corner,
// and the last one, which the vertical scrollbar would cover
xAxis.get("renderer").labels.template.setAll({
  minPosition: 0.02,
  maxPosition: 0.98
});

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: -100,                         // the same -100 to 100 range
  max: 100,
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {}) // the cursor shows its y value on the axis
}));

// color fills
// each quadrant is a filled square drawn by a line series without a line, in its own color from the theme
// (every third color of the chart's color set, so neighboring quadrants differ clearly)
chart.get("colors").set("step", 3);

var series0 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "ax",
  valueYField: "ay"
}));
series0.fills.template.setAll({ fillOpacity: 0.9, visible: true }); // show the fill, nearly opaque
series0.strokes.template.set("forceHidden", true); // no outline
series0.data.setAll([ // the upper left quadrant, reaching past the axis ends
  { ax: -200, ay: 0 },
  { ax: 0, ay: 0 },
  { ax: 0, ay: 200 },
  { ax: -200, ay: 200 }
]);

var series1 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "ax",
  valueYField: "ay"
}));
series1.fills.template.setAll({ fillOpacity: 0.9, visible: true });
series1.strokes.template.set("forceHidden", true);
series1.data.setAll([ // the lower left quadrant
  { ax: -200, ay: 0 },
  { ax: 0, ay: 0 },
  { ax: 0, ay: -200 },
  { ax: -200, ay: -200 }
]);

var series2 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "ax",
  valueYField: "ay"
}));
series2.fills.template.setAll({ fillOpacity: 0.9, visible: true });
series2.strokes.template.set("forceHidden", true);
series2.data.setAll([ // the lower right quadrant
  { ax: 200, ay: 0 },
  { ax: 0, ay: 0 },
  { ax: 0, ay: -200 },
  { ax: 200, ay: -200 }
]);

var series3 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "ax",
  valueYField: "ay"
}));
series3.fills.template.setAll({ fillOpacity: 0.9, visible: true });
series3.strokes.template.set("forceHidden", true);
series3.data.setAll([ // the upper right quadrant
  { ax: 200, ay: 0 },
  { ax: 0, ay: 0 },
  { ax: 0, ay: 200 },
  { ax: 200, ay: 200 }
]);

// The grid lines on a layer of their own, drawn over the color fills
xAxis.get("renderer").grid.template.set("layer", 1);
yAxis.get("renderer").grid.template.set("layer", 1);

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  calculateAggregates: true, // finds the lowest and highest value, for the heat rule below
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  valueField: "value"
}));

series.strokes.template.set("visible", false); // no line between the points, only the bubbles

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
var circleTemplate = am5.Template.new({}); // one template for all circles, so the heat rule can size them
series.bullets.push(function () {
  var bulletCircle = am5.Circle.new(root, {
    radius: 5,        // the heat rule replaces this
    fill: root.interfaceColors.get("alternativeBackground"), // the theme's text color: dark on light, light on dark
    fillOpacity: 0.6, // see-through, so overlaps show
    // values are rounded: while the years play, they are in between two years' data
    tooltipText: "x: {valueX.formatNumber('#.')}, y: {valueY.formatNumber('#.')}, value: {value.formatNumber('#,###.')}"
  }, circleTemplate);
  return am5.Bullet.new(root, {
    sprite: bulletCircle
  });
});

// Add heat rule
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
// a fixed maxValue, so the sizes don't scale to each year's largest value
series.set("heatRules", [{
  target: circleTemplate,
  min: 3,                      // the smallest bubble has a 3px radius...
  max: 35,                     // ...the biggest 35px
  dataField: "value",
  key: "radius", maxValue:2000 // sets the radius; a value of 2000 gets the biggest
}]);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis
}));

// Add scrollbars
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // zoom and pan along x...
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical" // ...and along y
}));

// Label
var label = chart.plotContainer.children.push(am5.Label.new(root, {
  text: currentYear.toString(), // the year on show
  fontSize: "5em",              // five times the chart's text size
  fill: root.interfaceColors.get("alternativeBackground"), // the theme's text color
  opacity: 0.3                  // faint, so the bubbles show through
}));

// Create controls: a play button and a year slider under the chart, clear of the bubbles
var container = root.container.children.push(am5.Container.new(root, {
  width: am5.percent(100),       // the full width under the chart
  layout: root.horizontalLayout, // the button and the slider side by side
  paddingTop: 10,                // space between the chart and the controls
  paddingLeft: 40,               // room at both ends
  paddingRight: 40,
  // leave the controls out of exported images
  exportable: false
}));

var playButton = container.children.push(am5.Button.new(root, {
  themeTags: ["play"], // the theme makes it a play button that turns to pause when active
  centerY: am5.p50,    // lined up with the slider
  marginRight: 20,     // space before the slider
  icon: am5.Graphics.new(root, {
    themeTags: ["icon"] // the play and pause icon from the theme
  })
}));

// play from where the slider is, or pause
playButton.events.on("click", function () {
  if (playButton.get("active")) {
    // pause: setting start directly stops its running animation
    slider.set("start", slider.get("start") + 0.0001);
  } else {
    slider.animate({
      key: "start",
      to: 1, // move the grip to the end...
      duration: 15000 * (1 - slider.get("start")) // ...in 15 seconds for the whole timeline, less from part-way
    });
  }
});

var slider = container.children.push(am5.Slider.new(root, {
  orientation: "horizontal",
  start: 0,        // the grip starts at the first year
  centerY: am5.p50 // lined up with the button
}));

// at the end, the button goes back to play
slider.on("start", function (start) {
  if (start === 1) {
    playButton.set("active", false);
  }
});

// show the year the grip points at
slider.events.on("rangechanged", function () {
  updateSeriesData(
    firstYear + Math.round(slider.get("start", 0) * (lastYear - firstYear))
  );
});

// swap in a year's data point by point, so each bubble moves to its new spot
function updateSeriesData(year) {
  if (currentYear != year) {
    currentYear = year;
    var data = yearData[year];

    var i = 0;
    am5.array.each(data, function (item) {
      series.data.setIndex(i, item);
      i++;
    });

    label.set("text", year.toString());
  }
}

series.data.setAll(yearData[currentYear]);

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
  max-width: 100%;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
