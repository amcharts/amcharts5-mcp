---
title: "Radar with Date Axis"
source: "https://www.amcharts.com/demos/radar-with-date-axis/"
category: "radar-polar"
scraped: "2026-10-08"
---

A timeline wrapped into a ring: the year runs clockwise from the top, and each ring is one row of date ranges. Here, when five holiday homes were booked in 2025.

When a circular timeline works: Bent into a ring, a year has no edge: December runs into January, so the ski chalet’s winter season reads as one stretch across the top. Each ring is a row, like a lane in a Gantt chart. For projects with exact dates over several years, a straight timeline is easier to read.

Good for:
- Seasons: bookings, opening times, harvests
- Schedules that repeat every year
- A year at a glance on a square tile

Think twice when:
- Exact start and end dates: a Gantt chart lines them up
- Many rows: the inner rings get short
- Spans of several years: use a straight timeline

Prompt: Create a radar chart with the year around the circle as a date axis and one ring per holiday home, showing the periods each home was booked (sample data) as bars from start to end date. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    panX: false,                 // no dragging the plot around
    panY: false,
    wheelX: "panX",              // a horizontal wheel or trackpad swipe moves a zoomed view around...
    wheelY: "zoomX",             // ...and the vertical wheel zooms in on some dates
    innerRadius: am5.percent(40) // a hole in the middle, 40% of the radius
  })
);

// every other color of the palette, so neighboring rings stand apart
chart.get("colors").set("step", 2);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor",
am5radar.RadarCursor.new(root, {
  behavior: "zoomX" // drag around the circle to zoom in on some dates
}));

cursor.lineY.set("visible", false); // no circle through the pointer, only the line from the center

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
// One ring per holiday home, from the middle out
var yRenderer = am5radar.AxisRendererRadial.new(root, {
  minGridDistance: 10 // small, so every home keeps its label
});

yRenderer.labels.template.setAll({
  fontSize: 12 // small text, in pixels
});

var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0, // can't be panned past the first or last ring
    categoryField: "home",
    renderer: yRenderer
  })
);

// The year runs clockwise around the circle, from January 1 at the top
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    min: new Date(2025, 0, 1).getTime(),         // the circle is exactly 2025: January 1...
    max: new Date(2026, 0, 1).getTime(),         // ...to January 1, 2026
    baseInterval: { timeUnit: "day", count: 1 }, // the dates are whole days
    renderer: am5radar.AxisRendererCircular.new(root, {})
  })
);

// Data: when five holiday homes were booked in 2025, one row per booking (sample data).
// The ski chalet's winter bookings run across New Year, so they show at both ends of the year.
var data = [
  { home: "Ski chalet", start: new Date(2025, 0, 1).getTime(), end: new Date(2025, 2, 31).getTime() },
  { home: "Ski chalet", start: new Date(2025, 11, 18).getTime(), end: new Date(2025, 11, 31).getTime() },
  { home: "Beach house", start: new Date(2025, 3, 2).getTime(), end: new Date(2025, 3, 18).getTime() },
  { home: "Beach house", start: new Date(2025, 5, 1).getTime(), end: new Date(2025, 8, 15).getTime() },
  { home: "Lake cabin", start: new Date(2025, 4, 1).getTime(), end: new Date(2025, 5, 20).getTime() },
  { home: "Lake cabin", start: new Date(2025, 6, 10).getTime(), end: new Date(2025, 7, 31).getTime() },
  { home: "Farmhouse", start: new Date(2025, 2, 20).getTime(), end: new Date(2025, 4, 31).getTime() },
  { home: "Farmhouse", start: new Date(2025, 7, 5).getTime(), end: new Date(2025, 9, 20).getTime() },
  { home: "City flat", start: new Date(2025, 1, 1).getTime(), end: new Date(2025, 3, 30).getTime() },
  { home: "City flat", start: new Date(2025, 7, 20).getTime(), end: new Date(2025, 9, 25).getTime() }
];

// Dates in tooltips
// https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/
root.dateFormatter.setAll({
  dateFormat: "MMM d",                 // dates shown as "Jun 1"
  dateFields: ["valueX", "openValueX"] // the fields that hold dates, so they're formatted as dates
});

// Create series: one per home, so each ring gets its own color
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
var homes = ["City flat", "Farmhouse", "Lake cabin", "Beach house", "Ski chalet"]; // middle ring out

homes.forEach(function(home) {
  var series = chart.series.push(
    am5radar.RadarColumnSeries.new(root, {
      // each home keeps its whole ring, instead of sharing every ring with the other series
      clustered: false,
      name: home,
      xAxis: xAxis,
      yAxis: yAxis,
      categoryYField: "home",
      valueXField: "end",
      openValueXField: "start" // each bar runs from the booking's start date, not from the axis start
    })
  );

  series.columns.template.setAll({
    cornerRadius: 20, // rounded ends, up to 20px
    tooltipText: "{categoryY}: {openValueX} - {valueX}" // the home and the booking's dates
  });

  series.data.setAll(data.filter(function(booking) { // only this home's bookings
    return booking.home === home;
  }));
  series.appear(2000, 100);
});

yAxis.data.setAll(homes.map(function(home) {
  return { home: home };
}));

// Add scrollbar: it zooms the dates. It starts hidden
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", exportable: false, forceHidden: true }));

// Animate chart and series in
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
chart.appear(2000, 100);
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
