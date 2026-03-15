---
title: "Stadium Track Chart"
source: "https://www.amcharts.com/demos/stadium-track-chart/"
category: "timeline"
scraped: "2026-03-15"
---

A stadium track chart is a unique data visualization that arranges information along an oval or rounded rectangular path, resembling an athletic stadium track. This layout allows for continuous flow while maximizing use of space, making it ideal for presenting cyclic, sequential, or comparative data in a visually engaging format.

## JavaScript

```javascript
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
var chart = root.container.children.push(am5timeline.CurveChart.new(root, {
  wheelY: "zoomX"
}));

var yRenderer = am5timeline.AxisRendererCurveY.new(root, {
  axisLength: 250,
  minGridDistance: 10,
  axisLocation: 0
})

yRenderer.labels.template.setAll({
  fontSize: 11,
  layer: 30,
  fill: am5.color(0xffffff),
  fontWeight: "bold",
  centerX: am5.p100
});

yRenderer.grid.template.setAll({
  stroke: am5.color(0xffffff),
  strokeOpacity: 1,
  layer: 30
})

yRenderer.axisFills.template.setAll({
  fill: am5.color(0xb84f49),
  forceHidden: false,
  fillOpacity: 1,
  visible: true
});


// Create axes and their renderers
var xRenderer = am5timeline.AxisRendererCurveX.new(root, {
  yRenderer: yRenderer,
  rotateLabels: true,
  points: getPoints(),
  minGridDistance: 200,
  stroke: am5.color(0x00000),
  strokeOpacity:0.1,
  strokeWidth:20
});

xRenderer.grid.template.setAll({
  stroke: am5.color(0xffffff),
  strokeOpacity: 1,
  layer: 30
})

xRenderer.labels.template.setAll({
  maxPosition: 0.98,
  fontSize: 13,
  layer: 30,
  fill: am5.color(0xffffff),
  fontWeight: "bold",
  centerY: am5.p100
});

xRenderer.labels.template.adapters.add("centerX", function (centerX, target) {
  return 125 * xRenderer.getPrivate("scale");
})

xRenderer.labels.template.adapters.add("rotation", function (rotation, target) {
  return rotation + 90;
})


var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "name",
  renderer: yRenderer,
  fillRule: function (dataItem) {
    const axisFill = dataItem.get("axisFill");
    if (axisFill) {
      axisFill.set("visible", true);
    }
  }
}));

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: xRenderer,
  min: 0,
  max: 1000,
  strictMinMax: true
}));

var series = chart.series.push(am5timeline.CurveColumnSeries.new(root, {
  maskBullets: false,
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "value",
  categoryYField: "name",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{category}: {value}"
  })
}))

series.columns.template.setAll({
  fill: am5.color(0xffffff),
  strokeOpacity: 0,
  fillOpacity: 0.5,
  layer: 30,
  interactive: true
});

series.columns.template.states.create("hover", {
  fillOpacity: 1
});

series.bullets.push(function (root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fillOpacity: 1,
      fill: am5.color(0xffffff)
    })
  })
})


var data = [{ name: "Chandler", file: "/wp-content/uploads/2025/04/chandler.jpg", track: 1, value: 450 }, { name: "Ross", file: "/wp-content/uploads/2025/04/ross.jpg", track: 2, value: 650 }, { name: "Joey", file: "/wp-content/uploads/2025/04/joey.jpg", track: 3, value: 578 }, { name: "Monica", file: "/wp-content/uploads/2025/04/monica.jpg", track: 4, value: 730 }, { name: "Phoebe", file: "/wp-content/uploads/2025/04/phoebe.jpg", track: 5, value: 490 }, { name: "Rachel", file: "/wp-content/uploads/2025/04/rachel.jpg", track: 6, value: 532 }];
yAxis.data.setAll(data);
series.data.setAll(data);
series.appear(3000, 100);

// Add the legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.curveContainer.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  centerY: am5.p50,
  useDefaultMarker: true,
  nameField: "categoryY",
  maxWidth: 350  
}));

legend.valueLabels.template.setAll({
  forceHidden: true
});

legend.markers.template.setup = function (marker) {
  marker.events.on("dataitemchanged", function () {
    var dataItem = marker.dataItem
    var seriesDataItem = dataItem.dataContext;
    var picture = marker.children.push(am5.Picture.new(root, {
      width: 30,
      height: 30,
      src: seriesDataItem.dataContext.file
    }));

    marker.set("width", 30);
    marker.set("height", 30);

    dataItem.on("markerRectangle", function (rectangle) {
      rectangle.set("forceHidden", true);
    })
  });
}

legend.itemContainers.template.events.on("pointerover", function (e) {
  var seriesDataItem = e.target.dataItem.dataContext;
  if (seriesDataItem) {
    var graphics = seriesDataItem.get("graphics");
    if (graphics) {
      graphics.hover();
    }
  }
});

legend.itemContainers.template.events.on("pointerout", function (e) {
  var seriesDataItem = e.target.dataItem.dataContext;
  if (seriesDataItem) {
    var graphics = seriesDataItem.get("graphics");
    if (graphics) {
      graphics.unhover();
    }
  }
});

legend.data.setAll(series.dataItems);


function getPoints() {
  var points = [];
  var radius = 300;
  points.push({ x: 0, y: -300 });
  points.push({ x: 300, y: -300 });

  for (var k = 1; k < 50; k++) {
    var angle = -180 - k / 50 * 180;
    points.push({ y: radius * am5.math.cos(angle), x: 300 + radius * am5.math.sin(angle) });
  }

  points.push({ x: -300, y: 300 });

  for (var k = 1; k < 50; k++) {
    var angle = -k / 50 * 180;
    points.push({ y: radius * am5.math.cos(angle), x: -300 + radius * am5.math.sin(angle) });
  }
  points.push({ x: 0, y: -300 });
  return points;
}
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
- https://cdn.amcharts.com/lib/5/timeline.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
