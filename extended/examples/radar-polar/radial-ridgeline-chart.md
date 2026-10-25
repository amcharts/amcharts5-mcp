---
title: "Radial Ridgeline Chart"
source: "https://www.amcharts.com/demos/radial-ridgeline-chart/"
category: "radar-polar"
scraped: "2026-10-25"
---

A year of a solar array's output as twelve rings, each a month's average day: midnight at the bottom, noon at the top. The latest month is in color and the eleven before it in gray, so it shows at a glance how this month compares with the rest of the year.

When a radial ridgeline works: A ridgeline stacks many curves of the same kind, each lifted off a baseline of its own, so they can overlap without hiding each other's shape. Bent into rings, it suits anything that runs round a clock: each hour sits at the same angle on every ring, so a year of daily patterns shows in one view, and one ring in color stands out against the rest.

Good for:
- Daily patterns: energy, traffic, visits by hour
- Many similar curves where the shape matters
- Spotting the days that break a pattern

Think twice when:
- Exact values: a line chart is easier to read
- A few series: plain lines are clearer
- Data with no daily or yearly cycle

Prompt: Create a radial ridgeline of a year of sample solar output from a 10 kW array: twelve rings, one per month from November 2025 to October 2026, each the month's average day in 15-minute steps. Use a radar chart with the 24 hours round a date axis over one day, midnight at the bottom and noon at the top, and one smoothed line per month on a ring of its own, the oldest innermost, lifted off its ring by the output so summer noons swell out over the next rings. Draw the eleven earlier months as thin gray lines and the latest month in the theme's first color; the line under the pointer turns blue. Label each ring with its month at midnight, on a small background so the line passes behind it. A cursor (a spoke only) shows only the tooltip of the line nearest the pointer: the month and the average output at that time in kW. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
var responsive = am5themes_Responsive.new(root); // kept in a variable: a rule of its own is added below
root.setThemes([
  am5themes_Animated.new(root),
  responsive
]);


// ── Sample data: a year of output from a 10 kW solar array at 48° north (Munich, Paris), every 15 minutes ──

var CAPACITY = 10; // the array's top output, kW
var STEPS = 96;    // fifteen-minute steps a day

