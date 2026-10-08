---
title: "Horizontal Serpentine Timeline"
source: "https://www.amcharts.com/demos/horizontal-serpentine-timeline/"
category: "timeline"
scraped: "2026-10-08"
---

A timeline that winds up and down in six columns across the page, for a wide, short space. Four project modules keep their lanes and colors at every turn.

Rows or columns?: A serpentine timeline can fold into rows or into columns. Rows suit a tall space and read like text; columns, as here, suit a wide one, like a banner, a slide or a dashboard strip. The date labels turn with the path, so each one stays in its own lane.

Good for:
- Wide spaces: banners, slides, dashboard strips
- Long plans that would need scrolling on one line
- Roadmaps shown on a big screen

Think twice when:
- Reading dates side by side: a Gantt chart lines them up
- Phones: rows fit a narrow screen better than columns
- Many lanes: columns get crowded at the turns

Prompt: Create a horizontal serpentine timeline chart whose date axis winds up and down across six columns, showing a few months of a project: four modules in their own lanes, with tasks as thick bars, and a lane of lettered milestones. Make the timeline zoomable. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(am5timeline.SerpentineChart.new(root, {
  orientation: "horizontal", // the runs stand side by side, across the chart
  // time runs along a path that doubles back on itself to make 6 runs
  levelCount: 6,
  startLocation: 0.2,        // the path starts 20% of the way along the first run...
  endLocation: 1,            // ...and goes to the very end of the last
  // How much of each row the lanes take
  yAxisRadius: am5.percent(70),
  wheelY: "zoomX"            // the mouse wheel zooms in on the dates
}));

chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal", // a scrollbar above the chart, to zoom and pan the dates
  // The turns at the top reach past the plot area: keep them clear of the scrollbar
  marginBottom: 50
}));

var yRenderer = am5timeline.AxisRendererCurveY.new(root, {
  // The lanes are close together: let every name show
  minGridDistance: 10,
  // The dashed line with the dates runs along the middle of the third lane of six (the empty one)
  axisLocation: 2.5 / 6,
  // The rows run up and down, so the lane names turn with them
  rotateLabels: true
});

yRenderer.labels.template.setAll({
  centerY: am5.p50,
  centerX: am5.p100,
  fontSize: 11 // small lane names
});

yRenderer.grid.template.set("forceHidden", true); // no lane grid lines

// Create axes and their renderers
var xRenderer = am5timeline.AxisRendererCurveX.new(root, {
  yRenderer: yRenderer,    // the date axis follows the same curve as the lanes
  // Date labels follow the path, so they stay in their own lane
  rotateLabels: true,
  strokeDasharray: [2, 2], // dashed: 2px dashes, 2px gaps...
  strokeOpacity: 0.5,      // ...half transparent...
  stroke: root.interfaceColors.get("alternativeBackground") // ...dark on light backgrounds, light on dark ones
});

xRenderer.labels.template.setAll({
  centerY: am5.p50, // centered on the dashed line
  fontSize: 11,     // small dates
  minPosition: 0.01 // hide a label that would sit at the very start
});

// Date labels sit on the dashed line, with the chart's background color behind them
xRenderer.labels.template.setup = function(target) {
  target.set("layer", 30); // above the bars
  target.set("background", am5.Rectangle.new(root, {
    fill: root.interfaceColors.get("background"),
    fillOpacity: 1
  }));
}

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,
  categoryField: "category",
  renderer: yRenderer
}));

var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "day", count: 1 }, // one day per unit
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})           // shows the date at the cursor
}));

// Data: each module has its own color, used by its bars and their end dots
var colorSet = chart.get("colors");
var module1 = { fill: colorSet.getIndex(0) };
var module2 = { fill: colorSet.getIndex(5) };
var module3 = { fill: colorSet.getIndex(9) };
var module4 = { fill: colorSet.getIndex(15) };

