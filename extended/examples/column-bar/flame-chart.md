---
title: "Flame Chart"
source: "https://www.amcharts.com/demos/flame-chart/"
category: "column-bar"
scraped: "2026-10-25"
---

A page's main thread for 1.6 seconds as it loads and starts up, the way the browser's performance tools draw it: each task on top, the calls it made stacked below it, colored by what they do. The part of a task past 50 ms is striped red.

Reading a flame chart: A flame chart puts time across and the call stack down: every bar is a function or a browser activity, as long as it ran, sitting under the one that called it. Wide bars are where the time goes; tall stacks are deep calls; a gap between tasks is the page at rest. It is the main view of a browser's performance tools, and works for any nested, timed work: server traces, build steps, render passes.

Good for:
- Profiles and traces: where the time goes
- Nested work over time: requests, jobs, builds
- Spotting long tasks and deep call stacks

Think twice when:
- Totals per function: a sorted bar chart is clearer
- Thousands of tiny frames: aggregate first

Prompt: Create a flame chart of a web page's main thread like Chrome DevTools' performance panel, with generated data: 1.6 seconds of page load and start-up, time in milliseconds along the top, call stack depth down (0 at the top, no labels). Each frame is a floating bar from its start to its end on its depth's row, with its name inside, cut to the bar's width. One column series per category (Task in faint gray, Loading, Scripting, Rendering, Painting in theme colors) with a legend; tasks over 50 ms get red stripes over the part past 50 ms, the limit a parameter of the function that finds them. Tooltips: name, total time, and self time (the total less the calls one row down inside it), category. On phones hide the legend. Zoom with the wheel, pan by dragging, and a scrollbar under the plot. Use the amCharts 5 library with its Responsive theme.

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


// ── Sample data: 1.6 seconds of a web page's main thread as it loads and starts up, like a recording in the
// browser's performance tools. Each frame is a function or a browser activity: when it started, when it ended, how
// deep in the call stack (0 is the task at the top) and its category ──

