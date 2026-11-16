---
title: "Variable-radius ranges on a gauge"
source: "https://docs.amcharts.com/embeds/v5/variable-radius-ranges-on-a-gauge/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/radar-chart/gauge-charts"]
---

A demo from the docs page "Gauge charts" (get_doc(path: "charts/radar-chart/gauge-charts")).

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
    startAngle: -180,
    endAngle: 0
    //innerRadius: -20
  })
);

var axisRenderer = am5radar.AxisRendererCircular.new(root, {
  strokeOpacity: 0.1,
  minGridDistance: 30
});

axisRenderer.ticks.template.setAll({
  visible: true,
  strokeOpacity: 0.5
});

axisRenderer.grid.template.setAll({
  visible: false
});

var axis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,
    max: 100,
    strictMinMax: true,
    renderer: axisRenderer
  })
);

function createRange(start, end, color, label, innerRadius) {
  var rangeDataItem = axis.makeDataItem({
    value: start,
    endValue: end
  });

  var range = axis.createAxisRange(rangeDataItem);

  rangeDataItem.get("axisFill").setAll({
    visible: true,
    fill: color,
    fillOpacity: 0.8,
    innerRadius: innerRadius
  });

  rangeDataItem.get("tick").setAll({
    visible: false
  });

  rangeDataItem.get("label").setAll({
    text: label,
    inside: true,
    radius: innerRadius / -2 - 5,
    fontSize: "0.9em",
    fill: am5.color(0xffffff)
  });
}

createRange(0, 70, am5.color(0x297373), "Safe", -20);
createRange(70, 90, am5.color(0x946b49), "Warning", -40);
createRange(90, 100, am5.color(0xff621f), "Danger", -60);
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