// A seeded random number generator (mulberry32): the same clouds on every visit
function makeRandom(seed) {
  return function() {
    seed = seed + 0x6D2B79F5 | 0;
    var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// One day's output, kW, every 15 minutes: the sun's path on that date, dented by the day's clouds and by the month's
// weather (makeYear)
function makeDay(date, random, weather) {
  // the day's length and how high the sun gets at noon follow the date
  var dayOfYear = (date - new Date(date.getFullYear(), 0, 0)) / 864e5;
  var declination = 23.44 * Math.sin(2 * Math.PI * (284 + dayOfYear) / 365) * Math.PI / 180;
  var latitude = 48 * Math.PI / 180;
  var halfDay = Math.acos(-Math.tan(latitude) * Math.tan(declination)) * 12 / Math.PI; // hours from sunrise to noon
  var noon = 12.4; // the sun is highest a little after 12:00 on the clock
  var rise = noon - halfDay;
  var set = noon + halfDay;
  // the share of the capacity a clear noon gives: all of it in June, about a third in December
  var peak = Math.min(1, Math.sin(Math.PI / 2 - latitude + declination) / Math.sin(62 * Math.PI / 180));

  // the sky: half the days clear, a third broken, the rest grey
  var r = random();
  var sky = r < 0.5 ? 0.92 + 0.08 * random() : r < 0.82 ? 0.7 + 0.2 * random() : 0.2 + 0.3 * random();
  // passing clouds, each a dent in the curve: light ones on a clear day, deeper on the others
  var clouds = [];
  var count = sky > 0.9 ? 1 + Math.floor(random() * 2) : 2 + Math.floor(random() * 4);
  for (var i = 0; i < count; i++) {
    clouds.push({
      hour: rise + 1.2 + random() * (set - rise - 2.4), // when it passes
      width: 0.25 + random() * 0.6,                     // how long it takes, hours
      depth: sky > 0.9 ? 0.15 + random() * 0.3 : 0.3 + random() * 0.5 // the share of light it takes away
    });
  }
  // the month's recurring clouds (morning fog, afternoon storms...), a little earlier or later and stronger or weaker
  // from day to day, so they still show in the month's average
  weather.clouds.forEach(function(cloud) {
    clouds.push({
      hour: cloud.hour + (random() - 0.5) * 0.8,
      width: cloud.width,
      depth: Math.min(0.9, cloud.depth * (0.5 + random()))
    });
  });

  var output = [];
  for (var step = 0; step < STEPS; step++) {
    var hour = step * 24 / STEPS;
    // a clear day's curve: zero at night, rising to the noon peak
    var clear = hour > rise && hour < set ? Math.pow(Math.sin(Math.PI * (hour - rise) / (set - rise)), 1.25) * peak : 0;
    var light = sky * weather.sky; // the day's sky in the month's light
    clouds.forEach(function(cloud) {
      light *= 1 - cloud.depth * Math.exp(-Math.pow((hour - cloud.hour) / cloud.width, 2));
    });
    output.push(CAPACITY * clear * light);
  }
  return output;
}

// The average day of each of the twelve months to October 2026, oldest first: for every 15-minute step, the output of
// all the month's days added up and divided by their number
var FIRST_MONTH = new Date(2025, 10, 1); // November 2025
function makeYear() {
  var random = makeRandom(7);
  var months = [];
  for (var m = 0; m < 12; m++) {
    var start = new Date(FIRST_MONTH.getFullYear(), FIRST_MONTH.getMonth() + m, 1);
    var count = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate(); // the month's last day
    // the month's own weather: two to four cloud times that come back most days, and how bright the month is overall
    var weather = { sky: 0.75 + 0.25 * random(), clouds: [] };
    var times = 2 + Math.floor(random() * 3);
    for (var c = 0; c < times; c++) {
      weather.clouds.push({ hour: 7 + random() * 11, width: 0.4 + random() * 0.8, depth: 0.25 + random() * 0.35 });
    }
    var sum = [];
    for (var day = 1; day <= count; day++) {
      makeDay(new Date(start.getFullYear(), start.getMonth(), day), random, weather).forEach(function(kW, step) {
        sum[step] = (sum[step] || 0) + kW;
      });
    }
    months.push({ date: start, output: sum.map(function(kW) { return kW / count; }) });
  }
  return months;
}
var months = makeYear();


// ── The chart: one ring a month ──

// Create chart
// https://docs.amcharts.com/v5/charts/radar-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,    // no dragging...
  panY: false,
  wheelX: "none", // ...or zooming with the wheel
  wheelY: "none",
  startAngle: 90, // midnight at the bottom...
  endAngle: 450,  // ...and the full circle round, so noon is at the top
  radius: am5.percent(92),      // most of the space, leaving just room for the hour labels
  innerRadius: am5.percent(20), // the first months get room to swell, clear of the middle
  maxTooltipDistance: 1 // only the tooltip of the line nearest the pointer, not one for every month
}));

// Create axes
// https://docs.amcharts.com/v5/charts/radar-chart/radar-axes/
// The hours of the day round the circle: a date axis over one day. Every ring takes its times on that same day,
// so 13:00 is at the same angle on every ring
var DAY = new Date(2026, 0, 1).getTime(); // any day without a clock change
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  minGridDistance: 40 // labels at least 40px apart round the rim
});
xRenderer.labels.template.setAll({
  multiLocation: 0,    // each hour at its spoke, not between two
  textType: "regular", // upright, not turned along the circle
  radius: 16,          // out from the rim, clear of the highest noon
  maxPosition: 0.99    // the day's end is its start: one 00:00, not two on top of each other
});
xRenderer.grid.template.setAll({
  strokeOpacity: 0.08 // faint spokes, so they don't cut through the lines
});
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "minute", count: 15 }, // the data comes every 15 minutes
  gridIntervals: [{ timeUnit: "hour", count: 3 }], // a spoke every three hours
  min: DAY,
  max: DAY + 864e5, // midnight to midnight
  strictMinMax: true,
  markUnitChange: false, // midnight shows 00:00 like every other hour, not the date of a new day
  renderer: xRenderer
}));

