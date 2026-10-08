---
title: "Animated Bullet at the End of the Series"
source: "https://www.amcharts.com/demos/animated-bullet-at-the-end-of-the-series/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart that draws the eye to its latest value: the last point pulses like a live signal, while the dashed line keeps the history in the background.

When a pulsing point helps: Movement catches the eye, so one pulsing point says "look here" without a label. It suits numbers that update, like a price or a sensor reading, where the newest value matters most.

Good for:
- Live prices, readings and counters
- Dashboards on a wall screen
- Marking today on a forecast

Think twice when:
- More than one pulsing point: they compete
- Reports and print: the motion is lost
- Pages read for a long time: constant motion tires the eye

Prompt: Create a dashed line chart of a week of daily values with a pulsing marker on the last point: a circle with a ring around it that keeps growing and fading out, once a second. Add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,      // drag the plot sideways to pan
  panY: true,      // ...or up and down
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans
  wheelY: "zoomX", // the vertical wheel zooms in on the dates
  pinchZoomX:true, // pinch to zoom on touch screens
  paddingLeft: 0   // the value labels sit at the chart's left edge
}));

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
  // the chart can be panned up to 30% past the ends of the data
  maxDeviation: 0.3,
  baseInterval: { // one data point per day
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // fainter grid lines between the labeled dates
    minGridDistance: 70     // at least 70px between labels; on narrow screens some are skipped
  }),
  tooltip: am5.Tooltip.new(root, {}) // the cursor shows the date on the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3, // the values can be panned up to 30% past their range too
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}" // the hovered day's value
  })
}));
series.strokes.template.setAll({
  strokeWidth: 2,         // a 2px line...
  strokeDasharray: [3, 3] // ...dashed: 3px dash, 3px gap
});

// Create animating bullet by adding two circles in a bullet container and
// animating radius and opacity of one of them.
series.bullets.push(function(root, series, dataItem) {
  // only the data item marked "bullet: true" (the last point) gets one
  if (dataItem.dataContext.bullet) {
    var container = am5.Container.new(root, {});
    var circle0 = container.children.push(am5.Circle.new(root, {
      radius: 5, // a 5px red dot that stays put
      fill: am5.color(0xff0000)
    }));
    // a second dot on top of it, which grows and fades out
    var circle1 = container.children.push(am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000)
    }));

    circle1.animate({
      key: "radius",
      to: 20, // grows to a 20px radius...
      duration: 1000, // ...in one second
      easing: am5.ease.out(am5.ease.cubic), // fast at first, slowing down
      loops: Infinity // over and over
    });
    circle1.animate({
      key: "opacity",
      to: 0, // ...while fading out
      from: 1,
      duration: 1000,
      easing: am5.ease.out(am5.ease.cubic),
      loops: Infinity
    });

    return am5.Bullet.new(root, {
      sprite: container
    })
  }
})

// Set data
var data = [{
  date: new Date(2025, 5, 12).getTime(),
  value: 50
}, {
  date: new Date(2025, 5, 13).getTime(),
  value: 53
}, {
  date: new Date(2025, 5, 14).getTime(),
  value: 56
}, {
  date: new Date(2025, 5, 15).getTime(),
  value: 52
}, {
  date: new Date(2025, 5, 16).getTime(),
  value: 48
}, {
  date: new Date(2025, 5, 17).getTime(),
  value: 47
}, {
  date: new Date(2025, 5, 18).getTime(),
  value: 59,
  bullet: true
}]

series.data.setAll(data);

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
