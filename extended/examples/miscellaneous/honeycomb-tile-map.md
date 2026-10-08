---
title: "Honeycomb Tile Map"
source: "https://www.amcharts.com/demos/honeycomb-tile-map/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A tile map made of hexagons, which fit together like a honeycomb and give each state up to six neighbors, so the layout follows the real map more closely than squares or circles can.

Why hexagons: Hexagons tile a plane with no gaps and touch six neighbors each, two more than squares, so states keep more of their real borders. The map still gives every state the same space, which keeps a big state from outweighing a small one.

Good for:
- State or country values where each counts equally
- Election maps
- A compact map for a dashboard

Think twice when:
- Values tied to area: use a real map
- Many small regions, like counties: the layout gets hard to read
- Exact values: add a table or a bar chart

Prompt: Create a honeycomb tile map of the US states as an XY chart: each state is a hexagon in a layout that follows the map, colored by population with its state code, and a heat legend under the map marks the state under the pointer. Use the amCharts 5 library with its Responsive theme.

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
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Short numbers: 39,250,000 shows as 39.3M
root.numberFormatter.set("numberFormat", "#.#a");

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {}));
// hide grid
chart.gridContainer.set("opacity", 0)

// Create axes: hidden, they only place the tiles in columns (x) and rows (y)
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50, inside: true }),
  min: 0,    // first values: the handler below fits min and max to the plot
  max: 12,
  strictMinMax: true,
  opacity: 0 // invisible
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, { inside: true, inversed: true }), // row 0 at the top
  min: -1,
  max: 7,
  strictMinMax: true,
  opacity: 0 // invisible
}));

// Keep the hexagons regular at any chart size: a column is sqrt(3)/2 as wide as a hexagon is tall, and the map
// (12 columns and 7 units of rows, plus a margin) sits in the middle of the plot
chart.plotContainer.events.on("boundschanged", function() {
  var w = chart.plotContainer.width();
  var h = chart.plotContainer.height();
  var ratio = Math.sqrt(3) / 2;
  var unit = Math.min(h / 8, w / 13 / ratio);
  xAxis.setAll({ min: 5.75 - w / (unit * ratio) / 2, max: 5.75 + w / (unit * ratio) / 2 });
  yAxis.setAll({ min: 3 - h / unit / 2, max: 3 + h / unit / 2 });
});

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  // works out valueLow and valueHigh, which the heat rules and the legend use
  calculateAggregates: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  valueField: "value" // the value the heat rules color the tiles by
}));