// The rings go out from the middle, one value unit a month. The values place the lines but mean nothing to a reader,
// so the axis shows no numbers or grid: only each ring's month (below)
var yRenderer = am5radar.AxisRendererRadial.new(root, {
  axisAngle: 90 // the axis runs down to midnight, where every ring lies flat on its own value
});
yRenderer.labels.template.set("forceHidden", true);
yRenderer.grid.template.set("forceHidden", true);
var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,             // the first month's ring is one unit out from the hole
  strictMinMax: true, // the rim is the highest noon, not rounded up to a round number
  renderer: yRenderer
}));

// Create series
// https://docs.amcharts.com/v5/charts/radar-chart/radar-series/
// One line a month, the oldest nearest the middle and the latest at the rim. A month's output lifts its line off its
// own ring, so a summer noon swells out over the rings after it: a radial ridgeline. The latest month takes the
// theme's first color; the eleven before it are gray lines, for comparison
var gray = root.interfaceColors.get("alternativeBackground");
var ridgeHeight = 10; // a noon at full capacity swells out over this many rings
var lines = [];
var monthLabels = [];
months.forEach(function(month, index) {
  var latest = index === months.length - 1;
  var settings = {
    name: root.dateFormatter.format(month.date, "MMMM yyyy"), // for the tooltip
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "time",
    valueYField: "value",
    tooltip: am5.Tooltip.new(root, {
      labelText: "[bold]{name}[/]\nAverage at {valueX.formatDate('HH:mm')}: {power} kW"
    })
  };
  // gray for the earlier months; the latest is given no color, so it takes the theme's first
  if (!latest) {
    settings.stroke = gray;
    settings.fill = gray;
  }
  var series = chart.series.push(am5radar.SmoothedRadarLineSeries.new(root, settings));
  series.strokes.template.setAll({
    strokeWidth: latest ? 2.5 : 1.5,    // the latest month stands out (a 1px line is too thin to point at)
    strokeOpacity: latest ? 1 : 0.45,   // the gray lines are quieter
    interactive: true                   // the line takes the pointer, for its hover state
  });
  // the line under the pointer turns blue and thicker, which also makes it easier to stay on
  series.strokes.template.states.create("hover", {
    stroke: am5.color(0x2d7ff9),
    strokeWidth: 3.5,
    strokeOpacity: 1
  });
  lines.push(series);

  // The month's name on its ring at midnight, on the radial axis at the bottom, with a backing in the chart's
  // background color so the ring passes behind it
  // https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/
  var range = yAxis.createAxisRange(yAxis.makeDataItem({ value: index + 1 }));
  range.get("label").setAll({
    forceHidden: false, // the axis' own labels are hidden; this one shows
    text: root.dateFormatter.format(month.date, "MMM"),
    fontSize: "0.75em",
    fontWeight: latest ? "700" : "400",
    centerX: am5.p50,
    centerY: am5.p50,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 3,
    paddingRight: 3,
    background: am5.RoundedRectangle.new(root, {
      fill: root.interfaceColors.get("background"),
      fillOpacity: 1
    })
  });
  range.get("grid").set("forceHidden", true);
  monthLabels.push(range.get("label"));
});

// On a narrow chart (a phone) the rings are too close for every month's name: only every third month keeps its label
// (January, April, July and October). The rule is undone on a wider chart
responsive.addRule({
  relevant: function(width) { return width < 600; }, // the chart is under 600px wide
  applying: function() {
    monthLabels.forEach(function(label, index) {
      label.set("forceHidden", (index + 1) % 3 !== 0);
    });
  },
  removing: function() {
    monthLabels.forEach(function(label) {
      label.set("forceHidden", false);
    });
  }
});

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
// A spoke follows the pointer, and the tooltip of the month nearest to it shows
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {}));
cursor.lineY.set("visible", false); // no circle round the middle: the hovered line marks the month


// ── Drawing the year ──

// Each line's points: the month's ring plus its average output scaled to the ridge height. The times are on the
// axis's day
function lineData(index, month) {
  return month.output.map(function(kW, step) {
    return {
      time: DAY + step * 9e5, // 15 minutes apart
      value: Math.round((index + 1 + ridgeHeight * kW / CAPACITY) * 100) / 100, // two decimals are plenty to draw
      power: Math.round(kW * 10) / 10 // for the tooltip
    };
  });
}

function drawLines() {
  lines.forEach(function(series, index) {
    series.data.setAll(lineData(index, months[index]));
  });
}

drawLines();

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
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
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
