---
title: "Smoothed Stacked Area"
source: "https://www.amcharts.com/demos/smoothed-stacked-area/"
category: "line-area"
scraped: "2026-10-08"
---

A stacked area chart with soft curves and a grain texture: cars, motorcycles and bicycles from 2014 to 2025. Each layer’s thickness is its value.

When to stack areas: Stacking shows two things at once: how the total moves, and what it is made of. It reads best with the largest, steadiest layer at the bottom, as cars are here. The layers above ride on everything below them, so their own ups and downs are harder to judge.

Good for:
- A total and its parts over time
- Three to five categories
- A market or traffic mix, year by year

Think twice when:
- Comparing each layer’s own trend: use separate lines
- Negative values: a stack needs everything above zero
- Shares rather than totals: use a 100% stacked area

Prompt: Create a smoothed stacked area chart of yearly values for cars, motorcycles and bicycles from 2014 to 2025, with curved layers separated by borders and grainy fills. Add tooltips, a cursor and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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
  // a drag zooms (the cursor's behavior), so the chart itself doesn't pan
  panX: false,
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the years
  pinchZoomX: true // pinch to zoom the years on a touch screen
}));

// every second color of the theme, so the layers next to each other differ more
chart.get("colors").set("step", 2);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // drag across the plot to zoom in on those years
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));

// The data
var data = [{
  "year": "2014",
  "cars": 1298,
  "motorcycles": 680,
  "bicycles": 101
}, {
  "year": "2015",
  "cars": 1275,
  "motorcycles": 664,
  "bicycles": 97
}, {
  "year": "2016",
  "cars": 1246,
  "motorcycles": 648,
  "bicycles": 93
}, {
  "year": "2017",
  "cars": 1318,
  "motorcycles": 697,
  "bicycles": 111
}, {
  "year": "2018",
  "cars": 1213,
  "motorcycles": 633,
  "bicycles": 87
}, {
  "year": "2019",
  "cars": 1199,
  "motorcycles": 521,
  "bicycles": 145
}, {
  "year": "2020",
  "cars": 1110,
  "motorcycles": 310,
  "bicycles": 91
}, {
  "year": "2021",
  "cars": 1165,
  "motorcycles": 425,
  "bicycles": 120
}, {
  "year": "2022",
  "cars": 1145,
  "motorcycles": 319,
  "bicycles": 102
}, {
  "year": "2023",
  "cars": 1163,
  "motorcycles": 201,
  "bicycles": 145
}, {
  "year": "2024",
  "cars": 1180,
  "motorcycles": 285,
  "bicycles": 100
}, {
  "year": "2025",
  "cars": 1159,
  "motorcycles": 255,
  "bicycles": 122
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "year",
  // the axis starts and ends in the middle of the first and last year, so no half cells stay empty
  startLocation: 0.5,
  endLocation: 0.5,
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // fainter grid lines between the labeled years
    minGridDistance: 70     // at least 70px between the labels
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's year on the axis
}));

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  // Start at zero, so each layer's thickness shows its true value
  min: 0,
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

// adds one smoothed layer for a field of the data
function createSeries(name, field) {
  var series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: field,
    categoryXField: "year",
    stacked: true, // the main trick: each layer sits on top of the ones before it
    // borders in the background color part the layers in light and dark mode
    stroke: root.interfaceColors.get("background"),
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",                   // the tooltip points sideways at the layer
      labelText: "[bold]{name}[/]\n{categoryX}: {valueY}" // the layer's name, then the year and its value
    })
  }));

  series.strokes.template.setAll({
    strokeWidth: 4,                   // 4px borders...
    strokeOpacity: 1,                 // ...fully opaque
    shadowBlur: 2,                    // a soft shadow...
    shadowOffsetX: 2,                 // ...2px to the right...
    shadowOffsetY: 2,                 // ...and 2px down...
    shadowColor: am5.color(0x000000), // ...in black...
    shadowOpacity: 0.1                // ...at 10% opacity
  })

  series.fills.template.setAll({
    fillOpacity: 1, // a solid fill...
    visible: true,  // ...turned on: line series have none by default

    // a faint grain texture of dark and light specks over the fill
    fillPattern: am5.GrainPattern.new(root, {
      maxOpacity: 0.15, // each speck at most 15% opaque...
      density: 0.5,     // ...on about half of the pixels
      // each speck takes a random color from the list: two dark specks for every light one
      colors: [am5.color(0x000000), am5.color(0x000000), am5.color(0xffffff)]
    })

  });

  series.data.setAll(data);
  series.appear(1000);
}

createSeries("Cars", "cars");
createSeries("Motorcycles", "motorcycles");
createSeries("Bicycles", "bicycles");

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
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
