---
title: "Stadium Track Chart"
source: "https://www.amcharts.com/demos/stadium-track-chart/"
category: "timeline"
scraped: "2026-10-08"
---

Six values as a race: each runner has a lane on an oval track, and their bar runs from the start line around the oval as far as their value takes it. Photos in the middle name the runners.

When a race track works: Drawing a ranking as a race makes it feel like one: who is ahead, and by how much, reads at a glance. It suits a handful of contestants with one number each, and a maximum to race towards, here 1,000 for a full lap.

Good for:
- Contests, challenges and leaderboards
- Progress towards a goal, like steps or sales
- Campaign pages and team screens

Think twice when:
- Precise comparisons: a bar chart is easier to read
- More than eight runners: the lanes get thin
- Values with no maximum to race towards

Prompt: Create a stadium track chart: an oval running track with one lane per runner, where each runner’s value is a bar running round their lane from the start line. In the middle, a legend shows a photo of each runner; pointing at one lights up their bar. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create chart
var chart = root.container.children.push(am5timeline.CurveChart.new(root, {
  wheelY: "zoomX" // the mouse wheel zooms along the track
}));

var yRenderer = am5timeline.AxisRendererCurveY.new(root, {
  axisLength: 250,     // the lanes take 250px across the track
  minGridDistance: 10, // lanes close together: let every name show
  axisLocation: 0      // the lane names sit where the track starts
})

yRenderer.labels.template.setAll({
  fontSize: 11,              // small text...
  layer: 30,                 // ...drawn on layer 30, over the track...
  fill: am5.color(0xffffff), // ...in white
  fontWeight: "bold",
  centerX: am5.p100
});

yRenderer.grid.template.setAll({
  stroke: am5.color(0xffffff), // white lines between the lanes...
  strokeOpacity: 1,            // ...fully opaque...
  layer: 30                    // ...over the track
})

yRenderer.axisFills.template.setAll({
  fill: am5.color(0xb84f49), // track red for every lane...
  forceHidden: false,        // ...shown even if a theme hides axis fills...
  fillOpacity: 1,            // ...solid
  visible: true
});

// Create axes and their renderers
var xRenderer = am5timeline.AxisRendererCurveX.new(root, {
  yRenderer: yRenderer,
  rotateLabels: true,          // the labels turn with the track
  points: getPoints(),         // the track's shape, from getPoints at the bottom
  minGridDistance: 200,        // at least 200px between the distance marks
  stroke: am5.color(0x000000), // a dark band along the track...
  strokeOpacity:0.1,           // ...faint...
  strokeWidth:20               // ...and 20px wide
});

xRenderer.grid.template.setAll({
  stroke: am5.color(0xffffff), // white distance lines across the lanes...
  strokeOpacity: 1,            // ...fully opaque...
  layer: 30                    // ...over the track
})

xRenderer.labels.template.setAll({
  maxPosition: 0.98,         // no label at the very end, where the loop meets its start
  fontSize: 13,
  layer: 30,                 // over the track
  fill: am5.color(0xffffff), // white
  fontWeight: "bold",
  centerY: am5.p100
});

// centers each label across the lanes: half the 250px axis length, scaled with the chart
xRenderer.labels.template.adapters.add("centerX", function (centerX, target) {
  return 125 * xRenderer.getPrivate("scale");
})

// a quarter turn more, so the labels read across the track
xRenderer.labels.template.adapters.add("rotation", function (rotation, target) {
  return rotation + 90;
})

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "name",
  renderer: yRenderer,
  // every lane gets a fill, not only every other one
  fillRule: function (dataItem) {
    const axisFill = dataItem.get("axisFill");
    if (axisFill) {
      axisFill.set("visible", true);
    }
  }
}));

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: xRenderer,
  min: 0,            // the track runs from 0...
  max: 1000,         // ...to 1,000...
  strictMinMax: true // ...exactly, with no rounding to nicer numbers
}));

var series = chart.series.push(am5timeline.CurveColumnSeries.new(root, {
  maskBullets: false, // the dots aren't cut off at the plot's edge
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "value",
  categoryYField: "name",
  tooltip: am5.Tooltip.new(root, {})
}))

