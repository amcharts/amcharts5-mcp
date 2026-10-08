---
title: "Beeswarm"
source: "https://www.amcharts.com/demos/beeswarm/"
category: "xy-bubble"
scraped: "2026-10-08"
---

A beeswarm chart shows every value as a dot along one axis, nudging dots up and down so none overlap. The shape of the swarm shows where values bunch up: here, 500 random values, most of them near zero.

When a beeswarm works: A beeswarm keeps every single value on show while still giving the overall shape of the data, like a histogram built from dots. The dots only move up and down, so each one can still be read off the axis.

Good for:
- Showing how values spread, without hiding any
- Test scores, response times or prices
- Finding single points, like outliers, by hovering

Think twice when:
- Thousands of values: use a histogram
- Comparing many groups at once: a box plot per group takes less room
- Small charts: the dots need height to spread out

Prompt: Create a beeswarm chart of 500 random values on a value axis, each a dot sized by a second value, spread up and down by a D3 force simulation so no dots overlap, and packed again when the axis is zoomed. Use the amCharts 5 library with its Responsive theme, and D3.

## JavaScript

```javascript
// Create D3 simulation and collision force
// The chart puts every dot on one line, at its X value; the simulation then moves dots
// up or down from that line until none of them overlap.
var simulation = d3.forceSimulation();
var collisionForce = d3.forceCollide();

// Update bullet positions on tick
simulation.on("tick", function() {
  updatePositions();
});

// Updated bullet positions
function updatePositions() {
  am5.array.each(nodes, function(node) {
    var circle = node.circle;

    // `node.y` is how far the dot sits above or below the line. We set it as `dy` and leave
    // `y` to the chart, so the swarm stays on the line when the chart is resized or zoomed
    circle.set("dy", node.y);

    node.fx = circle.x(); // `x` changes when the chart is resized or zoomed
  });
}

// Nodes array which will be used by simulation
var nodes = [];

// Adds nodes to the nodes array
function addNode(dataItem) {
  var bullets = dataItem.bullets;
  if (bullets) {
    var bullet = bullets[0];
    if (bullet) {
      var circle = bullet.get("sprite");

      if (circle) {
        // We use `fx` for horizontal position as we don't want `x` to change.
        // Every dot starts on the line (`y: 0`); for a vertical chart, swap x and y
        var node = {
          fx: circle.x(),
          y: 0,
          circle: circle
        };
        nodes.push(node);
      }
    }
  }
}

// Updates collision forces
function updateForces() {
  simulation.force("collision", collisionForce);

  collisionForce.radius(function(node) {
    var circle = node.circle;
    return circle.get("radius", 1) + 1; // add 1 for padding
  });

  // A gentle pull back toward the line keeps the swarm compact, also after zooming in
  simulation.force("y", d3.forceY(0).strength(0.05));
}

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
// https://www.amcharts.com/docs/v5/charts/xy-chart/
// The dots only have a position along X, so zoom and pan work on the X axis only
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelY: "zoomX", // the mouse wheel zooms in on the values
  pinchZoomX: true // pinch to zoom on touch screens
}));

// Add cursor: drag across the plot to zoom in on a range of values
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance:30 // at least 30px between labels
  }),
  // the random values below all fall between -50 and 50
  min: -50,
  max: 50,
  strictMinMax: true // exactly -50 to 50, not rounded out
}));

// every dot has y: 0, so this hidden axis only gives them a line to sit on
var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {}),
  visible: false
}));

yAxis.get("renderer").grid.template.set("forceHidden", true); // no horizontal grid lines

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  // finds the lowest and highest value, which the heat rule below sizes the dots by
  calculateAggregates: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  valueField: "value"
}));

series.strokes.template.set("visible", false); // no line between the dots

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
// Settings shared by all dots go in a template
var circleTemplate = am5.Template.new({
  fillOpacity: 0.8 // a little see-through, so overlaps show
});

series.bullets.push(function() {
  var bulletCircle = am5.Circle.new(root, {
    radius: 5,                 // the heat rule replaces this
    fill: series.get("fill"),  // the series color
    tooltipText: "Value: {x}", // the dot's value
    tooltipY: 0                // the tooltip points at the dot's center
  }, circleTemplate);

  bulletCircle.states.create("hover", { // a hovered dot takes another theme color
    fill: chart.get("colors").getIndex(4)
  })

  return am5.Bullet.new(root, {
    sprite: bulletCircle
  });
});

// Add heat rule
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
// this makes radius different, depending on the value.
// remove if you want all circles to be of the same size
series.set("heatRules", [{
  target: circleTemplate,
  min: 2, // the smallest dots have a 2px radius
  max: 7, // small enough for 500 dots to fit a 380px-high chart
  dataField: "value",
  key: "radius"
}]);

// Set data
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data

// Generate random data
var data = [];
for (var i = 0; i < 500; i++) {
  data.push({
    x: am5.math.round(Math.random() * 50 - Math.random() * 50, 2), // a random value between -50 and 50
    y: 0,
    value: Math.round(Math.random() * 10)                          // a random size, 0 to 10
  });
}

series.data.setAll(data);

// Update forces whenever data is parsed
series.events.on("datavalidated", function() {
  // Needs a timeout as bullets are created a bit later
  setTimeout(function() {
    am5.array.each(series.dataItems, function(dataItem) {
      addNode(dataItem);
    })
    simulation.nodes(nodes);
    updateForces();
  }, 500)
});

// Update bullet positions when chart bounds change
chart.plotContainer.events.on("boundschanged", function() {
  updateForces();
  simulation.restart();
});

// Pack the dots again when the X axis is zoomed or panned, as they move closer or further apart
function repack() {
  simulation.alpha(0.3).restart(); // warm the simulation up again, gently
}
xAxis.on("start", repack);
xAxis.on("end", repack);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
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
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
- https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js
