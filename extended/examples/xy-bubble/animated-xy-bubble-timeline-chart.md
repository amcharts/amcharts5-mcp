---
title: "Animated XY Bubble Timeline chart"
source: "https://www.amcharts.com/demos/animated-xy-bubble-timeline-chart/"
category: "xy-bubble"
scraped: "2026-03-15"
---

Animating changes in data is a great way to convey trends over time that would require series of charts or overcrowding one static chart. amCharts has all the tools you need to create animated timelines.
Key implementation details
There's a lot going on in this chart, so lets focus on the essence related to the title of this demo. The key here is the slider at the bottom. Whenever the location of the slider thumb changes the rangechanged event is fired and we adjust the data slice our series are bound to. The play button just animates the start position of the slider range.
XY chart
Bullets
Slider
Animations

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

var yearData = {};
var firstYear = 1950;
var lastYear = 2022;
var currentYear = firstYear;

for (var year = firstYear; year <= lastYear; year++) {
  var data = [];
  yearData[year] = data;

  for (var i = 0; i < 50; i++) {
    if (year == firstYear) {
      data.push({
        x: Math.round(Math.random() * 100 - 90),
        y: Math.round(Math.random() * 100 - 90),
        value: Math.round(Math.random() * 1000)
      });
    } else {
      var previous = yearData[year - 1][i];
      data.push({
        x: previous.x + Math.round(Math.random() * 5 - 2 + i / 50),
        y: previous.y + Math.round(Math.random() * 5 - 2 + i / 50),
        value: Math.abs(previous.value + Math.round(Math.random() * 100 - 45))
      });
    }
  }
}

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelY: "zoomXY",
  pinchZoomX:true,
  pinchZoomY:true
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: -100,
  max: 100,
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: -100,
  max: 100,
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));

// color fills
var series0 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "ax",
  valueYField: "ay",
  fill: am5.color(0xe3853c)
}));
series0.fills.template.setAll({ fillOpacity: 0.9, visible: true });
series0.strokes.template.set("forceHidden", true);
series0.data.setAll([
  { ax: -200, ay: 0 },
  { ax: 0, ay: 0 },
  { ax: 0, ay: 200 },
  { ax: -200, ay: 200 }
]);

var series1 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "ax",
  valueYField: "ay",
  fill: am5.color(0x48b2b7)
}));
series1.fills.template.setAll({ fillOpacity: 0.9, visible: true });
series1.strokes.template.set("forceHidden", true);
series1.data.setAll([
  { ax: -200, ay: 0 },
  { ax: 0, ay: 0 },
  { ax: 0, ay: -200 },
  { ax: -200, ay: -200 }
]);

var series2 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "ax",
  valueYField: "ay",
  fill: am5.color(0x91d1da)
}));
series2.fills.template.setAll({ fillOpacity: 0.9, visible: true });
series2.strokes.template.set("forceHidden", true);
series2.data.setAll([
  { ax: 200, ay: 0 },
  { ax: 0, ay: 0 },
  { ax: 0, ay: -200 },
  { ax: 200, ay: -200 }
]);

var series3 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "ax",
  valueYField: "ay",
  fill: am5.color(0xe8c634)
}));
series3.fills.template.setAll({ fillOpacity: 0.9, visible: true });
series3.strokes.template.set("forceHidden", true);
series3.data.setAll([
  { ax: 200, ay: 0 },
  { ax: 0, ay: 0 },
  { ax: 0, ay: 200 },
  { ax: 200, ay: 200 }
]);

// move grid forward
chart.plotContainer.children.moveValue(
  chart.gridContainer,
  chart.plotContainer.children.length - 1
);

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  calculateAggregates: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  valueField: "value"
}));

series.strokes.template.set("visible", false);

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
var circleTemplate = am5.Template.new({});
series.bullets.push(function () {
  var bulletCircle = am5.Circle.new(root, {
    radius: 5,
    fill: am5.color(0x000000),
    fillOpacity: 0.6,
    tooltipText: "x: {valueX} y:{valueY} value: {value}"
  }, circleTemplate);
  return am5.Bullet.new(root, {
    sprite: bulletCircle
  });
});

// Add heat rule
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
series.set("heatRules", [{
  target: circleTemplate,
  min: 3,
  max: 35,
  dataField: "value",
  key: "radius", maxValue:2000
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
  orientation: "horizontal"
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical"
}));

// Label
var label = chart.plotContainer.children.push(am5.Label.new(root, {
  text: currentYear.toString(),
  fontSize: "5em",
  fill: am5.color(0x000000),
  opacity: 0.3
}));

// Create controls
var container = chart.plotContainer.children.push(am5.Container.new(root, {
  y: am5.p100,
  centerX: am5.p50,
  centerY: am5.p100,
  x: am5.p50,
  width: am5.percent(90),
  layout: root.horizontalLayout,
  paddingBottom: 10
}));

var playButton = container.children.push(am5.Button.new(root, {
  themeTags: ["play"],
  centerY: am5.p50,
  marginRight: 20,
  icon: am5.Graphics.new(root, {
    themeTags: ["icon"]
  })
}));

playButton.events.on("click", function () {
  if (playButton.get("active")) {
    slider.set("start", slider.get("start") + 0.0001);
  } else {
    slider.animate({
      key: "start",
      to: 1,
      duration: 15000 * (1 - slider.get("start"))
    });
  }
});

var slider = container.children.push(am5.Slider.new(root, {
  orientation: "horizontal",
  start: 0,
  centerY: am5.p50
}));

slider.on("start", function (start) {
  if (start === 1) {
    playButton.set("active", false);
  }
});

slider.events.on("rangechanged", function () {
  updateSeriesData(
    firstYear + Math.round(slider.get("start", 0) * (lastYear - firstYear))
  );
});

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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
