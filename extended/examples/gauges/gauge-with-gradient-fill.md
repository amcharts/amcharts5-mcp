---
title: "Gauge with Gradient Fill"
source: "https://www.amcharts.com/demos/gauge-with-gradient-fill/"
category: "gauges"
scraped: "2026-10-08"
---

A gauge shows one value as a needle on a dial. Here the dial is one arc fading from green to orange, so you see at once how close the value is to its maximum.

When a gradient gauge works: A gradient scale suits values that get gradually better or worse, like load, temperature or risk, where there is no sharp line between good and bad. The eye reads the color under the needle before the number. When fixed thresholds matter, use separate bands instead.

Good for:
- Load, temperature or risk levels
- Status at a glance on a dashboard tile
- Scales with no sharp cut-off points

Think twice when:
- Thresholds people act on: clear bands show them better
- Readers who can’t tell green from orange: add a number
- Several values: a bar chart fits more in less space

Prompt: Create a half-circle gauge from 0 to 100 whose scale is a thick band with a gradient running from safe to dangerous colors, and a needle that moves to a random value every 2 seconds. Use the amCharts 5 library with its Responsive theme.

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
    panX: false, // no dragging
    panY: false,
    // a half circle, open at the bottom
    startAngle: 180,
    endAngle: 360
  })
);

// Create axis and its renderer
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
var axisRenderer = am5radar.AxisRendererCircular.new(root, {
  innerRadius: -10,
  // the axis line itself, 15px wide with a gradient, is the colored arc
  strokeOpacity: 1,
  strokeWidth: 15,
  strokeGradient: am5.LinearGradient.new(root, {
    rotation: 0, // left to right: green to orange
    stops: [
      { color: am5.color(0x19d228) },
      { color: am5.color(0xf4fb16) },
      { color: am5.color(0xf6d32b) },
      { color: am5.color(0xfb7116) }
    ]
  })
});

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,             // the scale runs from 0...
    max: 100,           // ...to 100...
    strictMinMax: true, // ...exactly, not rounded out
    renderer: axisRenderer
  })
);

// Add clock hand
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
var axisDataItem = xAxis.makeDataItem({});
axisDataItem.set("value", 0); // the hand starts at 0

var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: am5radar.ClockHand.new(root, {
    radius: am5.percent(99) // the hand reaches almost to the outer edge
  })
}));

xAxis.createAxisRange(axisDataItem);

// the hand's axis range would also draw a grid line at its value; hide it
axisDataItem.get("grid").set("visible", false);

// every two seconds, the hand moves to a random value from 0 to 100
setInterval(() => {
  axisDataItem.animate({
    key: "value",
    to: Math.round(Math.random() * 100),
    duration: 800,
    easing: am5.ease.out(am5.ease.cubic) // fast start, slow finish
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
