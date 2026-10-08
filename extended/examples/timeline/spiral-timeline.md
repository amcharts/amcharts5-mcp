---
title: "Spiral Timeline"
source: "https://www.amcharts.com/demos/spiral-timeline/"
category: "timeline"
scraped: "2026-10-08"
---

The same project plan wound into a spiral: time starts in the middle and turns outward, two laps from January to early May. Each module keeps its lane and color all the way round.

When a spiral timeline works: A spiral fits a long timeline into a square. Time runs at an even pace along the path, so a week is as long on the outer laps as on the inner ones, and the outer laps simply hold more of it. It catches the eye, but dates take longer to find than on a straight line.

Good for:
- A long schedule in a square space
- Posters, covers and social images
- An eye-catching overview, with the detail in tooltips

Think twice when:
- Cycles like weeks or years: the laps here are not equal spans of time
- Finding exact dates: a serpentine timeline reads more easily
- Many lanes: they get thin on a small spiral

Prompt: Create a spiral timeline chart whose date axis starts in the middle and winds outward, showing a few months of a project: four modules in their own lanes, with tasks as thick bars, a lane of lettered milestones and a legend of the modules. Make the timeline zoomable. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(am5timeline.SpiralChart.new(root, {
  // the timeline winds round twice
  levelCount: 2,
  // How much of each turn the lanes take
  yAxisRadius: am5.percent(90),
  wheelY: "zoomX", // the mouse wheel zooms in on the dates
  // The legend goes to the right of the spiral
  layout: root.horizontalLayout
}));

// The scrollbar starts hidden
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal", // zooms the dates when shown
  forceHidden: true
}));

var yRenderer = am5timeline.AxisRendererCurveY.new(root, {
  // The dashed line with the dates runs along the middle of the third lane of six (the empty one)
  axisLocation: 2.5 / 6
});

// The middle of the spiral has no room for lane names: the legend names the modules
yRenderer.labels.template.set("forceHidden", true);

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
      fontSize: 9,        // small text
      fontWeight: "bold",
      centerX: am5.p50,   // centered on its date...
      centerY: am5.p50,   // ...and in the middle of its lane
      paddingTop: 1, paddingBottom: 1, paddingLeft: 4, paddingRight: 4, // space around the letter
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
  behavior: "zoomX", // a drag along the spiral zooms in on those dates
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

// Legend: one item per module, in its color
// https://www.amcharts.com/docs/v5/concepts/legend/
var legend = chart.children.push(am5.Legend.new(root, {
  nameField: "name",    // legend items from plain data: the name...
  fillField: "color",   // ...and the color, for the marker's fill...
  strokeField: "color", // ...and its outline
  // the legend only names the colors: clicking it does nothing
  clickTarget: "none",
  layout: root.verticalLayout, // one module per row
  y: am5.p50,                  // halfway down...
  centerY: am5.p50             // ...centered on its own middle
}));

legend.data.setAll([
  { name: "Module #1", color: module1.fill },
  { name: "Module #2", color: module2.fill },
  { name: "Module #3", color: module3.fill },
  { name: "Module #4", color: module4.fill }
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
