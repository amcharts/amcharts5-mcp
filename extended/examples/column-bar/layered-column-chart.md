---
title: "Layered Column Chart"
source: "https://www.amcharts.com/demos/layered-column-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

Two years in one column: 2024 as a wide column at the back, 2025 as a narrower, striped one in front. Where the front column rises above the back one, the country grew.

When to layer columns: Layering puts two values for each category in the same place, so the change between them shows without the eye jumping between neighbors. It works for two series where one is the reference for the other, like last year and this year, or target and actual.

Good for:
- This year against last year
- Actual against target or budget
- Many categories, where clusters would crowd

Think twice when:
- More than two series: the layers hide each other
- The difference itself is the point: a variance chart or dumbbell plot shows it directly
- Readers new to the style: say which layer is which, as the legend does here

Prompt: Create a layered column chart comparing six countries across two years, with the later year’s narrower, striped columns in front of the earlier year’s wider ones in the same space. Add a cursor, tooltips and a legend. Use the amCharts 5 library with its Responsive theme.

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
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,      // drag the plot sideways to pan
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the countries
  paddingLeft: 0,  // the value labels sit at the chart's left edge
  layout: root.verticalLayout
}));

// take every fourth color of the chart's color set, so the two years don't get two neighboring blues
chart.get("colors").set("step", 4);

var data = [{
  "country": "USA",
  "year2024": 3.5,
  "year2025": 4.2
}, {
  "country": "UK",
  "year2024": 1.7,
  "year2025": 3.1
}, {
  "country": "Canada",
  "year2024": 2.8,
  "year2025": 2.9
}, {
  "country": "Japan",
  "year2024": 2.6,
  "year2025": 2.3
}, {
  "country": "France",
  "year2024": 1.4,
  "year2025": 2.1
}, {
  "country": "Brazil",
  "year2024": 2.6,
  "year2025": 4.9
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 70,   // at least 70px between labels; on narrow screens some are skipped
  minorGridEnabled: true // a skipped country still gets a faint grid line
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "country",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {
    animationDuration: 200 // the axis tooltip glides to the next country in 0.2 seconds
  })
}));

xRenderer.grid.template.setAll({
  location: 1 // grid lines between the countries, not through the middle of each
})

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0, // start at zero, so the column heights compare fairly
  renderer: am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1 // a faint line along the value axis
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

// The 2024 columns: wide, at the back
var series0 = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "2024",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "year2024",
  categoryXField: "country",
  // not side by side: both years' columns stand in the middle of the category, one over the other
  clustered: false,
  tooltip: am5.Tooltip.new(root, {
    labelText: "{name}: {valueY}" // the year and the value, as "2024: 3.5"
  })
}));

series0.columns.template.setAll({
  width: am5.percent(80), // the back columns fill 80% of each country's space
  tooltipY: 0,            // the tooltip points at the top of the column
  strokeOpacity: 0        // no outline
});

series0.data.setAll(data);

// The 2025 columns: narrower, in front, so both years show in one place
var series1 = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "2025",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "year2025",
  categoryXField: "country",
  clustered: false, // over the 2024 columns, not beside them
  tooltip: am5.Tooltip.new(root, {
    labelText: "{name}: {valueY}"
  })
}));

series1.columns.template.setAll({
  width: am5.percent(50), // the front columns are narrower, so the back ones show around them
  tooltipY: 0,
  strokeOpacity: 0,
  // stripes in the background color over the series' color, so the front columns stand out from the back ones
  fillPattern: am5.LinePattern.new(root, {
    color: root.interfaceColors.get("background"),
    fill: series1.get("fill"),
    rotation: 45,   // diagonal stripes
    strokeWidth: 1, // each stripe 1px wide...
    gap: 6,         // ...with 6px of the column's color between stripes
    // a big tile, about half the chart, so the seams where tiles meet are few
    width: 490,
    height: 490
  })
});

series1.data.setAll(data);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));

// Add legend, in the top left corner of the plot area, where the columns stay low
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.plotContainer.children.push(am5.Legend.new(root, {
  x: 0,
  y: 0,
  paddingTop: 10, // 10px in from the top...
  paddingLeft: 10 // ...and the left edge of the plot
}));
legend.data.setAll(chart.series.values);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);
series0.appear();
series1.appear();
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