// A seeded random number generator (mulberry32): the same recording on every visit
function makeRandom(seed) {
  return function() {
    seed = seed + 0x6D2B79F5 | 0;
    var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
var random = makeRandom(1600);
function pick(list) { return list[Math.floor(random() * list.length)]; }

var FUNCTIONS = ["bootstrap", "initApp", "render", "renderList", "renderRow", "createElement", "appendChild",
  "setState", "reconcile", "commitRoot", "updateDOM", "fetchData", "parseJSON", "formatDate", "sortRows",
  "filterItems", "mapItems", "measureText", "hydrate", "dispatch", "reduce", "notify", "emit", "(anonymous)"];

var frames = [];
// A frame and, inside it, its calls: they take part of its time, the rest is its own (self) time (worked out below)
function frame(name, category, start, end, depth, nest) {
  var item = { name: name, category: category, start: start, end: end, depth: String(depth) };
  frames.push(item);
  var length = end - start;
  if (nest && depth < 11 && length > 2) {
    // its calls fill most of its time (70 to 95%), back to back with small gaps: its own work. A long frame makes
    // more calls, so the stack narrows as it goes down, like icicles
    var calls = length > 40 ? 2 + Math.floor(random() * 3) : 1 + Math.floor(random() * 2);
    var busy = length * (0.7 + 0.25 * random());
    var weights = [], total = 0;
    for (var i = 0; i < calls; i++) { weights.push(0.3 + random()); total += weights[i]; }
    var gap = (length - busy) / (calls + 1);
    var at = start + gap;
    weights.forEach(function(weight) {
      var share = busy * weight / total;
      frame(pick(FUNCTIONS), "Scripting", at, at + share, depth + 1, random() < 0.95 - depth * 0.05); // deeper calls nest a little less often
      at += share + gap;
    });
  }
  return item;
}

// One task of the main thread: a gray "Task" bar on top and the work it did below it, back to back
function task(start, work) {
  var at = start;
  var parts = [];
  work.forEach(function(part) {
    parts.push({ part: part, start: at });
    at += part[2];
  });
  frame("Task", "Task", start, at, 0, false);
  parts.forEach(function(p) {
    frame(p.part[0], p.part[1], p.start, p.start + p.part[2], 1, p.part[1] === "Scripting");
  });
  return at;
}

var t = 4;
t = task(t, [["Parse HTML", "Loading", 9]]) + 3;
t = task(t, [["Evaluate Script", "Scripting", 34], ["Parse HTML", "Loading", 4]]) + 6;
t = task(t, [["Recalculate Style", "Rendering", 7], ["Layout", "Rendering", 11]]) + 4;
t = task(t, [["Paint", "Painting", 5], ["Commit", "Painting", 2]]) + 40;
t = task(t, [["Evaluate Script", "Scripting", 128], ["Minor GC", "Scripting", 3]]) + 5;   // the app bundle: a long task
t = task(t, [["Recalculate Style", "Rendering", 14], ["Layout", "Rendering", 31]]) + 3;
t = task(t, [["Paint", "Painting", 9], ["Commit", "Painting", 3]]) + 60;
t = task(t, [["XHR Load", "Loading", 3], ["Function Call", "Scripting", 46]]) + 4;
t = task(t, [["Function Call", "Scripting", 212], ["Minor GC", "Scripting", 4]]) + 2; // rendering the list: the longest
t = task(t, [["Recalculate Style", "Rendering", 22], ["Layout", "Rendering", 64]]) + 3;   // and its layout
t = task(t, [["Paint", "Painting", 18], ["Commit", "Painting", 4]]) + 90;
for (var i = 0; i < 8; i++) {
  // then quieter: animation frames and timers
  t = task(t, [[i % 3 === 2 ? "Timer Fired" : "Animation Frame Fired", "Scripting", 6 + 10 * random()],
    ["Recalculate Style", "Rendering", 1.5 + 2 * random()], ["Paint", "Painting", 1.5 + 2 * random()]]) + 30 + 50 * random();
}
t = task(t, [["Event: click", "Scripting", 74], ["Layout", "Rendering", 9]]) + 6;
t = task(t, [["Paint", "Painting", 6], ["Commit", "Painting", 2]]) + 20;
var END = Math.ceil(t / 50) * 50;

// Each frame's total time, and its own (self) time: the total less what the calls one row down inside it took.
// Rounded for the tooltips
frames.forEach(function(f) {
  var calls = frames.filter(function(c) {
    return c.depth === String(+f.depth + 1) && c.start >= f.start && c.end <= f.end;
  });
  var called = calls.reduce(function(sum, c) { return sum + c.end - c.start; }, 0);
  f.duration = Math.round((f.end - f.start) * 10) / 10;
  f.self = Math.round((f.end - f.start - called) * 10) / 10;
});

// A task over 50 ms blocks the page long enough for a user to notice: the part past 50 ms is a long task. The limit
// is a parameter, so it can be changed
function findLongTasks(limit) {
  return frames.filter(function(f) { return f.depth === "0" && f.end - f.start > limit; }).map(function(f) {
    return { name: "Long task", start: f.start + limit, end: f.end, depth: "0", over: Math.round(f.end - f.start - limit), limit: limit };
  });
}


// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,       // a drag pans along the time line...
  panY: false,
  wheelX: "panX",   // ...and so does a sideways wheel
  wheelY: "zoomX",  // the wheel zooms in on the time
  paddingRight: 30, // room for the last time label, which is centered on the plot's edge
  layout: root.verticalLayout
}));

// Add legend: the categories
// https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.unshift(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50,
  marginBottom: 10
}));

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
// The time, in milliseconds, along the top, as in the browser's tools
var xRenderer = am5xy.AxisRendererX.new(root, {
  opposite: true,      // on top
  minGridDistance: 70
});
xRenderer.grid.template.set("strokeOpacity", 0.06);
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  max: END,
  strictMinMax: true,
  numberFormat: "#,###' ms'",
  renderer: xRenderer
}));

