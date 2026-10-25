---
title: "CPU and Memory Timeline"
source: "https://www.amcharts.com/demos/cpu-and-memory-timeline/"
category: "line-area"
scraped: "2026-10-25"
---

A 10-second recording of a web page, like the overview strip of the browser's performance tools: how busy the processor was and with what, and below it the memory the page's JavaScript held, sawing down at each garbage collection. Long tasks are marked in red.

One clock, several measures: Stacking axes on one time line keeps measures with different units apart but in step: here the processor's load in percent and the memory in megabytes, so a burst of script lines up with the memory it allocated, and a garbage collection with the drop it caused. The cursor runs through both panels, and the legend reads off every value at that moment.

Good for:
- Performance and monitoring data
- Several measures of one process over time
- Matching causes and effects on one time line

Think twice when:
- Measures with no common time: separate charts
- Many panels: a dashboard of small charts reads better

Prompt: Create a performance timeline like the overview of Chrome DevTools' performance panel, with generated data: a 10-second recording sampled every 20 ms. Top panel (60%): CPU use stacked by category as filled areas, 0 to 100% (Loading, Scripting, Rendering, Painting in theme colors, System in faint gray). Bottom panel: the JavaScript heap in MB as a line with a light fill, sawing down at each garbage collection, with a dot at each collection (larger for a major one). Both panels share the time axis in seconds (stacked y axes, each with an upright title). Mark long tasks (the processor busy at 95% or more for over 50 ms, whatever with) as faint red bands across the plot. Add a legend that shows each value at the cursor, a cursor that zooms on drag, and a scrollbar under the plot. On phones hide the legend. Use the amCharts 5 library with its Responsive theme.

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


// ── Sample data: a 10-second recording of a web page, every 20 ms, like the overview of the browser's performance
// tools: how busy the processor was and with what, and how much memory the page's JavaScript held. The page loads,
// rests, answers a click with a long burst of script, is scrolled for three seconds and fetches more data ──

// A seeded random number generator (mulberry32): the same recording on every visit
function makeRandom(seed) {
  return function() {
    seed = seed + 0x6D2B79F5 | 0;
    var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
var random = makeRandom(1020);

var data = [];
var heap = 6;          // MB of JavaScript memory in use
var sinceGC = 0;       // MB allocated since the last garbage collection
for (var i = 0; i <= 500; i++) {
  var t = i * 0.02;    // seconds
  var r = random();
  var loading = 0, scripting = 2 * r, rendering = 0, painting = 0;
  if (t < 1.2) {                      // the page loads: parsing and its scripts
    loading = 30 + 10 * r;
    scripting = 65 + 15 * random();  // with the parsing, the processor is flat out: one long task
    rendering = t > 0.9 ? 10 * random() : 0;
  } else if (t >= 2.5 && t < 3.4) {   // a click: a long burst of script, then the new content is laid out and painted
    scripting = t < 2.9 ? 88 + 8 * r : 15 + 25 * r;
    rendering = t >= 2.9 && t < 3.15 ? 45 + 20 * random() : 3 * random();
    painting = t >= 3.15 && t < 3.3 ? 30 + 15 * random() : 0;
  } else if (t >= 4 && t < 7) {       // scrolling: style, layout and paint every frame, a little script
    rendering = 18 + 12 * Math.sin(t * 9) * r + 6 * random();
    painting = 12 + 14 * random();
    scripting = 4 + 8 * random();
  } else if (t >= 7.6 && t < 8.3) {   // more data arrives and is shown
    loading = t < 7.75 ? 12 * r : 0;
    scripting = 40 + 30 * random();
    rendering = t > 8 ? 25 * random() : 5 * random();
  }
  var system = 3 + 4 * random();      // the browser's own housekeeping
  // the processor can't be more than 100% busy: a sample that adds up to more is scaled down
  var total = loading + scripting + rendering + painting + system;
  if (total > 99) {
    var k = 99 / total;
    loading *= k; scripting *= k; rendering *= k; painting *= k; system *= k;
  }

  // memory: script allocates as it runs; a minor collection frees most of what was allocated since the last one;
  // the scrolling leaves a little behind each time, so the heap creeps up until a major collection at 7.3 s
  var allocated = (scripting * 0.0045 + rendering * 0.0015) * (0.6 + 0.8 * random());
  heap += allocated;
  sinceGC += allocated;
  var gc = "";
  if (Math.abs(t - 7.3) < 0.01) {
    heap = 6 + (heap - 6) * 0.3; // it frees what the minor ones left behind
    sinceGC = 0;
    gc = "Major GC";
  } else if (sinceGC > 2.2) {
    heap -= sinceGC * (t >= 4 && t < 7 ? 0.8 : 0.92);
    sinceGC = 0;
    gc = "Minor GC";
  }

  data.push({
    time: Math.round(t * 1000) / 1000,
    loading: Math.round(loading), scripting: Math.round(scripting), rendering: Math.round(rendering),
    painting: Math.round(painting), system: Math.round(system),
    heap: Math.round(heap * 10) / 10,
    gc: gc
  });
}


// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",   // a sideways wheel pans...
  wheelY: "zoomX",  // ...the wheel zooms in on the time
  layout: root.verticalLayout
}));

// The two panels, CPU above memory, share the time axis: the y axes are stacked
// https://docs.amcharts.com/v5/charts/xy-chart/axes/ (see "Stacked axes")
chart.leftAxesContainer.set("layout", root.verticalLayout);

// Add legend: with the cursor on the chart, it shows each series' value at that moment
// https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.unshift(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50,
  marginBottom: 10
}));

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 60 });
xRenderer.grid.template.set("strokeOpacity", 0.06);
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  max: 10,
  strictMinMax: true,
  numberFormat: "#.#' s'",
  renderer: xRenderer
}));

