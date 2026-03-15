---
title: "Compass Chart"
source: "https://www.amcharts.com/demos/compass-chart/"
category: "gauges"
scraped: "2026-03-15"
---

This multi-arrow RadarChart uses built-in animation routines to dynamically change start and end angles of the whole chart to imitate rotating of a compass dial.
Gauge charts
Radar chart
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

// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    panX: false,
    panY: false,
    startAngle: -90,
    endAngle: 270
  })
);

// Create axis and its renderer
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
var axisRenderer = am5radar.AxisRendererCircular.new(root, {
  strokeOpacity: 1,
  strokeWidth: 5,
  minGridDistance: 10
});
axisRenderer.ticks.template.setAll({
  forceHidden: true
});
axisRenderer.grid.template.setAll({
  forceHidden: true
});

axisRenderer.labels.template.setAll({ forceHidden: true });

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,
    max: 360,
    strictMinMax: true,
    renderer: axisRenderer
  })
);

// Add clock hand
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
// north
var axisDataItemN = xAxis.makeDataItem({ value: 0 });

var clockHandN = am5radar.ClockHand.new(root, {
  pinRadius: 0,
  radius: am5.percent(90),
  bottomWidth: 40
});

clockHandN.hand.set("fill", am5.color(0xff0000));
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
var axisDataItemS = xAxis.makeDataItem({ value: 180 });

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

function createLabel(text, value, tickOpacity) {
  var axisDataItem = xAxis.makeDataItem({ value: value });
  xAxis.createAxisRange(axisDataItem);
  var label = axisDataItem.get("label");
  label.setAll({
    text: text,
    forceHidden: false,
    inside: true,
    radius: 20
  });

  var tick = axisDataItem
    .get("tick")
    .setAll({
      forceHidden: false,
      strokeOpacity: tickOpacity,
      length: 12 * tickOpacity,
      visible: true,
      inside: true
    });
}

createLabel("N", 0, 1);
createLabel("NE", 45, 1);
createLabel("E", 90, 1);
createLabel("SE", 135, 1);
createLabel("S", 180, 1);
createLabel("SW", 225, 1);
createLabel("W", 270, 1);
createLabel("NW", 315, 1);

for (var i = 0; i < 360; i = i + 5) {
  createLabel("", i, 0.5);
}

setInterval(function () {
  var newAngle = Math.random() * 360;
  chart.animate({
    key: "startAngle",
    to: newAngle,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });
  chart.animate({
    key: "endAngle",
    to: newAngle + 360,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });
  axisDataItemN.animate({
    key: "value",
    to: am5.math.normalizeAngle(-90 - newAngle),
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });
  axisDataItemS.animate({
    key: "value",
    to: am5.math.normalizeAngle(90 - newAngle),
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