// The depth of the call stack, from the task at the top down: one row each, with no labels
var yRenderer = am5xy.AxisRendererY.new(root, {
  inversed: true,         // depth 0 at the top
  cellStartLocation: 0.04, // the bars fill their rows, with a hairline between
  cellEndLocation: 0.96,
  minGridDistance: 1
});
yRenderer.labels.template.set("forceHidden", true);
yRenderer.grid.template.set("forceHidden", true);
var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "depth",
  renderer: yRenderer
}));
// as many rows as the deepest stack needs
var deepest = Math.max.apply(null, frames.map(function(f) { return +f.depth; }));
var depths = [];
for (var d = 0; d <= deepest; d++) { depths.push({ depth: String(d) }); }
yAxis.data.setAll(depths);

// Create series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
// One series per category, so the legend can show and hide each. A frame is a floating bar from its start to its end,
// on its row of the call stack, with its name inside it as far as it fits
function makeSeries(name, settings) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, Object.assign({
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    openValueXField: "start",
    valueXField: "end",
    categoryYField: "depth",
    clustered: false // every series shares the rows
  }, settings))); // plus the series' own settings, if any (the tasks' gray)
  series.columns.template.setAll({
    strokeOpacity: 0,
    tooltipText: "[bold]{name}[/]\n{duration} ms, {self} ms self\n" + name,
    tooltipY: 0
  });

  // the name inside the bar, cut short to the bar's width (a narrow bar shows none)
  series.bullets.push(function() {
    return am5.Bullet.new(root, {
      locationX: 0, // at the bar's start
      sprite: am5.Label.new(root, {
        text: "{name}",
        populateText: true,
        centerY: am5.p50,
        dx: 3,
        fontSize: "0.75em",
        oversizedBehavior: "truncate",
        maxWidth: 0,
        forceHidden: true, // shown once its bar's width is known (below)
        interactive: false // the bar has the tooltip
      })
    });
  });
  series.columns.template.onPrivate("width", function(width, column) {
    var bullet = column.dataItem && column.dataItem.bullets && column.dataItem.bullets[0];
    if (bullet) {
      var label = bullet.get("sprite");
      label.set("maxWidth", Math.max(0, width - 6));
      label.set("forceHidden", width < 40); // too narrow for more than an ellipsis
    }
  });
  legend.data.push(series);
  return series;
}

// The tasks: gray, the interface's contrast color faint, so they read as the frame for what runs in them
var gray = root.interfaceColors.get("alternativeBackground");
var taskSeries = makeSeries("Task", { fill: gray, stroke: gray });
taskSeries.columns.template.set("fillOpacity", 0.18);
taskSeries.data.setAll(frames.filter(function(f) { return f.category === "Task"; }));

// The work, in the theme's colors
["Loading", "Scripting", "Rendering", "Painting"].forEach(function(category) {
  makeSeries(category).data.setAll(frames.filter(function(f) { return f.category === category; }));
});

// Long tasks: red stripes over the part of a task past 50 ms, as the browser's tools mark them
var red = root.interfaceColors.get("negative");
var longSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Long task (over 50 ms)",
  xAxis: xAxis,
  yAxis: yAxis,
  openValueXField: "start",
  valueXField: "end",
  categoryYField: "depth",
  clustered: false,
  fill: red,
  stroke: red
}));
longSeries.columns.template.setAll({
  strokeOpacity: 0,
  fillOpacity: 0,
  fillPattern: am5.LinePattern.new(root, {
    color: red,
    rotation: 45,
    strokeWidth: 3,
    gap: 6,
    // the stripes on the chart's background, which covers the task's gray: the legend's swatch looks the same
    fill: root.interfaceColors.get("background"),
    fillOpacity: 1
  }),
  tooltipText: "[bold]Long task[/]\n{over} ms over the {limit} ms budget"
});
longSeries.data.setAll(findLongTasks(50));
legend.data.push(longSeries);

// On a narrow chart (a phone) the legend would take most of the height: it is hidden there. The rule is
// undone on a wider chart
responsive.addRule({
  relevant: am5themes_Responsive.widthM, // the chart is 600px wide or less
  applying: function() {
    legend.set("forceHidden", true);
  },
  removing: function() {
    legend.set("forceHidden", false);
  }
});

// Add scrollbar under the plot
// https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  opposite: true // under the plot (the time axis is on top)
}));

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
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
