---
title: "Vertically Stacked Axes Chart"
source: "https://www.amcharts.com/demos/vertically-stacked-axes-chart/"
category: "miscellaneous"
scraped: "2026-10-08"
---

One chart split into three panes stacked on top of each other, each with its own value axis, and one row of names along the bottom for all three. Here, a sales team’s quarter: deals closed, calls made and revenue per person.

When to stack the axes: Measures on very different scales, like 20 deals and $2 million in revenue, flatten each other on one axis. Stacked panes give each its own scale while the names stay lined up, so a high and a low in different panes are easy to match.

Good for:
- Several measures for the same people, days or products
- Values on very different scales
- Price and volume, temperature and rain

Think twice when:
- Measures on one scale: put them in one pane
- More than four panes: each gets too short
- Comparing exact values across panes: a table is clearer

Prompt: Create an XY chart of three vertically stacked panes, each with its own value axis, sharing an X axis of names for a made-up sales team: deals closed and calls made as lines with bullets, and revenue as columns. The X axis labels move under the pane the cursor is in. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Made-up quarter of a sales team: deals closed (around 20), calls made (around 200) and revenue in
// thousands of dollars (around 2,000) per person
var data = [];
var value1 = 20;
var value2 = 200;
var value3 = 2000;

var names = [
  "Raina",
  "Demarcus",
  "Carlo",
  "Jacinda",
  "Richie",
  "Antony",
  "Amada",
  "Idalia",
  "Janella",
  "Marla",
  "Curtis",
  "Shellie",
  "Meggan",
  "Nathanael",
  "Jannette",
  "Tyrell",
  "Sheena",
  "Maranda",
  "Briana"
];

// each person's numbers go up or down by up to 20% from the person before
for (var i = 0; i < names.length; i++) {
  value1 += Math.round(
    (Math.random() < 0.5 ? 1 : -1) * Math.random() * value1 * 0.2
  );
  value2 += Math.round(
    (Math.random() < 0.5 ? 1 : -1) * Math.random() * value2 * 0.2
  );
  value3 += Math.round(
    (Math.random() < 0.5 ? 1 : -1) * Math.random() * value3 * 0.2
  );
  data.push({
    category: names[i],
    value1: value1,
    value2: value2,
    value3: value3
  });
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
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true, // drag the plot to pan sideways
    panY: false,
    wheelX: "none",  // a horizontal wheel or swipe does nothing...
    wheelY: "zoomX", // ...and the vertical wheel zooms in on some of the people
    // each tooltip stays at its own point: the panes already keep them apart
    arrangeTooltips: false,
    pinchZoomX: true // pinch on a touch screen to zoom
  })
);

// make y axes stack
chart.leftAxesContainer.set("layout", root.verticalLayout);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// at least 70px between names, so they don't run into each other; when they get closer, some are skipped
var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 70 });
xRenderer.labels.template.setAll({
  multiLocation: 0.5, // each name in the middle of its cell
  location: 0.5,
  centerY: am5.p50,
  centerX: am5.p50,
  paddingTop: 10 // 10px below the axis
});

// grid lines through the middle of each person's cell, where the dots sit
xRenderer.grid.template.set("location", 0.5);

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    tooltip: am5.Tooltip.new(root, {}), // shows the cursor's person on the axis
    renderer: xRenderer
  })
);

xAxis.data.setAll(data);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function createSeries(field, name, margin, column) {
  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
      tooltip: am5.Tooltip.new(root, {
        animationDuration: 0 // the value tooltip jumps to the cursor instead of gliding
      }),
      // right-aligned, so every axis sits against the plot whatever the width of its labels
      x: am5.p100,
      centerX: am5.p100,
      marginTop: margin // this makes gap between axes
    })
  );

  // columns start at zero, so their lengths compare
  if (column) {
    yAxis.set("min", 0);
  }

  // name the pane with a title along its axis
  yAxis.children.unshift(am5.Label.new(root, {
    text: name,
    rotation: -90, // reads upward
    y: am5.p50,    // halfway up the pane
    centerX: am5.p50
  }));

  var series;
  if (column) {
    series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: field,
        categoryXField: "category",
        sequencedInterpolation: true, // the columns grow one after another
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "vertical", // the tooltip sits above or below the point
          labelText: "{name}: {valueY}"
        })
      })
    );
  } else {
    series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: field,
        categoryXField: "category",
        sequencedInterpolation: true, // the points move into place one after another
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "vertical", // the tooltip sits above or below the point
          labelText: "{name}: {valueY}"
        })
      })
    );
  }

  if (!column) {
    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationY: 1,   // at the value
        locationX: 0.5, // in the middle of the person's cell
        sprite: am5.Circle.new(root, {
          radius: 4,               // a dot 8px across
          fill: series.get("fill") // in the line's color
        })
      });
    });
  }

  series.data.setAll(data);
  series.appear();

  return series;
}

createSeries("value1", "Deals closed", 0, false); // the top pane, with no gap above it
createSeries("value2", "Calls made", 40, false);  // a 40px gap above this pane...
createSeries("value3", "Revenue, $k", 40, true);  // ...and this one, which has columns

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none", // dragging pans instead of selecting a range to zoom
  xAxis: xAxis
}));

// show x Axis label next to the panel on which cursor currently is
// will move above other elements
xAxis.set("layer", 50);

cursor.events.on("cursormoved", function() {
  // the cursor's height in the plot, in pixels
  var position = cursor.getPrivate("positionY");
  var cursorY = position * chart.plotContainer.height();

  // the pane the cursor is in: the first axis whose bottom is below it (the panes can differ in height)
  var axis = chart.yAxes.values.filter(function(a) {
    return cursorY <= a.y() + a.height();
  })[0] || chart.yAxes.getIndex(chart.yAxes.length - 1);

  // the bottom of that pane
  var y = axis.y() + axis.height();
  var dy = Math.round(-(chart.plotContainer.height() - y));
  var tooltip = xAxis.get("tooltip");

  // update y of x axis
  if(Math.round(xAxis.get("dy")) != dy){
    xAxis.animate({ key: "dy", to: dy, duration: 600, easing: am5.ease.out(am5.ease.cubic) });
    xAxis.set("y", 0);
    if(tooltip){
      tooltip.hide(0);
    }
  }
  else{
    tooltip.show(300);
  }
})

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
  max-width:100%;
  height: 600px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
