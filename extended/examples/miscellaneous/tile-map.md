---
title: "Tile Map"
source: "https://www.amcharts.com/demos/tile-map/"
category: "miscellaneous"
scraped: "2026-10-08"
---

Every state gets one same-size tile, roughly where it lies, so small states count as much as big ones. Here, the 50 states and D.C., by population.

When to use a tile map: On a real map, big states dominate and small ones vanish, although each counts once. A tile map gives every state the same space, so the colors compare fairly, at the cost of shape and size. It works where readers know the geography well enough to find their state.

Good for:
- Values per state, where each state counts equally
- Elections, rates and rankings
- Small multiples: one tile map per year or measure

Think twice when:
- Values tied to area, like land use: use a real map
- Readers who don’t know the layout: the codes need a key
- Exact values: add a sorted bar chart

Prompt: Create a tile map of the US states as an XY chart: each state is a circle in a grid that follows the map, colored by population with its state code, and stays round at any size. A heat legend under the map marks the state under the pointer. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
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
  // labels inside the plot, so the hidden axes take no room at its edges
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50, inside: true }),
  min: 0, // columns 0 to 12; the handler below fits this to the plot
  max: 12,
  strictMinMax: true, // exactly this range, not rounded to nicer numbers
  opacity:0           // the axis is there to place the tiles, but not drawn
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, { inside: true, inversed: true }), // row 0 at the top
  min: -1, // rows 0 to 8 with a margin; the handler below fits it too
  max: 9,
  strictMinMax: true,
  opacity:0
}));

// Keep the tiles round at any chart size: a column is as wide as a row is tall, and the map (12 columns and
// 9 rows, plus a margin) sits in the middle of the plot
chart.plotContainer.events.on("boundschanged", function() {
  var w = chart.plotContainer.width();
  var h = chart.plotContainer.height();
  var unit = Math.min(w / 13, h / 10);
  xAxis.setAll({ min: 5.75 - w / unit / 2, max: 5.75 + w / unit / 2 });
  yAxis.setAll({ min: 4 - h / unit / 2, max: 4 + h / unit / 2 });
});

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  // works out the lowest and highest population, for the heat rules and the heat legend
  calculateAggregates: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  valueField: "value" // the population, which the heat rule reads
}));

// Add bullet: a circle for each state
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
var circleTemplate = am5.Template.new({}); // shared by all the circles, so the heat rule can color each one
series.bullets.push(function() {
  var graphics = am5.Circle.new(root, {
    fill: series.get("fill"), // the series color, until the heat rule colors the circle
    tooltipText: "{name}: {value}",
    tooltipY: 0, // the tooltip points at the top of the circle
  }, circleTemplate);

  // we use adapter for x as radius will be called only once and x will be called each time position changes
  graphics.adapters.add("x", function(x, target) {
    // find which gap between values is smaller, x or y and set half of it for radius
    target.set("radius", Math.min(Math.abs(xAxis.getX(0, 1, 0) - xAxis.getX(1, 1, 0)), Math.abs(yAxis.getY(0, 1, 0) - yAxis.getY(1, 1, 0))) / 2);
    // return original x
    return x;
  })

  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// another bullet for label: the state's code, black or white to stand out on its tile (a heat rule below
// picks which)
var labelTemplate = am5.Template.new({
  text: "{short}", // the state's two-letter code from the data
  textAlign: "center"
});
series.bullets.push(function() {
  var label = am5.Label.new(root, {
    populateText: true, // fills in {short} from the state's data
    centerX: am5.p50,   // centered on the tile
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
  target: circleTemplate,
  min: lowColor,      // the least populous state in the light tint...
  max: highColor,     // ...the most populous in the dark shade
  dataField: "value", // by the series' valueField, the population
  key: "fill"         // the setting the rule changes
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

// no line between the tiles: only the circles show
series.strokes.template.set("strokeOpacity", 0);

// Add a heat legend under the map
// https://www.amcharts.com/docs/v5/concepts/legend/heat-legend/
var heatLegend = chart.bottomAxesContainer.children.push(am5.HeatLegend.new(root, {
  orientation: "horizontal", // a bar that runs left to right
  startColor: lowColor,      // the same colors as the heat rule
  endColor: highColor,
  width: am5.percent(40), // 40% of the chart's width...
  x: am5.p50,             // ...centered
  centerX: am5.p50
}));

// once the data is in, the legend runs from the lowest to the highest population
series.events.on("datavalidated", function() {
  heatLegend.set("startValue", series.getPrivate("valueLow"));
  heatLegend.set("endValue", series.getPrivate("valueHigh"));
});

// point at a state to see where it sits on the legend
circleTemplate.events.on("pointerover", function(ev) {
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
am5.array.each(data, function(di) {
  if (di.y / 2 == Math.round(di.y / 2)) {
    di.x += 0.5;
  }
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
