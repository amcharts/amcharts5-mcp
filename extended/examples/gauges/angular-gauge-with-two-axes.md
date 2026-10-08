---
title: "Angular Gauge with Two Axes"
source: "https://www.amcharts.com/demos/angular-gauge-with-two-axes/"
category: "gauges"
scraped: "2026-10-08"
---

One dial, two scales: the inner one runs to 160 and the outer one to 240, each with its own needle and readout in matching colors.

When to share a dial: Two scales on one dial save room when two readings belong together, like the same speed in two units or two related sensors. Matching colors tie each needle to its scale and readout. With more than two readings, give each its own gauge.

Good for:
- The same reading in two units
- Two related sensors, like inlet and outlet
- Compact dashboards with paired readings

Think twice when:
- Scales people might mix up: label them clearly
- More than two needles: use separate gauges
- Small sizes: two rings of labels get crowded

Prompt: Create a half-circle gauge with two scales of different ranges, one inside the arc and one outside, each with its own color, its own needle and a readout of its value above the center. Every 2 seconds both needles move to random values. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,            // the gauge doesn't pan when dragged
  panY: false,
  startAngle: 180,        // the arc starts on the left...
  endAngle: 360,          // ...and goes over the top to the right
  radius: am5.percent(90) // the dial fills 90% of the space
}));

// Colors
var colors = am5.ColorSet.new(root, {
  // skip every other color, so the two scales differ more
  step: 2
});

// Measurement #1

// Axis
var color1 = colors.next();

var axisRenderer1 = am5radar.AxisRendererCircular.new(root, {
  // the inner scale: 10px inside the outer one, with its ticks and labels on its inner side
  radius: -10,
  stroke: color1,   // the axis line in the first color
  strokeOpacity: 1, // fully opaque
  strokeWidth: 6,   // a thick 6px arc
  inside: true
});

axisRenderer1.grid.template.setAll({
  forceHidden: true // no grid lines across the dial
});

axisRenderer1.ticks.template.setAll({
  stroke: color1, // ticks in the axis color
  visible: true,  // ticks are hidden by default
  length: 10,     // 10px long
  strokeOpacity: 1,
  inside: true    // pointing inward
});

axisRenderer1.labels.template.setAll({
  radius: 15,  // 15px away from the arc
  inside: true // on the arc's inner side
});

var xAxis1 = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,    // the scale can't be panned past its ends
  min: 0,             // the inner scale runs from 0...
  max: 160,           // ...to 160
  strictMinMax: true, // exactly, not rounded out to nicer numbers
  renderer: axisRenderer1
}));

// Label
// the first readout, a number in a colored box
var label1 = chart.seriesContainer.children.push(am5.Label.new(root, {
  fill: am5.color(0xffffff), // white text
  width: 100, // a fixed 100px box
  centerX: am5.percent(50), // centered on its position...
  textAlign: "center", // ...with the text centered in the box
  centerY: am5.percent(50), // ...and vertically
  fontSize: "2em", // twice the chart's text size
  text: "0", // the readout before the first value arrives
  background: am5.RoundedRectangle.new(root, { // a rounded box behind the number...
    fill: color1 // ...in the first scale's color
  })
}));

// Add clock hand
// the hand is the bullet of an axis range: animating the range's value turns the hand
var axisDataItem1 = xAxis1.makeDataItem({
  value: 0, // the hand starts at 0
  fill: color1,
  name: "Measurement #1"
});

var clockHand1 = am5radar.ClockHand.new(root, {
  pinRadius: 14,           // the round pin at the center, 14px
  radius: am5.percent(98), // the hand reaches almost to the scale
  bottomWidth: 10          // 10px wide at the base, tapering to the tip
});

clockHand1.pin.setAll({
  fill: color1 // the pin...
});

clockHand1.hand.setAll({
  fill: color1 // ...and the hand in the first scale's color
});

var bullet1 = axisDataItem1.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: clockHand1
}));

xAxis1.createAxisRange(axisDataItem1);

// hide the range's own grid line and tick, so only the hand shows
axisDataItem1.get("grid").set("forceHidden", true);
axisDataItem1.get("tick").set("forceHidden", true);

// Measurement #2

// Axis
var color2 = colors.next();

// the outer scale, with its ticks and labels outside the arc
var axisRenderer2 = am5radar.AxisRendererCircular.new(root, {
  stroke: color2, // the axis line in the second color
  strokeOpacity: 1,
  strokeWidth: 6  // a thick 6px arc
});

axisRenderer2.grid.template.setAll({
  forceHidden: true // no grid lines across the dial
});

axisRenderer2.ticks.template.setAll({
  stroke: color2,
  visible: true, // ticks are hidden by default
  length: 10,    // 10px long
  strokeOpacity: 1
});

axisRenderer2.labels.template.setAll({
  radius: 15 // 15px outside the arc
});

var xAxis2 = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,
  min: 0,             // the outer scale runs from 0...
  max: 240,           // ...to 240
  strictMinMax: true, // exactly, not rounded out to nicer numbers
  renderer: axisRenderer2
}));

// Label
// the second readout, in the second scale's color
var label2 = chart.seriesContainer.children.push(am5.Label.new(root, {
  fill: am5.color(0xffffff),
  width: 100,
  centerX: am5.percent(50),
  textAlign: "center",
  centerY: am5.percent(50),
  fontSize: "2em",
  text: "0",
  background: am5.RoundedRectangle.new(root, {
    fill: color2
  })
}));

// Add clock hand
// the second hand, on the outer scale
var axisDataItem2 = xAxis2.makeDataItem({
  value: 0,
  fill: color2,
  name: "Measurement #2"
});

var clockHand2 = am5radar.ClockHand.new(root, {
  pinRadius: 10, // smaller than the first pin, so both pins show
  radius: am5.percent(98),
  bottomWidth: 10
});

clockHand2.pin.setAll({
  fill: color2
});

clockHand2.hand.setAll({
  fill: color2
});

var bullet2 = axisDataItem2.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: clockHand2
}));

xAxis2.createAxisRange(axisDataItem2);

// hide the range's own grid line and tick, as for the first hand
axisDataItem2.get("grid").set("forceHidden", true);
axisDataItem2.get("tick").set("forceHidden", true);

// Keep the readouts in proportion to the dial, so they fit on small screens too
chart.plotContainer.events.on("boundschanged", function () {
  var radius = chart.getPrivate("radius", 0); // the dial's radius in pixels
  var scale = Math.min(1, radius / 300);      // shrink the readouts on a dial smaller than 300px
  // left of the center, a little above it
  label1.setAll({ x: -radius * 0.24, y: -radius * 0.14, scale: scale });
  label2.setAll({ x: radius * 0.24, y: -radius * 0.14, scale: scale }); // right of the center
});

// Animate values
setInterval(function () {
  var value1 = Math.round(Math.random() * 160); // a random value on the inner scale
  axisDataItem1.animate({
    key: "value",
    to: value1,
    duration: 1000,                      // the hand takes a second to turn
    easing: am5.ease.out(am5.ease.cubic) // slowing down as it arrives
  });

  label1.set("text", value1); // the readout jumps to the new value

  var value2 = Math.round(Math.random() * 240); // a random value on the outer scale
  axisDataItem2.animate({
    key: "value",
    to: value2,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });

  label2.set("text", value2);
}, 2000) // every 2 seconds

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
