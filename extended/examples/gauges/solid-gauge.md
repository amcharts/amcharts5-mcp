---
title: "Solid Gauge"
source: "https://www.amcharts.com/demos/solid-gauge/"
category: "gauges"
scraped: "2026-10-08"
---

Four progress bars bent into rings, one inside the other, each filling its track up to a percentage. Here, four departments from 35% to 92%.

When a solid gauge works: A solid gauge puts several progress bars into one compact circle, each on a faint track that shows what is left. It reads well for a few values out of 100%, and the colored labels tie each ring to its name.

Good for:
- Progress of a few teams or goals
- Activity rings, fitness-app style
- Completion rates on a dashboard tile

Think twice when:
- More than five or six rings: the inner ones get too short
- Exact comparisons: an outer ring looks longer for the same value
- Values over 100%: the ring has nowhere to go

Prompt: Create a solid gauge: a three-quarter circle of four rings, one per department, each filled in its own color up to its percentage over a faint full-length track, with tooltips. Use the amCharts 5 library with its Responsive theme.

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

// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,                  // a drag doesn't pan: the cursor zooms with it
  panY: false,
  wheelX: "panX",               // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",              // ...and the vertical wheel zooms the percent scale
  innerRadius: am5.percent(20), // a hole in the middle, 20% of the radius
  // the bars start at the top and run three quarters of the way round
  startAngle: -90,
  endAngle: 180
}));

// Data
var data = [{
  category: "Research",
  value: 80,
  full: 100,
  columnSettings: {
    fill: chart.get("colors").getIndex(0)
  }
}, {
  category: "Marketing",
  value: 35,
  full: 100,
  columnSettings: {
    fill: chart.get("colors").getIndex(1)
  }
}, {
  category: "Distribution",
  value: 92,
  full: 100,
  columnSettings: {
    fill: chart.get("colors").getIndex(2)
  }
}, {
  category: "Human Resources",
  value: 68,
  full: 100,
  columnSettings: {
    fill: chart.get("colors").getIndex(3)
  }
}];

// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX" // drag around the circle to zoom in on that span
}));

cursor.lineY.set("visible", false); // no curved cursor line, only the straight one from the center

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
var xRenderer = am5radar.AxisRendererCircular.new(root, {});

xRenderer.labels.template.setAll({
  radius: 10 // percent labels 10px outside the circle
});

xRenderer.grid.template.setAll({
  forceHidden: true // no grid lines from the center
});

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: xRenderer,
  min: 0,               // the scale runs from 0...
  max: 100,             // ...to 100...
  strictMinMax: true,   // ...exactly, with no rounding to nicer numbers
  numberFormat: "#'%'", // a percent sign after each label; quoted, so it doesn't multiply by 100
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's percent on the axis
}));

var yRenderer = am5radar.AxisRendererRadial.new(root, {
  minGridDistance: 20 // at least 20px between the names
});

yRenderer.labels.template.setAll({
  centerX: am5.p100, // the names end where their bars start
  fontWeight: "500", // medium weight
  fontSize: 18,      // big text, 18px
  // each label takes its bar's color from the data's columnSettings
  templateField: "columnSettings"
});

yRenderer.grid.template.setAll({
  forceHidden: true // no rings between the bars
});

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: yRenderer
}));

yAxis.data.setAll(data);

// Create series
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
// the track: a faint bar to 100% behind each colored bar
var series1 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  // not side by side: the colored bar draws over its track in the same band
  clustered: false,
  valueXField: "full", // every track runs to 100
  categoryYField: "category",
  fill: root.interfaceColors.get("alternativeBackground") // the theme's text color, very faint below
}));

series1.columns.template.setAll({
  width: am5.p100,   // fills its whole band
  fillOpacity: 0.08, // faint
  strokeOpacity: 0,  // no outline
  cornerRadius: 20   // rounded ends
});

series1.data.setAll(data);

var series2 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  clustered: false, // drawn over its track
  valueXField: "value",
  categoryYField: "category"
}));

series2.columns.template.setAll({
  width: am5.p100,                      // fills its whole band
  strokeOpacity: 0,                     // no outline
  tooltipText: "{category}: {valueX}%", // hover a bar for its name and percent
  cornerRadius: 20,                     // rounded ends
  templateField: "columnSettings"       // each bar's color comes from columnSettings in the data
});

series2.data.setAll(data);

// Animate chart and series in
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
series1.appear(1000);
series2.appear(1000);
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
