---
title: "Multi-part Gauge"
source: "https://docs.amcharts.com/embeds/v5/multi-part-gauge/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["charts/radar-chart/gauge-charts"]
---

A demo from the docs page "Gauge charts" (get_doc(path: "charts/radar-chart/gauge-charts")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

## JavaScript

```javascript
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    panX: false,
    panY: false,
    radius: am5.percent(90),
    innerRadius: -20
  })
);

function createAxis(min, max, start, end, color) {
  var axisRenderer = am5radar.AxisRendererCircular.new(root, {
    strokeOpacity: 0.1,
    minGridDistance: 30,
    startAngle: start,
    endAngle: end,
    stroke: color
  });

  axisRenderer.ticks.template.setAll({
    visible: true,
    strokeOpacity: 0.8,
    stroke: color
  });

  axisRenderer.grid.template.setAll({
    visible: false
  });

  var axis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: min,
      max: max,
      strictMinMax: true,
      renderer: axisRenderer
    })
  );

  var rangeDataItem = axis.makeDataItem({
    value: min,
    endValue: max
  });

  var range = axis.createAxisRange(rangeDataItem);

  rangeDataItem.get("axisFill").setAll({
    visible: true,
    fill: color,
    fillOpacity: 0.8,
    stroke: color,
    strokeOpacity: 0.8,
    strokeWidth: 1
  });

  rangeDataItem.get("tick").setAll({
    visible: false
  });

  return axis;
}

function createHand(axis) {
  var color = axis.get("renderer").get("stroke");
  var handDataItem = axis.makeDataItem({
    value: 0
  });

  var hand = handDataItem.set(
    "bullet",
    am5xy.AxisBullet.new(root, {
      sprite: am5radar.ClockHand.new(root, {
        radius: am5.percent(90),
        innerRadius: am5.percent(70)
      })
    })
  );

  hand.get("sprite").pin.setAll({
    forceHidden: true
  });

  hand.get("sprite").hand.setAll({
    fill: color,
    fillOpacity: 0.9
  });

  axis.createAxisRange(handDataItem);

  return hand;
}

var axis1 = createAxis(0, 100, -85, -5, am5.color(0xef6f6c));
var axis2 = createAxis(0, 200, 5, 85, am5.color(0x426a5a));
var axis3 = createAxis(0, 20, 95, 175, am5.color(0x7fb685));
var axis4 = createAxis(0, 100, 185, 265, am5.color(0xddae7e));

var hand1 = createHand(axis1);
var hand2 = createHand(axis2);
var hand3 = createHand(axis3);
var hand4 = createHand(axis4);

setInterval(function () {
  hand1.get("sprite").dataItem.animate({
    key: "value",
    to: Math.random() * hand1.axis.get("max"),
    duration: 800,
    easing: am5.ease.out(am5.ease.cubic)
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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
