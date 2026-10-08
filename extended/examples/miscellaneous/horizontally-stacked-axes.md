---
title: "Horizontally Stacked Axes"
source: "https://www.amcharts.com/demos/horizontally-stacked-axes/"
category: "miscellaneous"
scraped: "2026-10-08"
---

Stacked axes turned on their side: three panes next to each other, each with its own value axis, and one list of names down the left for all three. Here, a sales team’s deals, calls and revenue per person.

When to stack sideways: Side-by-side panes suit long lists of names: they run down the left once, and each measure gets its own scale and its own column of space. Reading across a row gives one person’s three numbers; reading down a pane compares everyone on one measure.

Good for:
- Long lists of people, products or places
- Several measures on different scales
- Scorecards read row by row

Think twice when:
- Dates or other time: run them left to right with vertically stacked panes
- Many measures: the panes get too narrow
- Only two measures: one pane with two axes can do

Prompt: Create an XY chart of three panes side by side, each with its own value axis, sharing a Y axis of names for a made-up sales team: deals closed as bars, and calls made and revenue as lines with bullets. Use the amCharts 5 library with its Responsive theme.

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

// each person's numbers are within 20% of the previous person's
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
    panX: false,     // no panning sideways
    panY: true,      // drag up or down to pan the names
    wheelX: "none",
    wheelY: "zoomY", // the wheel zooms in on the names
    // each tooltip stays at its own point: side by side, the panes' tooltips don't collide
    arrangeTooltips: false,
    pinchZoomY: true // pinch with two fingers to zoom on touch screens
  })
);

// make x axes stack
chart.bottomAxesContainer.set("layout", root.horizontalLayout); // the x axes sit side by side, one per pane

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
  minGridDistance: 15 // names may sit 15px apart, so most get a label
});

yRenderer.labels.template.setAll({
  multiLocation: 0.5, // a label covering several names sits in the middle of them
  location: 0.5,      // each name in the middle of its row
  paddingRight: 15    // 15px between the names and the plot
});

// grid lines through the middle of each row, where the points and bars are
yRenderer.grid.template.set("location", 0.5);

var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    tooltip: am5.Tooltip.new(root, {}), // shows the hovered name on the axis
    renderer: yRenderer
  })
);

yAxis.data.setAll(data);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// one pane: a value axis with its title, and a column or line series on it
function createSeries(field, name, margin, column) {
  var xRenderer = am5xy.AxisRendererX.new(root, {
    minGridDistance: 40 // at least 40px between value labels
  });

  xRenderer.labels.template.setAll({
    rotation: -90,   // the labels read upward...
    centerY: am5.p50 // ...centered on their grid lines
  });

  var xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {
        animationDuration: 0 // the axis tooltip jumps straight to the cursor
      }),
      // the same height for all three, so the pane titles line up
      height: 60,
      marginLeft: margin // this makes gap between axes
    })
  );

  // columns start at zero, so their lengths compare
  if (column) {
    xAxis.set("min", 0);
  }

  // name the pane with a title under its axis
  xAxis.children.push(am5.Label.new(root, {
    text: name,
    x: am5.p50,      // centered...
    centerX: am5.p50 // ...by its own middle
  }));

  var series;
  if (column) {
    series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: field,
        categoryYField: "category",
        sequencedInterpolation: true, // on load, the bars grow one after another
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal", // the tooltip points sideways at the bar
          labelText: "{name}: {valueX}"     // as "Deals closed: 20"
        })
      })
    );
  } else {
    series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: field,
        categoryYField: "category",
        sequencedInterpolation: true, // on load, the points move in one after another
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{name}: {valueX}"
        })
      })
    );
  }

  if (!column) {
    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationX: 1,
        locationY: 0.5, // the dot in the middle of its row
        sprite: am5.Circle.new(root, {
          radius: 4,               // 4px radius
          fill: series.get("fill") // in the line's color
        })
      });
    });
  }

  series.data.setAll(data);
  series.appear();

  return series;
}

createSeries("value1", "Deals closed", 0, true); // columns, no gap on the left
createSeries("value2", "Calls made", 30, false); // a line, 30px from the pane before
createSeries("value3", "Revenue, $k", 30, false);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none", // a drag over the plot pans instead of zooming
  yAxis: yAxis
}));

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
