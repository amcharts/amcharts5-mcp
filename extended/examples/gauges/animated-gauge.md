---
title: "Animated Gauge"
source: "https://www.amcharts.com/demos/animated-gauge/"
category: "gauges"
scraped: "2026-10-08"
---

A percentage gauge whose arc fills up to the needle: below the value one color, above it another. Every two seconds the needle, the fill and the number move to a new value together.

When a filling gauge works: Filling the arc up to the value makes the reading visible from across a room: you see how full the gauge is before you read the number. It suits values with a natural maximum, like a share of a goal, a capacity or progress.

Good for:
- Progress towards a goal
- Capacity, like disk space or seats sold
- Wall screens read from a distance

Think twice when:
- Values with no natural maximum
- Several values at once: a solid gauge fits more
- Small changes: a percent or two barely moves the fill

Prompt: Create a half-circle gauge from 0 to 100 percent whose thick band changes color at the current value, with an outlined hand and the value shown in its pin. Every 2 seconds the hand and the color change move together to a random value. Use the amCharts 5 library with its Responsive theme.

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
    panX: false,     // the gauge doesn't pan when dragged
    panY: false,
    startAngle: 180, // the arc starts on the left...
    endAngle: 360    // ...and goes over the top to the right
  })
);

chart.getNumberFormatter().set("numberFormat", "#'%'"); // numbers as whole percents

// Create axis and its renderer
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
var axisRenderer = am5radar.AxisRendererCircular.new(root, {
  // a negative inner radius counts in from the rim: the scale is a 40px wide band
  innerRadius: -40
});

axisRenderer.grid.template.setAll({
  stroke: root.interfaceColors.get("background"),
  visible: true, // show the grid lines
  strokeOpacity: 0.8
});

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0,    // the scale can't be panned past its ends
    min: 0,             // the scale runs from 0...
    max: 100,           // ...to 100
    strictMinMax: true, // exactly, not rounded out to nicer numbers
    renderer: axisRenderer
  })
);

// Add clock hand
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
var axisDataItem = xAxis.makeDataItem({});

var clockHand = am5radar.ClockHand.new(root, {
  pinRadius: 50,            // a 50px circle in the middle
  radius: am5.percent(100), // the hand reaches the outer edge of the band
  innerRadius: 50,          // and starts 50px out, at the circle's edge
  bottomWidth: 0,           // no width at either end:
  topWidth: 0               // the hand is just a thin line
});

// Outlines only, in the text color, so they show on light and dark backgrounds
clockHand.pin.setAll({
  fillOpacity: 0,
  strokeOpacity: 0.5,     // half-transparent
  stroke: root.interfaceColors.get("text"),
  strokeWidth: 1,
  strokeDasharray: [2, 2] // a dotted circle
});
clockHand.hand.setAll({
  fillOpacity: 0,
  strokeOpacity: 0.5,
  stroke: root.interfaceColors.get("text"),
  strokeWidth: 0.5 // a hairline
});

var bullet = axisDataItem.set(
  "bullet",
  am5xy.AxisBullet.new(root, {
    sprite: clockHand
  })
);

xAxis.createAxisRange(axisDataItem);

// the number in the middle of the gauge
var label = chart.radarContainer.children.push(
  am5.Label.new(root, {
    centerX: am5.percent(50), // centered on the gauge's center
    textAlign: "center",
    centerY: am5.percent(50),
    fontSize: "1.5em"         // 1.5 times the chart's text size
  })
);

axisDataItem.set("value", 50); // the hand starts halfway
// update the number on every step of the hand's turn, so it counts along with it
bullet.get("sprite").on("rotation", function () {
  var value = axisDataItem.get("value"); // where the hand points right now, mid-turn too
  label.set("text", Math.round(value).toString() + "%");
});

// every 2 seconds, turn the hand to a random value and move the colors with it
setInterval(function () {
  var value = Math.round(Math.random() * 100);

  axisDataItem.animate({
    key: "value",
    to: value,
    duration: 500, // the hand takes half a second to turn
    easing: am5.ease.out(am5.ease.cubic)
  });

  axisRange0.animate({
    key: "endValue", // the first range ends at the new value...
    to: value,
    duration: 500,
    easing: am5.ease.out(am5.ease.cubic)
  });

  axisRange1.animate({
    key: "value", // ...and the second starts there
    to: value,
    duration: 500,
    easing: am5.ease.out(am5.ease.cubic)
  });
}, 2000);

var colorSet = am5.ColorSet.new(root, {}); // colors from the theme

// two filled ranges split the band at the hand: the timer above moves the point where they meet
var axisRange0 = xAxis.createAxisRange(
  xAxis.makeDataItem({
    above: true, // drawn on top of the grid lines
    value: 0,    // from the start of the scale...
    endValue: 50 // ...to where the hand starts
  })
);

axisRange0.get("axisFill").setAll({
  visible: true,             // axis fills are hidden by default
  fill: colorSet.getIndex(0) // the first theme color up to the hand
});

axisRange0.get("label").setAll({
  forceHidden: true // no extra label at the range's start
});

var axisRange1 = xAxis.createAxisRange(
  xAxis.makeDataItem({
    above: true,  // drawn on top of the grid lines
    value: 50,    // from the hand...
    endValue: 100 // ...to the end of the scale
  })
);

axisRange1.get("axisFill").setAll({
  visible: true,             // axis fills are hidden by default
  fill: colorSet.getIndex(4) // a different theme color after the hand
});

axisRange1.get("label").setAll({
  forceHidden: true // no extra label at the range's start
});

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