// The axis' name, upright beside its labels
function axisTitle(axis, text) {
  axis.children.unshift(am5.Label.new(root, {
    text: text,
    rotation: -90,
    y: am5.p50,
    centerX: am5.p50,
    fontWeight: "500"
  }));
}

// CPU: how busy the main thread was, 0 to 100%, the top 60% of the plot
var cpuAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  max: 100,
  strictMinMax: true,
  numberFormat: "#'%'",
  height: am5.percent(60),
  renderer: am5xy.AxisRendererY.new(root, { minGridDistance: 30 })
}));
axisTitle(cpuAxis, "CPU");

// Memory: the JavaScript heap, in MB, the rest of the plot
var heapAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  numberFormat: "#' MB'",
  height: am5.percent(40),
  marginTop: 16, // a gap between the panels
  renderer: am5xy.AxisRendererY.new(root, { minGridDistance: 30 })
}));
axisTitle(heapAxis, "JS heap");

// Create series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
// The CPU's work by category, stacked: together they are how busy it was. The theme's colors, the browser's own work
// in a faint gray
var gray = root.interfaceColors.get("alternativeBackground");
[["Loading", "loading"], ["Scripting", "scripting"], ["Rendering", "rendering"], ["Painting", "painting"], ["System", "system"]].forEach(function(category) {
  var settings = {
    name: category[0],
    xAxis: xAxis,
    yAxis: cpuAxis,
    valueXField: "time",
    valueYField: category[1],
    stacked: true,
    legendValueText: "{valueY}%" // the value at the cursor, in the legend
  };
  if (category[0] === "System") {
    settings.stroke = gray;
    settings.fill = gray;
  }
  var series = chart.series.push(am5xy.LineSeries.new(root, settings));
  // a thin line along each area's top, in its own color: it closes the hairline gaps between the stacked fills
  series.strokes.template.setAll({
    strokeWidth: 1,
    strokeOpacity: category[0] === "System" ? 0.3 : 0.9 // the faint gray area's line as faint
  });
  series.fills.template.setAll({
    visible: true,
    fillOpacity: category[0] === "System" ? 0.3 : 0.8
  });
  series.data.setAll(data);
  legend.data.push(series);
});

// The JavaScript heap: a line that saws up as the page allocates and down at each garbage collection
var heapSeries = chart.series.push(am5xy.LineSeries.new(root, {
  name: "JS heap",
  xAxis: xAxis,
  yAxis: heapAxis,
  valueXField: "time",
  valueYField: "heap",
  legendValueText: "{valueY} MB",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY} MB"
  })
}));
heapSeries.strokes.template.set("strokeWidth", 2);
heapSeries.fills.template.setAll({ visible: true, fillOpacity: 0.12 });
heapSeries.data.setAll(data);
legend.data.push(heapSeries);

// The garbage collections: a series of their own on the heap's panel, with no line, only a dot at each (larger for
// a major one), so the legend can show and hide them
var gcSeries = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Garbage collection",
  xAxis: xAxis,
  yAxis: heapAxis,
  valueXField: "time",
  valueYField: "heap",
  stroke: heapSeries.get("stroke"), // the heap's color
  fill: heapSeries.get("fill")
}));
gcSeries.strokes.template.set("visible", false); // no line between the dots
gcSeries.bullets.push(function(root, series) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      fill: series.get("fill"),
      stroke: root.interfaceColors.get("background"),
      strokeWidth: 1.5,
      tooltipText: "[bold]{gc}[/]\n{valueX.formatNumber('#.00')} s",
      templateField: "dotSettings" // its size (no radius here: a setting made here would win over the data's)
    })
  });
});
gcSeries.data.setAll(data.filter(function(point) { return point.gc; }).map(function(point) {
  return {
    time: point.time,
    heap: point.heap,
    gc: point.gc,
    dotSettings: { radius: point.gc === "Major GC" ? 6 : 3 }
  };
}));
legend.data.push(gcSeries);

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

// Long tasks: where the processor was busy (95% or more, whatever with) for more than 50 ms in a row, the page could
// not answer the user. A faint red band across both panels
// https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/
// the busy stretches: one sample (20 ms) a little under the line doesn't end a stretch, as no task could run in it
var runs = [];
data.forEach(function(point) {
  var busy = point.loading + point.scripting + point.rendering + point.painting + point.system >= 95;
  var last = runs[runs.length - 1];
  if (busy) {
    if (last && point.time - last.end <= 0.041) {
      last.end = point.time;  // goes on, or picks up again after one quiet sample
    } else {
      runs.push({ start: point.time, end: point.time });
    }
  }
});
runs.filter(function(run) { return run.end - run.start > 0.05; }).forEach(function(run) {
  var range = xAxis.createAxisRange(xAxis.makeDataItem({ value: run.start, endValue: run.end + 0.02 }));
  range.get("axisFill").setAll({
    visible: true,
    fill: root.interfaceColors.get("negative"),
    fillOpacity: 0.1
  });
  range.get("label").setAll({
    text: "Long task",
    inside: true,
    fill: root.interfaceColors.get("negative"),
    fontSize: "0.75em",
    location: 0.5,     // over the middle of the band...
    centerY: am5.p100, // ...at the bottom of the plot
    dy: -4
  });
});

// Add cursor: a line through both panels; the legend reads off the values where it is
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomX", // drag across to zoom in
  xAxis: xAxis
}));
cursor.lineY.set("visible", false);

// Add scrollbar under the plot
// https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  opposite: true
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
