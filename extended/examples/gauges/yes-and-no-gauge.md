---
title: "Yes and No Gauge"
source: "https://www.amcharts.com/demos/yes-and-no-gauge/"
category: "gauges"
scraped: "2026-10-08"
---

A gauge with only two answers: a green YES half and a red NO half. The needle swings from one to the other every two seconds.

When a two-zone gauge works: Some questions have only two answers: on or off, pass or fail, go or no-go. A two-zone gauge gives that answer the weight of a dial, which reads well on a big screen or a status page. If people need the score behind the answer, use a scale with numbers.

Good for:
- Go or no-go decisions
- System status: up or down
- Live polls with two options

Think twice when:
- Anything with a middle ground: use a gauge with bands
- How close a vote is: a bar or a number is more exact
- Readers who can’t tell red from green: the labels must carry it

Prompt: Create a half-circle gauge split into a YES half and a NO half, with no numbers on the scale, and a needle that swings from one side to the other every 2 seconds. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,
  panY: false,
  // a half circle, open at the bottom
  startAngle: 180,
  endAngle: 360
}));

// Create axis and its renderer
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
var axisRenderer = am5radar.AxisRendererCircular.new(root, {
  // a negative inner radius counts in from the outer edge: a band 30px wide
  innerRadius: -30,
  strokeOpacity: 0.1 // a faint line along the arc
});

axisRenderer.labels.template.set("forceHidden", true); // no number labels...
axisRenderer.grid.template.set("forceHidden", true);   // ...and no grid lines

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0, // never panned past its ends
  min: 0,          // a scale from 0 (the left end) to 1 (the right end)...
  max: 1,
  strictMinMax: true, // ...exactly, not rounded
  renderer: axisRenderer
}));

// add yes and no labels
var yesDataItem = xAxis.makeDataItem({});
yesDataItem.set("value", 0);      // the left half...
yesDataItem.set("endValue", 0.5); // ...up to the middle
xAxis.createAxisRange(yesDataItem);
yesDataItem.get("label").setAll({text: "YES", forceHidden:false}); // shown, unlike the axis's own labels
// a solid band in the theme's positive color (green)
yesDataItem.get("axisFill").setAll({visible:true, fillOpacity:1, fill:root.interfaceColors.get("positive")});

var noDataItem = xAxis.makeDataItem({});
noDataItem.set("value", 1);      // the right half, from the right end...
noDataItem.set("endValue", 0.5); // ...to the middle
xAxis.createAxisRange(noDataItem);
noDataItem.get("label").setAll({text: "NO", forceHidden:false});
// a solid band in the theme's negative color (red)
noDataItem.get("axisFill").setAll({visible:true, fillOpacity:1, fill:root.interfaceColors.get("negative")});

// Add clock hand
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
var axisDataItem = xAxis.makeDataItem({});
axisDataItem.set("value", 0.25); // the hand starts in the middle of the YES half

var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: am5radar.ClockHand.new(root, {
    radius: am5.percent(99) // the hand reaches almost to the outer edge
  })
}));

xAxis.createAxisRange(axisDataItem);

axisDataItem.get("grid").set("visible", false); // no grid line under the hand

// every 2 seconds the hand swings to the middle of the other side
let value = 0.25;
setInterval(function() {
  if (value == 0.25) {
    value = 0.75;
  }
  else {
    value = 0.25;
  }

  axisDataItem.animate({
    key: "value",
    to: value,
    duration: 800,                       // it takes 0.8 seconds...
    easing: am5.ease.out(am5.ease.cubic) // ...slowing down at the end
  });
}, 2000);

// Make stuff animate on load
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
