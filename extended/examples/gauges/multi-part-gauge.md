---
title: "Multi-Part Gauge"
source: "https://www.amcharts.com/demos/multi-part-gauge/"
category: "gauges"
scraped: "2026-10-08"
---

Four small gauges in one circle: each quarter is its own arc with its own scale, color and needle, so one chart shows four readings side by side.

When to split a gauge: Splitting one circle into parts gives each reading its own scale while keeping them together, so one look covers all four. It suits readings that always go together, like the vital signs of a machine. Each part is short, so keep the scales simple.

Good for:
- A machine’s vital signs on one tile
- Four KPIs with different units
- Status screens with little room

Think twice when:
- Readings that need fine detail: each arc is short
- Comparing the four values: their scales differ
- More than four parts: the arcs get too short

Prompt: Create a gauge made of four separate parts around one circle, with small gaps between them, each with its own range, color and short needle. Every 2 seconds all four needles move to random values within their ranges. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    panX: false,             // no dragging to pan...
    panY: false,             // ...in either direction
    radius: am5.percent(90), // the gauge fills 90% of the space
    // a negative number is pixels in from the outer edge: the scales are a 20px band
    innerRadius: -20
  })
);

// colors come from the theme, every second one so the four parts differ clearly
var colors = am5.ColorSet.new(root, { step: 2 });

// one scale: a value axis on an arc of its own, filled with its color
function createAxis(min, max, start, end, color) {
  var axisRenderer = am5radar.AxisRendererCircular.new(root, {
    strokeOpacity: 0.1,  // a faint line along the arc
    minGridDistance: 30, // at least 30px between the labels along the arc
    startAngle: start,   // where this scale's arc begins...
    endAngle: end,       // ...and ends
    stroke: color        // in the part's color
  });

  axisRenderer.ticks.template.setAll({
    visible: true,      // ticks at the labels...
    strokeOpacity: 0.8, // ...nearly solid...
    stroke: color       // ...in the part's color
  });

  axisRenderer.grid.template.setAll({
    visible: false // no grid lines across the gauge
  });

  var axis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0, // the scale never pans past its ends
      min: min,
      max: max,
      strictMinMax: true, // exactly min to max, not rounded to nicer numbers
      renderer: axisRenderer
    })
  );

  // a range over the whole scale fills the axis's arc with its color
  var rangeDataItem = axis.makeDataItem({
    value: min,
    endValue: max
  });

  var range = axis.createAxisRange(rangeDataItem);

  rangeDataItem.get("axisFill").setAll({
    visible: true,    // show the range's fill...
    fill: color,      // ...in the part's color...
    fillOpacity: 0.8, // ...nearly solid...
    stroke: color,    // ...with an outline in the same color
    strokeOpacity: 0.8,
    strokeWidth: 1
  });

  rangeDataItem.get("tick").setAll({
    visible: false // no tick of its own for the range
  });

  return axis;
}

// a hand on the given scale, in the scale's color
function createHand(axis) {
  var color = axis.get("renderer").get("stroke"); // the scale's color
  var handDataItem = axis.makeDataItem({
    value: 0 // the hand starts at 0
  });

  var hand = handDataItem.set("bullet", am5xy.AxisBullet.new(root, {
    // a short hand near the rim, from 70% to 90% of the radius
    sprite: am5radar.ClockHand.new(root, {
      radius: am5.percent(90),
      innerRadius: am5.percent(70)
    })
  }));

  hand.get("sprite").pin.setAll({
    forceHidden: true // no round pin in the middle
  });

  hand.get("sprite").hand.setAll({
    fill: color,     // the hand in the scale's color...
    fillOpacity: 0.9 // ...nearly solid
  });

  axis.createAxisRange(handDataItem); // the hand follows this data item's value

  return hand;
}

// four scales, each on an 80-degree arc of its own, with 10-degree gaps between them
var axis1 = createAxis(0, 100, -85, -5, colors.next());
var axis2 = createAxis(0, 200, 5, 85, colors.next());
var axis3 = createAxis(0, 20, 95, 175, colors.next());
var axis4 = createAxis(0, 100, 185, 265, colors.next());

var hand1 = createHand(axis1);
var hand2 = createHand(axis2);
var hand3 = createHand(axis3);
var hand4 = createHand(axis4);

// every 2 seconds, each hand swings to a random value on its scale
setInterval(function() {
  hand1.get("sprite").dataItem.animate({
    key: "value",
    to: Math.random() * hand1.axis.get("max"), // anywhere from 0 to the scale's max
    duration: 800, // 0.8 seconds...
    easing: am5.ease.out(am5.ease.cubic) // ...slowing down at the end
  });

  hand2.get("sprite").dataItem.animate({
    key: "value",
    to: Math.random() * hand2.axis.get("max"),
    duration: 800,
    easing: am5.ease.out(am5.ease.cubic)
  });

  hand3.get("sprite").dataItem.animate({
    key: "value",
    to: Math.random() * hand3.axis.get("max"),
    duration: 800,
    easing: am5.ease.out(am5.ease.cubic)
  });

  hand4.get("sprite").dataItem.animate({
    key: "value",
    to: Math.random() * hand4.axis.get("max"),
    duration: 800,
    easing: am5.ease.out(am5.ease.cubic)
  });
}, 2000);
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
