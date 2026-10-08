---
title: "Strip Plot"
source: "https://www.amcharts.com/demos/strip-plot/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A strip plot puts every value of a group on one line, so you see how they spread instead of a single average. Here, made-up posts on twelve social networks: when each went out and, by its size, how many likes it got.

When a strip plot works: A strip plot shows every single value, so clusters, gaps and outliers stay visible where an average or a box plot would hide them. It suits a few dozen points per group; with hundreds, the dots pile up and a violin or box plot reads better.

Good for:
- Spread of values per group
- Spotting clusters, gaps and outliers
- A few dozen points per row

Think twice when:
- Hundreds of points per group: use a violin or box plot
- Comparing averages only: a bar chart is simpler
- Points that overlap exactly: a beeswarm spreads them out

Prompt: Create a strip plot of made-up social media posts: a row for each of 12 networks, and each post a dot placed by its time of day, sized by its likes and colored by network. Use the amCharts 5 library with its Responsive theme.

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

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false, // dragging the plot doesn't pan it
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe moves along the day
  wheelY: "zoomX", // the vertical wheel zooms in on the hours
  layout: root.verticalLayout
}));

// Social networks with their brand colors; the black ones take the theme's text color, so they show on a dark
// background too
var categories = [
  { category: "Twitter", color: am5.color(0x00aade) },
  { category: "Facebook", color: am5.color(0x385997) },
  { category: "Instagram", color: am5.color(0xf04571) },
  { category: "WhatsApp", color: am5.color(0x03c03e) },
  { category: "YouTube", color: am5.color(0xff0100) },
  { category: "Pinterest", color: am5.color(0xc31e31) },
  { category: "Snapchat", color: am5.color(0xfffc40) },
  { category: "LinkedIn", color: am5.color(0x007fb5) },
  { category: "Reddit", color: am5.color(0xff4500) },
  { category: "TikTok", color: root.interfaceColors.get("text") },
  { category: "Telegram", color: am5.color(0x04acde) },
  { category: "Discord", color: am5.color(0x5865f2) }
];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: am5xy.AxisRendererY.new(root, {
    minGridDistance: 10, // rows can get as close as 10px before names are skipped
    cellStartLocation: 0.1,
    cellEndLocation: 0.9,
    inversed: true // the first network at the top
  }),
  // a dot in the network's color next to its name
  bullet: function (root, axis, dataItem) {
    return am5xy.AxisBullet.new(root, {
      locationY: 0.5, // the dot sits in the middle of the row
      sprite: am5.Circle.new(root, {
        dx: -14, // moved left, into the space the label padding leaves
        radius: 6,
        fill: dataItem.dataContext.color // the network's own color
      })
    });
  }
}));

var yRenderer = yAxis.get("renderer");

// room for the colored dot between each name and the plot
yRenderer.labels.template.setAll({
  paddingRight: 28
});

// grid lines run through the middle of each row, under the dots
yRenderer.grid.template.setAll({
  location: 0.5
});

yAxis.data.setAll(categories);

// The time of day a post went out, from midnight to midnight
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "minute", count: 1 }, // times are to the minute
  min: new Date(2026, 0, 1).getTime(),            // the axis spans exactly one day, midnight to midnight
  max: new Date(2026, 0, 2).getTime(),
  strictMinMax: true, // no extra room past midnight at either end
  // times only, also at midnight, where the axis would show the date
  periodChangeDateFormats: { hour: "HH:mm" },
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 60 // at least 60px between time labels
  })
}));

var xRenderer = xAxis.get("renderer");

// no label at the right end (midnight again), where it would be cut in half
xRenderer.labels.template.set("maxPosition", 0.98);

xRenderer.grid.template.setAll({
  forceHidden: true // no vertical grid lines
});

// Made-up data: up to 20 posts per network, each with the time it went out and the likes it got
var data = [];

for(var i = 0; i < categories.length; i++) {
  var category = categories[i];
  var count = Math.ceil(Math.random() * 20);
  for(var x = 0; x < count; x++) {
    data.push({
      category: category.category,
      time: new Date(2026, 0, 1, 0, 30 + Math.round(Math.random() * 1380)).getTime(),
      likes: Math.round(Math.random() * 1000),
      bulletSettings: {
        fill: category.color
      }
    })
  }
}

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  baseAxis: yAxis, // the rows are the base axis; the time runs along x
  valueXField: "time",
  valueField: "likes", // the value the heat rule reads
  categoryYField: "category",
  // works out the lowest and highest likes, which the heat rule below sizes the dots by
  calculateAggregates: true
}));

// no line between the posts: only the dots show
series.strokes.template.setAll({
  strokeOpacity: 0
});

series.data.setAll(data);

// Add bullets
var circleTemplate = am5.Template.new({}); // shared by all the dots, so the heat rule can size each one

var bullet = series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 0.5, // each dot in the middle of its network's row
    sprite: am5.Circle.new(root, {
      tooltipText: "{categoryY} at {valueX.formatDate('HH:mm')}: [bold]{value} likes[/]",
      radius: 5, // the starting size; the heat rule sets the real one
      stroke: root.interfaceColors.get("background"), // a background-colored ring keeps overlapping dots apart
      strokeWidth: 1,
      fillOpacity: 0.8,               // slightly see-through, so dots behind still show
      templateField: "bulletSettings" // each dot takes its fill from its post's bulletSettings
    }, circleTemplate)
  });
});

// Add heat rules to bullets: the more likes, the bigger the dot
series.set("heatRules", [{
  target: circleTemplate,
  min: 4,             // the post with the fewest likes gets a 4px radius...
  max: 14,            // ...and the one with the most 14px
  dataField: "value", // sized by the series' valueField, the likes
  key: "radius"       // the setting the rule changes
}]);

// Add scrollbar
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear();
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
