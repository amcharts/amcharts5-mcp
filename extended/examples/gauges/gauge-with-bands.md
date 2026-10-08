---
title: "Gauge with Bands"
source: "https://www.amcharts.com/demos/gauge-with-bands/"
category: "gauges"
scraped: "2026-10-08"
---

A gauge split into seven colored bands, from Unsustainable to High Performing. The needle takes the color of the band it points at, and the score sits in its pin.

When bands help: Bands turn a number into a verdict: 42 means little on its own, but Maturing tells people where they stand. They work when the scale has agreed cut-off points, like a maturity model, a credit score or a health check.

Good for:
- Scores with named levels, like maturity or risk
- KPIs with targets and warning zones
- Reports where the verdict matters more than the number

Think twice when:
- Scales with no real cut-off points: try a gradient
- Many narrow bands: the labels get cramped
- Several scores side by side: use bars

Prompt: Create a gauge chart with seven colored, labeled bands from Unsustainable to High Performing, and a wide needle that takes the color of the band it points at, with the value in its pin. Every 2 seconds the needle moves to a random value. Use the amCharts 5 library with its Responsive theme.

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
  panX: false, // no dragging
  panY: false,
  // a 220-degree arc, open at the bottom
  startAngle: 160,
  endAngle: 380
}));

// Create axis and its renderer
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
var axisRenderer = am5radar.AxisRendererCircular.new(root, {
  // negative: 40px in from the outer edge, so the bands form a 40px-wide ring
  innerRadius: -40
});

axisRenderer.grid.template.setAll({
  stroke: root.interfaceColors.get("background"), // background-colored lines between the bands...
  visible: true,
  strokeOpacity: 0.8 // ...mostly opaque
});

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,
  min: -40,           // the scale runs from -40...
  max: 100,           // ...to 100...
  strictMinMax: true, // ...exactly, not rounded out
  renderer: axisRenderer
}));

// Add clock hand
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
var axisDataItem = xAxis.makeDataItem({});

var clockHand = am5radar.ClockHand.new(root, {
  pinRadius: am5.percent(20), // a big pin, 20% of the gauge's radius: the number sits on it
  radius: am5.percent(100),   // the hand reaches the outer edge
  bottomWidth: 40             // 40px wide at the base
})

var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: clockHand
}));

xAxis.createAxisRange(axisDataItem);

var label = chart.radarContainer.children.push(am5.Label.new(root, {
  fill: am5.color(0xffffff), // white to start; the code below picks white or black
  centerX: am5.percent(50),  // the label's middle...
  textAlign: "center",
  centerY: am5.percent(50),  // ...on the gauge's center
  fontSize: "3em"            // three times the normal text size
}));

// White or black text, whichever reads better on a color
function textColor(color) {
  return am5.Color.alternative(color, am5.color(0xffffff), am5.color(0x000000));
}

axisDataItem.set("value", 50); // the hand starts at 50
// whenever the hand turns, update the number and the colors
bullet.get("sprite").on("rotation", function () {
  var value = axisDataItem.get("value");
  var fill = am5.color(0x000000);
  xAxis.axisRanges.each(function (axisRange) {
    if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
      fill = axisRange.get("axisFill").get("fill");
    }
  })

  label.set("text", Math.round(value).toString());

  // the hand takes the color of the band it points at; the number stays readable on it
  clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
  clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
  label.animate({ key: "fill", to: textColor(fill), duration: 500, easing: am5.ease.out(am5.ease.cubic) })
});

// every two seconds, the hand moves to a random value from -40 to 100
setInterval(function () {
  axisDataItem.animate({
    key: "value",
    to: Math.round(Math.random() * 140 - 40),
    duration: 500,
    easing: am5.ease.out(am5.ease.cubic) // fast start, slow finish
  });
}, 2000)

// Create axis ranges bands
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Bands
var bandsData = [{
  title: "Unsustainable",
  color: "#ee1f25",
  lowScore: -40,
  highScore: -20
}, {
  title: "Volatile",
  color: "#f04922",
  lowScore: -20,
  highScore: 0
}, {
  title: "Foundational",
  color: "#fdae19",
  lowScore: 0,
  highScore: 20
}, {
  title: "Developing",
  color: "#f3eb0c",
  lowScore: 20,
  highScore: 40
}, {
  title: "Maturing",
  color: "#b0d136",
  lowScore: 40,
  highScore: 60
}, {
  title: "Sustainable",
  color: "#54b947",
  lowScore: 60,
  highScore: 80
}, {
  title: "High Performing",
  color: "#0f9747",
  lowScore: 80,
  highScore: 100
}];

am5.array.each(bandsData, function (data) {
  var axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));

  axisRange.setAll({
    value: data.lowScore,    // the band runs from the low score...
    endValue: data.highScore // ...to the high score
  });

  axisRange.get("axisFill").setAll({
    visible: true,               // shown (axis fills are hidden by default)
    fill: am5.color(data.color), // the band's color...
    fillOpacity: 0.8             // ...slightly see-through
  });

  axisRange.get("label").setAll({
    text: data.title,
    inside: true,                          // the label sits inside the ring
    radius: 15,
    fontSize: "0.9em",                     // a little smaller
    fill: textColor(am5.color(data.color)) // white or black, whichever reads better on the band
  });
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