var data = [{
  "category": "Module #1",
  "start": new Date("2026-01-15").getTime(),
  "end": new Date("2026-01-18").getTime(),
  "settings": module1,
  "task": "Gathering requirements"
}, {
  "category": "Module #1",
  "start": new Date("2026-02-10").getTime(),
  "end": new Date("2026-04-23").getTime(),
  "settings": module1,
  "task": "Development"
}, {
  "category": "Module #2",
  "start": new Date("2026-01-13").getTime(),
  "end": new Date("2026-01-15").getTime(),
  "settings": module2,
  "task": "Gathering requirements"
}, {
  "category": "Module #2",
  "start": new Date("2026-01-17").getTime(),
  "end": new Date("2026-01-20").getTime(),
  "settings": module2,
  "task": "Producing specifications"
}, {
  "category": "Module #2",
  "start": new Date("2026-01-21").getTime(),
  "end": new Date("2026-02-10").getTime(),
  "settings": module2,
  "task": "Development"
}, {
  "category": "Module #2",
  "start": new Date("2026-02-15").getTime(),
  "end": new Date("2026-02-23").getTime(),
  "settings": module2,
  "task": "Testing and QA"
}, {
  "category": "Module #3",
  "start": new Date("2026-01-06").getTime(),
  "end": new Date("2026-01-24").getTime(),
  "settings": module3,
  "task": "Gathering requirements"
}, {
  "category": "Module #3",
  "start": new Date("2026-02-06").getTime(),
  "end": new Date("2026-02-15").getTime(),
  "settings": module3,
  "task": "Producing specifications"
}, {
  "category": "Module #3",
  "start": new Date("2026-03-15").getTime(),
  "end": new Date("2026-04-20").getTime(),
  "settings": module3,
  "task": "Development"
}, {
  "category": "Module #3",
  "start": new Date("2026-04-25").getTime(),
  "end": new Date("2026-05-05").getTime(),
  "settings": module3,
  "task": "Testing and QA"
}, {
  "category": "Module #4",
  "start": new Date("2026-01-20").getTime(),
  "end": new Date("2026-02-17").getTime(),
  "settings": module4,
  "task": "Gathering requirements"
}, {
  "category": "Module #4",
  "start": new Date("2026-03-02").getTime(),
  "end": new Date("2026-03-15").getTime(),
  "settings": module4,
  "task": "Development"
}, {
  "category": "Module #4",
  "start": new Date("2026-03-28").getTime(),
  "end": new Date("2026-05-04").getTime(),
  "settings": module4,
  "task": "Testing and QA"
}];

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5timeline.CurveColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  baseAxis: yAxis,          // the bars run along the time path
  valueXField: "end",
  openValueXField: "start", // each bar starts at its start date
  categoryYField: "category",
  layer: 30
}));

// Hovering a bar or one of its end dots shows the task and its dates
var tooltipText = "{category}: {task}\n{openValueX.formatDate('MMM d')} to {valueX.formatDate('MMM d')}";

series.columns.template.setAll({
  height: am5.percent(25), // bars a quarter as thick as their lane
  strokeOpacity: 0,        // no outline
  // The module's color comes from the data
  templateField: "settings",
  tooltipText: tooltipText
});

// A dot at the start and at the end of each bar, in the bar's color
series.bullets.push(function(root, series, dataItem) {
  return am5.Bullet.new(root, {
    locationX: 0, // at the bar's start
    sprite: am5.Circle.new(root, {
      radius: 4, // 4px radius
      templateField: "settings",
      tooltipText: tooltipText,
      layer: 30
    })
  });
});

series.bullets.push(function(root, series, dataItem) {
  return am5.Bullet.new(root, {
    locationX: 1, // at the bar's end
    sprite: am5.Circle.new(root, {
      radius: 4,
      templateField: "settings",
      tooltipText: tooltipText,
      layer: 30
    })
  });
});

// Milestones: a lettered badge on its date, in a lane of their own
var lineSeries = chart.series.push(am5timeline.CurveLineSeries.new(root, {
  xAxis: xAxis, yAxis: yAxis, categoryYField: "category", valueXField: "date"
}));

lineSeries.strokes.template.set("forceHidden", true); // only the badges, no line between them

lineSeries.bullets.push(function(root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "{letter}",
      populateText: true, // fills in {letter} from the data
      fontSize: 10,       // small...
      fontWeight: "bold", // ...bold letters...
      centerX: am5.p50,   // ...centered on the date
      centerY: am5.p50,
      paddingTop: 2, paddingBottom: 2, paddingLeft: 5, paddingRight: 5, // a little room around the letter
      layer: 30,
      background: am5.Rectangle.new(root, {
        fill: root.interfaceColors.get("background"), // a box in the background color...
        stroke: root.interfaceColors.get("alternativeBackground") // ...with a contrasting outline
      })
    })
  });
});

lineSeries.data.setAll([
  { category: "Milestones", date: new Date("2026-01-20").getTime(), letter: "A" },
  { category: "Milestones", date: new Date("2026-01-28").getTime(), letter: "B" },
  { category: "Milestones", date: new Date("2026-02-15").getTime(), letter: "C" },
  { category: "Milestones", date: new Date("2026-03-05").getTime(), letter: "D" },
  { category: "Milestones", date: new Date("2026-03-11").getTime(), letter: "E" },
  { category: "Milestones", date: new Date("2026-03-17").getTime(), letter: "F" },
  { category: "Milestones", date: new Date("2026-03-25").getTime(), letter: "G" }
]);

var cursor = chart.set("cursor", am5timeline.CurveCursor.new(root, {
  behavior: "zoomX", // drag along the timeline to zoom in
  xAxis: xAxis,
  yAxis: yAxis
}));

series.data.setAll(data);

// Six lanes: the empty one keeps room for the date labels
yAxis.data.setAll([
  { category: "Module #1" },
  { category: "Module #2" },
  { category: "" },
  { category: "Milestones" },
  { category: "Module #3" },
  { category: "Module #4" }
]);

// Animate chart and series in
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
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
- https://cdn.amcharts.com/lib/5/timeline.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
