---
title: "Columns with Grainy Gradients"
source: "https://www.amcharts.com/demos/columns-with-grainy-gradients/"
category: "column-bar"
scraped: "2026-10-08"
---

Columns styled like a poster: each one fades from its own color to a dark shade of it, with a film-grain texture, a fully rounded top and a soft shadow that grows on hover.

When to style the columns: Gradients, grain and shadows don’t change what a column chart says, but they set its mood: this one would sit well in a magazine, on a landing page or in a year-in-review. Keep it to a handful of columns, so the styling doesn’t bury the numbers.

Good for:
- Infographics and landing pages
- Year-in-review and marketing pieces
- A handful of headline numbers

Think twice when:
- Dashboards read every day: plain columns are calmer
- Many columns: the texture turns into noise
- Black-and-white print: the colors all turn to similar grays

Prompt: Create a column chart comparing six countries, each column in its own color with fully rounded tops, a gradient that darkens toward the bottom and a grainy texture. Add tooltips. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,       // drag the plot sideways to pan...
  panY: true,       // ...or up and down
  wheelX: "panX",   // a horizontal wheel or trackpad swipe pans
  wheelY: "zoomX",  // the vertical wheel zooms in on the countries
  pinchZoomX: true, // pinch to zoom on touch screens
  paddingLeft:0,    // the value labels sit at the chart's left edge
  layout: root.verticalLayout
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 50,   // at least 50px between labels; on narrow screens some are skipped
  minorGridEnabled: true // a grid line for every country, even one whose label is skipped
});

xRenderer.grid.template.setAll({
  location: 1 // each grid line at the end of its country's cell, not its start
})

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0.3,                 // pan up to 30% of the visible range past the first and last country
  categoryField: "country",
  renderer: xRenderer
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3, // the values can be panned 30% past their range too
  min: 0,            // the columns start at zero
  renderer: am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1 // a faint axis line
  })
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "country",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}"
  }),
  // Each column takes its own color, the next one of the theme's color set
  colorByDataItem: true,
  colors: chart.get("colors")
}));

series.columns.template.setAll({
  tooltipY: 0,                          // the tooltip points at the top of the column
  tooltipText: "{categoryX}: {valueY}", // the country and its value
  shadowOpacity: 0.1,                   // a faint shadow...
  shadowOffsetX: 3,                     // ...3px to the right...
  shadowOffsetY: 3,                     // ...and 3px down...
  shadowBlur: 6,                        // ...with soft edges
  strokeWidth: 2,                       // a 2px border
  // a border in the chart's background color: white in light mode, dark in dark mode
  stroke: root.interfaceColors.get("background"),
  shadowColor: am5.color(0x000000), // a black shadow
  cornerRadiusTL: 50,               // fully rounded tops
  cornerRadiusTR: 50,
  // fades from the column's own color at the top to a dark shade of it at the bottom, which still shows in dark mode
  fillGradient: am5.LinearGradient.new(root, {
    stops: [
      {},                // will use original column color
      { brighten: -0.7 } // the column's color, 70% darker
    ]
  }),
  // the grain: faint random specks over the fill, about two dark ones for every light one
  fillPattern: am5.GrainPattern.new(root, {
    maxOpacity: 0.15, // the specks are at most 15% opaque...
    density: 0.5,     // ...and cover about half the pixels
    colors: [am5.color(0x000000), am5.color(0x000000), am5.color(0xffffff)]
  })
});

// on hover the shadow deepens and the round tops turn squarer
series.columns.template.states.create("hover", {
  shadowOpacity: 1,
  shadowBlur: 10,
  cornerRadiusTL: 10,
  cornerRadiusTR: 10
})

// Set data
var data = [{
  country: "USA",
  value: 2025
}, {
  country: "China",
  value: 1282
}, {
  country: "Japan",
  value: 909
}, {
  country: "Germany",
  value: 752
}, {
  country: "UK",
  value: 652
}, {
  country: "Italy",
  value: 452
}];

xAxis.data.setAll(data);
series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
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
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
