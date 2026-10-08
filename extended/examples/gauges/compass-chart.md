---
title: "Compass Chart"
source: "https://www.amcharts.com/demos/compass-chart/"
category: "gauges"
scraped: "2026-10-08"
---

A compass made from a gauge: the dial with N, E, S and W turns, while the needle stays put and points at the heading. Every two seconds it swings to a new direction.

When the dial turns instead: Turning the dial instead of the needle keeps the reading in the same spot, the way heading indicators on planes and boats work. It suits directions, wind and bearings, where the scale wraps around with no start or end.

Good for:
- Headings and bearings
- Wind direction
- Any value that wraps around, like an angle

Think twice when:
- Values with a start and an end: use a regular gauge
- Direction over time: a polar chart shows the pattern
- Readers who expect the needle to move

Prompt: Create a compass from a circular gauge, with the eight main directions and fine degree ticks around the dial, and a north-south needle that stays still while the dial beneath it turns to a random heading every 2 seconds. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    panX: false,     // the compass doesn't pan when dragged
    panY: false,
    startAngle: -90, // the circle starts at the top...
    endAngle: 270    // ...and goes all the way round
  })
);

// Create axis and its renderer
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
var axisRenderer = am5radar.AxisRendererCircular.new(root, {
  strokeOpacity: 1, // a solid ring...
  strokeWidth: 5,   // ...5px thick
  minGridDistance: 10
});
axisRenderer.ticks.template.setAll({
  forceHidden: true // no ticks, grid lines or labels of its own: createLabel adds them
});
axisRenderer.grid.template.setAll({
  forceHidden: true
});

axisRenderer.labels.template.setAll({ forceHidden: true });

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,             // the dial runs from 0...
    max: 360,           // ...to 360 degrees
    strictMinMax: true, // exactly, not rounded out
    renderer: axisRenderer
  })
);

// Add clock hand
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
// north
var axisDataItemN = xAxis.makeDataItem({ value: 0 }); // north at 0 degrees

var clockHandN = am5radar.ClockHand.new(root, {
  pinRadius: 0,            // no pin in the middle
  radius: am5.percent(90), // nearly to the ring
  bottomWidth: 40          // 40px wide at the base: one half of the needle
});

clockHandN.hand.set("fill", am5.color(0xff0000)); // the north half is red
// do not change angle at all
clockHandN.adapters.add("rotation", function () {
  return -90;
});

axisDataItemN.set(
  "bullet",
  am5xy.AxisBullet.new(root, {
    sprite: clockHandN
  })
);

xAxis.createAxisRange(axisDataItemN);

//south
var axisDataItemS = xAxis.makeDataItem({ value: 180 }); // south at 180 degrees

var clockHandS = am5radar.ClockHand.new(root, {
  pinRadius: 0,
  radius: am5.percent(90),
  bottomWidth: 40
});

// do not change angle at all
clockHandS.adapters.add("rotation", function () {
  return 90;
});

axisDataItemS.set(
  "bullet",
  am5xy.AxisBullet.new(root, {
    sprite: clockHandS
  })
);

xAxis.createAxisRange(axisDataItemS);

// an axis range for each mark: a label and a tick pointing inward at the given degree
function createLabel(text, value, tickOpacity) {
  var axisDataItem = xAxis.makeDataItem({ value: value });
  xAxis.createAxisRange(axisDataItem);
  var label = axisDataItem.get("label");
  label.setAll({
    text: text,
    forceHidden: false, // show this label, though the axis labels are hidden
    inside: true,       // inside the ring...
    radius: 20          // ...20px in from it
  });

  var tick = axisDataItem
    .get("tick")
    .setAll({
      forceHidden: false,         // show this tick, though the axis ticks are hidden
      strokeOpacity: tickOpacity, // solid or faint, from tickOpacity
      length: 12 * tickOpacity,   // 12px for the main marks, 6px for the others
      visible: true,              // ticks are hidden by default
      inside: true                // pointing inward
    });
}

createLabel("N", 0, 1); // the eight main directions, with full ticks
createLabel("NE", 45, 1);
createLabel("E", 90, 1);
createLabel("SE", 135, 1);
createLabel("S", 180, 1);
createLabel("SW", 225, 1);
createLabel("W", 270, 1);
createLabel("NW", 315, 1);

// shorter, fainter ticks with no label every 5 degrees
for (var i = 0; i < 360; i = i + 5) {
  createLabel("", i, 0.5);
}

// every 2 seconds the dial turns to a random heading under the needle, which keeps pointing up
setInterval(function () {
  var newAngle = Math.random() * 360; // a random heading
  chart.animate({
    key: "startAngle", // turn the dial...
    to: newAngle,
    duration: 1000,    // ...in one second...
    easing: am5.ease.out(am5.ease.cubic)
  });
  chart.animate({
    key: "endAngle",
    to: newAngle + 360, // ...keeping it a full circle
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });
  axisDataItemN.animate({
    key: "value",
    to: am5.math.normalizeAngle(-90 - newAngle), // the value that sits at the top of the turned dial
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });
  axisDataItemS.animate({
    key: "value",
    to: am5.math.normalizeAngle(90 - newAngle), // and the one at its bottom
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
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
