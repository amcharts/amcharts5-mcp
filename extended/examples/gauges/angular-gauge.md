---
title: "Angular Gauge"
source: "https://www.amcharts.com/demos/angular-gauge/"
category: "gauges"
scraped: "2026-10-08"
---

The classic gauge: a needle on a half-circle dial from 0 to 100, like a speedometer. It shows one value and how far along its range it is.

When a gauge works: A gauge shows a single value against its range, the way a speedometer does. It is familiar and quick to read, which makes it a good headline on a dashboard. It takes a lot of room for one number, so keep it for the few values that matter most.

Good for:
- One headline KPI on a dashboard
- Live readings: speed, load, temperature
- Scores out of a fixed maximum

Think twice when:
- Many values: a bar chart shows them in less space
- Trends: a line chart shows where the value came from
- Values with no fixed range

Prompt: Create a simple angular gauge: a half-circle dial from 0 to 100 with a needle that moves to a random value every 2 seconds. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,     // the gauge doesn't pan when dragged
  panY: false,
  startAngle: 180, // the arc starts on the left...
  endAngle: 360    // ...and goes over the top to the right
}));

// Create axis and its renderer
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
var axisRenderer = am5radar.AxisRendererCircular.new(root, {
  // a negative inner radius counts in from the rim: the grid lines become 10px marks on the edge
  innerRadius: -10,
  strokeOpacity: 0.1 // a faint line along the arc
});

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,    // the scale can't be panned past its ends
  min: 0,             // the scale runs from 0...
  max: 100,           // ...to 100
  strictMinMax: true, // exactly, not rounded out to nicer numbers
  renderer: axisRenderer
}));

// Add clock hand
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
// the hand is the bullet of an axis range: animating the range's value turns the hand
var axisDataItem = xAxis.makeDataItem({});
axisDataItem.set("value", 0); // the hand starts at 0

var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: am5radar.ClockHand.new(root, {
    radius: am5.percent(99) // the hand reaches almost to the scale
  })
}));

xAxis.createAxisRange(axisDataItem);

// hide the range's own grid line, so only the hand shows
axisDataItem.get("grid").set("visible", false);

// every 2 seconds, turn the hand to a random value
setInterval(function () {
  axisDataItem.animate({
    key: "value",
    to: Math.round(Math.random() * 100), // a random value from 0 to 100
    duration: 800,                       // the hand takes 0.8 seconds to turn
    easing: am5.ease.out(am5.ease.cubic) // slowing down as it arrives
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
