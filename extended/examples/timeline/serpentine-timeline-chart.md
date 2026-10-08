---
title: "Serpentine Timeline Chart"
source: "https://www.amcharts.com/demos/serpentine-timeline-chart/"
category: "timeline"
scraped: "2026-10-08"
---

A project plan on a winding road, so four months fit on one screen. Each module has its own lane and color, and lettered badges mark the milestones.

When a serpentine timeline works: A long timeline on one straight line gets either tiny or so wide that it scrolls. Folding it into rows keeps every date big enough to read, and the turns show where one stretch of time carries on into the next. It reads best with a few lanes over a few months.

Good for:
- Project plans with a handful of workstreams
- Long histories on a poster or a single slide
- Roadmaps, where the order matters more than exact lengths

Think twice when:
- Comparing start dates in rows far apart: a Gantt chart lines them up
- Many lanes: the bars get thin and the turns crowd
- Small screens: rows shrink fast, so use fewer of them

Prompt: Create a serpentine timeline chart whose date axis winds left and right across three rows, showing a few months of a project: four modules in their own lanes, with tasks as thick bars, and a lane of lettered milestones. Make the timeline zoomable. Use the amCharts 5 library with its Responsive theme.

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
  // the timeline winds back and forth in three rows
  levelCount: 3,
  // the first row starts 20% of the way in, leaving room for the lane names at its left
  startLocation: 0.2,
  endLocation: 1, // the last row runs to its end
  // How much of each row the lanes take
  yAxisRadius: am5.percent(80),
  wheelY: "zoomX" // the mouse wheel zooms in on the dates
}));

chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // above the chart; zooms the dates
}));

var yRenderer = am5timeline.AxisRendererCurveY.new(root, {
  // The lanes are close together: let every name show
  minGridDistance: 10,
  // The dashed line with the dates runs along the middle of the third lane of six (the empty one)
  axisLocation: 2.5 / 6
});

yRenderer.labels.template.setAll({
  centerY: am5.p50,  // lane names centered on their lane...
  centerX: am5.p100, // ...and ending where the lanes start
  fontSize: 11       // small text
});

yRenderer.grid.template.set("forceHidden", true); // no lines between the lanes

// Create axes and their renderers
var xRenderer = am5timeline.AxisRendererCurveX.new(root, {
  yRenderer: yRenderer,    // required: the date axis follows the lanes' curve
  strokeDasharray: [2, 3], // a dashed line: 2px dashes, 3px gaps...
  strokeOpacity: 0.5,      // ...half see-through...
  stroke: root.interfaceColors.get("alternativeBackground") // ...in the theme's text color
});

xRenderer.labels.template.setAll({
  centerY: am5.p50, // date labels centered on the line
  fontSize: 11,     // small text
  minPosition: 0.01 // hide a label at the very start, where it would be cut
});

// Date labels sit on the dashed line, with the chart's background color behind them
xRenderer.labels.template.setup = function(target) {
  target.set("layer", 30); // drawn on layer 30, above everything without a layer
  target.set("background", am5.Rectangle.new(root, {
    fill: root.interfaceColors.get("background"),
    fillOpacity: 1 // solid, hiding the dashed line under the text
  }));
}

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0, // no panning past the first and last lane
  categoryField: "category",
  renderer: yRenderer
}));

var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "day", count: 1 }, // dates by the day
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})           // shows the cursor's date on the axis
}));

// Data: each module has its own color, used by its bars and their end dots
var colorSet = chart.get("colors");
var module1 = { fill: colorSet.getIndex(0) };
var module2 = { fill: colorSet.getIndex(3) };
var module3 = { fill: colorSet.getIndex(5) };
var module4 = { fill: colorSet.getIndex(8) };

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
  baseAxis: yAxis,          // the lanes are the base: bars stretch along the dates
  valueXField: "end",       // each bar ends on its end date...
  openValueXField: "start", // ...and starts on its start date
  categoryYField: "category",
  layer: 30                 // drawn on layer 30, above the axes
}));

// Hovering a bar or one of its end dots shows the task and its dates
var tooltipText = "{category}: {task}\n{openValueX.formatDate('MMM d')} to {valueX.formatDate('MMM d')}";

series.columns.template.setAll({
  height: am5.percent(25), // a bar takes a quarter of its lane's height
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
      radius: 4, // a 4px dot
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

// only the badges show, no line joining them
lineSeries.strokes.template.set("forceHidden", true);

lineSeries.bullets.push(function(root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "{letter}",
      populateText: true, // fill in {letter} from the data
      fontSize: 10,       // small text
      fontWeight: "bold",
      centerX: am5.p50,   // centered on its date...
      centerY: am5.p50,   // ...and in the middle of its lane
      paddingTop: 2, paddingBottom: 2, paddingLeft: 5, paddingRight: 5, // space around the letter
      layer: 30,          // on layer 30 with the bars, above the axes
      background: am5.Rectangle.new(root, {
        fill: root.interfaceColors.get("background"),             // a badge in the background color...
        stroke: root.interfaceColors.get("alternativeBackground") // ...with an outline in the text color
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
  behavior: "zoomX", // a drag along the timeline zooms in on those dates
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
