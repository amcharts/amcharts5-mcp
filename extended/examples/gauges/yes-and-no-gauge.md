---
title: "Yes and No Gauge"
source: "https://www.amcharts.com/demos/yes-and-no-gauge/"
category: "gauges"
scraped: "2026-03-15"
---

This demo shows a binary yes/no gauge implemented with amCharts Gauge chart.
Key implementation details
We implement the yes/no indicators by adding axis ranges to the chart's axis.
Gauge charts
Clock hands
Bands
Axis ranges

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
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,
  panY: false,
  startAngle: 180,
  endAngle: 360
}));


// Create axis and its renderer
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
var axisRenderer = am5radar.AxisRendererCircular.new(root, {
  innerRadius: -30,
  strokeOpacity: 0.1
});

axisRenderer.labels.template.set("forceHidden", true);
axisRenderer.grid.template.set("forceHidden", true);

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,
  min: 0,
  max: 1,
  strictMinMax: true,
  renderer: axisRenderer
}));


// add yes and no labels
var yesDataItem = xAxis.makeDataItem({});
yesDataItem.set("value", 0);
yesDataItem.set("endValue", 0.5);
xAxis.createAxisRange(yesDataItem);
yesDataItem.get("label").setAll({text: "YES", forceHidden:false});
yesDataItem.get("axisFill").setAll({visible:true, fillOpacity:1, fill:root.interfaceColors.get("positive")});

var noDataItem = xAxis.makeDataItem({});
noDataItem.set("value", 1);
noDataItem.set("endValue", 0.5);
xAxis.createAxisRange(noDataItem);
noDataItem.get("label").setAll({text: "NO", forceHidden:false});
noDataItem.get("axisFill").setAll({visible:true, fillOpacity:1, fill:root.interfaceColors.get("negative")});

// Add clock hand
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
var axisDataItem = xAxis.makeDataItem({});
axisDataItem.set("value", 0.25);

var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: am5radar.ClockHand.new(root, {
    radius: am5.percent(99)
  })
}));

xAxis.createAxisRange(axisDataItem);

axisDataItem.get("grid").set("visible", false);

let value = 0.25;
setInterval(function() {
  if (value == 0.25) {
    value = 0.75;
  }
  else {
    value = 0.25;
  }

  axisDataItem.animate({
    key: "value",
    to: value,
    duration: 800,
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