// Add bullet: a hexagon for each state, outlined in the background color, which leaves a gap between them
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
var template = am5.Template.new({
  stroke: root.interfaceColors.get("background"),
  strokeWidth: 2 // 2px gaps
});
series.bullets.push(function() {
  var graphics = am5.Line.new(root, {
    fill: series.get("fill"),       // replaced by the heat rule's color
    tooltipText: "{name}: {value}", // as "California: 39.3M"
    tooltipY: 0 // the tooltip points at the top of the hexagon
  }, template);

  // an adapter on x runs each time the bullet moves, so the hexagon is redrawn to the size of an axis cell
  graphics.adapters.add("x", function(x, target) {
    var w = Math.abs(xAxis.getX(0, 1, 0) - xAxis.getX(1, 1, 0)) / 2; // half a column's width, in pixels
    var h = Math.abs(yAxis.getY(0, 1, 0) - yAxis.getY(1, 1, 0)) / 2; // half a row's height

    // the hexagon's corners, pointy at the top and bottom, ending where it starts
    var p0 = { x: 0, y: -h };
    var p1 = { x: w, y: -h / 2 };
    var p2 = { x: w, y: h / 2 };
    var p3 = { x: 0, y: h };
    var p4 = { x: -w, y: h / 2 };
    var p5 = { x: -w, y: -h / 2 };
    var p6 = { x: 0, y: -h };

    target.set("segments", [[[p0, p1, p2, p3, p4, p5, p6]]]) // draw the outline through them

    // return original x
    return x;
  })

  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// another bullet for label: the state's code, black or white to stand out on its tile (set by a heat rule below)
var labelTemplate = am5.Template.new({
  text: "{short}",
  textAlign: "center"
});
series.bullets.push(function() {
  var label = am5.Label.new(root, {
    populateText: true, // fills in {short} from the data
    centerX: am5.p50,   // centered on the hexagon
    centerY: am5.p50
  }, labelTemplate);

  return am5.Bullet.new(root, {
    sprite: label
  });
});

// Color the tiles by population, in shades of the theme's first color
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
var colors = chart.get("colors"); // the theme's colors
var lowColor = am5.Color.lighten(colors.getIndex(0), 0.6); // a light tint of the first color...
var highColor = am5.Color.brighten(colors.getIndex(0), -0.5); // ...and a dark shade of it

series.set("heatRules", [{
  target: template,
  min: lowColor,      // the least populous state in the light tint...
  max: highColor,     // ...the most populous in the dark shade
  dataField: "value",
  key: "fill"         // the heat rule sets each hexagon's fill
}, {
  // the state codes: black on the light tiles, white on the dark ones
  target: labelTemplate,
  dataField: "value",
  customFunction: function(label, min, max, value) {
    // the tile's color, worked out as the rule above does
    var tileColor = am5.Color.interpolate((value - min) / (max - min), lowColor, highColor);
    label.set("fill", am5.Color.alternative(tileColor, am5.color(0xffffff), am5.color(0x000000)));
  }
}]);

// the line series shows only its bullets, with no line between them
series.strokes.template.set("strokeOpacity", 0);

// Add a color scale under the map
// https://www.amcharts.com/docs/v5/concepts/legend/heat-legend/
var heatLegend = chart.bottomAxesContainer.children.push(am5.HeatLegend.new(root, {
  orientation: "horizontal",       // a color bar along the bottom...
  startColor: lowColor,            // ...in the heat rule's colors...
  endColor: highColor,
  width: am5.percent(40),          // ...40% of the chart's width...
  x: am5.p50,                      // ...centered...
  centerX: am5.p50                 // ...by its own middle
}));

// the scale runs from the smallest state's population to the biggest's
series.events.on("datavalidated", function() {
  heatLegend.set("startValue", series.getPrivate("valueLow"));
  heatLegend.set("endValue", series.getPrivate("valueHigh"));
});

// point at a state to see where it sits on the scale
template.events.on("pointerover", function(ev) {
  heatLegend.showValue(ev.target.dataItem.get("value"));
});

var data = [{
  short: "AL",
  name: "Alabama",
  y: 6,
  x: 7,
  value: 4849300
}, {
  short: "AK",
  name: "Alaska",
  y: 0,
  x: 0,
  value: 737700
}, {
  short: "AZ",
  name: "Arizona",
  y: 5,
  x: 3,
  value: 6745400
}, {
  short: "AR",
  name: "Arkansas",
  y: 5,
  x: 6,
  value: 2994000
}, {
  short: "CA",
  name: "California",
  y: 5,
  x: 2,
  value: 39250000
}, {
  short: "CO",
  name: "Colorado",
  y: 4,
  x: 3,
  value: 5540500
}, {
  short: "CT",
  name: "Connecticut",
  y: 3,
  x: 11,
  value: 3596600
}, {
  short: "DE",
  name: "Delaware",
  y: 4,
  x: 9,
  value: 935600
}, {
  short: "DC",
  name: "District of Columbia",
  y: 4,
  x: 10,
  value: 658900
}, {
  short: "FL",
  name: "Florida",
  y: 8,
  x: 8,
  value: 20612400
}, {
  short: "GA",
  name: "Georgia",
  y: 7,
  x: 8,
  value: 10310300
}, {
  short: "HI",
  name: "Hawaii",
  y: 8,
  x: 0,
  value: 1419500
}, {
  short: "ID",
  name: "Idaho",
  y: 3,
  x: 2,
  value: 1634400
}, {
  short: "IL",
  name: "Illinois",
  y: 3,
  x: 6,
  value: 12801500
}, {
  short: "IN",
  name: "Indiana",
  y: 3,
  x: 7,
  value: 6596800
}, {
  short: "IA",
  name: "Iowa",
  y: 3,
  x: 5,
  value: 3107100
}, {
  short: "KS",
  name: "Kansas",
  y: 5,
  x: 5,
  value: 2904000
}, {
  short: "KY",
  name: "Kentucky",
  y: 4,
  x: 6,
  value: 4413400
}, {
  short: "LA",
  name: "Louisiana",
  y: 6,
  x: 5,
  value: 4649600
}, {
  short: "ME",
  name: "Maine",
  y: 0,
  x: 11,
  value: 1330000
}, {
  short: "MD",
  name: "Maryland",
  y: 4,
  x: 8,
  value: 6016400
}, {
  short: "MA",
  name: "Massachusetts",
  y: 2,
  x: 10,
  value: 6811700
}, {
  short: "MI",
  name: "Michigan",
  y: 2,
  x: 7,
  value: 9928300
}, {
  short: "MN",
  name: "Minnesota",
  y: 2,
  x: 4,
  value: 5519900
}, {
  short: "MS",
  name: "Mississippi",
  y: 6,
  x: 6,
  value: 2984900
}, {
  short: "MO",
  name: "Missouri",
  y: 4,
  x: 5,
  value: 6093000
}, {
  short: "MT",
  name: "Montana",
  y: 2,
  x: 2,
  value: 1023500
}, {
  short: "NE",
  name: "Nebraska",
  y: 4,
  x: 4,
  value: 1881500
}, {
  short: "NV",
  name: "Nevada",
  y: 4,
  x: 2,
  value: 2839000
}, {
  short: "NH",
  name: "New Hampshire",
  y: 1,
  x: 11,
  value: 1326800
}, {
  short: "NJ",
  name: "New Jersey",
  y: 3,
  x: 10,
  value: 8944400
}, {
  short: "NM",
  name: "New Mexico",
  y: 6,
  x: 3,
  value: 2085500
}, {
  short: "NY",
  name: "New York",
  y: 2,
  x: 9,
  value: 19745200
}, {
  short: "NC",
  name: "North Carolina",
  y: 5,
  x: 9,
  value: 10146700
}, {
  short: "ND",
  name: "North Dakota",
  y: 2,
  x: 3,
  value: 739400
}, {
  short: "OH",
  name: "Ohio",
  y: 3,
  x: 8,
  value: 11614370
}, {
  short: "OK",
  name: "Oklahoma",
  y: 6,
  x: 4,
  value: 3878000
}, {
  short: "OR",
  name: "Oregon",
  y: 4,
  x: 1,
  value: 3970200
}, {
  short: "PA",
  name: "Pennsylvania",
  y: 3,
  x: 9,
  value: 12784200
}, {
  short: "RI",
  name: "Rhode Island",
  y: 2,
  x: 11,
  value: 1055100
}, {
  short: "SC",
  name: "South Carolina",
  y: 6,
  x: 8,
  value: 4832400
}, {
  short: "SD",
  name: "South Dakota",
  y: 3,
  x: 4,
  value: 853100
}, {
  short: "TN",
  name: "Tennessee",
  y: 5,
  x: 7,
  value: 6651100
}, {
  short: "TX",
  name: "Texas",
  y: 7,
  x: 4,
  value: 27862500
}, {
  short: "UT",
  name: "Utah",
  y: 5,
  x: 4,
  value: 2942900
}, {
  short: "VT",
  name: "Vermont",
  y: 1,
  x: 10,
  value: 626010
}, {
  short: "VA",
  name: "Virginia",
  y: 5,
  x: 8,
  value: 8411800
}, {
  short: "WA",
  name: "Washington",
  y: 2,
  x: 1,
  value: 7288000
}, {
  short: "WV",
  name: "West Virginia",
  y: 4,
  x: 7,
  value: 1850320
}, {
  short: "WI",
  name: "Wisconsin",
  y: 2,
  x: 5,
  value: 5778700
}, {
  short: "WY",
  name: "Wyoming",
  y: 3,
  x: 3,
  value: 584150
}]

// loop through all items and move the even rows half a column to the right
// each row sits 3/4 of a hexagon's height below the last, so the rows overlap
var vStep = (1 + am5.math.sin(30)) / 2;
am5.array.each(data, function(di) {
  // every other row moves half a column right, so the rows interlock
  if (di.y / 2 == Math.round(di.y / 2)) {
    di.x += 0.5;
  }
  // shift y for the hexagons to stick to each other
  di.y = vStep * di.y;
})

series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);

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