series.columns.template.setAll({
  fill: am5.color(0xffffff), // white bars...
  strokeOpacity: 0,          // ...with no outline...
  fillOpacity: 0.5,          // ...half see-through...
  layer: 30,                 // ...over the track
  tooltipText: "{categoryY}: {valueX}" // hover a bar for the runner and the distance
});

series.columns.template.states.create("hover", {
  fillOpacity: 1 // solid white under the pointer
});

// a white dot at the end of each bar
series.bullets.push(function (root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5, // a 5px dot
      fillOpacity: 1,
      fill: am5.color(0xffffff)
    })
  })
})

var data = [{ name: "Chandler", file: "https://www.amcharts.com/wp-content/uploads/assets/timeline/chandler.jpg", track: 1, value: 450 }, { name: "Ross", file: "https://www.amcharts.com/wp-content/uploads/assets/timeline/ross.jpg", track: 2, value: 650 }, { name: "Joey", file: "https://www.amcharts.com/wp-content/uploads/assets/timeline/joey.jpg", track: 3, value: 578 }, { name: "Monica", file: "https://www.amcharts.com/wp-content/uploads/assets/timeline/monica.jpg", track: 4, value: 730 }, { name: "Phoebe", file: "https://www.amcharts.com/wp-content/uploads/assets/timeline/phoebe.jpg", track: 5, value: 490 }, { name: "Rachel", file: "https://www.amcharts.com/wp-content/uploads/assets/timeline/rachel.jpg", track: 6, value: 532 }];
yAxis.data.setAll(data);
series.data.setAll(data);
series.appear(3000, 100); // the bars grow over 3 seconds

// Add the legend: each runner's photo and name, in the middle of the track
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.curveContainer.children.push(am5.Legend.new(root, {
  centerX: am5.p50,       // in the middle of the track...
  centerY: am5.p50,       // ...both ways
  useDefaultMarker: true, // plain markers, swapped for the photos below
  nameField: "categoryY", // the names come from each bar's category
  maxWidth: 350           // at most 350px wide; more runners wrap to a new row
}));

legend.valueLabels.template.setAll({
  forceHidden: true
});

// each legend marker shows the runner's photo instead of a color square
legend.markers.template.setup = function (marker) {
  marker.events.on("dataitemchanged", function () {
    var dataItem = marker.dataItem
    var seriesDataItem = dataItem.dataContext;
    var picture = marker.children.push(am5.Picture.new(root, {
      width: 30,  // a 30px photo...
      height: 30, // ...square
      src: seriesDataItem.dataContext.file
    }));

    marker.set("width", 30); // the marker as big as the photo
    marker.set("height", 30);

    // Round photos
    marker.set("mask", am5.Circle.new(root, {
      radius: 15, // a 15px radius...
      x: 15,
      y: 15       // ...centered on the photo
    }));

    dataItem.on("markerRectangle", function (rectangle) {
      rectangle.set("forceHidden", true); // hide the default color square
    })
  });
}

// pointing at a name in the legend highlights that runner's bar
legend.itemContainers.template.events.on("pointerover", function (e) {
  var seriesDataItem = e.target.dataItem.dataContext;
  if (seriesDataItem) {
    var graphics = seriesDataItem.get("graphics"); // the runner's bar
    if (graphics) {
      graphics.hover(); // show the bar's hover state
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

// the track's shape for the X axis to follow: two straights joined by half circles
function getPoints() {
  var points = [];
  var radius = 300;                 // the curves' radius, in the same units as the points
  points.push({ x: 0, y: -300 });   // the top straight...
  points.push({ x: 300, y: -300 }); // ...from the middle to the right

  // the right half circle, in 50 steps
  for (var k = 1; k < 50; k++) {
    var angle = -180 - k / 50 * 180;
    points.push({ y: radius * am5.math.cos(angle), x: 300 + radius * am5.math.sin(angle) });
  }

  points.push({ x: -300, y: 300 }); // the bottom straight, to the left

  // the left half circle, back up to the top
  for (var k = 1; k < 50; k++) {
    var angle = -k / 50 * 180;
    points.push({ y: radius * am5.math.cos(angle), x: -300 + radius * am5.math.sin(angle) });
  }
  points.push({ x: 0, y: -300 }); // close the loop
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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/timeline.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
